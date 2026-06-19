import { Sprite, Texture } from 'pixi.js';
import { SYMBOL_SIZE, type SymbolId } from './constants.ts';

// We create a symbol here with provided dimensions
export class ReelSymbol extends Sprite {
  constructor(symbolId: SymbolId, col: number, row: number, gap: number) {
    super();

    this.texture = Texture.from(symbolId);
    this.width = SYMBOL_SIZE;
    this.height = SYMBOL_SIZE;
    this.x = col * (SYMBOL_SIZE + gap);
    this.y = row * (SYMBOL_SIZE + gap);
  }

  // Here we Swap the displayed symbol without recreating the sprite on each new response
  public setSymbol(symbolId: SymbolId): void {
    this.texture = Texture.from(symbolId);
  }
}
