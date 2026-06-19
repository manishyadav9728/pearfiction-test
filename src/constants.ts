// Symbols
export type SymbolId = 'hv1' | 'hv2' | 'hv3' | 'hv4' | 'lv1' | 'lv2' | 'lv3' | 'lv4';

export const SYMBOL_IDS: SymbolId[] = ['hv1', 'hv2', 'hv3', 'hv4', 'lv1', 'lv2', 'lv3', 'lv4'];

// Reel Bands as provided
export const REELS: SymbolId[][] = [
  ['hv2', 'lv3', 'lv3', 'hv1', 'hv1', 'lv1', 'hv1', 'hv4', 'lv1', 'hv3', 'hv2', 'hv3', 'lv4', 'hv4', 'lv1', 'hv2', 'lv4', 'lv1', 'lv3', 'hv2'],
  ['hv1', 'lv2', 'lv3', 'lv2', 'lv1', 'lv1', 'lv4', 'lv1', 'lv1', 'hv4', 'lv3', 'hv2', 'lv1', 'lv3', 'hv1', 'lv1', 'lv2', 'lv4', 'lv3', 'lv2'],
  ['lv1', 'hv2', 'lv3', 'lv4', 'hv3', 'hv2', 'lv2', 'hv2', 'hv2', 'lv1', 'hv3', 'lv1', 'hv1', 'lv2', 'hv3', 'hv2', 'hv4', 'hv1', 'lv2', 'lv4'],
  ['hv2', 'lv2', 'hv3', 'lv2', 'lv4', 'lv4', 'hv3', 'lv2', 'lv4', 'hv1', 'lv1', 'hv1', 'lv2', 'hv3', 'lv2', 'lv3', 'hv2', 'lv1', 'hv3', 'lv2'],
  ['lv3', 'lv4', 'hv2', 'hv3', 'hv4', 'hv1', 'hv3', 'hv2', 'hv2', 'hv4', 'hv4', 'hv2', 'lv2', 'hv4', 'hv1', 'lv2', 'hv1', 'lv2', 'hv4', 'lv4'],
];

export const NUM_COLS = 5;
export const NUM_ROWS = 3;

// Paytable
export type Paytable = Record<SymbolId, Record<3 | 4 | 5, number>>;

export const PAYTABLE: Paytable = {
  hv1: { 3: 10, 4: 20, 5: 50 },
  hv2: { 3: 5, 4: 10, 5: 20 },
  hv3: { 3: 5, 4: 10, 5: 15 },
  hv4: { 3: 5, 4: 10, 5: 15 },
  lv1: { 3: 2, 4: 5, 5: 10 },
  lv2: { 3: 1, 4: 2, 5: 5 },
  lv3: { 3: 1, 4: 2, 5: 3 },
  lv4: { 3: 1, 4: 2, 5: 3 },
};

// Pay Lines
export const PAYLINES: number[][] = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
];

// Assets
export interface AssetEntry {
  alias: string;
  src: string;
}
// created this manifest instead of adding single entry for each asset
export const ASSET_MANIFEST: AssetEntry[] = [
  ...SYMBOL_IDS.map(id => ({ alias: id, src: `/${id}_symbol.png` })),
  { alias: 'spin_button', src: '/spin_button.png' },
];

// Layout
export const SYMBOL_SIZE = 120;
export const REEL_GAP = 2;
export const SPIN_BTN_SIZE = 100;
export const PADDING = 15; // padding around the slotmachine
