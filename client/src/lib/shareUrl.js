// shareUrl.js — URL-based result sharing using deflate-raw + base64url
// Uses the browser-native CompressionStream API (no dependencies).
// Share URLs point to /api/share which serves OG meta tags for chat previews,
// then redirects back to the SPA with the same params.

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

// ─── Compact synthesis data ───────────────────────────────────────────────────
// For synthesis, only encode the fields that generateSynthesis() actually reads.
// This strips all embedded titles/descriptions, cutting URL length by ~80%.

function compactSynthesisData(r) {
  const compact = {};

  if (r.bigfive?.scores) {
    compact.bigfive = {
      scores: r.bigfive.scores,
      ...(r.bigfive.mbti?.type ? { mbti: { type: r.bigfive.mbti.type } } : {}),
    };
  }
  if (r.mbti?.mbti) {
    compact.mbti = {
      mbti: { type: r.mbti.mbti.type, dichotomies: r.mbti.mbti.dichotomies },
    };
  }
  if (r.enneagram?.enneagram) {
    compact.enneagram = {
      enneagram: { type: r.enneagram.enneagram.type, wing: r.enneagram.enneagram.wing },
    };
  }
  if (r.disc?.disc) {
    compact.disc = {
      disc: {
        primary: r.disc.disc.primary,
        secondary: r.disc.disc.secondary,
        pcts: r.disc.disc.pcts,
      },
    };
  }
  if (r.attachment?.attachment) {
    compact.attachment = { attachment: { primary: r.attachment.attachment.primary } };
  }
  if (r.lovelang?.loveLang?.ranked?.length) {
    const top = r.lovelang.loveLang.ranked[0];
    compact.lovelang = { loveLang: { ranked: [{ lang: top.lang, pct: top.pct }] } };
  }

  return compact;
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

export async function buildShareUrl(modelId, data) {
  // Synthesis: strip descriptions to keep URL short
  const payload = modelId === 'synthesis' ? compactSynthesisData(data) : data;
  const d = await encodeShare(payload);

  const url = new URL(window.location.href);
  url.pathname = '/api/share';
  url.search = '';
  url.hash = '';
  url.searchParams.set('share', modelId);
  url.searchParams.set('d', d);
  return url.toString();
}

// Returns { modelId, encoded } if share params are present, otherwise null.
// Called on SPA mount to detect inbound share redirects from /api/share.
export function parseShareParams() {
  const params = new URLSearchParams(window.location.search);
  const modelId = params.get('share');
  const encoded = params.get('d');
  if (!modelId || !encoded) return null;
  return { modelId, encoded };
}
