import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import type { Product } from '../../content/types';
import { DocsSidebar } from '../../shared/ui/docs-sidebar/docs-sidebar';
import { Toc, type TocItem } from '../../shared/ui/toc/toc';

/** Three-column docs layout: module sidebar · content (72ch) · "On this page". */
@Component({
  selector: 'app-docs-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsSidebar, Toc],
  template: `
    <div class="container layout" [class.no-side]="!sidebar()">
      @if (sidebar()) {
        <app-docs-sidebar [product]="product()" />
      }
      <article class="doc"><ng-content /></article>
      @if (toc().length) {
        <aside class="toc"><app-toc [items]="toc()" /></aside>
      }
    </div>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr) 200px;
      gap: clamp(32px, 4vw, 56px);
      padding-block: 48px 112px;
      align-items: start;
    }
    .layout.no-side {
      grid-template-columns: minmax(0, 1fr) 200px;
    }
    /* Docs reading size: 15px body text (headings and tables scale from doc-prose.scss). */
    .doc {
      min-width: 0;
      font-size: 0.9375rem;
      line-height: 1.7;
    }
    /* Both side columns stay in view while the article scrolls (like the API index). The columns
       themselves are sticky: a sticky element inside a wrapper of its own height cannot stick. */
    app-docs-sidebar,
    .toc {
      position: sticky;
      inset-block-start: calc(var(--header-h) + 24px);
      max-height: calc(100vh - var(--header-h) - 48px);
      overflow: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
    }
    @media (max-width: 1180px) {
      .layout {
        grid-template-columns: 256px minmax(0, 1fr);
      }
      .layout.no-side {
        grid-template-columns: minmax(0, 1fr);
      }
      .toc {
        display: none;
      }
    }
    /* The page is white; the sidebar is a light panel, a faint wash of the tint with a hairline edge. */
    app-docs-sidebar {
      padding: 14px 8px;
      border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
      border-radius: var(--radius-lg);
      background: color-mix(in srgb, var(--bg-tint) 40%, var(--surface));
    }
    @media (max-width: 960px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
        padding-block-start: 24px;
      }
      /* Small screens: the sidebar is a disclosure above the article, in normal flow. */
      app-docs-sidebar {
        position: static;
        max-height: none;
        overflow: visible;
        padding: 0;
        background: none;
      }
    }
  `,
})
export class DocsLayout {
  readonly product = input.required<Product>();
  readonly toc = input<readonly TocItem[]>([]);
  readonly sidebar = input(true);

  constructor() {
    // Docs pages are white (see body.docs-page in base.scss). Set on the server too, so the
    // prerendered page has it from the first paint.
    const body = inject(DOCUMENT).body;
    body.classList.add('docs-page');
    inject(DestroyRef).onDestroy(() => body.classList.remove('docs-page'));
  }
}
