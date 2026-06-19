
A 5×3 reel slot machine built with **PixiJS v8**, **TypeScript**, and **Vite**.
--

## Quick Start

```bash
npm install          
npm run dev         # http://localhost:5173
npm test            # vitest run
npm run build       # production bundle → dist/
```

---

## Project Structure

```
slot-game/
├── public/                # symbol images + spin button (static)
├── src/
│   ├── constants.ts         # reel bands, paytable, paylines, layout numbers
│   ├── reels.ts              # functions: band lookup, grid snapshot, random positions
│   ├── paylines.ts           # functions: win evaluation + formatWins()
│   ├── preloader.ts          # function: loading screen with real % progress
│   ├── ReelSymbol.ts         # class: Sprite subclass — one symbol cell on the grid
│   ├── SpinButton.ts         # class: Sprite subclass — the circular spin button
│   ├── ReelGrid.ts           # class: Container subclass — owns the 5x3 grid of ReelSymbols
│   ├── GameScene.ts          # class: composes ReelGrid + SpinButton + win text, resize()
│   ├── Game.ts                # class: owns the PixiJS Application + GameScene, bootstraps app
│   └── main.ts                 # entry point — `new Game().start()`
├── tests/
│   └── game.test.ts            # core game-logic tests
├── index.html
├── tsconfig.json
└── package.json


## Testing

Vitest covers the things most likely to break the math model:

- `getVisibleGrid` reads the correct symbols from the reel bands (incl. wraparound)
- `evaluateWins` correctly detects multiple winning paylines and totals payout
- `evaluateWins` correctly returns no wins when nothing matches from column 0
- `formatWins` produces the expected output string

Run with `npm test`.
