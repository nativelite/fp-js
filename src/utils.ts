export const VERSION = "nl-fp/0.2.0";
export function b64url(ab: ArrayBuffer): string {
  const b = String.fromCharCode(...new Uint8Array(ab));
  return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function toJSONStable(val: unknown): string {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    const obj = val as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const k of Object.keys(obj).sort()) sorted[k] = toJSONStable(obj[k]);
    return JSON.stringify(sorted);
  }
  return JSON.stringify(val);
}
export function tryGet<T>(fn: () => T): T | undefined { try { return fn(); } catch { return undefined; } }
export function eq(a: unknown, b: unknown): boolean { return toJSONStable(a) === toJSONStable(b); }