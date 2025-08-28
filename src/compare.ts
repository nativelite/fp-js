import type { SignalKey, Signals, SimilarityResult } from "./types.js";
import { eq } from "./utils.js";
const WEIGHTS: Record<SignalKey, number> = {
  ua: 0.08, uaData: 0.10, platform: 0.05, vendor: 0.03, languages: 0.06,
  timezoneOffset: 0.06, timezone: 0.05, hardwareConcurrency: 0.07, deviceMemory: 0.07,
  maxTouchPoints: 0.03, colorDepth: 0.03, screen: 0.12, cookiesEnabled: 0.02,
  localStorage: 0.01, sessionStorage: 0.01, indexedDB: 0.01, gpu: 0.12,
  fontsSample: 0.06, canvasHash: 0.07, server: 0.04
};
export function similarity(a: Signals, b: Signals): SimilarityResult {
  let score = 0; const diffs: SimilarityResult["diffs"] = [];
  for (const key of Object.keys(WEIGHTS) as SignalKey[]) {
    const w = WEIGHTS[key] ?? 0; const av = (a as any)[key]; const bv = (b as any)[key];
    if (av == null && bv == null) continue;
    if (eq(av, bv)) { score += w; } else { diffs.push({ key, a: av, b: bv, weight: w }); }
  }
  score = Math.max(0, Math.min(1, score));
  return { score, diffs };
}