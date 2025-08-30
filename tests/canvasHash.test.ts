import assert from 'node:assert/strict';

// stub minimal DOM environment
const fakeCtx = {
  textBaseline: '',
  font: '',
  fillText: () => {},
  measureText: () => ({ width: 0 })
};
const fakeCanvas = {
  width: 0,
  height: 0,
  getContext: () => fakeCtx,
  toDataURL: () => 'data:'
};
(globalThis as any).document = { createElement: () => fakeCanvas };
(globalThis as any).navigator = {};
(globalThis as any).window = { devicePixelRatio: 1, screen: { colorDepth: 24, width: 0, height: 0 } };
(globalThis as any).crypto ??= {};
(globalThis as any).crypto.subtle ??= {};
(globalThis as any).crypto.subtle.digest = async () => { throw new Error('fail'); };

const { collectSignalsBrowser } = await import('../src/signals.browser.ts');
const signals = await collectSignalsBrowser({ heavy: true });
assert.equal(signals.canvasHash, undefined);
console.log('canvasHash test passed');
