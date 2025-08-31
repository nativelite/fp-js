import test from 'node:test';
import assert from 'node:assert/strict';
import { toJSONStable } from '../src/utils.ts';

test('toJSONStable handles arrays with objects in any key order', () => {
  const a = [{ a: 1, b: 2 }, { c: 3, d: 4 }];
  const b = [{ b: 2, a: 1 }, { d: 4, c: 3 }];
  assert.equal(toJSONStable(a), toJSONStable(b));
});

test('toJSONStable preserves nested object and array structure', () => {
  const input = { z: [{ b: 2, a: 1 }, { d: 4, c: 3 }], y: { b: 2, a: 1 } };
  const parsed = JSON.parse(toJSONStable(input));
  assert.deepEqual(parsed, { y: { a: 1, b: 2 }, z: [{ a: 1, b: 2 }, { c: 3, d: 4 }] });
});

test('toJSONStable returns "null" for undefined', () => {
  assert.equal(toJSONStable(undefined), 'null');
});
