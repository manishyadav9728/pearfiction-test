import { Assets, Container, Text, TextStyle, Graphics, type Application } from 'pixi.js';
import { ASSET_MANIFEST } from './constants.ts';

// preloader always visible for at least this long because we have very limited assets and progress reaches to 100 in few ms
const MIN_DISPLAY_TIME = 2000;

// here we show the asset loading progress before showing the actual game scene
export async function runPreloader(app: Application): Promise<void> {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const container = new Container();
  app.stage.addChild(container);

  container.addChild(
    new Graphics().rect(0, 0, width, height).fill({ color: 0xffffff })
  );

  const title = new Text({
    text: 'SLOT MACHINE',
    style: new TextStyle({ fontFamily: 'Arial', fontSize: 40, fontWeight: 'bold', fill: '#222222' }),
  });
  title.anchor.set(0.5);
  title.x = width / 2;
  title.y = height / 2 - 60;
  container.addChild(title);

  const percentage = new Text({
    text: '0%',
    style: new TextStyle({ fontFamily: 'Arial', fontSize: 28, fill: '#555555' }),
  });
  percentage.anchor.set(0.5);
  percentage.x = width / 2;
  percentage.y = height / 2 + 10;
  container.addChild(percentage);

  app.renderer.render(app.stage);

  for (const { alias, src } of ASSET_MANIFEST) Assets.add({ alias, src });

  await Promise.all([
    Assets.load(ASSET_MANIFEST.map(a => a.alias), (progress: number) => {
      percentage.text = `${Math.round(progress * 100)}%`;
      app.renderer.render(app.stage);
    }),
    new Promise(resolve => setTimeout(resolve, MIN_DISPLAY_TIME)),
  ]);

  app.stage.removeChild(container);
  container.destroy({ children: true });
}
