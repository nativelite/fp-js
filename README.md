# @nativelite/fp

Lightweight, dependency‑free fingerprinting for **browser** and **server**, with explainable signals and similarity scoring.

## Install
```bash
npm i @nativelite/fp
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

## Measure size
Quick commands:
```bash
npm run size        # builds then prints raw/gzip/brotli sizes
npm run size:limit  # builds then enforces budgets (fails if exceeded)
npm run analyze     # builds then opens a why-report (bundling breakdown)
```
> If a command fails, make sure you’ve run `npm install` and you’re on Node 18+.

## Repo structure
```
/.github/workflows/ci.yml   # lint, typecheck, build, size budget
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
