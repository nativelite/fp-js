import { b64url } from "./utils.js";
export async function hashBytes(bytes: Uint8Array): Promise<string> {
  if (globalThis.crypto?.subtle) {
    const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return b64url(digest);
  }
  try {
    const { createHash } = await import("node:crypto");
    const hash = createHash("sha256");
    hash.update(bytes as any);
    const digest: Uint8Array = hash.digest();
    const ab = digest.buffer.slice(digest.byteOffset, digest.byteOffset + digest.byteLength) as ArrayBuffer;
    return b64url(ab);
  } catch {
    // no crypto module available, fall through to a non-cryptographic hash
  }
  let h = 0xcbf29ce484222325n; const p = 0x100000001b3n;
  for (const x of bytes) { h ^= BigInt(x); h = (h * p) & 0xffffffffffffffffn; }
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) { h ^= BigInt(i) * 0x9e3779b97f4a7c15n; out[i] = Number(h & 0xffn); h >>= 1n; }
  return b64url(out.buffer);
}
export async function hashString(s: string): Promise<string> {
  return hashBytes(new TextEncoder().encode(s));
}
