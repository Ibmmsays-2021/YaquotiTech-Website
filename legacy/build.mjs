// Static site generator: node build.mjs  ->  dist/
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS } from './src/site.mjs';
import { makeCtx, layout } from './src/templates.mjs';
import { pageList, solutions, services } from './src/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'src', 'assets'), join(dist, 'assets'), { recursive: true });

let count = 0;
for (const lang of LANGS) {
  for (const p of pageList()) {
    const ctx = makeCtx(lang, p.path);
    const page = p.build(ctx);
    const html = layout(ctx, page, { solutions, services: services.items });
    const out = join(dist, lang, p.path, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    count++;
  }
}

// Root: pick a language on first visit (works from file:// and any static host)
writeFileSync(join(dist, 'index.html'), `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Redirecting…</title>
<script>
(function () {
  var l = 'en';
  try { l = localStorage.getItem('lang') || ((navigator.language || 'en').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en'); } catch (e) {}
  location.replace(l + '/index.html');
})();
</script></head>
<body><p><a href="en/index.html">English</a> · <a href="ar/index.html">العربية</a></p></body></html>`);

console.log(`Built ${count} pages (${LANGS.join(', ')}) -> ${dist}`);
