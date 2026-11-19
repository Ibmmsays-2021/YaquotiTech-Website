// Page definitions. Each page: { path, build(ctx) -> { title, desc, active, body } }
import { ui } from './site.mjs';
import { home, about, services, contact } from './content/company.mjs';
import { extras, status } from './content/extras.mjs';
import { workflow, workflowModules } from './content/workflow.mjs';
import { sdb, sdbModules } from './content/sdb.mjs';
import { icon, arrow, art, card, steps, checkList, sectionHead, ctaBand } from './templates.mjs';

export const solutions = [
  { meta: workflow, modules: workflowModules },
  { meta: sdb, modules: sdbModules },
];
export { services };

const c = ui.common;

const crumbs = (ctx, list) => `
<nav class="crumbs" aria-label="Breadcrumb">
  <a href="${ctx.href('')}">${ctx.t(c.breadcrumbHome)}</a>
  ${list.map(([h, l]) => `<span class="sep">/</span>${h ? `<a href="${h}">${l}</a>` : `<span aria-current="page">${l}</span>`}`).join('')}
</nav>`;

const pageHero = (ctx, { crumbList, eyebrow, title, lead, extra = '' }) => `
<section class="page-hero"><div class="container">
  ${crumbList ? crumbs(ctx, crumbList) : ''}
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h1>${title}</h1>
  <p class="lead">${lead}</p>
  ${extra}
</div></section>`;

// ---------- solution cards used on home & solutions index ----------
const solutionCard = (ctx, s, big = false) => {
  const t = ctx.t;
  const m = s.meta;
  return `
<article class="sol-card ${m.id}">
  <div class="sol-art">${art(m.id)}</div>
  <div class="sol-body">
    <span class="chip">${t(c.solution)} · ${s.modules.length} ${t(c.modules)}</span>
    <h3>${t(m.name)}${m.full ? ` <small>${t(m.full)}</small>` : ''}</h3>
    <p>${t(m.summary)}</p>
    <div class="row-actions">
      <a class="btn btn-primary btn-sm" href="${ctx.href(`solutions/${m.id}/`)}">${t(c.learnMore)}${arrow()}</a>
      <a class="btn btn-ghost btn-sm" href="${ctx.href(`docs/${m.id}/`)}">${t(c.viewDocs)}</a>
    </div>
  </div>
</article>`;
};

const serviceCards = (ctx) =>
  `<div class="grid grid-2">${services.items.map((s) => card({
    href: ctx.href(`services/${s.id}/`), ic: s.icon, title: ctx.t(s.title), desc: ctx.t(s.summary), cta: ctx.t(c.learnMore),
  })).join('')}</div>`;

// ---------- HOME ----------
function homePage(ctx) {
  const t = ctx.t;
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${t(home.eyebrow)}</p>
      <h1>${t(home.title)}</h1>
      <p class="lead">${t(home.lead)}</p>
      <div class="row-actions">
        <a class="btn btn-primary" href="${ctx.href('solutions/')}">${t(c.explore)} ${t(ui.nav.solutions)}${arrow()}</a>
        <a class="btn btn-ghost" href="${ctx.href('contact/')}">${t(ui.nav.talk)}</a>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="float f1">${art('workflow')}</div>
      <div class="float f2">${art('sdb')}</div>
    </div>
  </div>
  <div class="container"><ul class="pillars">
    ${home.pillars.map((p) => `<li><span class="badge-ico sm">${icon(p.icon)}</span><div><strong>${t(p.t)}</strong><small>${t(p.d)}</small></div></li>`).join('')}
  </ul></div>
</section>

<section class="section"><div class="container">
  ${sectionHead(t(ui.nav.solutions), t(home.solutionsHead.t), t(home.solutionsHead.d))}
  <div class="sol-list">${solutions.map((s) => solutionCard(ctx, s)).join('')}</div>
</div></section>

<section class="section alt"><div class="container">
  ${sectionHead(t(ui.nav.services), t(home.servicesHead.t), t(home.servicesHead.d))}
  ${serviceCards(ctx)}
</div></section>

<section class="section"><div class="container">
  ${sectionHead(t(c.ourApproach), t(home.processHead))}
  ${steps(home.process.map((p) => ({ t: t(p.t), d: t(p.d) })))}
</div></section>

<section class="section alt"><div class="container">
  ${sectionHead('', t(home.whyHead))}
  <div class="grid grid-4">${home.why.map((w) => card({ ic: w.icon, title: t(w.t), desc: t(w.d) })).join('')}</div>
</div></section>

${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(ui.nav.home), desc: t(home.lead), active: 'home', body };
}

