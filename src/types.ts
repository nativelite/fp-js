export type SignalKey =
  | "ua" | "uaData" | "platform" | "vendor" | "languages" | "timezoneOffset" | "timezone"
  | "hardwareConcurrency" | "deviceMemory" | "maxTouchPoints" | "colorDepth" | "screen"
  | "cookiesEnabled" | "localStorage" | "sessionStorage" | "indexedDB" | "gpu"
  | "fontsSample" | "canvasHash" | "server";

export type Signals = Partial<Record<SignalKey, unknown>> & { _version: string };

export interface BaseCollectOptions {
  heavy?: boolean;
  stableOnly?: boolean;
  canonicalize?: (signals: Signals) => Signals;
}

export interface BrowserCollectOptions extends BaseCollectOptions {}

export interface NodeCollectOptions extends BaseCollectOptions {
  headers?: Record<string, string | string[] | undefined>;
  ip?: string | null;
}

export interface Fingerprint {
  hash: string;
  signals: Signals;
  version: string;
  at: number;
}

export interface SimilarityResult {
  score: number;
  diffs: Array<{ key: SignalKey; a?: unknown; b?: unknown; weight: number }>;
}