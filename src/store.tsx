import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { GameState, Card, Answer, GameScreen, Theme, ThemeSummary } from './types';
import { themeDisplayNames } from './types';
import { round1Questions, getQuestionById } from './questions';
import { selectRound2Questions } from './algorithm';
import { SupabaseSync } from './services/supabaseSync';

const STORAGE_KEY = 'relationship-game-state';
// Separate key for payment to persist across new sessions
// Payment status persists until user:
// - Clears browser data/localStorage manually
// - Uses a different device/browser
// - Uses incognito/private mode (payment won't persist across sessions)
// - Browser storage quota is exceeded and localStorage is cleared
const PAYMENT_STORAGE_KEY = 'relationship-game-payment-status';
// Separate key for partner names to persist across sessions
const NAMES_STORAGE_KEY = 'relationship-game-partner-names';
// Separate key for remote session to persist across game resets
const REMOTE_SESSION_STORAGE_KEY = 'relationship-game-remote-session';

function saveRemoteSession(sessionId: string | null, playerId: 1 | 2 | null) {
  try {
    if (sessionId && playerId) {
      localStorage.setItem(REMOTE_SESSION_STORAGE_KEY, JSON.stringify({
        sessionId,
        playerId,
        timestamp: Date.now()
      }));
    } else {
      localStorage.removeItem(REMOTE_SESSION_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

function loadRemoteSession(): { sessionId: string | null; playerId: 1 | 2 | null } {
  try {
    const stored = localStorage.getItem(REMOTE_SESSION_STORAGE_KEY);
    if (stored) {
      const { sessionId, playerId } = JSON.parse(stored);
      return { sessionId, playerId };
    }
  } catch {
    // Ignore parse errors
  }
  return { sessionId: null, playerId: null };
}

type GameAction =
  | { type: 'START_GAME'; partner1Name: string; partner2Name: string }
  | { type: 'SET_PARTNER_NAMES'; partner1Name: string; partner2Name: string }
  | { type: 'CONTINUE_GAME' }
  | { type: 'SELECT_CARD'; index: number }
  | { type: 'ANSWER_QUESTION'; answer: 'A' | 'B' }
  | { type: 'NAVIGATE_TO'; screen: GameScreen }
  | { type: 'COMPLETE_PAYMENT' }
  | { type: 'START_ROUND_2' }
  | { type: 'COMPLETE_ROUND'; round: 1 | 2 }
  | { type: 'REPLAY_ROUND'; round: 1 | 2 }
  | { type: 'SELECT_MODE'; mode: 'local' | 'remote' }
  | { type: 'SET_REMOTE_SESSION'; sessionId: string | null; playerId: 1 | 2 | null }
  | { type: 'SET_REMOTE_CONNECTION'; connected: boolean }
  | { type: 'SET_REMOTE_SESSION_PAID'; paid: boolean }
  | { type: 'APPLY_REMOTE_STATE'; state: Partial<GameState> }
  | { type: 'CANCEL_REMOTE_SESSION' }
  | { type: 'ACCEPT_REMOTE_INVITE' }
  | { type: 'DECLINE_REMOTE_INVITE' }
  | { type: 'RESET_GAME' };

function createInitialCards(round: 1 | 2, round1Answers?: Answer[]): Card[] {
  const questions = round === 1 ? round1Questions : selectRound2Questions(round1Answers || []);
  
  return questions.map((q) => ({
    id: uuidv4(),
    questionId: q.id,
    state: 'faceDown' as const,
    answer: {
      questionId: q.id,
      theme: q.theme,
      partner1Answer: null,
      partner2Answer: null,
      matched: null
    }
  }));
}

const storedRemoteSession = loadRemoteSession();

const initialState: GameState = {
  sessionId: '',
  partner1Name: '',
  partner2Name: '',
  currentPlayer: 1,
  currentScreen: 'landing',
  round1Cards: [],
  round2Cards: [],
  round1Complete: false,
  round2Complete: false,
  hasPaid: false,
  selectedCardIndex: null,

  gameMode: 'local',
  remoteSessionId: storedRemoteSession.sessionId,
  remotePlayerId: storedRemoteSession.playerId,
  isRemoteConnected: false,
  remoteSessionPaid: false
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PARTNER_NAMES':
      try {
        localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify({
          partner1Name: action.partner1Name,
          partner2Name: action.partner2Name
        }));
      } catch {
        // Ignore storage errors
      }
      return {
        ...state,
        partner1Name: action.partner1Name,
        partner2Name: action.partner2Name
      };

    case 'START_GAME':
      // Persist names separately so they survive across sessions
      try {
        localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify({
          partner1Name: action.partner1Name,
          partner2Name: action.partner2Name
        }));
      } catch {
        // Ignore storage errors
      }
      return {
        ...state,
        sessionId: uuidv4(),
        partner1Name: action.partner1Name,
        partner2Name: action.partner2Name,
        currentPlayer: 1,
        currentScreen: 'round1',
        round1Cards: createInitialCards(1),
        round1Complete: false,
        round2Complete: false,
        selectedCardIndex: null
      };

    case 'CONTINUE_GAME':
      // Navigate to the appropriate screen based on game state
      if (state.round2Complete) {
        return { ...state, currentScreen: 'finalResults' };
      } else if (state.round1Complete) {
        // In remote mode, the session may be paid even if this device is not premium.
        return { ...state, currentScreen: state.hasPaid || state.remoteSessionPaid ? 'round2' : 'round1Results' };
      } else {
        return { ...state, currentScreen: 'round1' };
      }

    case 'SELECT_CARD':
      // Handle deselection
      if (action.index < 0) {
        return {
          ...state,
          selectedCardIndex: null
        };
      }
      
      // Each partner can select any card they haven't answered yet
      const card = state.currentScreen === 'round1' 
        ? state.round1Cards[action.index] 
        : state.round2Cards[action.index];
      
      if (!card) return state;
      
      // Partner 1 can select cards that are faceDown or only answered by partner 2
      if (state.currentPlayer === 1 && card.state !== 'faceDown' && card.state !== 'partner2Only') return state;
      // Partner 2 can select cards that are faceDown or only answered by partner 1
      if (state.currentPlayer === 2 && card.state !== 'faceDown' && card.state !== 'partner1Only') return state;
      
      return {
        ...state,
        selectedCardIndex: action.index
      };

    case 'ANSWER_QUESTION': {
      if (state.selectedCardIndex === null) return state;
      
      const isRound1 = state.currentScreen === 'round1';
      const cards = isRound1 ? [...state.round1Cards] : [...state.round2Cards];
      const cardIndex = state.selectedCardIndex;
      const card = { ...cards[cardIndex] };
      const answer = { ...card.answer };

      if (state.currentPlayer === 1) {
        answer.partner1Answer = action.answer;
        
        // Check if partner 2 already answered this card
        if (card.state === 'partner2Only') {
          // Both have now answered - reveal!
          answer.matched = answer.partner1Answer === answer.partner2Answer;
          card.state = 'revealed';
        } else {
          // Only partner 1 has answered
          card.state = 'partner1Only';
        }
        
        card.answer = answer;
        cards[cardIndex] = card;

        // Don't auto-transition to results - let GameBoard handle it after reveal screen
        return {
          ...state,
          [isRound1 ? 'round1Cards' : 'round2Cards']: cards,
          currentPlayer: 2,
          selectedCardIndex: null
        };
      } else {
        answer.partner2Answer = action.answer;
        
        // Check if partner 1 already answered this card
        if (card.state === 'partner1Only') {
          // Both have now answered - reveal!
          answer.matched = answer.partner1Answer === answer.partner2Answer;
          card.state = 'revealed';
        } else {
          // Only partner 2 has answered
          card.state = 'partner2Only';
        }
        
        card.answer = answer;
        cards[cardIndex] = card;

        // Don't auto-transition to results - let GameBoard handle it after reveal screen
        return {
          ...state,
          [isRound1 ? 'round1Cards' : 'round2Cards']: cards,
          currentPlayer: 1,
          selectedCardIndex: null
        };
      }
    }

    case 'COMPLETE_ROUND': {
      const isRound1 = action.round === 1;
      return {
        ...state,
        [isRound1 ? 'round1Complete' : 'round2Complete']: true,
        currentScreen: isRound1 ? 'round1Results' : 'finalResults'
      };
    }

    case 'NAVIGATE_TO':
      return {
        ...state,
        currentScreen: action.screen
      };

    case 'COMPLETE_PAYMENT':
      // Persist payment status separately so it survives new sessions
      try {
        localStorage.setItem(PAYMENT_STORAGE_KEY, 'true');
      } catch {
        // Ignore storage errors
      }
      return {
        ...state,
        hasPaid: true
        // Don't change currentScreen here - let PaymentSuccess component handle navigation
      };

    case 'START_ROUND_2': {
      const round1Answers = state.round1Cards.map(c => c.answer);
      return {
        ...state,
        currentScreen: 'round2',
        round2Cards: createInitialCards(2, round1Answers),
        currentPlayer: 1,
        selectedCardIndex: null
      };
    }

    case 'REPLAY_ROUND': {
      // Only allow replay if user has paid
      if (!state.hasPaid) return state;
      
      if (action.round === 1) {
        // Replay Round 1 - reset both rounds but keep payment status
        return {
          ...state,
          currentScreen: 'round1',
          round1Cards: createInitialCards(1),
          round2Cards: [],
          round1Complete: false,
          round2Complete: false,
          currentPlayer: 1,
          selectedCardIndex: null
        };
      } else {
        // Replay Round 2 - regenerate based on current Round 1 answers
        const round1Answers = state.round1Cards.map(c => c.answer);
        return {
          ...state,
          currentScreen: 'round2',
          round2Cards: createInitialCards(2, round1Answers),
          round2Complete: false,
          currentPlayer: 1,
          selectedCardIndex: null
        };
      }
    }

    case 'RESET_GAME':
      try {
        localStorage.removeItem(STORAGE_KEY);
        // Note: We intentionally keep PAYMENT_STORAGE_KEY and REMOTE_SESSION_STORAGE_KEY
        // so payment status and remote session persist even after resetting game progress.
      } catch {
        // Ignore storage errors
      }
      return {
        ...initialState,
        // Preserve remote session across resets
        remoteSessionId: state.remoteSessionId,
        remotePlayerId: state.remotePlayerId,
        isRemoteConnected: state.isRemoteConnected,
        remoteSessionPaid: state.remoteSessionPaid,
        hasPaid: state.hasPaid,
        partner1Name: state.partner1Name,
        partner2Name: state.partner2Name
      };

    case 'SELECT_MODE':
      return {
        ...state,
        gameMode: action.mode
      };

    case 'SET_REMOTE_SESSION':
      saveRemoteSession(action.sessionId, action.playerId);
      return {
        ...state,
        remoteSessionId: action.sessionId,
        remotePlayerId: action.playerId,
        isRemoteConnected: false,
        remoteSessionPaid: state.remoteSessionPaid && action.sessionId === state.remoteSessionId ? state.remoteSessionPaid : false
      };

    case 'SET_REMOTE_CONNECTION':
      return {
        ...state,
        isRemoteConnected: action.connected
      };

    case 'SET_REMOTE_SESSION_PAID':
      return {
        ...state,
        remoteSessionPaid: action.paid
      };

    case 'APPLY_REMOTE_STATE':
      return {
        ...state,
        ...action.state
      };

    case 'CANCEL_REMOTE_SESSION':
      saveRemoteSession(null, null);
      return {
        ...state,
        gameMode: 'local',
        remoteSessionId: null,
        remotePlayerId: null,
        isRemoteConnected: false,
        remoteSessionPaid: false,
        currentScreen: 'landing'
      };

    case 'ACCEPT_REMOTE_INVITE':
      // Player 2 explicitly accepts - this will trigger presence send
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'store.tsx:384',message:'ACCEPT_REMOTE_INVITE action handler',data:{oldScreen:state.currentScreen,newScreen:'remoteSetup',remotePlayerId:state.remotePlayerId,remoteSessionId:state.remoteSessionId,isRemoteConnected:state.isRemoteConnected},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      return {
        ...state,
        currentScreen: 'remoteSetup' // Temporary, will navigate to round1 after sync
      };

    case 'DECLINE_REMOTE_INVITE':
      // Player 2 declines - cancel session and notify Player 1
      saveRemoteSession(null, null);
      return {
        ...state,
        gameMode: 'local',
        remoteSessionId: null,
        remotePlayerId: null,
        isRemoteConnected: false,
        remoteSessionPaid: false,
        currentScreen: 'landing'
      };

    default:
      return state;
  }
}

// Helper functions for computing results
export function getMatchCount(cards: Card[]): number {
  return cards.filter(c => c.answer.matched === true).length;
}

export function getThemeSummaries(cards: Card[]): ThemeSummary[] {
  const themes: Theme[] = ['conflict', 'support', 'dailyLife', 'intimacy', 'future', 'growth'];
  
  return themes.map(theme => {
    const themeCards = cards.filter(c => c.answer.theme === theme);
    // Only count cards that have been fully answered (matched !== null)
    const answeredCards = themeCards.filter(c => c.answer.matched !== null);
    const matches = answeredCards.filter(c => c.answer.matched === true).length;
    const total = answeredCards.length; // Only count answered cards
    
    return {
      theme,
      displayName: themeDisplayNames[theme],
      total,
      matches,
      matchPercentage: total > 0 ? Math.round((matches / total) * 100) : 0
    };
  }).filter(s => s.total > 0);
}

export function getScoreTier(matches: number, total: number): { tier: string; description: string } {
  const percentage = (matches / total) * 100;
  
  if (total === 15) {
    if (matches >= 13) return { tier: 'Exceptional Sync', description: 'You two are incredibly aligned!' };
    if (matches >= 10) return { tier: 'Solid Connection', description: 'A strong foundation to build on.' };
    if (matches >= 7) return { tier: 'Room to Grow', description: 'Some great alignment with areas to explore.' };
    if (matches >= 4) return { tier: 'Different Wavelengths', description: 'Interesting differences worth discussing.' };
    return { tier: 'Time to Talk', description: 'Lots of opportunities for deeper understanding.' };
  }
  
  // For combined scores (30 total)
  if (percentage >= 87) return { tier: 'Exceptional Sync', description: 'You two are incredibly aligned!' };
  if (percentage >= 67) return { tier: 'Solid Connection', description: 'A strong foundation to build on.' };
  if (percentage >= 47) return { tier: 'Room to Grow', description: 'Some great alignment with areas to explore.' };
  if (percentage >= 27) return { tier: 'Different Wavelengths', description: 'Interesting differences worth discussing.' };
  return { tier: 'Time to Talk', description: 'Lots of opportunities for deeper understanding.' };
}

export function getMismatchedCards(cards: Card[]): Card[] {
  return cards.filter(c => c.answer.matched === false);
}

export function getQuestionForCard(card: Card) {
  return getQuestionById(card.questionId);
}

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Helper to load state from localStorage
function loadPersistedState(): Partial<GameState> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Also check for payment status in separate storage (persists across new sessions)
      try {
        const paymentStatus = localStorage.getItem(PAYMENT_STORAGE_KEY);
        if (paymentStatus === 'true') {
          parsed.hasPaid = true;
        }
      } catch {
        // Ignore payment storage errors
      }
      
      // Also check for partner names in separate storage (persists across new sessions)
      try {
        const namesStored = localStorage.getItem(NAMES_STORAGE_KEY);
        if (namesStored) {
          const names = JSON.parse(namesStored);
          if (names.partner1Name) parsed.partner1Name = names.partner1Name;
          if (names.partner2Name) parsed.partner2Name = names.partner2Name;
        }
      } catch {
        // Ignore names storage errors
      }
      
      return parsed;
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

// Helper to save state to localStorage
function persistState(state: GameState) {
  try {
    // Only persist if game has started
    if (state.sessionId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        sessionId: state.sessionId,
        partner1Name: state.partner1Name,
        partner2Name: state.partner2Name,
        currentPlayer: state.currentPlayer,
        currentScreen: state.currentScreen,
        round1Cards: state.round1Cards,
        round2Cards: state.round2Cards,
        round1Complete: state.round1Complete,
        round2Complete: state.round2Complete,
        hasPaid: state.hasPaid,
        selectedCardIndex: state.selectedCardIndex,

        gameMode: state.gameMode,
        remoteSessionId: state.remoteSessionId,
        remotePlayerId: state.remotePlayerId,
        isRemoteConnected: state.isRemoteConnected,
        remoteSessionPaid: state.remoteSessionPaid
      }));
    }
  } catch {
    // Ignore storage errors
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, rawDispatch] = useReducer(gameReducer, initialState, (initial) => {
    // Load persisted state on initialization
    const persisted = loadPersistedState();
    
    // If no session but payment or names exist, restore them
    if (!persisted || !persisted.sessionId) {
      let restored = { ...initial };
      
      try {
        const paymentStatus = localStorage.getItem(PAYMENT_STORAGE_KEY);
        if (paymentStatus === 'true') {
          restored.hasPaid = true;
        }
      } catch {
        // Ignore payment storage errors
      }
      
      // Always try to restore names from separate storage
      try {
        const namesStored = localStorage.getItem(NAMES_STORAGE_KEY);
        if (namesStored) {
          const names = JSON.parse(namesStored);
          if (names.partner1Name) restored.partner1Name = names.partner1Name;
          if (names.partner2Name) restored.partner2Name = names.partner2Name;
        }
      } catch {
        // Ignore names storage errors
      }
      
      return restored as GameState;
    }
    
    return { ...initial, ...persisted } as GameState;
  });

  const stateRef = useRef<GameState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const syncRef = useRef<SupabaseSync | null>(null);
  const suppressBroadcastRef = useRef(false);
  const pendingHostSnapshotRef = useRef(false);

  const internalDispatch = (action: GameAction) => {
    suppressBroadcastRef.current = true;
    rawDispatch(action);
    suppressBroadcastRef.current = false;
  };

  const getShareableState = (s: GameState): Partial<GameState> => ({
    sessionId: s.sessionId,
    partner1Name: s.partner1Name,
    partner2Name: s.partner2Name,
    currentPlayer: s.currentPlayer,
    currentScreen: s.currentScreen,
    round1Cards: s.round1Cards,
    round2Cards: s.round2Cards,
    round1Complete: s.round1Complete,
    round2Complete: s.round2Complete,
    selectedCardIndex: s.selectedCardIndex,
    gameMode: 'remote',
    remoteSessionPaid: true
    // Intentionally do NOT include hasPaid or remotePlayerId (local-only)
  });

  const shouldBroadcast = (action: GameAction): boolean => {
    switch (action.type) {
      case 'SELECT_CARD':
      case 'ANSWER_QUESTION':
      case 'COMPLETE_ROUND':
        // Removed NAVIGATE_TO - navigation should be local only
        // Removed APPLY_REMOTE_STATE - this is sent explicitly via sendAction, not broadcast
        return true;
      default:
        return false;
    }
  };

  const dispatch: React.Dispatch<GameAction> = (action) => {
    // Handle CANCEL_REMOTE_SESSION: broadcast cancellation before clearing state
    if (action.type === 'CANCEL_REMOTE_SESSION') {
      const current = stateRef.current;
      if (current.gameMode === 'remote' && current.remotePlayerId === 1 && current.remoteSessionId) {
        // Broadcast cancellation to Player 2 before clearing state
        void syncRef.current?.sendSessionCancelled();
      }
    }

    // Handle DECLINE_REMOTE_INVITE: Player 2 declines, broadcast to Player 1
    if (action.type === 'DECLINE_REMOTE_INVITE') {
      const current = stateRef.current;
      if (current.gameMode === 'remote' && current.remotePlayerId === 2 && current.remoteSessionId) {
        // Broadcast decline to Player 1 before clearing state
        void syncRef.current?.sendSessionCancelled();
      }
    }

    // Some actions generate new UUIDs (cards). In remote mode we rely on the host
    // to send a full snapshot after these actions so both devices stay identical.
    if (
      !suppressBroadcastRef.current &&
      stateRef.current.gameMode === 'remote' &&
      stateRef.current.remotePlayerId === 1 &&
      stateRef.current.remoteSessionId &&
      (action.type === 'START_ROUND_2')
    ) {
      pendingHostSnapshotRef.current = true;
    }

    rawDispatch(action);

    const s = stateRef.current;
    if (
      suppressBroadcastRef.current ||
      s.gameMode !== 'remote' ||
      !s.remoteSessionId ||
      !shouldBroadcast(action)
    ) {
      return;
    }

    // Broadcast action to the other player
    void syncRef.current?.sendAction(action);
  };

  // Connect/disconnect Supabase broadcast channel for remote sessions
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'store.tsx:666',message:'Supabase connection effect executing',data:{gameMode:state.gameMode,remoteSessionId:state.remoteSessionId,remotePlayerId:state.remotePlayerId,currentScreen:state.currentScreen},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    const sessionId = state.remoteSessionId;
    if (state.gameMode !== 'remote' || !sessionId) {
      internalDispatch({ type: 'SET_REMOTE_CONNECTION', connected: false });
      void syncRef.current?.disconnect();
      return;
    }

    if (!syncRef.current) syncRef.current = new SupabaseSync();

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'store.tsx:679',message:'Connecting to Supabase',data:{sessionId:sessionId},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion

    void syncRef.current.connect({
      sessionId,
      onStatus: (status) => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'store.tsx:687',message:'Supabase status changed',data:{status:status},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
        // #endregion
        internalDispatch({ type: 'SET_REMOTE_CONNECTION', connected: status === 'connected' });
      },
      onMessage: (msg) => {
        if (msg.type === 'action') {
          const action = msg.payload as GameAction;
          
          // If Player 2 receives APPLY_REMOTE_STATE with game started, navigate to Round 1
          if (action.type === 'APPLY_REMOTE_STATE' && stateRef.current.remotePlayerId === 2) {
            const state = action.state as Partial<GameState>;
            if (state.round1Cards && state.round1Cards.length > 0 && state.currentScreen === 'round1') {
              // Game has started, navigate Player 2 to Round 1
              suppressBroadcastRef.current = true;
              try {
                rawDispatch(action);
                internalDispatch({ type: 'NAVIGATE_TO', screen: 'round1' });
              } finally {
                suppressBroadcastRef.current = false;
              }
              return;
            }
          }
          
          // Apply actions from the other player without re-broadcasting
          suppressBroadcastRef.current = true;
          try {
            rawDispatch(action);
          } finally {
            suppressBroadcastRef.current = false;
          }
          return;
        }

        if (msg.type === 'session_paid') {
          internalDispatch({ type: 'SET_REMOTE_SESSION_PAID', paid: true });
          return;
        }

        if (msg.type === 'session_cancelled') {
          // Player 2 receives cancellation notification
          const current = stateRef.current;
          if (current.remotePlayerId === 2) {
            internalDispatch({ type: 'CANCEL_REMOTE_SESSION' });
            internalDispatch({ type: 'NAVIGATE_TO', screen: 'sessionCancelled' });
          }
          return;
        }

        if (msg.type === 'presence') {
          // If I'm host and player2 joins, start the game and sync snapshot.
          const current = stateRef.current;
          if (current.remotePlayerId === 1 && msg.payload.player === 2) {
            internalDispatch({ type: 'SET_REMOTE_SESSION_PAID', paid: true });
            pendingHostSnapshotRef.current = true;
            // Start game - this will navigate both players to round1
            internalDispatch({ type: 'START_GAME', partner1Name: current.partner1Name, partner2Name: current.partner2Name });
            // Immediately navigate Player 1 to round1 (START_GAME already does this, but ensure it)
            internalDispatch({ type: 'NAVIGATE_TO', screen: 'round1' });
          }
        }
      }
    });

    // Announce presence - but ONLY if Player 2 has explicitly accepted AND connected
    const playerId = state.remotePlayerId;
    const shouldAnnouncePresence = (playerId === 1 || 
      (playerId === 2 && state.currentScreen !== 'inviteAcceptance')) &&
      state.isRemoteConnected; // CRITICAL: Only send when connected

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'store.tsx:743',message:'Presence effect executing',data:{playerId:playerId,currentScreen:state.currentScreen,shouldAnnouncePresence:shouldAnnouncePresence,isRemoteConnected:state.isRemoteConnected,hasSyncRef:!!syncRef.current,remoteSessionId:state.remoteSessionId},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1,H3,H4'})}).catch(()=>{});
    // #endregion

    if (playerId && shouldAnnouncePresence && syncRef.current) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/70a608db-0513-429e-8b7a-f975f3d1a514',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'store.tsx:748',message:'Sending presence',data:{playerId:playerId},timestamp:Date.now(),sessionId:'debug-session',runId:'accept-flow',hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
      void syncRef.current.sendPresence(playerId);
    }
  }, [state.gameMode, state.remoteSessionId, state.remotePlayerId, state.currentScreen, state.isRemoteConnected]);

  // After host starts/restarts/starts round2, send a snapshot so both devices have identical card ids.
  useEffect(() => {
    const s = state;
    if (
      s.gameMode !== 'remote' ||
      s.remotePlayerId !== 1 ||
      !s.remoteSessionId ||
      !s.isRemoteConnected ||
      !pendingHostSnapshotRef.current
    ) {
      return;
    }

    pendingHostSnapshotRef.current = false;
    void syncRef.current?.sendSessionPaid();
    void syncRef.current?.sendAction({ type: 'APPLY_REMOTE_STATE', state: getShareableState(s) });
  }, [state]);

  // Persist state on every change
  useEffect(() => {
    persistState(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

