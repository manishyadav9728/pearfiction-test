import { Container, Sprite, Text, TextStyle } from 'pixi.js';

import { SPIN_BTN_SIZE, PADDING } from './constants.ts';
import { ReelGrid, GRID_WIDTH, GRID_HEIGHT } from './ReelGrid.ts';
import { getVisibleGrid, randomPositions } from './reels.ts';
import { evaluateWins, formatWins } from './paylines.ts';
import { createSpinButton } from './SpinButton.ts';


const BTN_MARGIN = 32;
const WIN_MARGIN = 20;
const WIN_TEXT_H = 100;

const GAME_WIDTH = GRID_WIDTH;
const GAME_HEIGHT = GRID_HEIGHT + BTN_MARGIN + SPIN_BTN_SIZE + WIN_MARGIN + WIN_TEXT_H;

// class responsible for everything visible in the game
export class GameScene {
  readonly container: Container;

  private grid: ReelGrid;
  private spinBtn: Sprite;
  private winText: Text;

  private positions: number[] = [0, 0, 0, 0, 0];
  private spinning = false;

  constructor() {
    this.container = new Container();

    // we have 5x3 grid on the top
    this.grid = new ReelGrid(this.positions);
    this.grid.x = 0;
    this.grid.y = 0;
    this.container.addChild(this.grid);

    // spin button below grid
    this.spinBtn = createSpinButton(() => this.onSpin());
    this.spinBtn.x = GAME_WIDTH / 2;
    this.spinBtn.y = GRID_HEIGHT + BTN_MARGIN + SPIN_BTN_SIZE / 2;
    this.container.addChild(this.spinBtn);

    // win text added below spin button
    this.winText = new Text({
      text: 'Total wins: 0',
      style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#222222',
        align: 'center',
        lineHeight: 30,
      }),
    });
    this.winText.anchor.set(0.5, 0);
    this.winText.x = GAME_WIDTH / 2;
    this.winText.y = GRID_HEIGHT + BTN_MARGIN + SPIN_BTN_SIZE + WIN_MARGIN;
    this.container.addChild(this.winText);
  }

  // function responsible for everything
  private onSpin(): void {
    if (this.spinning) return;
    this.spinning = true;

    this.positions = randomPositions();
    this.grid.setPositions(this.positions);

    const visible = getVisibleGrid(this.positions);
    const wins = evaluateWins(visible);
    this.winText.text = formatWins(wins);
    this.spinning = false;
  }

  // everything related to view sits in this container so we scale this container based on window size
  resize(viewWidth: number, viewHeight: number): void {
    const scale = Math.min(
      viewWidth / (GAME_WIDTH + PADDING * 2),
      viewHeight / (GAME_HEIGHT + PADDING * 2),
    );

    this.container.scale.set(scale);
    this.container.x = (viewWidth - GAME_WIDTH * scale) / 2;
    this.container.y = (viewHeight - GAME_HEIGHT * scale) / 2;
  }
}
