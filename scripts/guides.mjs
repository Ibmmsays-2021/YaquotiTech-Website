// Turns the Markdown user guides in docs-src/workflow into src/app/content/products/workflow/guides.generated.ts.
//
// The guides are written outside this repo (the Yaquoti user-guide workspace) and copied into
// docs-src/ unchanged. Converting them here, rather than shipping a Markdown library to the browser,
// keeps the prerendered pages complete and adds no dependency. The converter covers the Markdown the
// guides use (headings, paragraphs, lists, tables, block-quote callouts, fenced code, inline marks
// and links) and nothing more; extend it if a guide starts using something new.
//
// Each guide is one long file. On the site it is split into focused pages by content type, the way
// large documentation sites organise a product area (Diátaxis):
//   overview   – what the module is, prerequisites, getting around, related topics (the module's landing page)
//   concepts   – key concepts, statuses and lifecycle
//   tasks      – one how-to page per group of tasks
//   reference  – field reference, permissions, notifications
//   help       – tips, troubleshooting, FAQ
// The `## ` section titles decide where each part goes (see KINDS). Cross-references between the
// parts are resolved after splitting, so a guide's "#anchor" links still land on the right page.
//
// Run: node scripts/guides.mjs   (also runs before `npm start` and `npm run build`)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'docs-src', 'workflow');
const out = join(root, 'src', 'app', 'content', 'products', 'workflow', 'guides.generated.ts');

/**
 * The published help articles, in sidebar order. Each group is one sidebar heading; each entry is a
 * Markdown file in docs-src/workflow/<section>/<page>.md, copied unchanged from the guide workspace
 * (C:\Yaquoti-User-Guide\docs). The page id in the URL is the file name. Links between articles
 * ("../administration/system-roles.md") resolve to the published page; links to an article that
 * isn't listed keep their words and lose the link.
 */
const GROUPS = [
  { label: 'Your workspace', section: 'requests', icon: 'compass', pages: ['home', 'notifications', 'announcements'] },
  {
    label: 'Raise and follow requests',
    section: 'requests',
    icon: 'inbox',
    pages: ['new-request-choose', 'new-request-submit', 'requests-list', 'request-details', 'request-history', 'conversations-and-activities', 'print-and-export'],
  },
  {
    label: 'Approve & manage requests',
    section: 'requests',
    icon: 'check',
    pages: ['pick-up-and-assign', 'decide-on-a-step', 'hold-for-correction', 'cancel-and-reopen', 'sub-requests', 'dynamic-actions', 'request-sla', 'incidents', 'backup-approvals'],
  },
  { label: 'Customer portal', section: 'requests', icon: 'globe', pages: ['customer-portal-new-request', 'customer-portal-inquiry'] },
  { label: 'Service catalog', section: 'process-design', icon: 'layers', pages: ['service-catalog', 'process-basic', 'process-lifecycle', 'process-templates'] },
  {
    label: 'Process groups',
    section: 'process-design',
    icon: 'users',
    pages: ['user-groups', 'approval-groups', 'activity-groups', 'request-admin-groups', 'process-groups-tab'],
  },
  {
    label: 'Process steps',
    section: 'process-design',
    icon: 'workflow',
    pages: [
      'steps-and-flow',
      'step-approver',
      'step-form-builder',
      'step-allowed-fields',
      'step-requester-actions',
      'step-approver-actions',
      'step-admin-actions',
      'step-activities',
      'step-sla',
      'step-check-list',
      'step-logic-and-automation',
    ],
  },
  { label: 'Activity center', section: 'process-design', icon: 'bell', pages: ['activity-templates', 'activity-logs'] },
  { label: 'Developer space', section: 'process-design', icon: 'code', pages: ['integrations', 'vaults-keys-and-google-forms'] },
  { label: 'Your account', section: 'administration', icon: 'key', pages: ['sign-in', 'sign-up', 'complete-your-data', 'profile-and-settings'] },
  { label: 'Organization', section: 'administration', icon: 'briefcase', pages: ['organization-structure', 'organization-roles', 'working-time', 'vendors'] },
  {
    label: 'Users and permissions',
    section: 'administration',
    icon: 'shield',
    pages: ['users', 'import-users', 'additional-fields', 'system-roles', 'positions', 'active-directory'],
  },
  { label: 'Reports', section: 'administration', icon: 'chart', pages: ['report-builder', 'saved-and-scheduled-reports', 'built-in-reports'] },
  { label: 'Knowledge base', section: 'administration', icon: 'book', pages: ['knowledge-base-articles', 'knowledge-base-management'] },
  { label: 'System settings', section: 'administration', icon: 'sliders', pages: ['email-and-sms', 'localization', 'system-information'] },
];

