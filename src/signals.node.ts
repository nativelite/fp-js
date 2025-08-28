import type { NodeCollectOptions, Signals } from "./types.js";
import { VERSION } from "./utils.js";

function hget(h: Record<string, any> | undefined, key: string): string | undefined {
  if (!h) return undefined; const v = h[key] ?? h[key.toLowerCase()];
  return Array.isArray(v) ? v[0] : (v != null ? String(v) : undefined);
}

export async function collectSignalsNode(opts: NodeCollectOptions = {}): Promise<Signals> {
  const headers = (opts.headers || {}) as Record<string, any>;
  const data: Signals = { _version: VERSION };

  data.ua = hget(headers, 'user-agent');
  const secUa = hget(headers, 'sec-ch-ua');
  const secPlat = hget(headers, 'sec-ch-ua-platform');
  if (secUa || secPlat) {
    data.uaData = { brands: secUa, platform: secPlat };
  }
  data.platform = secPlat;
  data.languages = hget(headers, 'accept-language')?.split(',').map(s => s.trim());
  data.cookiesEnabled = hget(headers, 'cookie') ? true : undefined;

  data.server = {
    ip: opts.ip ?? undefined,
    via: hget(headers, 'via'),
    xff: hget(headers, 'x-forwarded-for'),
    cfip: hget(headers, 'cf-connecting-ip'),
    ray: hget(headers, 'cf-ray')
  };

  // Node cannot determine GPU/screen/etc. Leave undefined by design.
  return opts.canonicalize ? opts.canonicalize(data) : data;
}