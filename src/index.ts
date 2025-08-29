import { similarity } from "./compare.js";
import { hashString } from "./hash.js";
import { collectSignalsBrowser } from "./signals.browser.js";
import { collectSignalsNode } from "./signals.node.js";
import type { BrowserCollectOptions, Fingerprint, NodeCollectOptions, Signals } from "./types.js";
import { VERSION, toJSONStable } from "./utils.js";

export { similarity } from "./compare.js";
export { collectSignalsBrowser } from "./signals.browser.js";
export { collectSignalsNode } from "./signals.node.js";
export type { BrowserCollectOptions, Fingerprint, NodeCollectOptions, Signals } from "./types.js";
export const version = VERSION;

function isBrowser() { return typeof window !== 'undefined' && typeof document !== 'undefined'; }

export async function createFingerprint(opts: BrowserCollectOptions | NodeCollectOptions = {}): Promise<Fingerprint> {
  const signals = await (isBrowser() ? collectSignalsBrowser(opts as BrowserCollectOptions) : collectSignalsNode(opts as NodeCollectOptions));
  const payload = toJSONStable(signals);
  const hash = await hashString(payload);
  return { hash, signals, version: VERSION, at: Date.now() };
}

export function compareFingerprints(a: Fingerprint | Signals, b: Fingerprint | Signals) {
  const sa = ("signals" in a ? a.signals : a) as Signals;
  const sb = ("signals" in b ? b.signals : b) as Signals;
  return similarity(sa, sb);
}