/** One entry per published page: an article is one page, not split by section. */
const MODULES = GROUPS.flatMap((g) =>
  g.pages.map((p) => ({ id: p, file: `${g.section}/${p}.md`, path: `${g.section}/${p}.md`, article: true, icon: g.icon })),
);
const BY_PATH = new Map(MODULES.map((m) => [m.path, m]));
const FAQ_HEADING = 'Frequently asked questions';
/** Replaced at render time with /<lang>/systems/workflow/docs, so links work in both languages. */
const DOCS = '__DOCS__';

/** Where each `## ` section goes, by its title (numbering such as "6." is ignored). */
const KINDS = [
  ['skip', /^(contents|document information)$/],
  ['overview', /^(overview|before you begin|getting around|related topics)$/],
  ['concepts', /^(key concepts|statuses and (workflow|lifecycle))$/],
  ['tasks', /^tasks\b/],
  ['reference', /^(field reference|roles and permissions|notifications( and messages)?|what triggers a notification)$/],
  ['help', /^(tips and best practices|troubleshooting|frequently asked questions)$/],
];

/** Page ids, titles and one-line descriptions for the non-task pages. Order = page order. */
const PAGE_INFO = {
  overview: { id: '', title: 'Overview', summary: 'What the module does, what you need first, and how to find your way around.' },
  concepts: { id: 'concepts', title: 'Key concepts', summary: 'The terms, statuses and lifecycle you meet in this module.' },
  reference: { id: 'reference', title: 'Reference', summary: 'Every field, permission and notification, with its rules.' },
  help: { id: 'troubleshooting', title: 'Troubleshooting and FAQ', summary: 'Best practices, error messages and their fixes, and common questions.' },
};

// ---------- helpers ----------

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** GitHub-style heading anchor, which is what the guides' own "#links" were written against. */
const slugify = (text) =>
  plain(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s/g, '-');

/** Heading or cell text without Markdown marks or review notes. */
const plain = (s) =>
  stripReview(s)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*`]/g, '')
    .trim();

/** Review notes are for the documentation team, not readers of the public site. */
const stripReview = (s) => s.replace(/\s*\[TO VERIFY:[^\]]*\]/g, '');

/** "6. Tasks: Regions" → "Tasks: Regions"; "6.2 Activate a region" → "Activate a region". */
const unnumber = (s) => s.replace(/^\d+(\.\d+)*\.?\s+/, '');

const kindOf = (title) => {
  const t = unnumber(plain(title)).toLowerCase();
  const hit = KINDS.find(([, re]) => re.test(t));
  if (!hit) console.warn(`  ! unknown section "${title}" – published on the overview page`);
  return hit ? hit[0] : 'overview';
};

/** "Tasks: Regions" / "Tasks — Users" → "Regions" / "Users". */
const taskGroupTitle = (title) => {
  const t = unnumber(plain(title)).replace(/^tasks\s*(:|—|–|-)?\s*/i, '');
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Tasks';
};

// ---------- links ----------

function resolveLink(target, ctx) {
  if (/^(https?:|mailto:)/.test(target)) return { href: target, external: true };
  const [file, frag] = target.split('#');
  if (!file) return { href: `${DOCS}/${ctx.id}#${frag}` };
  const resolved = posix.normalize(posix.join(posix.dirname(ctx.path), file));
  // "../faq.md#slug": the system FAQ section of a module, published here in that module's help page.
  if (resolved === 'faq.md') {
    const mod = MODULES.find((m) => m.id === frag && m.faq);
    return mod ? { href: `${DOCS}/${mod.id}#${slugify(FAQ_HEADING)}` } : null;
  }
  const mod = BY_PATH.get(resolved);
  if (!mod) return null; // a guide that isn't on the site: keep the words, drop the link
  return { href: `${DOCS}/${mod.id}${frag ? `#${frag}` : ''}` };
}

// ---------- inline ----------

