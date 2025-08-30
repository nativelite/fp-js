import test from 'node:test';
import assert from 'node:assert/strict';
import { hashString } from '../dist/hash.js';

test('subtle and node crypto produce same hash', async () => {
  const input = 'hello world';
  const originalCrypto = globalThis.crypto;
  const subtleHash = await hashString(input);
  const { createHash } = await import('node:crypto');
  Object.defineProperty(globalThis, 'crypto', { value: { createHash }, configurable: true });
  const nodeHash = await hashString(input);
  Object.defineProperty(globalThis, 'crypto', { value: originalCrypto, configurable: true });
  assert.equal(nodeHash, subtleHash);
});
