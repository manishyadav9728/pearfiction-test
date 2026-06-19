import { Application } from 'pixi.js';
import { runPreloader } from './preloader.ts';
import { GameScene } from './GameScene.ts';

// base class for initiliaze pixi js and wiring up everything
export class Game {
  private app = new Application();
  private scene: GameScene | null = null;

  // we call this function in main.ts, starting point of our game
  async start(): Promise<void> {
    await this.app.init({
      background: '#ffffff',
      antialias: true,
      resolution: 1,
      autoDensity: true,
    });

    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.app.canvas);

    // only for watching pixi objects in browser
    (globalThis as any).__PIXI_APP__ = this.app;

    // this is responsible for laoding assets and showing loader screen and progress
    await runPreloader(this.app);

    this.scene = new GameScene();
    this.app.stage.addChild(this.scene.container);
    this.scene.resize(window.innerWidth, window.innerHeight);

    // used for scaling and resizing
    this.observeResize();
  }

  private observeResize(): void {
    const ro = new ResizeObserver(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.app.renderer.resize(width, height);
      this.scene?.resize(width, height);
      this.app.renderer.render(this.app.stage);
    });

    ro.observe(document.documentElement);
  }
}
