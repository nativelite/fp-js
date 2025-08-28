# @nativelite/fp-js

Lightweight, dependency‑free fingerprinting for **browser** and **server**, with explainable signals and similarity scoring.

## Install
```bash
npm i @nativelite/fp-js
```

## Use
**Browser (ESM):**
```ts
import { createFingerprint } from '@nativelite/fp';
const fp = await createFingerprint({ heavy: true, stableOnly: true });
```
**Node (CJS/ESM):**
```ts
import { collectSignalsNode } from '@nativelite/fp/node';
const signals = await collectSignalsNode({ headers: req.headers as any, ip: req.ip });
```
**CDN:**
```html
<script src="https://cdn.jsdelivr.net/npm/@nativelite/fp/dist/iife/index.js"></script>
<script>
  NativeliteFP.createFingerprint({ heavy: true }).then(console.log);
</script>
```

## API
- `createFingerprint(opts)` → `{ hash, signals, version, at }`
- `collectSignalsBrowser(opts)` / `collectSignalsNode(opts)`
- `similarity(a, b)` → `{ score, diffs }`

## Build
```bash
npm run build
```

## Repo structure
```
/.github/workflows/ci.yml   # lint, typecheck, build
/examples/                  # browser + node samples
/src/                       # core + collectors
  compare.ts
  hash.ts
  index.ts
  signals.browser.ts
  signals.node.ts
  types.ts
  utils.ts
```
