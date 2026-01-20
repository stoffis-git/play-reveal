import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { GameState, Card, Answer, GameScreen, Theme, ThemeSummary } from './types';
import { themeDisplayNames } from './types';
import { round1Questions, getQuestionById } from './questions';
import { selectRound2Questions } from './algorithm';

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

type GameAction =
  | { type: 'START_GAME'; partner1Name: string; partner2Name: string }
  | { type: 'CONTINUE_GAME' }
  | { type: 'SELECT_CARD'; index: number }
  | { type: 'ANSWER_QUESTION'; answer: 'A' | 'B' }
  | { type: 'NAVIGATE_TO'; screen: GameScreen }
  | { type: 'COMPLETE_PAYMENT' }
  | { type: 'START_ROUND_2' }
  | { type: 'COMPLETE_ROUND'; round: 1 | 2 }
  | { type: 'REPLAY_ROUND'; round: 1 | 2 }
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
  selectedCardIndex: null
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
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
        return { ...state, currentScreen: state.hasPaid ? 'round2' : 'round1Results' };
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
        // Note: We intentionally keep PAYMENT_STORAGE_KEY so payment status persists
        // even after resetting game progress. Users would need to clear browser data
        // or use a different device/browser to lose payment status.
      } catch {
        // Ignore storage errors
      }
      return initialState;

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
    const matches = themeCards.filter(c => c.answer.matched === true).length;
    const total = themeCards.length;
    
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
        selectedCardIndex: state.selectedCardIndex
      }));
    }
  } catch {
    // Ignore storage errors
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
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