function inline(text, ctx) {
  const codes = [];
  let s = stripReview(text).replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, target) => {
    const link = resolveLink(target.replace(/&amp;/g, '&'), ctx);
    if (!link) return label;
    const ext = link.external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${esc(link.href)}"${ext}>${label}</a>`;
  });
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
}

// ---------- blocks ----------

const LIST_RE = /^(\s*)([-*]|\d+\.)\s+(.*)$/;
const isTableSep = (l) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(l ?? '');
const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((c) => c.trim().replace(/\\\|/g, '|'));

/**
 * Headings keep the id the original document gave them (so the guide's own links still match), but
 * show without their section numbers. `ctx.shift` lifts a page's headings so its top level is H2.
 */
function heading(level, raw, ctx) {
  const id = ctx.uniqueId(slugify(raw));
  const shown = Math.max(2, level - ctx.shift);
  const label = unnumber(plain(raw));
  const text = inline(unnumber(raw), ctx);
  ctx.anchors.push(id);
  if (shown <= 3) ctx.toc.push({ id, label, level: shown });
  if (shown === 2) {
    return `<h2 class="doc-h" id="${id}">${text}<a class="permalink" href="${DOCS}/${ctx.id}#${id}" aria-label="Link to this section">#</a></h2>`;
  }
  return `<h${shown} id="${id}">${text}</h${shown}>`;
}

