export const VERSION = "nl-fp/0.2.0";
export function b64url(ab: ArrayBuffer): string {
  const b = String.fromCharCode(...new Uint8Array(ab));
  return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function toJSONStable(val: unknown): string {
  const build = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map((item) => build(item));
    if (v && typeof v === 'object') {
      const obj = v as Record<string, unknown>;
      const sorted: Record<string, unknown> = {};
      for (const k of Object.keys(obj).sort()) {
        const b = build(obj[k]);
        if (b !== undefined) sorted[k] = b;
      }
      return sorted;
    }
    return v;
  };

  const json = JSON.stringify(build(val));
  return json === undefined ? 'null' : json;
}
export function tryGet<T>(fn: () => T): T | undefined { try { return fn(); } catch { return undefined; } }
export async function tryGetAsync<T>(fn: () => Promise<T> | T): Promise<T | undefined> {
  try {
    return await fn();
  } catch {
    return undefined;
  }
}
export function eq(a: unknown, b: unknown): boolean { return toJSONStable(a) === toJSONStable(b); }
