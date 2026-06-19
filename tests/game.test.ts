import { describe, it, expect } from 'vitest';
import { getVisibleGrid } from '../src/reels.ts';
import { evaluateWins, formatWins } from '../src/paylines.ts';

describe('getVisibleGrid', () => {
  it('matches the spec example at positions [0,0,0,0,0]', () => {
    const grid = getVisibleGrid([0, 0, 0, 0, 0]);
    expect(grid[0]).toEqual(['hv2', 'hv1', 'lv1', 'hv2', 'lv3']);
    expect(grid[1]).toEqual(['lv3', 'lv2', 'hv2', 'lv2', 'lv4']);
    expect(grid[2]).toEqual(['lv3', 'lv3', 'lv3', 'hv3', 'hv2']);
  });

  it('wraps around the reel band correctly', () => {
    // Band 1 has 20 symbols — position 19 + row offset wraps to index 0
    const grid = getVisibleGrid([19, 0, 0, 0, 0]);
    expect(grid[0][0]).toBe('hv2'); // band1[19]
    expect(grid[1][0]).toBe('hv2'); // band1[(19+1)%20] = band1[0]
  });
});

describe('evaluateWins', () => {
  it('detects multiple winning paylines and totals correctly', () => {
    // positions [0,11,1,10,14] - payline 2 (hv2 x3) + payline 5 (lv3 x3) = 6
    const grid = getVisibleGrid([0, 11, 1, 10, 14]);
    const wins = evaluateWins(grid);

    expect(wins).toHaveLength(2);
    expect(wins.find(w => w.paylineIndex === 2)).toMatchObject({ symbolId: 'hv2', count: 3, payout: 5 });
    expect(wins.find(w => w.paylineIndex === 5)).toMatchObject({ symbolId: 'lv3', count: 3, payout: 1 });
  });

  it('returns no wins when nothing matches from column 0', () => {
    const grid = getVisibleGrid([18, 9, 2, 0, 12]);
    expect(evaluateWins(grid)).toHaveLength(0);
  });
});

describe('formatWins', () => {
  it('formats total and per-line details', () => {
    const wins = [
      { paylineIndex: 2, symbolId: 'hv2' as const, count: 3, payout: 5 },
      { paylineIndex: 5, symbolId: 'lv3' as const, count: 3, payout: 1 },
    ];
    const result = formatWins(wins);
    expect(result).toContain('Total wins: 6');
    expect(result).toContain('1.Payline 2, hv2 x3, 5');
  });

  it('shows "Total wins: 0" for empty wins', () => {
    expect(formatWins([])).toBe('Total wins: 0');
  });
});
