import type { Theme, Answer, Question } from './types';
import { round2QuestionsByTheme } from './questions';

// Adjacent theme mappings for the personalization algorithm
const adjacentThemes: Record<Theme, [Theme, Theme]> = {
  conflict: ['support', 'growth'],
  support: ['conflict', 'intimacy'],
  dailyLife: ['future', 'growth'],
  intimacy: ['support', 'conflict'],
  future: ['dailyLife', 'growth'],
  growth: ['conflict', 'future']
};

interface ThemeMismatchCount {
  conflict: number;
  support: number;
  dailyLife: number;
  intimacy: number;
  future: number;
  growth: number;
}

function countMismatchesByTheme(answers: Answer[]): ThemeMismatchCount {
  const counts: ThemeMismatchCount = {
    conflict: 0,
    support: 0,
    dailyLife: 0,
    intimacy: 0,
    future: 0,
    growth: 0
  };

  for (const answer of answers) {
    if (answer.matched === false) {
      counts[answer.theme]++;
    }
  }

  return counts;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectRandomQuestions(theme: Theme, count: number): Question[] {
  const pool = round2QuestionsByTheme[theme];
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, count);
}

interface ThemeAllocation {
  conflict: number;
  support: number;
  dailyLife: number;
  intimacy: number;
  future: number;
  growth: number;
}

export function selectRound2Questions(round1Answers: Answer[]): Question[] {
  const mismatchCounts = countMismatchesByTheme(round1Answers);
  const themesWithMismatches = (Object.keys(mismatchCounts) as Theme[]).filter(
    theme => mismatchCounts[theme] > 0
  );
  const totalMismatches = Object.values(mismatchCounts).reduce((a, b) => a + b, 0);

  let allocation: ThemeAllocation;

  if (totalMismatches === 0) {
    // Perfect match - balanced distribution
    allocation = {
      conflict: 3,
      support: 3,
      dailyLife: 2,
      intimacy: 3,
      future: 2,
      growth: 2
    };
  } else if (themesWithMismatches.length === 1) {
    // All mismatches in one theme
    const primaryTheme = themesWithMismatches[0];
    const [adj1, adj2] = adjacentThemes[primaryTheme];
    const otherThemes = (Object.keys(mismatchCounts) as Theme[]).filter(
      t => t !== primaryTheme && t !== adj1 && t !== adj2
    );
    const randomOther = otherThemes[Math.floor(Math.random() * otherThemes.length)];

    allocation = {
      conflict: 0,
      support: 0,
      dailyLife: 0,
      intimacy: 0,
      future: 0,
      growth: 0
    };
    allocation[primaryTheme] = 7;
    allocation[adj1] = 3;
    allocation[adj2] = 3;
    allocation[randomOther] = 2;
  } else if (themesWithMismatches.length === 2) {
    // 2 themes have mismatches
    const [theme1, theme2] = themesWithMismatches;
    const adj1 = adjacentThemes[theme1];
    const adj2 = adjacentThemes[theme2];
    
    // Combine adjacent themes, excluding the primary themes
    const adjacentSet = new Set([...adj1, ...adj2].filter(t => t !== theme1 && t !== theme2));
    const adjacentArray = Array.from(adjacentSet);

    allocation = {
      conflict: 0,
      support: 0,
      dailyLife: 0,
      intimacy: 0,
      future: 0,
      growth: 0
    };
    allocation[theme1] = 5;
    allocation[theme2] = 5;

    // Distribute remaining 5 among adjacent themes
    let remaining = 5;
    for (let i = 0; remaining > 0 && i < adjacentArray.length; i++) {
      const toAdd = Math.min(remaining, Math.ceil(5 / adjacentArray.length));
      allocation[adjacentArray[i]] = toAdd;
      remaining -= toAdd;
    }
  } else if (themesWithMismatches.length >= 3 && themesWithMismatches.length <= 5) {
    // 3-5 themes have mismatches
    allocation = {
      conflict: 0,
      support: 0,
      dailyLife: 0,
      intimacy: 0,
      future: 0,
      growth: 0
    };

    // Allocate minimum 2 per theme with mismatches
    for (const theme of themesWithMismatches) {
      allocation[theme] = 2;
    }

    // Calculate remaining slots
    let remaining = 15 - themesWithMismatches.length * 2;

    // Distribute remaining proportionally by mismatch count
    const themeMismatchTotal = themesWithMismatches.reduce(
      (sum, theme) => sum + mismatchCounts[theme],
      0
    );

    for (const theme of themesWithMismatches) {
      if (remaining <= 0) break;
      const proportion = mismatchCounts[theme] / themeMismatchTotal;
      const extra = Math.round(proportion * remaining);
      allocation[theme] += extra;
    }

    // Adjust to ensure exactly 15
    let total = Object.values(allocation).reduce((a, b) => a + b, 0);
    while (total > 15) {
      // Remove from theme with highest allocation
      const maxTheme = (Object.keys(allocation) as Theme[]).reduce((a, b) =>
        allocation[a] > allocation[b] ? a : b
      );
      allocation[maxTheme]--;
      total--;
    }
    while (total < 15) {
      // Add to theme with highest mismatch that's below cap
      const validThemes = themesWithMismatches.filter(t => allocation[t] < 30);
      if (validThemes.length === 0) break;
      const maxMismatchTheme = validThemes.reduce((a, b) =>
        mismatchCounts[a] > mismatchCounts[b] ? a : b
      );
      allocation[maxMismatchTheme]++;
      total++;
    }
  } else {
    // All 6 themes have mismatches
    allocation = {
      conflict: 0,
      support: 0,
      dailyLife: 0,
      intimacy: 0,
      future: 0,
      growth: 0
    };

    // Distribute proportionally with minimum 2
    for (const theme of Object.keys(mismatchCounts) as Theme[]) {
      allocation[theme] = 2;
    }

    let remaining = 15 - 12; // 3 remaining after minimums

    // Add remaining proportionally
    while (remaining > 0) {
      const maxTheme = (Object.keys(mismatchCounts) as Theme[]).reduce((a, b) =>
        mismatchCounts[a] / (allocation[a] + 1) > mismatchCounts[b] / (allocation[b] + 1) ? a : b
      );
      allocation[maxTheme]++;
      remaining--;
    }
  }

  // Select questions based on allocation
  const selectedQuestions: Question[] = [];
  for (const theme of Object.keys(allocation) as Theme[]) {
    const count = allocation[theme];
    if (count > 0) {
      const questions = selectRandomQuestions(theme, count);
      selectedQuestions.push(...questions);
    }
  }

  // Shuffle final selection
  return shuffleArray(selectedQuestions);
}

