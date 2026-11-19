import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import type { GuidePage } from '../../../content/types';

/**
 * Renders a converted user guide. The HTML is generated at build time from our own Markdown
 * (scripts/guides.mjs), so it is trusted, and it must keep its heading ids for the page TOC and
 * the guides' cross-links. Styles are unencapsulated because the markup arrives via innerHTML;
 * every rule is scoped under `.guide`.
 */
@Component({
  selector: 'app-guide-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // Anchors arrive via innerHTML and are focusable on their own; Enter on a link fires click, which
  // bubbles here, so a host listener covers mouse and keyboard.
  host: { '(click)': 'follow($event)' },
  template: `<div class="guide" lang="en" dir="ltr" [innerHTML]="html()"></div>`,
  styles: `
    .guide {
      color: var(--text-body);
    }
    .guide > :first-child {
      margin-block-start: 0;
    }
    .guide p {
      margin-block: 0 14px;
    }
    .guide a {
      color: var(--link);
      text-underline-offset: 2px;
    }
    .guide a:hover {
      color: var(--link-hover);
    }
    .guide strong {
      color: var(--text);
      font-weight: 600;
    }
    .guide code {
      padding: 1px 6px;
      border-radius: 6px;
      background: var(--navy-100);
      font-family: var(--font-mono);
      font-size: 0.85em;
    }
    .guide pre {
      overflow-x: auto;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface-sunk);
    }
    .guide pre code {
      padding: 0;
      background: none;
    }

    .guide h2.doc-h {
      margin-block: 48px 16px;
      padding-block-start: 28px;
      border-block-start: 1px solid var(--border);
      font-size: 1.3125rem;
      scroll-margin-top: calc(var(--header-h) + 24px);
    }
    .guide h3 {
      margin-block: 32px 12px;
      font-size: 1.0625rem;
      color: var(--text);
      scroll-margin-top: calc(var(--header-h) + 24px);
    }
    .guide h4 {
      margin-block: 20px 8px;
      font-size: 0.9375rem;
      color: var(--text);
    }

    /* How-to pages: each task is its own card, so one task never runs into the next. */
    .guide .page-intro {
      margin-block: 28px 0;
    }
    .guide section.task {
      margin-block: 28px;
      padding: 4px 26px 22px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
    }
    .guide section.task h2.doc-h {
      margin-block: 22px 14px;
      padding: 0 0 14px;
      border-block-start: 0;
      border-block-end: 1px solid var(--border);
      font-size: 1.1875rem;
    }
    .guide section.task > :last-child {
      margin-block-end: 0;
    }
    @media (max-width: 640px) {
      .guide section.task {
        padding-inline: 16px;
      }
    }

    /* A task's preconditions and its outcome, set apart from the steps. */
    .guide p.prereq,
    .guide p.result {
      margin-block: 0 16px;
      padding: 10px 14px;
      border-radius: var(--radius);
      font-size: 0.90625rem;
    }
    .guide p.prereq {
      background: var(--navy-50);
      border: 1px solid var(--border);
    }
    .guide p.result {
      background: var(--status-green-bg);
      border-inline-start: 4px solid var(--status-green-fg);
    }
    .guide p.result strong:first-child {
      color: var(--status-green-fg);
    }
    .guide .permalink {
      margin-inline-start: 10px;
      color: var(--text-muted);
      font-weight: 500;
      text-decoration: none;
      opacity: 0;
    }
    .guide h2.doc-h:hover .permalink,
    .guide .permalink:focus-visible {
      opacity: 1;
    }
    @media (hover: none) {
      .guide .permalink {
        opacity: 1;
      }
    }

    .guide ul.bullets {
      margin-block: 0 16px;
      padding-inline-start: 22px;
    }
    .guide ul.bullets li {
      margin-block: 6px;
    }
    .guide ul.bullets li::marker {
      color: var(--primary-500);
    }
    .guide .num-list {
      display: grid;
      gap: 10px;
      margin: 0 0 18px;
      padding: 0;
      list-style: none;
      counter-reset: step;
    }
    .guide .num-list > li {
      counter-increment: step;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      gap: 12px;
    }
    .guide .num-list > li::before {
      content: counter(step);
      display: inline-grid;
      place-items: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--primary-100);
      color: var(--primary-800);
      font-size: 0.8125rem;
      font-weight: 600;
    }
    .guide .num-list > li > div {
      padding-block-start: 2px;
    }
    .guide .num-list ul.bullets {
      margin-block: 6px 0;
    }

    .guide .table-wrap {
      overflow-x: auto;
      margin-block: 0 20px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
    }
    .guide table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .guide th,
    .guide td {
      padding: 11px 14px;
      text-align: start;
      vertical-align: top;
      border-block-end: 1px solid var(--border);
    }
    .guide tr:last-child td {
      border-block-end: 0;
    }
    .guide th {
      background: var(--navy-50);
      font-size: 0.75rem;
      color: var(--text);
    }
    .guide td:first-child {
      min-width: 140px;
      color: var(--text);
      font-weight: 500;
    }

    .guide .callout {
      margin-block: 0 18px;
      padding: 14px 18px;
      border-inline-start: 4px solid var(--status-sky-fg);
      border-radius: var(--radius);
      background: var(--status-sky-bg);
    }
    .guide .callout > :last-child {
      margin-block-end: 0;
    }
    .guide .callout-tip {
      border-inline-start-color: var(--status-green-fg);
      background: var(--status-green-bg);
    }
    .guide .callout-important,
    .guide .callout-remember {
      border-inline-start-color: var(--status-primary-fg);
      background: var(--status-primary-bg);
    }
    .guide .callout-caution,
    .guide .callout-warning {
      border-inline-start-color: var(--status-yellow-fg);
      background: var(--status-yellow-bg);
    }

    .guide .shot {
      display: grid;
      gap: 6px;
      margin: 0 0 20px;
      padding: 18px 20px;
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-lg);
      background-color: var(--surface);
      background-image: radial-gradient(var(--navy-100) 1px, transparent 1px);
      background-size: 14px 14px;
    }
    .guide .shot-label {
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .guide .shot figcaption {
      font-size: 0.875rem;
      color: var(--text-body);
    }

    .guide .faq-list h3 {
      margin-block-start: 24px;
      font-size: 1rem;
    }
  `,
})
export class GuideBody {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  /** One page of a guide: only its HTML is rendered here. */
  readonly guide = input.required<Pick<GuidePage, 'html'>>();
  /** Docs root in the current language, e.g. /en/systems/workflow/docs */
  readonly docsRoot = input.required<string>();

  protected readonly html = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      this.guide().html.replaceAll('__DOCS__', this.docsRoot()),
    ),
  );

  /** Links in the guide are plain anchors; keep in-site ones inside the app instead of reloading. */
  protected follow(event: MouseEvent): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey
    )
      return;
    const a = (event.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href');
    if (!href?.startsWith('/') || a?.target === '_blank') return;
    event.preventDefault();
    const fragment = href.split('#')[1];
    // The docs page is reused between modules, so the router's anchor scrolling runs before the
    // next guide is in the DOM. Scroll once the new content has rendered instead.
    void this.router.navigateByUrl(href).then((ok) => {
      if (!ok) return;
      afterNextRender(
        () => {
          const target = fragment ? this.doc.getElementById(fragment) : null;
          if (target) target.scrollIntoView();
          else this.doc.defaultView?.scrollTo(0, 0);
        },
        { injector: this.injector },
      );
    });
  }
}
