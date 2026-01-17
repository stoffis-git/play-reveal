export type Theme = 'conflict' | 'support' | 'dailyLife' | 'intimacy' | 'future' | 'growth';

export interface Question {
  id: string;
  theme: Theme;
  text: string;
  optionA: string;
  optionB: string;
  round: 1 | 2;
  example?: string; // Contextual example/situation for the question
}

// Tiny theme labels for card grid (1-2 words)
export const themeTinyLabels: Record<Theme, string> = {
  conflict: 'Conflict',
  support: 'Support',
  dailyLife: 'Daily',
  intimacy: 'Intimacy',
  future: 'Future',
  growth: 'Growth'
};

export interface Answer {
  questionId: string;
  theme: Theme;
  partner1Answer: 'A' | 'B' | null;
  partner2Answer: 'A' | 'B' | null;
  matched: boolean | null;
}

export type CardState = 'faceDown' | 'partner1Only' | 'partner2Only' | 'revealed';

export interface Card {
  id: string;
  questionId: string;
  state: CardState;
  answer: Answer;
}

export type GameScreen = 
  | 'landing'
  | 'round1'
  | 'round1Results'
  | 'paywall'
  | 'paymentSuccess'
  | 'round2'
  | 'finalResults'
  | 'share';

export interface GameState {
  sessionId: string;
  partner1Name: string;
  partner2Name: string;
  currentPlayer: 1 | 2;
  currentScreen: GameScreen;
  round1Cards: Card[];
  round2Cards: Card[];
  round1Complete: boolean;
  round2Complete: boolean;
  hasPaid: boolean;
  selectedCardIndex: number | null;
}

export interface ThemeSummary {
  theme: Theme;
  displayName: string;
  total: number;
  matches: number;
  matchPercentage: number;
}

export const themeDisplayNames: Record<Theme, string> = {
  conflict: 'Conflict & Communication',
  support: 'Emotional Support',
  dailyLife: 'Daily Life & Logistics',
  intimacy: 'Physical Intimacy',
  future: 'Future & Life Goals',
  growth: 'Personal Growth'
};

// Warm, happy theme colors - playful and inviting
export const themeColors: Record<Theme, string> = {
  conflict: '#FF8A6C',   /* Warm coral - matches partner1 */
  support: '#B284E0',    /* Soft lavender - matches partner2 */
  dailyLife: '#5ECFB1',  /* Happy teal */
  intimacy: '#FF7EB3',   /* Soft pink */
  future: '#7CB8FF',     /* Sky blue */
  growth: '#98D89C'      /* Fresh mint */
};

