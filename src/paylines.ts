import { PAYLINES, PAYTABLE, NUM_COLS, type SymbolId } from './constants.ts';
import type { Grid } from './reels.ts';

export interface WinResult {
  paylineIndex: number;
  symbolId: SymbolId;
  count: number;
  payout: number;
}

// We are calculating wins according to provided paylines data
export function evaluateWins(grid: Grid): WinResult[] {
  const wins: WinResult[] = [];

  PAYLINES.forEach((payline, idx) => {
    const firstSymbol = grid[payline[0]][0];
    let count = 1;

    for (let col = 1; col < NUM_COLS; col++) {
      if (grid[payline[col]][col] === firstSymbol) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 3) {
      const payout = PAYTABLE[firstSymbol][count as 3 | 4 | 5];
      if (payout) {
        wins.push({ paylineIndex: idx + 1, symbolId: firstSymbol, count, payout });
      }
    }
  });

  return wins;
}

export function totalPayout(wins: WinResult[]): number {
  return wins.reduce((sum, w) => sum + w.payout, 0);
}

// formating the data that we need to show
export function formatWins(wins: WinResult[]): string {
  if (wins.length === 0) return 'Total wins: 0';

  const total = totalPayout(wins);
  const lines = [`Total wins: ${total}`];

  wins.forEach((w, index) => {
    lines.push(`${index + 1}.Payline ${w.paylineIndex}, ${w.symbolId} x${w.count}, ${w.payout}`);
  });

  return lines.join('\n');
}