// ---------- ABOUT ----------
function aboutPage(ctx) {
  const t = ctx.t;
  const body = `
${pageHero(ctx, { crumbList: [[null, t(ui.nav.about)]], eyebrow: t(ui.nav.about), title: t(about.title), lead: t(about.lead) })}
<section class="section"><div class="container two-col">
  <div><h2>${t(about.storyHead)}</h2>${t(about.story).map((p) => `<p class="prose">${p}</p>`).join('')}</div>
  <div class="stack">
    <div class="card feature">${`<span class="badge-ico">${icon(about.mission.icon)}</span>`}<h3>${t(about.mission.t)}</h3><p>${t(about.mission.d)}</p></div>
    <div class="card feature">${`<span class="badge-ico">${icon(about.vision.icon)}</span>`}<h3>${t(about.vision.t)}</h3><p>${t(about.vision.d)}</p></div>
  </div>
</div></section>
<section class="section alt"><div class="container">
  ${sectionHead('', t(about.valuesHead))}
  <div class="grid grid-4">${about.values.map((v) => card({ ic: v.icon, title: t(v.t), desc: t(v.d) })).join('')}</div>
</div></section>
<section class="section"><div class="container two-col">
  <div><h2>${t(about.expertiseHead)}</h2></div>
  <div>${checkList(t(about.expertise))}</div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(about.title), desc: t(about.lead), active: 'about', body };
}

// ---------- SERVICES ----------
function servicesIndex(ctx) {
  const t = ctx.t;
  const body = `
${pageHero(ctx, { crumbList: [[null, t(ui.nav.services)]], eyebrow: t(ui.nav.services), title: t(services.title), lead: t(services.lead) })}
<section class="section"><div class="container">
  <div class="grid grid-2">${services.items.map((s) => `
    <article class="card big">
      <span class="badge-ico lg">${icon(s.icon)}</span>
      <h3>${t(s.title)}</h3><p>${t(s.lead)}</p>
      ${checkList(t(s.delivers).slice(0, 3))}
      <a class="btn btn-primary btn-sm" href="${ctx.href(`services/${s.id}/`)}">${t(c.learnMore)}${arrow()}</a>
    </article>`).join('')}</div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(services.title), desc: t(services.lead), active: 'services', body };
}

function servicePage(ctx, s) {
  const t = ctx.t;
  const body = `
${pageHero(ctx, { crumbList: [[ctx.href('services/'), t(ui.nav.services)], [null, t(s.title)]], eyebrow: t(c.service), title: t(s.title), lead: t(s.lead) })}
<section class="section"><div class="container">
  ${sectionHead('', t(s.coverHead))}
  <div class="grid grid-3">${s.cover.map((x) => card({ ic: x.icon, title: t(x.t), desc: t(x.d) })).join('')}</div>
</div></section>
<section class="section alt"><div class="container">
  ${sectionHead('', t(s.phasesHead))}
  ${steps(s.phases.map((p) => ({ t: t(p.t), d: t(p.d) })))}
</div></section>
<section class="section"><div class="container two-col">
  <div><h2>${t(s.deliversHead)}</h2><p class="prose">${t(s.summary)}</p></div>
  <div>${checkList(t(s.delivers))}</div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(s.title), desc: t(s.summary), active: 'services', body };
}

// ---------- SOLUTIONS ----------
function solutionsIndex(ctx) {
  const t = ctx.t;
  const body = `
${pageHero(ctx, { crumbList: [[null, t(ui.nav.solutions)]], eyebrow: t(ui.nav.solutions), title: t(home.solutionsHead.t), lead: t(home.solutionsHead.d) })}
<section class="section"><div class="container"><div class="sol-list">${solutions.map((s) => solutionCard(ctx, s)).join('')}</div></div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(ui.nav.solutions), desc: t(home.solutionsHead.d), active: 'solutions', body };
}

