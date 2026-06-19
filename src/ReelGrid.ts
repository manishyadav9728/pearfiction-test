import { Container } from 'pixi.js';
import { NUM_COLS, NUM_ROWS, SYMBOL_SIZE, REEL_GAP } from './constants.ts';
import { ReelSymbol } from './ReelSymbol.ts';
import { getVisibleGrid } from './reels.ts';

export const GRID_WIDTH = NUM_COLS * SYMBOL_SIZE + (NUM_COLS - 1) * REEL_GAP;
export const GRID_HEIGHT = NUM_ROWS * SYMBOL_SIZE + (NUM_ROWS - 1) * REEL_GAP;

// this container class is holding all symbols 
export class ReelGrid extends Container {
  private symbols: ReelSymbol[][] = [];

  constructor(initialPositions: number[]) {
    super();

    const grid = getVisibleGrid(initialPositions);

    for (let row = 0; row < NUM_ROWS; row++) {
      this.symbols[row] = [];
      for (let col = 0; col < NUM_COLS; col++) {
        const symbol = new ReelSymbol(grid[row][col], col, row, REEL_GAP);
        this.addChild(symbol);
        this.symbols[row][col] = symbol;
      }
    }
  }

  // based on new result we set new symbols
  public setPositions(positions: number[]): void {
    const grid = getVisibleGrid(positions);
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        this.symbols[row][col].setSymbol(grid[row][col]);
      }
    }
  }
}
