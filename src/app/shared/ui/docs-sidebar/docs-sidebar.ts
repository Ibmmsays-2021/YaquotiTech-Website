import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
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
          class="link tree-top"
          [routerLink]="base()"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          ariaCurrentWhenActive="page"
          ><app-icon name="book" [size]="16" /><span>{{
            i18n.t(ui.common.gettingStarted)
          }}</span></a
        >
        <ul class="tree" role="list">
          @for (g of groups(); track g.key) {
            @if (g.items.length) {
              <li>
                <!-- Level 1: a group, a branch that opens and closes. -->
                <button
                  type="button"
                  class="group"
                  [attr.aria-expanded]="g.open"
                  [attr.aria-controls]="filterId + '-' + g.key"
                  (click)="toggle(g.key, g.open)"
                >
                  <app-icon class="g-ico" [name]="g.icon" [size]="16" />
                  <span>{{ g.label }}</span>
                  <app-icon class="chev" [class.open]="g.open" name="chevron" [size]="14" />
                </button>
                @if (g.open) {
                  <!-- Level 2: the group's modules. -->
                  <ul class="modules" role="list" [id]="filterId + '-' + g.key">
                    @for (m of g.items; track m.id) {
                      <li>
                        @if (m.pages.length) {
                          <!-- A guide: the module heads its own page tree (level 3). -->
                          <div class="row">
                            <a
                              class="link"
                              [class.current]="m.here"
                              [routerLink]="base() + '/' + m.id"
                              routerLinkActive="active"
                              [routerLinkActiveOptions]="{ exact: true }"
                              ariaCurrentWhenActive="page"
                              ><span>{{ m.title }}</span></a
                            >
                            <button
                              type="button"
                              class="expand"
                              [attr.aria-expanded]="m.open"
                              [attr.aria-label]="m.title"
                              (click)="toggle('m:' + m.id, m.open)"
                            >
                              <app-icon
                                class="chev"
                                [class.open]="m.open"
                                name="chevron"
                                [size]="14"
                              />
                            </button>
                          </div>
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
                            ><span>{{ m.title }}</span></a
                          >
                        }
                      </li>
                    }
                  </ul>
                }
              </li>
            }
          }
        </ul>
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
    /*
     * One rhythm for every row: a 16px icon, an 8px gap, then the text. Icons and arrows sit on the
     * first line of a label, so long labels wrap under their own text, never under the icon.
     * Sub-items hang on a tree line under the group icon and start where the group label starts.
     */
    :host {
      --row-pad: 10px;
      --row-ico: 16px;
      --row-gap: 8px;
      --row-lh: 1.4;
    }
    .tree,
    .modules {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .tree {
      display: grid;
      gap: 1px;
      margin-block-start: 8px;
    }
    .group,
    .link {
      display: flex;
      align-items: flex-start;
      gap: var(--row-gap);
      width: 100%;
      padding: 6px var(--row-pad);
      border: 0;
      border-radius: var(--radius-sm);
      background: transparent;
      font: inherit;
      font-size: 0.8125rem;
      line-height: var(--row-lh);
      text-align: start;
      text-decoration: none;
    }
    .group > span,
    .link > span {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
      text-wrap: pretty;
    }
    /* Centre each icon on the first line of text. */
    .group > app-icon,
    .link > app-icon {
      flex: none;
      margin-block-start: calc((var(--row-lh) * 1em - var(--row-ico)) / 2);
      color: var(--text-muted);
    }
    .group > .chev {
      margin-block-start: calc((var(--row-lh) * 1em - 14px) / 2);
    }

    /* Level 1: groups (and Getting started). */
    .group,
    .tree-top {
      color: var(--text-body);
      font-weight: 500;
    }
    .group {
      cursor: pointer;
    }
    .group:hover,
    .link:hover {
      background: var(--navy-100);
      color: var(--text);
    }
    .group[aria-expanded='true'] {
      color: var(--text);
    }
    .group[aria-expanded='true'] .g-ico {
      color: var(--primary-700);
    }

    /* Level 2: a group's modules, on a tree line under the group icon. */
    .modules {
      display: grid;
      gap: 1px;
      margin: 1px 0 6px;
      margin-inline-start: calc(var(--row-pad) + var(--row-ico) / 2);
      padding-inline-start: calc(var(--row-ico) / 2 + var(--row-gap) - var(--row-pad) - 1px);
      border-inline-start: 1px solid var(--border);
    }
    .modules .link {
      color: var(--text-muted);
      font-weight: 400;
    }
    .link.active,
    .modules .link.active {
      background: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
      color: var(--primary-800);
      font-weight: 500;
    }
    .link.active > app-icon {
      color: var(--primary-700);
    }
    .link.current {
      color: var(--text);
    }
    .row {
      display: flex;
      align-items: flex-start;
      gap: 2px;
    }
    .row .link {
      flex: 1;
      min-width: 0;
    }
    .expand {
      display: grid;
      place-items: center;
      flex: none;
      width: 26px;
      height: 26px;
      margin-block-start: 3px;
      border: 0;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
    }
    .expand:hover {
      background: var(--navy-100);
      color: var(--text);
    }
    /* The chevron icon points down: turned to the reading direction while closed. */
    .chev {
      flex: none;
      transform: rotate(-90deg);
      transition: transform var(--dur) var(--ease);
    }
    :host-context([dir='rtl']) .chev {
      transform: rotate(90deg);
    }
    .chev.open,
    :host-context([dir='rtl']) .chev.open {
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
      color: var(--text-muted);
      font-size: 0.8125rem;
      line-height: var(--row-lh);
      overflow-wrap: anywhere;
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
      background: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
      color: var(--primary-800);
      font-weight: 500;
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

  /**
   * Branches opened or closed by hand, by key ('g:<index>' for a group, 'm:<id>' for a guide).
   * Opened branches stay open while browsing; closed ones fall back to the default on the next page,
   * so the branch you navigate into always shows.
   */
  private readonly overrides = linkedSignal<string, Record<string, boolean>>({
    source: this.path,
    computation: (_path, prev) =>
      Object.fromEntries(Object.entries(prev?.value ?? {}).filter(([, open]) => open)),
  });

  protected toggle(key: string, open: boolean): void {
    this.overrides.update((o) => ({ ...o, [key]: !open }));
  }

  protected readonly groups = computed(() => {
    const p = this.product();
    const q = this.query().trim().toLowerCase();
    const path = this.path();
    const overrides = this.overrides();
    const byId = new Map(p.docs.modules.map((m) => [m.id, m]));
    // The filter matches names only: group names, module titles and a guide's page titles (a group
    // match keeps all its modules; a page match opens its guide on the matching pages). Searching
    // the docs' content is the header's search dialog.
    return p.docs.groups.map((g, gi) => {
      const key = `g:${gi}`;
      const label = this.i18n.t(g.label);
      const groupHit = !!q && label.toLowerCase().includes(q);
      const items = g.modules
        .map((id) => byId.get(id))
        .filter((m) => !!m)
        .map((m) => {
          const link = `${this.base()}/${m.id}`;
          const title = this.i18n.t(m.title);
          const allPages = isGuideModule(m) && m.guide.pages.length > 1 ? m.guide.pages : [];
          const pages = allPages
            .filter((pg) => !q || pg.title.toLowerCase().includes(q))
            .map((pg, i, list) => ({
              kind: pg.kind,
              title: pg.title,
              link: pg.id ? `${link}/${pg.id}` : link,
              // One caption above the first how-to page groups the task pages together.
              caption: pg.kind === 'tasks' && list[i - 1]?.kind !== 'tasks' ? 'How-to guides' : '',
            }));
          const here = path === link || path.startsWith(`${link}/`);
          const hit = !q || groupHit || title.toLowerCase().includes(q);
          const open = q ? pages.length > 0 : (overrides[`m:${m.id}`] ?? here);
          return {
            id: m.id,
            icon: m.icon,
            title,
            pages,
            here,
            open,
            hit: hit || pages.length > 0,
          };
        })
        .filter((m) => m.hit);
      // While filtering, every group with a match is open; otherwise the group you are in opens by default.
      const here = items.some((m) => m.here);
      const icon = byId.get(g.modules[0])?.icon ?? 'book';
      return { key, label, icon, items, open: !!q || (overrides[key] ?? here) };
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
