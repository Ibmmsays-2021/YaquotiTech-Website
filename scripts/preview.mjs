// Serve the static build (dist/yaquoti-tech/browser) like a plain static host would:
// node scripts/preview.mjs [port]   (default 4300)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'yaquoti-tech', 'browser');
const port = Number(process.argv[2] || process.env.PORT || 4300);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

async function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const file = join(root, safe);
  if (!file.startsWith(root + sep) && file !== root) return null;
  for (const candidate of [file, join(file, 'index.html')]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      /* try next */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const path = new URL(req.url ?? '/', 'http://localhost').pathname;
  // The retired Arabic site, redirected like web.config does: /ar/<page> → /en/<page>.
  if (path === '/ar' || path.startsWith('/ar/')) {
    res.writeHead(301, { Location: `/en${path.slice(3)}` });
    res.end();
    return;
  }
  const file = await resolveFile(path);
  if (file) {
    const type = types[extname(file)] ?? 'application/octet-stream';
    let body = await readFile(file);
    // Everything is re-checked on every load, so a new build shows without a hard refresh, except
    // the hashed bundles (main-AB12CD34.js), whose name changes whenever their content does.
    const hashed = /-[A-Za-z0-9_-]{8}\.(js|css)$/.test(file);
    const headers = {
      'Content-Type': type,
      'Cache-Control': hashed ? 'public, max-age=31536000, immutable' : 'no-cache',
    };
    // Compress text like Azure SWA / IIS / nginx do, so Lighthouse numbers match production.
    if (
      /text|javascript|json|xml|svg/.test(type) &&
      /gzip/.test(req.headers['accept-encoding'] ?? '')
    ) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, headers);
    res.end(body);
    return;
  }
  const notFound = await resolveFile('/en/not-found/');
  res.writeHead(404, { 'Content-Type': types['.html'] });
  res.end(notFound ? await readFile(notFound) : 'Not found');
}).listen(port, () => console.log(`Preview: http://localhost:${port}`));