const moduleCard = (ctx, sol, m) => card({
  href: ctx.href(`docs/${sol.meta.id}/${m.id}/`), ic: m.icon, title: ctx.t(m.title), desc: ctx.t(m.summary), cta: ctx.t(c.viewDocs),
});

// Company-site overview of a solution (company nav). "Show system" leads into the system's own pages.
function solutionOverview(ctx, sol) {
  const t = ctx.t;
  const m = sol.meta;
  const x = extras[m.id];
  const sys = (p = '') => ctx.href(`systems/${m.id}/${p}`);
  const body = `
<section class="page-hero solution ${m.id}"><div class="container hero-grid">
  <div>
    ${crumbs(ctx, [[ctx.href('solutions/'), t(ui.nav.solutions)], [null, t(m.name)]])}
    <p class="eyebrow">${t(c.solution)}${m.full ? ` · ${t(m.full)}` : ''}</p>
    <h1>${t(m.name)}</h1>
    <p class="lead">${t(m.tagline)}</p>
    <p class="prose">${t(m.summary)}</p>
    <div class="row-actions">
      <a class="btn btn-primary" href="${sys()}">${t(c.showSystem)}${arrow()}</a>
      <a class="btn btn-ghost" href="${sys('demo/')}">${t(ui.solNav.demo)}</a>
    </div>
  </div>
  <div class="hero-art">${art(m.id)}</div>
</div></section>

<section class="section"><div class="container">
  <div class="grid grid-3">${m.value.map((v) => card({ ic: v.icon, title: t(v.t), desc: t(v.d) })).join('')}</div>
</div></section>

<section class="section alt"><div class="container">
  ${sectionHead('', t(c.insideHead), '')}
  <div class="grid grid-3">
    ${card({ href: ctx.href(`docs/${m.id}/`), ic: 'book', title: t(ui.solNav.docs), desc: `${sol.modules.length} ${t(c.modules)} — ${t(c.docsDesc)}`, cta: t(c.viewDocs) })}
    ${card({ href: sys('use-cases/'), ic: 'target', title: t(ui.solNav.useCases), desc: t(x.useCasesLead), cta: t(c.learnMore) })}
    ${card({ href: sys('upcoming/'), ic: 'zap', title: t(ui.solNav.upcoming), desc: t(x.upcomingLead), cta: t(c.learnMore) })}
  </div>
  <div class="row-actions"><a class="btn btn-primary" href="${sys()}">${t(c.showSystem)}${arrow()}</a></div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(m.name), desc: t(m.tagline), active: 'solutions', body };
}

// The system's own home page (solution nav)
function systemHome(ctx, sol) {
  const t = ctx.t;
  const m = sol.meta;
  const byId = Object.fromEntries(sol.modules.map((x) => [x.id, x]));
  const body = `
<section class="page-hero solution ${m.id}"><div class="container hero-grid">
  <div>
    ${crumbs(ctx, [[ctx.href('solutions/'), t(ui.nav.solutions)], [null, t(m.name)]])}
    <p class="eyebrow">${t(c.solution)}${m.full ? ` · ${t(m.full)}` : ''}</p>
    <h1>${t(m.name)}</h1>
    <p class="lead">${t(m.tagline)}</p>
    <p class="prose">${t(m.summary)}</p>
    <div class="row-actions">
      <a class="btn btn-primary" href="${ctx.href(`docs/${m.id}/`)}">${t(c.viewDocs)}${arrow()}</a>
      <a class="btn btn-ghost" href="${ctx.href(`systems/${m.id}/demo/`)}">${t(ui.solNav.demo)}</a>
    </div>
  </div>
  <div class="hero-art">${art(m.id)}</div>
</div></section>

<section class="section"><div class="container">
  ${sectionHead('', t(m.fitHead))}
  <div class="fit">${m.fitGroups.map((g, i) => `
    <div class="fit-col"><span class="fit-label"><b>${i + 1}</b>${t(m.fit)[i]}</span>
      ${g.map((id) => `<a class="fit-chip" href="${ctx.href(`docs/${m.id}/${id}/`)}">${icon(byId[id].icon)}${t(byId[id].title)}</a>`).join('')}
    </div>`).join('')}</div>
</div></section>

<section class="section alt"><div class="container">
  ${sectionHead(t(ui.nav.docs), `${t(m.name)} — ${sol.modules.length} ${t(c.modules)}`, '')}
  <div class="grid grid-3">${sol.modules.map((x) => moduleCard(ctx, sol, x)).join('')}</div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: t(m.name), desc: t(m.tagline), active: 'solutions', solution: sol, sub: 'overview', body };
}

