// Full-text search over one product's documentation, built in the browser the first time the
// search dialog opens. Guides are split at their h2/h3 headings, so every result points at the
// section it came from; structured modules index their overview, capabilities, steps, settings
// and FAQ the same way.
import { isGuideModule, type DocModule, type Product } from '../../../content/types';

/** One searchable section of the docs. */
export interface SearchEntry {
  /** Where the section lives: group › module › page. */
  readonly trail: readonly string[];
  /** The section's heading (or the page title for text above the first heading). */
  readonly heading: string;
  readonly text: string;
  /** App URL without the fragment. */
  readonly path: string;
  readonly fragment: string | null;
  /** Lower-cased copies, so each keystroke only lower-cases the query. */
  readonly headingLc: string;
  readonly textLc: string;
  readonly trailLc: string;
}

/** A run of snippet text; `hit` runs are the matched words. */
export interface SnippetPart {
  readonly text: string;
  readonly hit: boolean;
}

export interface SearchResult {
  readonly entry: SearchEntry;
  readonly heading: readonly SnippetPart[];
  readonly snippet: readonly SnippetPart[];
}

type Translate = <T>(value: { readonly en: T; readonly ar: T }) => T;

const clean = (s: string): string => s.replace(/\s+/g, ' ').trim();

/** Splits a guide page's HTML into sections at its h2/h3 headings. */
function splitGuideHtml(
  html: string,
): { heading: string | null; id: string | null; text: string }[] {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  // Not content: the "#" permalinks and the "Screenshot" labels on screenshot placeholders.
  doc.querySelectorAll('.permalink, .shot-label').forEach((el) => el.remove());
  const sections: { heading: string | null; id: string | null; text: string[] }[] = [
    { heading: null, id: null, text: [] },
  ];
  for (const el of Array.from(doc.body.children)) {
    if (el.tagName === 'H2' || el.tagName === 'H3') {
      sections.push({ heading: clean(el.textContent ?? ''), id: el.id || null, text: [] });
    } else {
      // Table cells and list items are blocks of their own: keep a space between them.
      el.querySelectorAll('td, th, li, p, dt, dd').forEach((c) => c.append(' '));
      sections[sections.length - 1].text.push(el.textContent ?? '');
    }
  }
  return sections
    .map((s) => ({ heading: s.heading, id: s.id, text: clean(s.text.join(' ')) }))
    .filter((s) => s.heading || s.text);
}

function moduleSections(
  m: DocModule,
  t: Translate,
): { page: string | null; pageId: string; sections: ReturnType<typeof splitGuideHtml> }[] {
  if (isGuideModule(m)) {
    return m.guide.pages.map((pg) => ({
      page: pg.id ? pg.title : null,
      pageId: pg.id,
      sections: splitGuideHtml(pg.html),
    }));
  }
  // Same ids as the headings on the structured docs page (docs-page.ts).
  const pairs = (p: readonly (readonly [string, string])[]) =>
    p.map(([a, b]) => `${a}: ${b}`).join(' · ');
  return [
    {
      page: null,
      pageId: '',
      sections: [
        { heading: 'Overview', id: 'overview', text: clean(t(m.overview)) },
        { heading: 'Key capabilities', id: 'capabilities', text: t(m.features).join(' · ') },
        { heading: 'How it works', id: 'how-it-works', text: t(m.steps).join(' · ') },
        { heading: 'Configuration', id: 'configuration', text: pairs(t(m.config)) },
        { heading: 'Frequently asked questions', id: 'faq', text: pairs(t(m.faq)) },
      ].filter((s) => s.text),
    },
  ];
}

/** Every section of the product's docs, in sidebar order. */
export function buildIndex(product: Product, t: Translate, docsRoot: string): SearchEntry[] {
  const byId = new Map(product.docs.modules.map((m) => [m.id, m]));
  const entries: SearchEntry[] = [];
  for (const g of product.docs.groups) {
    const group = t(g.label);
    for (const id of g.modules) {
      const m = byId.get(id);
      if (!m) continue;
      const title = t(m.title);
      for (const { page, pageId, sections } of moduleSections(m, t)) {
        const trail = page ? [group, title, page] : [group, title];
        for (const s of sections) {
          const heading = s.heading ?? page ?? title;
          entries.push({
            trail,
            heading,
            text: s.text,
            path: `${docsRoot}/${m.id}${pageId ? `/${pageId}` : ''}`,
            fragment: s.heading ? s.id : null,
            headingLc: heading.toLowerCase(),
            textLc: s.text.toLowerCase(),
            trailLc: trail.join(' ').toLowerCase(),
          });
        }
      }
    }
  }
  return entries;
}

/** Splits text into plain and matched runs (case-insensitive) for highlighting. */
function mark(text: string, terms: readonly string[]): SnippetPart[] {
  if (!terms.length) return [{ text, hit: false }];
  const escaped = terms.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text
    .split(re)
    .filter(Boolean)
    .map((part) => ({ text: part, hit: terms.includes(part.toLowerCase()) }));
}

/** About 180 characters of text around the first match, cut at word boundaries. */
function excerpt(text: string, textLc: string, terms: readonly string[]): string {
  const span = 180;
  const at = Math.min(...terms.map((w) => textLc.indexOf(w)).filter((i) => i >= 0));
  if (!Number.isFinite(at) || text.length <= span)
    return text.length <= span ? text : `${text.slice(0, span).replace(/\s+\S*$/, '')}…`;
  let start = Math.max(0, at - 60);
  if (start > 0) start = text.indexOf(' ', start) + 1 || start;
  let end = Math.min(text.length, start + span);
  if (end < text.length)
    end = text.lastIndexOf(' ', end) > start ? text.lastIndexOf(' ', end) : end;
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

/**
 * Sections containing every word of the query (in the heading, the text or the location),
 * best first: heading matches, then whole-phrase matches, then by how often the words occur.
 */
export function search(entries: readonly SearchEntry[], query: string, limit = 40): SearchResult[] {
  const q = query.trim().toLowerCase();
  const terms = [...new Set(q.split(/\s+/).filter((w) => w.length > 1 || /\d/.test(w)))];
  if (!terms.length) return [];
  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const e of entries) {
    if (
      !terms.every((w) => e.headingLc.includes(w) || e.textLc.includes(w) || e.trailLc.includes(w))
    )
      continue;
    let score = 0;
    for (const w of terms) {
      if (e.headingLc.includes(w)) score += 20;
      if (e.trailLc.includes(w)) score += 4;
      score += Math.min(e.textLc.split(w).length - 1, 5);
    }
    if (terms.length > 1 && (e.headingLc.includes(q) || e.textLc.includes(q))) score += 15;
    if (e.headingLc.startsWith(q)) score += 10;
    scored.push({ entry: e, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => ({
      entry,
      heading: mark(entry.heading, terms),
      snippet: mark(excerpt(entry.text, entry.textLc, terms), terms),
    }));
}
