// Stable per-browser visitor key derived from a device fingerprint instead of
// localStorage, because incognito windows get a fresh empty storage but still
// render the same canvas/GPU/screen. Used only to count publish attempts
// against the 10-per-day limit - never linked to personal information.
const VISITOR_KEY_CACHE = "palettesnap_visitor_key";

const hashString = async (raw: string): Promise<string> => {
  if (globalThis.crypto?.subtle) {
    try {
      const digest = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(raw),
      );
      return [...new Uint8Array(digest)]
        .slice(0, 16)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch {
      // fall through to the non-secure-context fallback
    }
  }
  let h = 5381;
  for (let i = 0; i < raw.length; i++) {
    h = ((h << 5) + h + raw.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0");
};

const readCachedKey = (): string | null => {
  try {
    return localStorage.getItem(VISITOR_KEY_CACHE);
  } catch {
    return null;
  }
};

const writeCachedKey = (key: string): void => {
  try {
    localStorage.setItem(VISITOR_KEY_CACHE, key);
  } catch {
    // storage unavailable - recompute on next load
  }
};

const canvasPart = (): string => {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.textBaseline = "top";
    ctx.font = "16px Arial, sans-serif";
    ctx.fillStyle = "#f60";
    ctx.fillRect(0, 0, 120, 30);
    ctx.fillStyle = "#069";
    ctx.fillText("palettesnap 10/day", 2, 8);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("palettesnap 10/day", 4, 20);
    return canvas.toDataURL();
  } catch {
    return "";
  }
};

const webglPart = (): string => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return "";
    const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    return `${String(vendor)}|${String(renderer)}`;
  } catch {
    return "";
  }
};

const buildFingerprintInput = (): string => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return [
    nav.userAgent,
    nav.language,
    nav.platform,
    `${screen.width}x${screen.height}x${screen.colorDepth}`,
    String(nav.hardwareConcurrency ?? 0),
    String(nav.deviceMemory ?? 0),
    String(new Date().getTimezoneOffset()),
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    canvasPart(),
    webglPart(),
  ].join("::");
};

const computeVisitorKey = async (): Promise<string> => {
  const cached = readCachedKey();
  if (cached) return cached;
  const key = await hashString(buildFingerprintInput());
  writeCachedKey(key);
  return key;
};

let visitorKeyPromise: Promise<string> | null = null;

// Memoized so every caller shares one computation per page load.
export const getVisitorKey = (): Promise<string> => {
  if (!visitorKeyPromise) visitorKeyPromise = computeVisitorKey();
  return visitorKeyPromise;
};
