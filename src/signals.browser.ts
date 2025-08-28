import { hashString } from "./hash.js";
import type { BrowserCollectOptions, Signals } from "./types.js";
import { VERSION, tryGet } from "./utils.js";

export async function collectSignalsBrowser(opts: BrowserCollectOptions = {}): Promise<Signals> {
  const d = typeof document !== "undefined" ? document : (undefined as any);
  const n = typeof navigator !== "undefined" ? navigator : (undefined as any);
  const w = typeof window !== "undefined" ? window : (undefined as any);
  const heavy = !!opts.heavy; const stableOnly = !!opts.stableOnly;
  const data: Signals = { _version: VERSION };

  data.ua = tryGet(() => n.userAgent);
  data.uaData = tryGet(() => (n.userAgentData ? {
    brands: (n.userAgentData.brands ?? n.userAgentData.uaList ?? []).map((b: any) => ({ brand: b.brand, version: b.version })),
    mobile: !!n.userAgentData.mobile,
    platform: n.userAgentData.platform
  } : undefined));
  data.platform = tryGet(() => n.platform);
  data.vendor = tryGet(() => (n as any).vendor);
  data.languages = tryGet(() => n.languages);
  data.timezoneOffset = tryGet(() => new Date().getTimezoneOffset());
  data.timezone = tryGet(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  data.hardwareConcurrency = tryGet(() => n.hardwareConcurrency);
  data.deviceMemory = tryGet(() => (n as any).deviceMemory);
  data.maxTouchPoints = tryGet(() => (n as any).maxTouchPoints);
  data.colorDepth = tryGet(() => w.screen?.colorDepth);
  data.screen = tryGet(() => ({ width: w.screen?.width, height: w.screen?.height, pixelRatio: (w.devicePixelRatio ?? 1) }));
  data.cookiesEnabled = tryGet(() => n.cookieEnabled);
  data.localStorage = tryGet(() => !!w.localStorage);
  data.sessionStorage = tryGet(() => !!w.sessionStorage);
  data.indexedDB = tryGet(() => !!w.indexedDB);

  data.gpu = tryGet(() => {
    const canvas = d?.createElement("canvas");
    const gl = canvas?.getContext("webgl") || canvas?.getContext("experimental-webgl");
    if (!gl) return undefined;
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbg) return undefined;
    const vendor = gl.getParameter((dbg as any).UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter((dbg as any).UNMASKED_RENDERER_WEBGL);
    return { vendor, renderer };
  });

  if (heavy) {
    data.fontsSample = tryGet(() => {
      const c = d.createElement("canvas");
      const ctx = c.getContext("2d");
      if (!ctx) return undefined;
      ctx.textBaseline = "top";
      const fonts = ["monospace", "serif", "sans-serif", "cursive", "fantasy", "system-ui"];
      const samples: Record<string, number> = {};
      for (const f of fonts) { ctx.font = `16px ${f}`; const m = ctx.measureText("nativelite-fp"); samples[f] = Math.round((m.width ?? 0) * 1000); }
      return samples;
    });
    data.canvasHash = tryGet(async () => {
      const c = d.createElement("canvas"); c.width = 240; c.height = 40;
      const ctx = c.getContext("2d"); if (!ctx) return undefined;
      ctx.textBaseline = "top"; ctx.font = "14px 'Arial'"; ctx.fillText("@nativelite/fp", 2, 2);
      return await hashString(c.toDataURL());
    });
    if (data.canvasHash instanceof Promise) data.canvasHash = await data.canvasHash;
  }

  if (stableOnly) {
    if (data.screen && typeof data.screen === "object") {
      const { width, height, pixelRatio } = data.screen as any;
      (data as any).screen = { width, height, pixelRatio };
    }
  }
  return opts.canonicalize ? opts.canonicalize(data) : data;
}