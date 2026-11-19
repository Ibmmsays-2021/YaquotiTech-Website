// Shared HTML building blocks: icons, illustrations, layout, small components.
import { brand, langMeta, ui } from './site.mjs';

// ---------- icons (24x24, stroke) ----------
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"/>',
  chart: '<path d="M3 3v18h18M7 16V9M12 16V5M17 16v-4"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>',
  workflow: '<rect x="3" y="3" width="8" height="8" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  hdd: '<path d="M22 12H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11ZM6 16h.01M10 16h.01"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
};

export const icon = (name, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.layers}</svg>`;

// Arrow that flips in RTL via CSS
export const arrow = () => icon('arrow', 'arrow');

// ---------- illustrations ----------
export const flowArt = () => `
<svg class="art" viewBox="0 0 360 220" role="img" aria-label="Workflow diagram">
  <defs><marker id="ah" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 8 4 0 8z" class="a-arrow"/></marker></defs>
  <path class="a-line" d="M92 54h56" marker-end="url(#ah)"/>
  <path class="a-line" d="M208 54h26a16 16 0 0 1 16 16v26" marker-end="url(#ah)"/>
  <path class="a-line" d="M250 148v10a16 16 0 0 1-16 16h-86" marker-end="url(#ah)"/>
  <rect class="a-node" x="20" y="30" width="72" height="48" rx="12"/><circle class="a-dot" cx="38" cy="54" r="6"/><rect class="a-bar" x="50" y="48" width="30" height="5" rx="2.5"/><rect class="a-bar soft" x="50" y="58" width="20" height="4" rx="2"/>
  <rect class="a-node on" x="148" y="30" width="60" height="48" rx="12"/><path class="a-tick" d="m166 54 8 8 14-16"/>
  <rect class="a-node" x="218" y="100" width="64" height="48" rx="12"/><circle class="a-dot" cx="236" cy="124" r="6"/><rect class="a-bar" x="248" y="118" width="24" height="5" rx="2.5"/><rect class="a-bar soft" x="248" y="128" width="16" height="4" rx="2"/>
  <rect class="a-node" x="76" y="150" width="72" height="48" rx="12"/><path class="a-pie" d="M112 160a14 14 0 1 0 14 14h-14z"/>
  <rect class="a-chip" x="268" y="22" width="72" height="26" rx="13"/><circle class="a-dot" cx="283" cy="35" r="4"/><rect class="a-bar" x="293" y="32" width="36" height="6" rx="3"/>
</svg>`;

export const dbArt = () => `
<svg class="art" viewBox="0 0 360 220" role="img" aria-label="Data platform diagram">
  <g class="a-stack">
    <ellipse class="a-disk" cx="180" cy="150" rx="86" ry="24"/>
    <path class="a-side" d="M94 150v22a86 24 0 0 0 172 0v-22"/>
    <ellipse class="a-disk top" cx="180" cy="126" rx="86" ry="24"/>
    <path class="a-side" d="M94 126v22a86 24 0 0 0 172 0v-22"/>
    <ellipse class="a-disk on" cx="180" cy="102" rx="86" ry="24"/>
    <path class="a-side" d="M94 102v22a86 24 0 0 0 172 0v-22"/>
    <ellipse class="a-disk top" cx="180" cy="78" rx="86" ry="24"/>
  </g>
  <path class="a-line" d="M40 40h54l20 22"/>
  <path class="a-line" d="M320 40h-54l-20 22"/>
  <path class="a-line" d="M40 190h54l20-22"/>
  <path class="a-line" d="M320 190h-54l-20-22"/>
  <rect class="a-chip" x="14" y="26" width="52" height="26" rx="13"/><circle class="a-dot" cx="30" cy="39" r="4"/><rect class="a-bar" x="40" y="36" width="18" height="6" rx="3"/>
  <rect class="a-chip" x="294" y="26" width="52" height="26" rx="13"/><circle class="a-dot" cx="310" cy="39" r="4"/><rect class="a-bar" x="320" y="36" width="18" height="6" rx="3"/>
  <rect class="a-chip" x="14" y="176" width="52" height="26" rx="13"/><path class="a-tick sm" d="m26 189 5 5 9-10"/><rect class="a-bar" x="44" y="186" width="14" height="6" rx="3"/>
  <rect class="a-chip" x="294" y="176" width="52" height="26" rx="13"/><path class="a-tick sm" d="m306 189 5 5 9-10"/><rect class="a-bar" x="324" y="186" width="14" height="6" rx="3"/>