// Shared hero for a solution's sub-pages (use cases, upcoming, demo)
const solSubHero = (ctx, sol, eyebrow, title, lead) => `
<section class="page-hero solution ${sol.meta.id} compact"><div class="container">
  ${crumbs(ctx, [[ctx.href('solutions/'), ctx.t(ui.nav.solutions)], [ctx.href(`systems/${sol.meta.id}/`), ctx.t(sol.meta.name)], [null, title]])}
  <p class="eyebrow">${eyebrow}</p>
  <h1>${title}</h1>
  <p class="lead">${lead}</p>
</div></section>`;

function useCasesPage(ctx, sol) {
  const t = ctx.t;
  const x = extras[sol.meta.id];
  const title = t(ui.solNav.useCases);
  const body = `
${solSubHero(ctx, sol, t(sol.meta.name), title, t(x.useCasesLead))}
<section class="section"><div class="container">
  <div class="grid grid-2">${x.useCases.map((u) => `
    <article class="card big">
      <span class="badge-ico lg">${icon(u.icon)}</span>
      <h3>${t(u.title)}</h3><p>${t(u.desc)}</p>
      ${checkList(t(u.outcomes))}
    </article>`).join('')}</div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: `${title} — ${t(sol.meta.name)}`, desc: t(x.useCasesLead), active: 'solutions', solution: sol, sub: 'use-cases', body };
}

function upcomingPage(ctx, sol) {
  const t = ctx.t;
  const x = extras[sol.meta.id];
  const title = t(ui.solNav.upcoming);
  const body = `
${solSubHero(ctx, sol, t(sol.meta.name), title, t(x.upcomingLead))}
<section class="section"><div class="container">
  <div class="grid grid-2">${x.upcoming.map((u) => `
    <article class="card big upcoming">
      <div class="up-top"><span class="badge-ico lg">${icon(u.icon)}</span><span class="status ${u.status}">${t(status[u.status])}</span></div>
      <h3>${t(u.title)}</h3><p>${t(u.desc)}</p>
    </article>`).join('')}</div>
</div></section>
${ctaBand(ctx, t(home.cta.t), t(home.cta.d))}`;
  return { title: `${title} — ${t(sol.meta.name)}`, desc: t(x.upcomingLead), active: 'solutions', solution: sol, sub: 'upcoming', body };
}

function demoPage(ctx, sol) {
  const t = ctx.t;
  const d = ui.demo;
  const f = ui.contact;
  const name = t(sol.meta.name);
  const title = `${t(d.title)} — ${name}`;
  const body = `
${solSubHero(ctx, sol, name, t(d.title), t(d.lead))}
<section class="section"><div class="container two-col wide-left">
  <form class="form card" data-contact-form data-to="mailto:hello@yaquotitech.com" data-subject="${t(d.subject)}">
    <input type="hidden" name="interest" value="${name}">
    <label>${t(f.name)}<input name="name" required autocomplete="name"></label>
    <label>${t(f.email)}<input name="email" type="email" required autocomplete="email"></label>
    <label>${t(f.company)}<input name="company" autocomplete="organization"></label>
    <label>${t(d.message)}<textarea name="message" rows="5" required></textarea></label>
    <button class="btn btn-primary" type="submit">${t(d.send)}${arrow()}</button>
    <p class="hint">${t(f.note)}</p>
  </form>
  <div class="card feature">
    <span class="badge-ico">${icon('target')}</span>
    <h3>${t(d.expect)}</h3>
    ${checkList(t(d.points))}
  </div>
</div></section>`;
  return { title, desc: t(d.lead), active: 'solutions', solution: sol, sub: 'demo', body };
}

// ---------- DOCS ----------
function docsSidebar(ctx, sol, currentId) {
  const t = ctx.t;
  const m = sol.meta;
  const byId = Object.fromEntries(sol.modules.map((x) => [x.id, x]));
  return `
<aside class="docs-side" id="docs-side">
  <input class="filter" type="search" placeholder="${t(c.searchModules)}" aria-label="${t(c.searchModules)}" data-filter>
  <nav aria-label="${t(ui.nav.docs)}">
    <a class="side-link ${currentId === '' ? 'on' : ''}" href="${ctx.href(`docs/${m.id}/`)}">${icon('book')}${t(c.gettingStarted)}</a>
    ${m.fitGroups.map((g, i) => `
      <p class="side-group">${t(m.fit)[i]}</p>
      ${g.map((id) => `<a class="side-link ${currentId === id ? 'on' : ''}" data-name="${t(byId[id].title).toLowerCase()}" href="${ctx.href(`docs/${m.id}/${id}/`)}">${icon(byId[id].icon)}${t(byId[id].title)}</a>`).join('')}`).join('')}
  </nav>
</aside>`;
}

const docsShell = (ctx, sol, currentId, inner, toc) => `
<div class="container docs-layout">
  <button class="btn btn-ghost btn-sm side-toggle" type="button" data-side-toggle>${icon('menu')}${ctx.t(c.allModules)}</button>
  ${docsSidebar(ctx, sol, currentId)}
  <article class="doc">${inner}</article>
  ${toc ? `<aside class="toc" aria-label="${ctx.t(c.onThisPage)}"><p>${ctx.t(c.onThisPage)}</p>${toc.map(([id, l]) => `<a href="#${id}">${l}</a>`).join('')}</aside>` : '<span></span>'}
</div>`;

function docsSolutionHome(ctx, sol) {
  const t = ctx.t;
  const m = sol.meta;
  const inner = `
${crumbs(ctx, [[ctx.href('solutions/'), t(ui.nav.solutions)], [ctx.href(`systems/${m.id}/`), t(m.name)], [null, t(ui.nav.docs)]])}
<h1>${t(m.name)} — ${t(ui.nav.docs)}</h1>
<p class="lead">${t(m.summary)}</p>
<h2 id="quick-start">${t(c.gettingStarted)}</h2>
<ol class="num-list">${t(m.gettingStarted.steps).map((s) => `<li>${s}</li>`).join('')}</ol>
<h2 id="modules">${t(c.allModules)}</h2>
<div class="grid grid-2">${sol.modules.map((x) => moduleCard(ctx, sol, x)).join('')}</div>`;
  return {
    title: `${t(m.name)} — ${t(ui.nav.docs)}`, desc: t(m.summary), active: 'solutions', solution: sol, sub: 'docs',
    body: docsShell(ctx, sol, '', inner, [['quick-start', t(c.gettingStarted)], ['modules', t(c.allModules)]]),
  };
}

function docsModulePage(ctx, sol, idx) {
  const t = ctx.t;
  const m = sol.meta;
  const x = sol.modules[idx];
  const prev = sol.modules[idx - 1];
  const next = sol.modules[idx + 1];
  const toc = [['overview', t(c.overview)], ['capabilities', t(c.capabilities)], ['how-it-works', t(c.howItWorks)], ['configuration', t(c.configuration)], ['faq', t(c.faq)]];
  const inner = `
${crumbs(ctx, [[ctx.href(`systems/${m.id}/`), t(m.name)], [ctx.href(`docs/${m.id}/`), t(ui.nav.docs)], [null, t(x.title)]])}
<p class="eyebrow">${t(c.module)} ${idx + 1} / ${sol.modules.length}</p>
<h1><span class="badge-ico">${icon(x.icon)}</span>${t(x.title)}</h1>
<p class="lead">${t(x.summary)}</p>

<h2 id="overview">${t(c.overview)}</h2>
<p class="prose">${t(x.overview)}</p>

<h2 id="capabilities">${t(c.capabilities)}</h2>
${checkList(t(x.features))}

<h2 id="how-it-works">${t(c.howItWorks)}</h2>
<ol class="num-list">${t(x.steps).map((s) => `<li>${s}</li>`).join('')}</ol>

<h2 id="configuration">${t(c.configuration)}</h2>
<div class="table-wrap"><table class="table">
  <thead><tr><th>${t(c.setting)}</th><th>${t(c.description)}</th></tr></thead>
  <tbody>${t(x.config).map(([a, b]) => `<tr><td><code>${a}</code></td><td>${b}</td></tr>`).join('')}</tbody>
</table></div>

<h2 id="faq">${t(c.faq)}</h2>
<div class="faq">${t(x.faq).map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>

<nav class="pager" aria-label="Pager">
  ${prev ? `<a class="pg prev" href="${ctx.href(`docs/${m.id}/${prev.id}/`)}"><small>${t(c.previous)}</small><span>${t(prev.title)}</span></a>` : '<span></span>'}
  ${next ? `<a class="pg next" href="${ctx.href(`docs/${m.id}/${next.id}/`)}"><small>${t(c.next)}</small><span>${t(next.title)}</span></a>` : '<span></span>'}
</nav>`;
  return {
    title: `${t(x.title)} — ${t(m.name)}`, desc: t(x.summary), active: 'solutions', solution: sol, sub: 'docs',
    body: docsShell(ctx, sol, x.id, inner, toc),
  };
}

// ---------- CONTACT ----------
function contactPage(ctx) {
  const t = ctx.t;
  const f = ui.contact;
  const body = `
${pageHero(ctx, { crumbList: [[null, t(ui.nav.contact)]], eyebrow: t(ui.nav.contact), title: t(contact.title), lead: t(contact.lead) })}
<section class="section"><div class="container two-col wide-left">
  <form class="form card" data-contact-form data-to="mailto:${'hello@yaquotitech.com'}">
    <label>${t(f.name)}<input name="name" required autocomplete="name"></label>
    <label>${t(f.email)}<input name="email" type="email" required autocomplete="email"></label>
    <label>${t(f.company)}<input name="company" autocomplete="organization"></label>
    <label>${t(f.interest)}<select name="interest">${t(f.opts).map((o) => `<option>${o}</option>`).join('')}</select></label>
    <label>${t(f.message)}<textarea name="message" rows="5" required></textarea></label>
    <button class="btn btn-primary" type="submit">${t(f.send)}${arrow()}</button>
    <p class="hint">${t(f.note)}</p>
  </form>
  <div class="stack">${contact.channels.map((ch) => `
    <div class="card feature"><span class="badge-ico">${icon(ch.icon)}</span><h3>${t(ch.t)}</h3><p>${t(ch.d)}</p></div>`).join('')}</div>
</div></section>`;
  return { title: t(contact.title), desc: t(contact.lead), active: 'contact', body };
}

// ---------- page registry ----------
export function pageList() {
  const pages = [
    { path: '', build: homePage },
    { path: 'about/', build: aboutPage },
    { path: 'services/', build: servicesIndex },
    ...services.items.map((s) => ({ path: `services/${s.id}/`, build: (ctx) => servicePage(ctx, s) })),
    { path: 'solutions/', build: solutionsIndex },
    { path: 'contact/', build: contactPage },
  ];
  for (const sol of solutions) {
    pages.push({ path: `solutions/${sol.meta.id}/`, build: (ctx) => solutionOverview(ctx, sol) });
    pages.push({ path: `systems/${sol.meta.id}/`, build: (ctx) => systemHome(ctx, sol) });
    pages.push({ path: `systems/${sol.meta.id}/use-cases/`, build: (ctx) => useCasesPage(ctx, sol) });
    pages.push({ path: `systems/${sol.meta.id}/upcoming/`, build: (ctx) => upcomingPage(ctx, sol) });
    pages.push({ path: `systems/${sol.meta.id}/demo/`, build: (ctx) => demoPage(ctx, sol) });
    pages.push({ path: `docs/${sol.meta.id}/`, build: (ctx) => docsSolutionHome(ctx, sol) });
    sol.modules.forEach((_, i) => pages.push({ path: `docs/${sol.meta.id}/${sol.modules[i].id}/`, build: (ctx) => docsModulePage(ctx, sol, i) }));
  }
  return pages;
}
