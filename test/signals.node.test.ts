import assert from 'node:assert/strict';
import { collectSignalsNode } from '../src/signals.node.js';

async function run() {
  const headersString = {
    'user-agent': 'test-agent',
    'accept-language': 'en-US,fr'
  };
  const headersArray = {
    'user-agent': ['test-agent'],
    'accept-language': ['en-US,fr']
  };

  const res1 = await collectSignalsNode({ headers: headersString });
  assert.equal(res1.ua, 'test-agent');
  assert.deepEqual(res1.languages, ['en-US', 'fr']);

  const res2 = await collectSignalsNode({ headers: headersArray });
  assert.equal(res2.ua, 'test-agent');
  assert.deepEqual(res2.languages, ['en-US', 'fr']);

  console.log('ok');
}

run();