</svg>`;

export const art = (id) => (id === 'sdb' ? dbArt() : flowArt());

export const logoMark = () => `
<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="var(--primary)"/><path d="M9 10l7 8 7-8M16 18v6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ---------- page context ----------
export function makeCtx(lang, path) {
  const depth = path.split('/').filter(Boolean).length;
  const up = '../'.repeat(depth);
  const meta = langMeta[lang];
  const t = (v) => (v && typeof v === 'object' && !Array.isArray(v) && lang in v ? v[lang] : v);
  return {
    lang, path, meta, t,
    dir: meta.dir,
    href: (p) => `${up}${p}index.html`,
    asset: (p) => `${up}../assets/${p}`,
    switchHref: () => `${up}../${meta.other}/${path}index.html`,
    rootHref: () => `${up}../index.html`,
  };
}

// ---------- components ----------
export const sectionHead = (eyebrow, title, desc) => `
<div class="section-head">
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h2>${title}</h2>
  ${desc ? `<p class="lead">${desc}</p>` : ''}
</div>`;

export const card = ({ href, ic, title, desc, cta, cls = '' }) => `
<${href ? `a href="${href}"` : 'div'} class="card ${href ? 'card-link' : ''} ${cls}">
  <span class="badge-ico">${icon(ic || 'layers')}</span>
  <h3>${title}</h3>
  <p>${desc || ''}</p>
  ${cta ? `<span class="more">${cta}${arrow()}</span>` : ''}
</${href ? 'a' : 'div'}>`;

