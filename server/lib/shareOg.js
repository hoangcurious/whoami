// shareOg.js — Server-side OG meta handler for shared personality results.
// Used by both the Express dev server and the Vercel serverless function.
// Decodes the compressed result data, extracts a title + description,
// and returns an HTML page with Open Graph meta tags + a JS redirect
// to the SPA so chat-app link previews work correctly.

const zlib = require('zlib');
const { promisify } = require('util');
const inflateRaw = promisify(zlib.inflateRaw);

async function decodeShareData(encoded) {
  const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const buf = Buffer.from(b64, 'base64');
  const inflated = await inflateRaw(buf);
  return JSON.parse(inflated.toString('utf8'));
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractMeta(modelId, data) {
  try {
    switch (modelId) {
      case 'mbti': {
        const m = data?.mbti;
        if (!m) break;
        return {
          title: `${m.type} · ${m.shortDescription || 'MBTI Result'} | whoami`,
          description: m.fullDescription?.slice(0, 200) || 'Discover your MBTI personality type.',
        };
      }
      case 'enneagram': {
        const e = data?.enneagram;
        if (!e) break;
        const label = `Type ${e.type}${e.wing ? `w${e.wing}` : ''}`;
        return {
          title: `${label} · ${e.title || 'Enneagram Result'} | whoami`,
          description: e.tagline || e.text?.slice(0, 200) || '',
        };
      }
      case 'disc': {
        const d = data?.disc;
        if (!d) break;
        return {
          title: `${d.primary} · ${d.title || 'DISC Result'} | whoami`,
          description: d.tagline || d.text?.slice(0, 200) || '',
        };
      }
      case 'attachment': {
        const a = data?.attachment;
        if (!a) break;
        return {
          title: `${a.title || a.primary} | whoami`,
          description: a.tagline || a.text?.slice(0, 200) || '',
        };
      }
      case 'lovelang': {
        const top = data?.loveLang?.ranked?.[0];
        if (!top) break;
        return {
          title: `${top.title || top.lang} | whoami Love Languages`,
          description: top.tagline || top.text?.slice(0, 200) || '',
        };
      }
      case 'bigfive': {
        const type = data?.mbti?.type;
        return {
          title: type ? `Big Five · ${type} | whoami` : 'My Big Five Result | whoami',
          description: data?.summary?.slice(0, 200) || 'Discover your Big Five personality traits.',
        };
      }
      case 'synthesis': {
        const type = data?.mbti?.mbti?.type || data?.bigfive?.mbti?.type;
        return {
          title: type
            ? `Full Personality Profile · ${type} | whoami`
            : 'My Full Personality Profile | whoami',
          description: 'A consolidated personality synthesis across 6 frameworks. Discover what makes you unique.',
        };
      }
    }
  } catch {}
  return null;
}

module.exports = async function shareOgHandler(req, res) {
  const { share: modelId, d: encoded } = req.query;

  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host  = req.headers.host;
  const spaUrl = `${proto}://${host}/?share=${encodeURIComponent(modelId || '')}&d=${encodeURIComponent(encoded || '')}`;

  let meta = {
    title: 'My Personality Profile | whoami',
    description: 'Discover your personality across MBTI, Enneagram, DISC, Attachment, Love Languages, and Big Five.',
  };

  if (modelId && encoded) {
    try {
      const data = await decodeShareData(encoded);
      const extracted = extractMeta(modelId, data);
      if (extracted) meta = extracted;
    } catch {}
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<meta property="og:type"        content="website">
<meta property="og:title"       content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
<meta property="og:url"         content="${escapeHtml(spaUrl)}">
<meta name="twitter:card"        content="summary">
<meta name="twitter:title"       content="${escapeHtml(meta.title)}">
<meta name="twitter:description" content="${escapeHtml(meta.description)}">
<meta http-equiv="refresh" content="0;url=${escapeHtml(spaUrl)}">
</head>
<body>
<script>window.location.replace(${JSON.stringify(spaUrl)});</script>
<p>Redirecting… <a href="${escapeHtml(spaUrl)}">Click here if not redirected.</a></p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(html);
};
