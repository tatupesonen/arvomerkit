export interface CardState {
  easeFactor: number;   // default 2.5
  interval: number;     // days until next review
  repetitions: number;  // consecutive correct answers
  nextReview: string;   // YYYY-MM-DD
}

export type SRData = Record<string, CardState>;

const STORAGE_KEY = 'arvomerkit_sr_data';

export function getCardKey(rankName: string, branch: string): string {
  return `${rankName}_${branch}`;
}

export function loadSRData(): SRData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveSRData(data: SRData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors (e.g. private browsing quota)
  }
}

// SM-2 algorithm (simplified to binary correct/wrong)
export function updateCardState(state: CardState | undefined, correct: boolean): CardState {
  const prev = state ?? {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString().split('T')[0],
  };

  let { easeFactor, interval, repetitions } = prev;

  if (!correct) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    // quality=4 (good) for a correct binary response
    const quality = 4;
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);
    repetitions++;
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview: nextReview.toISOString().split('T')[0],
  };
}

export function isDue(state: CardState | undefined): boolean {
  if (!state) return true; // new card, always show
  const today = new Date().toISOString().split('T')[0];
  return state.nextReview <= today;
}