function table(rows, ctx) {
  const [head, ...body] = rows.map(cells);
  const td = (c, tag) => `<${tag}${tag === 'th' ? ' scope="col"' : ''}>${inline(c, ctx) || '—'}</${tag}>`;
  const thead = head.some((c) => plain(c)) ? `<thead><tr>${head.map((c) => td(c, 'th')).join('')}</tr></thead>` : '';
  const tbody = body.map((r) => `<tr>${r.map((c) => td(c, 'td')).join('')}</tr>`).join('');
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="Table"><table>${thead}<tbody>${tbody}</tbody></table></div>`;
}

function callout(lines, ctx) {
  // Help-article notes: "> 📷 Screenshot needed: …", "> ℹ️ **…**", "> ⚠️ **…**".
  const first = lines[0]?.trim() ?? '';
  const shot = /^📷\s*Screenshot needed:\s*(.+)$/.exec([first, ...lines.slice(1).map((l) => l.trim())].join(' ').trim());
  if (shot) {
    const text = plain(shot[1]);
    return `<figure class="shot" role="img" aria-label="${esc(text)}"><span class="shot-label">Screenshot</span><figcaption>${inline(shot[1], ctx)}</figcaption></figure>`;
  }
  const emoji = /^(ℹ️|⚠️|💡)\s*/.exec(first);
  if (emoji) {
    const kind = { 'ℹ️': 'note', '⚠️': 'important', '💡': 'tip' }[emoji[1]];
    const rest = [first.slice(emoji[0].length), ...lines.slice(1)];
    return `<div class="callout callout-${kind}">${blocks(rest, ctx)}</div>`;
  }
  const body = blocks(lines, ctx);
  const kind =
    /^<p><strong>(Note|Tip|Important|Caution|Warning|Remember|Before you start):?<\/strong>/i
      .exec(body)?.[1]
      ?.toLowerCase()
      .replace(/\s+/g, '-') ?? 'note';
  return `<div class="callout callout-${kind}">${body}</div>`;
}

function list(lines, ctx) {
  const ordered = /^\s*\d+\./.test(lines[0]);
  const items = [];
  for (const line of lines) {
    const m = LIST_RE.exec(line);
    if (m && m[1].length === 0) items.push([m[3]]);
    else items[items.length - 1].push(line.replace(/^ {1,4}/, ''));
  }
  const li = items.map((it) => {
    let html = blocks(it, ctx);
    // A one-paragraph item reads better without the paragraph margins.
    const single = /^<p>((?:(?!<p>).)*)<\/p>$/s.exec(html);
    if (single) html = single[1];
    return ordered ? `<li><div>${html}</div></li>` : `<li>${html}</li>`;
  });
  return ordered ? `<ol class="num-list">${li.join('')}</ol>` : `<ul class="bullets">${li.join('')}</ul>`;
}

/** Lead-ins that the guides use for a task's outcome and its preconditions. */
const PARA_CLASS = [
  [/^\*\*Result:?\*\*/, 'result'],
  [/^\*\*(Before you start|Prerequisites|Who can do this):?\*\*/, 'prereq'],
];

function blocks(lines, ctx) {
  const html = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    const text = para.join(' ').trim();
    para = [];
    const shot = /^\[Screenshot:\s*(.+)\]$/.exec(text);
    if (shot) {
      html.push(`<figure class="shot" role="img" aria-label="${esc(shot[1])}"><span class="shot-label">Screenshot</span><figcaption>${inline(shot[1], ctx)}</figcaption></figure>`);
    } else if (stripReview(text)) {
      const cls = PARA_CLASS.find(([re]) => re.test(text))?.[1];
      html.push(`<p${cls ? ` class="${cls}"` : ''}>${inline(text, ctx)}</p>`);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) { flush(); continue; }
    if (/^<!--.*-->\s*$/.test(line.trim())) continue;
    if (/^\s*```/.test(line)) {
      flush();
      const lang = line.trim().slice(3).trim();
      const code = [];
      while (++i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i]);
      // Mermaid needs a renderer the site doesn't ship; every diagram in the guides repeats a table next to it.
      if (lang !== 'mermaid') html.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`);
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) { flush(); html.push(heading(h[1].length, h[2], ctx)); continue; }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { flush(); continue; }
    if (line.trim().startsWith('|') && isTableSep(lines[i + 1])) {
      flush();
      const rows = [line];
      i++;
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) rows.push(lines[++i]);
      html.push(table(rows, ctx));
      continue;
    }
    if (/^\s*>/.test(line)) {
      flush();
      const q = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) q.push(lines[i++].replace(/^\s*>\s?/, ''));
      i--;
      html.push(callout(q, ctx));
      continue;
    }
    const li = LIST_RE.exec(line);
    if (li && li[1].length === 0) {
      flush();
      const ordered = /\d/.test(li[2]);
      const items = [line];
      while (i + 1 < lines.length) {
        const next = lines[i + 1];
        const nm = LIST_RE.exec(next);
        if (nm && nm[1].length === 0 && /\d/.test(nm[2]) === ordered) items.push(lines[++i]);
        else if (/^\s{2,}\S/.test(next)) items.push(lines[++i]);
        else if (!next.trim()) {
          // A blank line ends the list unless the item carries on (indented) after it.
          let j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && /^\s{2,}\S/.test(lines[j])) { i = j - 1; items.push(''); }
          else break;
        } else break;
      }
      html.push(list(items, ctx));
      continue;
    }
    para.push(line.trim());
  }
  flush();
  return html.join('\n');
}

// ---------- splitting ----------

/** Split lines into a preamble and sections that start with a heading of `level` (2 = "## "). */
function splitAt(lines, level) {
  const re = new RegExp(`^#{${level}}\\s+(.*)$`);
  const parts = [{ title: null, lines: [] }];
  for (const line of lines) {
    const h = re.exec(line);
    if (h) parts.push({ title: h[1].trim(), lines: [line] });
    else parts[parts.length - 1].lines.push(line);
  }
  return parts;
}

