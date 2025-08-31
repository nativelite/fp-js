import test from 'node:test';
import assert from 'node:assert/strict';
import { hashString } from '../src/hash.ts';

test('subtle and node crypto produce same hash', async () => {
  const input = 'hello world';
  const subtleHash = await hashString(input);
  const originalCrypto = globalThis.crypto;
  try {
    Object.defineProperty(globalThis, 'crypto', { value: undefined, configurable: true });
    const nodeHash = await hashString(input);
    assert.equal(nodeHash, subtleHash);
  } finally {
    Object.defineProperty(globalThis, 'crypto', { value: originalCrypto, configurable: true });
  }
});
