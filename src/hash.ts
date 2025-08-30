import { b64url } from "./utils.js";
export async function hashBytes(bytes: Uint8Array): Promise<string> {
  if (globalThis.crypto?.subtle) {
    const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return b64url(digest);
  }
  let h = 0xcbf29ce484222325n; const p = 0x100000001b3n;
  for (const x of bytes) { h ^= BigInt(x); h = (h * p) & 0xffffffffffffffffn; }
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) { h ^= BigInt(i) * 0x9e3779b97f4a7c15n; out[i] = Number(h & 0xffn); h >>= 1n; }
  return b64url(out.buffer);
}
export async function hashString(s: string): Promise<string> { return hashBytes(new TextEncoder().encode(s)); }