/** The glossary's per-module part lists every module, written or not: keep only real terms. */
function glossaryLines(md) {
  const keep = [];
  let block = [];
  let inByModule = false;
  const flushBlock = () => {
    if (block.some((l) => l.trim().startsWith('|'))) keep.push(...block);
    block = [];
  };
  for (const line of md.split(/\r?\n/)) {
    if (/^##\s/.test(line)) {
      flushBlock();
      inByModule = /Terms by module/.test(line);
      keep.push(line);
      continue;
    }
    if (inByModule && /^###\s/.test(line)) { flushBlock(); block.push(line); continue; }
    if (inByModule && /^\s*-\s+\[/.test(line)) continue; // the module index; the page TOC replaces it
    (inByModule && block.length ? block : keep).push(line);
  }
  flushBlock();
  return keep.join('\n');
}

function renderModule(mod) {
  let md = readFileSync(join(src, mod.file), 'utf8');
  if (mod.glossary) md = glossaryLines(md);
  const lines = md.split(/\r?\n/);
  const used = new Map();
  const uniqueId = (base) => {
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
  const newCtx = (shift = 0, path = mod.path) => ({ id: mod.id, path, shift, toc: [], anchors: [], uniqueId });

  const [pre, ...secs] = splitAt(lines, 2);

  // The page shows the title and lead itself: take them from the H1 and the paragraph under it.
  const preLines = pre.lines.filter((l) => !/^<!--/.test(l.trim()));
  const h1 = preLines.findIndex((l) => /^#\s/.test(l));
  const title = h1 >= 0 ? plain(preLines[h1].replace(/^#\s+/, '')) : mod.id;
  let intro = preLines.slice(h1 + 1);
  // Help articles open with a "📷 Screenshot needed" note: keep it as the page's screenshot box, but
  // take the lead from the paragraph after it.
  const shots = [];
  while (intro.length && (!intro[0].trim() || /^>\s*📷/.test(intro[0].trim()))) {
    const line = intro.shift();
    if (line.trim()) shots.push(line);
  }
  const first = intro.findIndex((l) => l.trim());
  let summary = '';
  if (first >= 0 && !/^[#>|\-*\d]/.test(intro[first].trim())) {
    let end = first;
    while (end < intro.length && intro[end].trim()) end++;
    summary = plain(intro.slice(first, end).join(' '));
    intro = intro.slice(end);
  }
  intro = [...shots, '', ...intro];

  // The glossary is looked up, not read through, and a help article is short: each is one page.
  if (mod.glossary || mod.article) {
    const ctx = newCtx();
    const html = [blocks(intro, ctx), ...secs.map((s) => blocks(s.lines, ctx))].filter(Boolean).join('\n');
    const kind = mod.glossary ? 'glossary' : 'tasks';
    const items = ctx.toc.filter((t) => t.level === 2 && !/^related topics$/i.test(t.label)).map((t) => t.label);
    return { id: mod.id, title, summary, pages: [{ id: '', kind, title, summary, items, toc: ctx.toc, anchors: ctx.anchors, html }] };
  }

  /** One page from whole `## ` sections, in document order. */
  const sectionPage = (kind, sections) => {
    if (!sections.length && kind !== 'overview') return null;
    const ctx = newCtx();
    const parts = kind === 'overview' ? [blocks(intro, ctx)] : [];
    for (const s of sections) {
      if (mod.faq && unnumber(plain(s.title)) === FAQ_HEADING) {
        // The guide only points at the system FAQ; publish this module's questions in its place.
        parts.push(blocks([s.lines[0]], ctx));
        const faq = readFileSync(join(src, mod.faq), 'utf8').split(/\r?\n/);
        const faqCtx = { ...ctx, path: 'faq.md', shift: 0 };
        parts.push(`<div class="faq-list">${blocks(faq, faqCtx)}</div>`);
        continue;
      }
      parts.push(blocks(s.lines, ctx));
    }
    const info = PAGE_INFO[kind];
    return {
      id: info.id,
      kind,
      title: info.title,
      summary: info.summary,
      items: ctx.toc.filter((t) => t.level === 2).map((t) => t.label),
      toc: ctx.toc,
      anchors: ctx.anchors,
      html: parts.filter(Boolean).join('\n'),
    };
  };

  /** One how-to page: an optional intro, then each task as its own card. */
  const taskPage = (pageTitle, introLines, tasks, sectionIds) => {
    const ctx = newCtx(1);
    const parts = [];
    const lead = blocks(introLines, ctx);
    if (lead) parts.push(`<div class="page-intro">${lead}</div>`);
    for (const t of tasks) parts.push(`<section class="task">\n${blocks(t.lines, ctx)}\n</section>`);
    const items = ctx.toc.filter((t) => t.level === 2).map((t) => t.label);
    return {
      id: slugify(pageTitle).replace(/-+/g, '-'),
      kind: 'tasks',
      title: pageTitle,
      summary: items.length ? `${items.length} task${items.length > 1 ? 's' : ''}: ${items.slice(0, 3).join(', ')}${items.length > 3 ? '…' : '.'}` : '',
      items,
      toc: ctx.toc,
      anchors: ctx.anchors,
      html: parts.join('\n'),
      sectionIds,
    };
  };

  const byKind = { overview: [], concepts: [], tasks: [], reference: [], help: [] };
  for (const s of secs) {
    const k = kindOf(s.title);
    if (k !== 'skip') byKind[k].push(s);
  }

  const taskPages = [];
  for (const s of byKind.tasks) {
    // Drop the "## …" line itself: on its own page the group title is the page title.
    const [intro, ...tasks] = splitAt(s.lines.slice(1), 3);
    const sectionId = slugify(s.title);
    if (mod.taskGroups && taskGroupTitle(s.title) === 'Tasks') {
      const byTitle = new Map(tasks.map((t) => [plain(t.title), t]));
      for (const g of mod.taskGroups) {
        const picked = g.tasks.map((name) => {
          const t = byTitle.get(name);
          if (!t) throw new Error(`${mod.id}: task "${name}" not found`);
          byTitle.delete(name);
          return t;
        });
        taskPages.push(taskPage(g.title, taskPages.length ? [] : intro.lines, picked, taskPages.length ? [] : [sectionId]));
      }
      if (byTitle.size) throw new Error(`${mod.id}: tasks not in any group: ${[...byTitle.keys()].join(', ')}`);
    } else {
      taskPages.push(taskPage(taskGroupTitle(s.title), intro.lines, tasks, [sectionId]));
    }
  }

  const pages = [
    sectionPage('overview', byKind.overview),
    sectionPage('concepts', byKind.concepts),
    ...taskPages,
    sectionPage('reference', byKind.reference),
    sectionPage('help', byKind.help),
  ].filter(Boolean);

  return { id: mod.id, title, summary, pages };
}

// ---------- cross-references ----------

/**
 * Links were written against the single long document ("#activate-a-group"). Now that the anchors
 * live on different pages, point every link at the page that holds its anchor.
 */
function resolveAnchors(guides) {
  const where = new Map(); // "module#anchor" → page id
  for (const g of guides) {
    for (const p of g.pages) {
      for (const a of p.anchors) where.set(`${g.id}#${a}`, p.id);
      // A section heading that became a page title has no anchor of its own: send it to the page.
      for (const s of p.sectionIds ?? []) where.set(`${g.id}#${s}`, p.id);
    }
  }
  let broken = 0;
  for (const g of guides) {
    for (const p of g.pages) {
      p.html = p.html.replace(/href="__DOCS__\/([a-z0-9-]+)(?:#([^"]*))?"/g, (_, mod, frag) => {
        const target = guides.find((x) => x.id === mod);
        if (!target) { broken++; return `href="${DOCS}/${mod}"`; }
        if (!frag) return `href="${DOCS}/${mod}"`;
        const page = where.get(`${mod}#${frag}`);
        if (page === undefined) {
          broken++;
          console.warn(`  ! ${g.id}/${p.id || '(overview)'}: no anchor "${mod}#${frag}"`);
          return `href="${DOCS}/${mod}"`;
        }
        // A page's own anchor that is just its title needs no fragment.
        const isPageTitle = target.pages.find((x) => x.id === page)?.sectionIds?.includes(frag);
        return `href="${DOCS}/${mod}${page ? `/${page}` : ''}${isPageTitle ? '' : `#${frag}`}"`;
      });
    }
  }
  return broken;
}

// ---------- output ----------

const guides = MODULES.map(renderModule);
const broken = resolveAnchors(guides);
for (const g of guides) for (const p of g.pages) { delete p.anchors; delete p.sectionIds; }

const body = guides.map((g) => `  ${JSON.stringify(g.id)}: ${JSON.stringify(g, null, 2).replace(/\n/g, '\n  ')},`).join('\n');
writeFileSync(
  out,
  `// Generated by scripts/guides.mjs from docs-src/workflow. Do not edit: change the Markdown and run the script.\n` +
    `import type { GuideContent, IconName } from '../../types';\n\n` +
    `export const GUIDES: Readonly<Record<string, GuideContent>> = {\n${body}\n};\n\n` +
    `/** Sidebar groups, in order: each lists its page ids and the icon its pages use. */\n` +
    `export const GUIDE_GROUPS: readonly { readonly label: string; readonly icon: IconName; readonly ids: readonly string[] }[] = ${JSON.stringify(
      GROUPS.map((g) => ({ label: g.label, icon: g.icon, ids: g.pages })),
      null,
      2,
    )};\n`,
);
for (const g of guides) {
  console.log(`${g.id.padEnd(18)} ${g.pages.map((p) => p.id || 'overview').join(' · ')}`);
}
if (broken) {
  console.error(`${broken} link(s) point at an anchor that doesn't exist`);
  process.exitCode = 1;
}
