// shareUrl.js — URL-based result sharing using deflate-raw + base64url
// Uses the browser-native CompressionStream API (no dependencies).

// ─── Encode / Decode ──────────────────────────────────────────────────────────

export async function encodeShare(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);

  const cs = new CompressionStream('deflate-raw');
  const writer = cs.writable.getWriter();
  writer.write(bytes);
  writer.close();

  const buf = await new Response(cs.readable).arrayBuffer();
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  // Make URL-safe: + → -, / → _, strip padding =
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export async function decodeShare(str) {
  // Restore standard base64
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

  const ds = new DecompressionStream('deflate-raw');
  const writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();

  const buf = await new Response(ds.readable).arrayBuffer();
  return JSON.parse(new TextDecoder().decode(buf));
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

export async function buildShareUrl(modelId, data) {
  const d = await encodeShare(data);
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('share', modelId);
  url.searchParams.set('d', d);
  return url.toString();
}

// Returns { modelId, encoded } if share params are present, otherwise null.
export function parseShareParams() {
  const params = new URLSearchParams(window.location.search);
  const modelId = params.get('share');
  const encoded = params.get('d');
  if (!modelId || !encoded) return null;
  return { modelId, encoded };
}