export const steps = (list) => `
<ol class="steps">${list.map((s, i) => `<li><span class="num">${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ol>`;

export const checkList = (items) =>
  `<ul class="checks">${items.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul>`;

export const ctaBand = (ctx, title, desc) => `
<section class="section"><div class="container">
  <div class="cta-band">
    <div><h2>${title}</h2><p>${desc}</p></div>
    <div class="cta-actions">
      <a class="btn btn-light" href="${ctx.href('contact/')}">${ctx.t(ui.nav.talk)}${arrow()}</a>
    </div>
  </div>
</div></section>`;

// ---------- layout ----------
export function layout(ctx, page, { solutions, services }) {
  const { t, lang, dir } = ctx;
  const n = ui.nav;
  const name = t(brand.name);
  const navItem = (key, href, label) =>
    `<li><a class="nav-link ${page.active === key ? 'active' : ''}" href="${href}">${label}</a></li>`;

  const menuItems = (list, base) =>
    list.map((x) => `<a class="menu-item" href="${ctx.href(base(x))}"><span class="badge-ico sm">${icon(x.icon)}</span><span><strong>${t(x.title || x.name)}</strong><small>${t(x.summary || x.tagline)}</small></span></a>`).join('');

  const dropdown = (key, href, label, inner) => `
    <li class="has-menu">
      <a class="nav-link ${page.active === key ? 'active' : ''}" href="${href}">${label}${icon('chevron', 'chev')}</a>
      <div class="menu">${inner}</div>
    </li>`;

  const sol = page.solution;
  const sn = ui.solNav;

  // Company navigation (all pages except a solution's own pages)
  const companyNav = `
  <ul class="nav-list">
    ${navItem('home', ctx.href(''), t(n.home))}
    ${navItem('about', ctx.href('about/'), t(n.about))}
    ${dropdown('services', ctx.href('services/'), t(n.services), menuItems(services, (s) => `services/${s.id}/`))}
    ${dropdown('solutions', ctx.href('solutions/'), t(n.solutions), menuItems(solutions.map((s) => s.meta), (s) => `solutions/${s.id}/`))}
    ${navItem('contact', ctx.href('contact/'), t(n.contact))}
  </ul>`;

  // Solution navigation: replaces the company nav on a solution's home, use cases, upcoming, demo and docs pages.
  const solutionNav = sol ? (() => {
    const id = sol.meta.id;
    const item = (key, href, label) =>
      `<li><a class="nav-link ${page.sub === key ? 'active' : ''}" href="${href}"${page.sub === key ? ' aria-current="page"' : ''}>${label}</a></li>`;
    return `
  <ul class="nav-list">
    ${item('overview', ctx.href(`systems/${id}/`), t(sn.overview))}
    ${item('docs', ctx.href(`docs/${id}/`), t(sn.docs))}
    ${item('use-cases', ctx.href(`systems/${id}/use-cases/`), t(sn.useCases))}
    ${item('upcoming', ctx.href(`systems/${id}/upcoming/`), t(sn.upcoming))}
  </ul>`;
  })() : '';

  const nav = sol ? solutionNav : companyNav;
  const cta = sol
    ? `<a class="btn btn-primary btn-sm" href="${ctx.href(`systems/${sol.meta.id}/demo/`)}">${t(sn.demo)}</a>`
    : `<a class="btn btn-primary btn-sm" href="${ctx.href('contact/')}">${t(n.talk)}</a>`;
  // One logo per page: on system pages the mark is followed by the system name, with the company name beneath it.
  const brandBlock = sol
    ? `<a class="brand" href="${ctx.href(`systems/${sol.meta.id}/`)}">${logoMark()}<span class="brand-text"><span>${t(sol.meta.name)}</span><small>${name}</small></span></a>`
    : `<a class="brand" href="${ctx.href('')}">${logoMark()}<span>${name}</span></a>`;

  const footerCol = (title, links) => `<div><h4>${title}</h4><ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;

  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title} · ${name}</title>
<meta name="description" content="${(page.desc || t(brand.tagline)).replace(/"/g, '&quot;')}">
<link rel="icon" href="${ctx.asset('favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ctx.asset('styles.css')}">
</head>
<body class="${page.bodyClass || ''}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container bar">
    ${brandBlock}
    <button class="icon-btn menu-toggle" type="button" aria-label="${t(n.menu)}" aria-expanded="false" data-menu-toggle>${icon('menu')}</button>
    <nav class="main-nav" id="main-nav" aria-label="Main">${nav}
      <div class="nav-tools">
        <a class="pill" href="${ctx.switchHref()}" hreflang="${ctx.meta.other}" lang="${ctx.meta.other}" aria-label="${t(n.language)}">${icon('globe')}${langMeta[ctx.meta.other].label}</a>
        ${cta}
      </div>
    </nav>
  </div>
</header>
<main id="main">
${page.body}
</main>
<footer class="site-footer">
  <div class="container">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="${ctx.href('')}"><span>${name}</span></a>
        <p>${t(brand.tagline)}</p>
        <a class="mail" href="mailto:${brand.email}">${icon('mail')}${brand.email}</a>
      </div>
      ${footerCol(t(ui.common.ourSolutions), solutions.map((s) => [ctx.href(`solutions/${s.meta.id}/`), t(s.meta.name)]))}
      ${footerCol(t(ui.common.ourServices), services.map((s) => [ctx.href(`services/${s.id}/`), t(s.title)]))}
      ${footerCol(t(ui.common.resources), [
        ...solutions.map((s) => [ctx.href(`docs/${s.meta.id}/`), `${t(s.meta.name)} — ${t(ui.nav.docs)}`]),
        [ctx.href('about/'), t(n.about)],
        [ctx.href('contact/'), t(n.contact)],
      ])}
    </div>
    <div class="foot-bottom"><span>© ${year} ${name}. ${t(ui.common.rights)}</span></div>
  </div>
</footer>
<script src="${ctx.asset('app.js')}" defer></script>
</body>
</html>`;
}
