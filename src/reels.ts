import { REELS, NUM_COLS, NUM_ROWS, type SymbolId } from './constants.ts';

export type Grid = SymbolId[][];

// return a symbol on asked position
export function getSymbol(col: number, position: number, row: number): SymbolId {
  const band = REELS[col];
  return band[(position + row) % band.length];
}

// return a 2d array grid
export function getVisibleGrid(positions: number[]): Grid {
  const grid: Grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < NUM_COLS; col++) {
      grid[row][col] = getSymbol(col, positions[col], row);
    }
  }
  return grid;
}

// return 5 random position, based on which we extract our grid
export function randomPositions(): number[] {
  return REELS.map(band => Math.floor(Math.random() * band.length));
}
