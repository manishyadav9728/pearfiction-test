import { Sprite } from 'pixi.js';
import { SPIN_BTN_SIZE } from './constants.ts';
// Here we create spin button and bind events to it

export function createSpinButton(onSpin: () => void): Sprite {
  const button = Sprite.from('spin_button');

  button.width = SPIN_BTN_SIZE;
  button.height = SPIN_BTN_SIZE;
  button.anchor.set(0.5);
  button.eventMode = 'static';
  button.cursor = 'pointer';

  button.on('pointerdown', onSpin);

  return button;
}
