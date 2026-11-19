import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { I18n } from '../../../core/i18n';
import { isGuideModule, type Product } from '../../../content/types';
import { ui } from '../../../content/ui';
import { Icon } from '../icon/icon';

let uid = 0;

@Component({
  selector: 'app-docs-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <button
      type="button"
      class="toggle"
      [attr.aria-expanded]="openMobile()"
      aria-controls="docs-nav"
      (click)="openMobile.set(!openMobile())"
    >
      <app-icon name="menu" [size]="18" /> {{ i18n.t(ui.common.allModules) }}
    </button>
    <div id="docs-nav" class="panel" [class.open]="openMobile()">
      <label class="visually-hidden" [for]="filterId">{{ i18n.t(ui.common.filterModules) }}</label>
      <div class="filter">
        <app-icon name="search" [size]="16" />
        <input
          [id]="filterId"
          type="search"
          autocomplete="off"
          [placeholder]="i18n.t(ui.common.filterModules)"
          name="filter"
          [value]="query()"
          (input)="setQuery($any($event.target).value)"
        />
      </div>
      <nav [attr.aria-label]="i18n.t(ui.productNav.docs)">
        <a
          class="link"
          [routerLink]="base()"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          ariaCurrentWhenActive="page"
          ><app-icon name="book" [size]="16" />{{ i18n.t(ui.common.gettingStarted) }}</a
        >
        @for (g of groups(); track $index) {
          @if (g.items.length) {
            <p class="group">{{ g.label }}</p>
            @for (m of g.items; track m.id) {
              @if (m.pages.length) {
                <!-- A guide: the module heads its own page tree, open while you are in it. -->
                <a
                  class="link"
                  [class.current]="m.open"
                  [routerLink]="base() + '/' + m.id"
                  [attr.aria-expanded]="m.open"
                  ><app-icon [name]="m.icon" [size]="16" />{{ m.title }}
                  <app-icon class="chev" [class.open]="m.open" name="chevron" [size]="14"
                /></a>
                @if (m.open) {
                  <ul class="pages" role="list">
                    @for (pg of m.pages; track pg.link) {
                      @if (pg.caption) {
                        <li class="caption">{{ pg.caption }}</li>
                      }
                      <li>
                        <a
                          class="page"
                          [class.task]="pg.kind === 'tasks'"
                          [routerLink]="pg.link"
                          routerLinkActive="active"
                          [routerLinkActiveOptions]="{ exact: true }"
                          ariaCurrentWhenActive="page"
                          >{{ pg.title }}</a
                        >
                      </li>
                    }
                  </ul>
                }
              } @else {
                <a
                  class="link"
                  [routerLink]="base() + '/' + m.id"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  ><app-icon [name]="m.icon" [size]="16" />{{ m.title }}</a
                >
              }
            }
          }
        }
        @if (query() && !anyMatch()) {
          <p class="none" role="status">{{ i18n.t(ui.common.noMatches) }}</p>
        }
      </nav>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    /* Stickiness lives on the docs layout's column (this component's host), so it can actually stick. */
    .panel {
      padding-inline-end: 8px;
    }
    .toggle {
      display: none;
    }
    .filter {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      color: var(--text-muted);
      margin-block-end: 16px;
    }
    .filter:focus-within {
      border-color: var(--color-primary);
      outline: 2px solid var(--primary-200);
    }
    input {
      flex: 1;
      min-width: 0;
      border: 0;
      background: transparent;
      padding: 9px 0;
      font-size: 0.8125rem;
      color: var(--text);
      outline: none;
    }
    .group {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      margin: 20px 10px 6px;
    }
    .link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 10px;
      border-radius: var(--radius-sm);
      color: var(--text-body);
      font-size: 0.84375rem;
      font-weight: 500;
      text-decoration: none;
    }
    .link app-icon {
      color: var(--text-muted);
    }
    .link:hover {
      background: var(--navy-100);
      color: var(--text);
    }
    .link.active {
      background: var(--primary-100);
      color: var(--primary-800);
      font-weight: 600;
    }
    .link.active app-icon {
      color: var(--primary-700);
    }

    /* A guide's page tree. */
    .link.current {
      color: var(--text);
      font-weight: 600;
    }
    .link.current app-icon {
      color: var(--primary-700);
    }
    /* The chevron icon points down: turned to the reading direction while the guide is closed. */
    .chev {
      margin-inline-start: auto;
      transform: rotate(-90deg);
      transition: transform var(--dur) var(--ease);
    }
    .chev.open {
      transform: none;
    }
    .pages {
      display: grid;
      gap: 1px;
      margin: 2px 0 8px;
      margin-inline-start: 18px;
      padding-inline-start: 10px;
      border-inline-start: 1px solid var(--border);
      list-style: none;
    }
    .caption {
      margin: 8px 8px 2px;
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .page {
      display: block;
      padding: 5px 10px;
      border-radius: var(--radius-sm);
      color: var(--text-body);
      font-size: 0.8125rem;
      text-decoration: none;
    }
    .page.task {
      padding-inline-start: 16px;
    }
    .page:hover {
      background: var(--navy-100);
      color: var(--text);
    }
    .page.active {
      background: var(--primary-100);
      color: var(--primary-800);
      font-weight: 600;
    }
    .none {
      padding: 10px;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    @media (max-width: 960px) {
      .toggle {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 40px;
        padding: 0 14px;
        border: 1px solid var(--border-strong);
        border-radius: var(--radius);
        background: var(--surface);
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--text);
        cursor: pointer;
      }
      .panel {
        display: none;
        margin-block-start: 12px;
        padding: 16px;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--surface);
      }
      .panel.open {
        display: block;
      }
    }
  `,
})
export class DocsSidebar {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly product = input.required<Product>();
  protected readonly filterId = `docs-filter-${++uid}`;
  protected readonly query = signal('');
  protected readonly openMobile = signal(false);

  protected readonly base = computed(() => this.i18n.link(`systems/${this.product().id}/docs`));

  private readonly router = inject(Router);
  /** The current path, without query or fragment: decides which guide's page tree is open. */
  private readonly path = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split(/[?#]/)[0]),
    ),
    { initialValue: this.router.url.split(/[?#]/)[0] },
  );

  protected readonly groups = computed(() => {
    const p = this.product();
    const q = this.query().trim().toLowerCase();
    const path = this.path();
    const byId = new Map(p.docs.modules.map((m) => [m.id, m]));
    // Search covers group names, module titles and summaries, and a guide's page titles and tasks
    // (a group match keeps all its modules; a page match opens its guide on the matching pages).
    return p.docs.groups.map((g) => {
      const label = this.i18n.t(g.label);
      const groupHit = !!q && label.toLowerCase().includes(q);
      return {
        label,
        items: g.modules
          .map((id) => byId.get(id))
          .filter((m) => !!m)
          .map((m) => {
            const link = `${this.base()}/${m.id}`;
            const title = this.i18n.t(m.title);
            const summary = this.i18n.t(m.summary);
            const allPages = isGuideModule(m) && m.guide.pages.length > 1 ? m.guide.pages : [];
            const pages = allPages
              .filter(
                (pg) =>
                  !q ||
                  pg.title.toLowerCase().includes(q) ||
                  pg.items.some((t) => t.toLowerCase().includes(q)),
              )
              .map((pg, i, list) => ({
                kind: pg.kind,
                title: pg.title,
                link: pg.id ? `${link}/${pg.id}` : link,
                // One caption above the first how-to page groups the task pages together.
                caption: pg.kind === 'tasks' && list[i - 1]?.kind !== 'tasks' ? 'How-to guides' : '',
              }));
            const here = path === link || path.startsWith(`${link}/`);
            const hit = !q || groupHit || title.toLowerCase().includes(q) || summary.toLowerCase().includes(q);
            return { id: m.id, icon: m.icon, title, summary, pages, open: q ? pages.length > 0 : here, hit: hit || pages.length > 0 };
          })
          .filter((m) => m.hit),
      };
    });
  });

  protected readonly anyMatch = computed(() => this.groups().some((g) => g.items.length > 0));

  private readonly doc = inject(DOCUMENT);

  constructor() {
    // The filter lives in the URL (?filter=…) so a filtered list can be shared or restored.
    afterNextRender(() => {
      const q = new URLSearchParams(this.doc.location?.search ?? '').get('filter');
      if (q) this.query.set(q);
    });
  }

  protected setQuery(value: string): void {
    this.query.set(value);
    const win = this.doc.defaultView;
    if (!win) return;
    const url = new URL(win.location.href);
    if (value.trim()) url.searchParams.set('filter', value);
    else url.searchParams.delete('filter');
    win.history.replaceState(win.history.state, '', url.pathname + url.search + url.hash);
  }
}
