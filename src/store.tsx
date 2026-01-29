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
  | { type: 'SELECT_ANSWER'; answer: 'A' | 'B'; cardIndex: number }
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
  | { type: 'CONFIRM_REVEAL'; playerId: 1 | 2 }
  | { type: 'CLEAR_REVEAL_CONFIRMATION' }
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
  selectedAnswer: null,
  revealConfirmedBy: null,

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
        selectedCardIndex: null,
        selectedAnswer: null
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
          selectedCardIndex: null,
          selectedAnswer: null,
          revealConfirmedBy: null
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
        selectedCardIndex: action.index,
        selectedAnswer: null,
        revealConfirmedBy: null
      };

    case 'SELECT_ANSWER':
      // Set selected answer for immediate highlight sync (before delay)
      return {
        ...state,
        selectedAnswer: action.answer
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
          selectedCardIndex: null,
          selectedAnswer: null,
          revealConfirmedBy: card.state === 'revealed' ? { partner1: false, partner2: false } : state.revealConfirmedBy
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
          selectedCardIndex: null,
          selectedAnswer: null,
          revealConfirmedBy: card.state === 'revealed' ? { partner1: false, partner2: false } : state.revealConfirmedBy
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
      console.log('[Remote Session] NAVIGATE_TO action', {
        from: state.currentScreen,
        to: action.screen,
        remotePlayerId: state.remotePlayerId,
        remoteSessionId: state.remoteSessionId
      });
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
        selectedCardIndex: null,
        selectedAnswer: null
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
          selectedCardIndex: null,
          selectedAnswer: null
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
          selectedCardIndex: null,
          selectedAnswer: null
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
      console.log('[Remote Session] ACCEPT_REMOTE_INVITE', {
        oldScreen: state.currentScreen,
        newScreen: 'remoteSetup',
        remotePlayerId: state.remotePlayerId,
        remoteSessionId: state.remoteSessionId,
        isRemoteConnected: state.isRemoteConnected
      });
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

    case 'CONFIRM_REVEAL': {
      // Mark the specified player as confirmed (playerId comes from the action)
      const currentConfirmed = state.revealConfirmedBy || { partner1: false, partner2: false };
      return {
        ...state,
        revealConfirmedBy: {
          ...currentConfirmed,
          [action.playerId === 1 ? 'partner1' : 'partner2']: true
        }
      };
    }

    case 'CLEAR_REVEAL_CONFIRMATION':
      return {
        ...state,
        revealConfirmedBy: null
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

export function isActivePlayer(state: GameState): boolean {
  if (state.gameMode !== 'remote' || !state.remotePlayerId) return true;
  return state.currentPlayer === state.remotePlayerId;
}

export function isSpectatorMode(state: GameState): boolean {
  if (state.gameMode !== 'remote' || !state.remotePlayerId) return false;
  return state.currentPlayer !== state.remotePlayerId;
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
        selectedAnswer: state.selectedAnswer,
        revealConfirmedBy: state.revealConfirmedBy,

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
  const isConnectedRef = useRef(false); // Track actual connection status

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
    selectedAnswer: s.selectedAnswer,
    revealConfirmedBy: s.revealConfirmedBy,
    gameMode: 'remote',
    remoteSessionPaid: true
    // Intentionally do NOT include hasPaid or remotePlayerId (local-only)
  });

  const shouldBroadcast = (action: GameAction): boolean => {
    switch (action.type) {
      case 'SELECT_CARD':
      case 'SELECT_ANSWER':
      case 'ANSWER_QUESTION':
      case 'CONFIRM_REVEAL':
      case 'COMPLETE_ROUND':
      case 'START_ROUND_2':
        // CLEAR_REVEAL_CONFIRMATION is local-only (each player clears after proceeding)
        // NAVIGATE_TO is local-only (navigation should be handled locally)
        // APPLY_REMOTE_STATE is sent explicitly via sendAction, not broadcast
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

    // Handle ACCEPT_REMOTE_INVITE: Player 2 accepts, send presence immediately if connected
    if (action.type === 'ACCEPT_REMOTE_INVITE') {
      const current = stateRef.current;
      if (current.gameMode === 'remote' && current.remotePlayerId === 2 && current.remoteSessionId) {
        // Use ref to check actual connection status (state might not be updated yet)
        if (isConnectedRef.current && syncRef.current) {
          console.log('[Remote Session] Manually sending presence after accept', { playerId: 2 });
          void syncRef.current.sendPresence(2);
          
          // Fallback: If Player 2 doesn't receive game state within 3 seconds, 
          // check if game has already started and navigate directly
          setTimeout(() => {
            const checkState = stateRef.current;
            if (checkState.remotePlayerId === 2 && checkState.round1Cards.length > 0 && checkState.currentScreen !== 'round1') {
              console.log('[Remote Session] Fallback: Player 2 has game state but not on round1, navigating now');
              internalDispatch({ type: 'NAVIGATE_TO', screen: 'round1' });
            }
          }, 3000);
        } else {
          console.log('[Remote Session] Cannot send presence yet - not connected', { 
            isConnected: isConnectedRef.current,
            hasSync: !!syncRef.current
          });
        }
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
    console.log('[Remote Session] Connection effect executing', {
      gameMode: state.gameMode,
      remoteSessionId: state.remoteSessionId,
      remotePlayerId: state.remotePlayerId,
      currentScreen: state.currentScreen
    });
    const sessionId = state.remoteSessionId;
    if (state.gameMode !== 'remote' || !sessionId) {
      isConnectedRef.current = false;
      internalDispatch({ type: 'SET_REMOTE_CONNECTION', connected: false });
      void syncRef.current?.disconnect();
      return;
    }

    // Prevent re-connecting if already connected to the same session
    if (syncRef.current && state.isRemoteConnected && stateRef.current.remoteSessionId === sessionId) {
      console.log('[Remote Session] Already connected to session', { sessionId });
      return;
    }

    if (!syncRef.current) syncRef.current = new SupabaseSync();

    console.log('[Remote Session] Connecting to Supabase', { sessionId });

    void syncRef.current.connect({
      sessionId,
      onStatus: (status) => {
        console.log('[Remote Session] Supabase status changed', { status });
        const isConnected = status === 'connected';
        isConnectedRef.current = isConnected;
        internalDispatch({ type: 'SET_REMOTE_CONNECTION', connected: isConnected });
      },
      onMessage: (msg) => {
        console.log('[Remote Session] Received message', { 
          type: msg.type, 
          playerId: stateRef.current.remotePlayerId,
          currentScreen: stateRef.current.currentScreen
        });
        
        if (msg.type === 'action') {
          const action = msg.payload as GameAction;
          console.log('[Remote Session] Received action', { 
            actionType: action.type,
            playerId: stateRef.current.remotePlayerId
          });
          
          // If Player 2 receives APPLY_REMOTE_STATE with game started, navigate to Round 1
          if (action.type === 'APPLY_REMOTE_STATE' && stateRef.current.remotePlayerId === 2) {
            const remoteState = action.state as Partial<GameState>;
            console.log('[Remote Session] Player 2 processing APPLY_REMOTE_STATE', {
              hasRound1Cards: !!(remoteState.round1Cards && remoteState.round1Cards.length > 0),
              round1CardsCount: remoteState.round1Cards?.length || 0,
              currentScreen: stateRef.current.currentScreen,
              remoteStateScreen: remoteState.currentScreen
            });
            
            if (remoteState.round1Cards && remoteState.round1Cards.length > 0) {
              // Game has started, navigate Player 2 to Round 1 immediately
              console.log('[Remote Session] Player 2 received game state, navigating to Round 1', {
                round1CardsCount: remoteState.round1Cards.length,
                currentScreen: stateRef.current.currentScreen
              });
              suppressBroadcastRef.current = true;
              try {
                rawDispatch(action);
                console.log('[Remote Session] Dispatched APPLY_REMOTE_STATE, now navigating to round1');
                internalDispatch({ type: 'NAVIGATE_TO', screen: 'round1' });
                console.log('[Remote Session] Navigation to round1 dispatched');
              } finally {
                suppressBroadcastRef.current = false;
              }
              return;
            } else {
              console.log('[Remote Session] APPLY_REMOTE_STATE received but no round1Cards, skipping navigation');
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
          console.log('[Remote Session] Received presence message', {
            myPlayerId: current.remotePlayerId,
            presencePlayer: msg.payload.player,
            willStartGame: current.remotePlayerId === 1 && msg.payload.player === 2
          });
          
          if (current.remotePlayerId === 1 && msg.payload.player === 2) {
            console.log('[Remote Session] Player 1: Player 2 joined, starting game');
            internalDispatch({ type: 'SET_REMOTE_SESSION_PAID', paid: true });
            pendingHostSnapshotRef.current = true;
            // Start game - this will navigate both players to round1
            internalDispatch({ type: 'START_GAME', partner1Name: current.partner1Name, partner2Name: current.partner2Name });
            // Immediately navigate Player 1 to round1 (START_GAME already does this, but ensure it)
            internalDispatch({ type: 'NAVIGATE_TO', screen: 'round1' });
            console.log('[Remote Session] Player 1: Game started, snapshot will be sent');
          }
        }
      }
    });
  }, [state.gameMode, state.remoteSessionId, state.remotePlayerId]); // Removed isRemoteConnected and currentScreen to prevent loops

  // Separate effect for sending presence - only runs when connection status or screen changes
  useEffect(() => {
    // Announce presence - but ONLY if Player 2 has explicitly accepted AND connected
    const playerId = state.remotePlayerId;
    const shouldAnnouncePresence = (playerId === 1 || 
      (playerId === 2 && state.currentScreen !== 'inviteAcceptance')) &&
      state.isRemoteConnected; // CRITICAL: Only send when connected

    console.log('[Remote Session] Presence effect executing', {
      playerId,
      currentScreen: state.currentScreen,
      shouldAnnouncePresence,
      isRemoteConnected: state.isRemoteConnected,
      hasSyncRef: !!syncRef.current,
      remoteSessionId: state.remoteSessionId
    });

    if (playerId && shouldAnnouncePresence && syncRef.current) {
      console.log('[Remote Session] Sending presence', { playerId });
      void syncRef.current.sendPresence(playerId);
    }
  }, [state.remotePlayerId, state.currentScreen, state.isRemoteConnected]); // Separate effect for presence

  // After host starts/restarts/starts round2, send a snapshot so both devices have identical card ids.
  useEffect(() => {
    const s = state;
    
    // Early return for Player 2 - this effect is only for Player 1 (host)
    if (s.remotePlayerId !== 1) {
      return;
    }
    
    console.log('[Remote Session] Snapshot effect checking (Player 1 only)', {
      gameMode: s.gameMode,
      hasSessionId: !!s.remoteSessionId,
      isRemoteConnected: s.isRemoteConnected,
      isConnectedRef: isConnectedRef.current,
      pendingSnapshot: pendingHostSnapshotRef.current,
      hasRound1Cards: s.round1Cards.length > 0
    });
    
    if (
      s.gameMode !== 'remote' ||
      !s.remoteSessionId ||
      !isConnectedRef.current || // Use ref instead of state for connection check
      !pendingHostSnapshotRef.current
    ) {
      console.log('[Remote Session] Snapshot effect conditions not met, skipping');
      return;
    }

    console.log('[Remote Session] Sending snapshot to Player 2', {
      round1CardsCount: s.round1Cards.length,
      currentScreen: s.currentScreen
    });
    pendingHostSnapshotRef.current = false;
    void syncRef.current?.sendSessionPaid();
    void syncRef.current?.sendAction({ type: 'APPLY_REMOTE_STATE', state: getShareableState(s) });
    console.log('[Remote Session] Snapshot sent');
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

