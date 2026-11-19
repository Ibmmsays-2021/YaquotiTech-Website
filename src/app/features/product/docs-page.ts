import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { FeatureList } from '../../shared/ui/feature-list/feature-list';
import { Faq } from '../../shared/ui/faq/faq';
import { PrevNext, type PagerLink } from '../../shared/ui/prev-next/prev-next';
import { type TocItem } from '../../shared/ui/toc/toc';
import { Icon } from '../../shared/ui/icon/icon';
import { GuideBody } from '../../shared/ui/guide-body/guide-body';
import { isGuideModule, type GuidePageKind } from '../../content/types';
import { NotFoundPage } from '../company/not-found-page';
import { DocsLayout } from './docs-layout';
import { ProductPageBase } from './product-page-base';

/** The label that tells readers what kind of page they are on (Diátaxis). */
const KIND_LABEL: Record<GuidePageKind, string> = {
  overview: 'Overview',
  concepts: 'Concepts',
  tasks: 'How-to guide',
  reference: 'Reference',
  help: 'Troubleshooting',
  glossary: 'Reference',
};

/**
 * A documentation page. A module with a full user guide has a landing page (its overview, with
 * cards for the rest of the guide) and one page per part: concepts, each group of tasks, reference
 * and troubleshooting. A module without a guide shows its short sections on a single page.
 */
@Component({
  selector: 'app-docs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    DocsLayout,
    Breadcrumbs,
    FeatureList,
    Faq,
    PrevNext,
    Icon,
    GuideBody,
    NotFoundPage,
  ],
  template: `
    @let p = product();
    @if (module(); as m) {
      @if (guide(); as g) {
        @if (guidePage(); as pg) {
          <app-docs-layout [product]="p" [toc]="toc()">
            <div class="doc-head">
              <app-breadcrumbs [items]="crumbs()" />
              <p class="kind kind-{{ pg.kind }}">{{ kindLabel[pg.kind] }}</p>
              <h1 class="doc-title">
                @if (!pg.id) {
                  <span class="doc-ico"><app-icon [name]="m.icon" [size]="22" /></span>
                }
                {{ pg.id ? pg.title : i18n.t(m.title) }}
              </h1>
              <p class="lead">{{ lead() }}</p>
            </div>

            @if (cards().length) {
              <section class="hub" aria-labelledby="in-this-guide">
                <h2 class="hub-title" id="in-this-guide">In this guide</h2>
                <div class="cards">
                  @for (c of cards(); track c.link) {
                    <a class="card" [routerLink]="c.link">
                      <span class="card-kind kind-{{ c.kind }}">{{ kindLabel[c.kind] }}</span>
                      <span class="card-title">{{ c.title }}</span>
                      @if (c.kind === 'tasks') {
                        <ul class="card-items">
                          @for (t of c.items.slice(0, 4); track $index) {
                            <li>{{ t }}</li>
                          }
                          @if (c.items.length > 4) {
                            <li class="more">+ {{ c.items.length - 4 }} more</li>
                          }
                        </ul>
                      } @else {
                        <span class="card-desc">{{ c.summary }}</span>
                      }
                    </a>
                  }
                </div>
              </section>
            }

            <app-guide-body [guide]="pg" [docsRoot]="link('docs')" />
            <app-prev-next [prev]="prev()" [next]="next()" />
          </app-docs-layout>
        } @else {
          <app-not-found-page />
        }
      } @else if (sections(); as s) {
        <app-docs-layout [product]="p" [toc]="toc()">
          <div class="doc-head">
            <app-breadcrumbs [items]="crumbs()" />
            <p class="label">
              {{ i18n.t(ui.common.module) }} {{ index() + 1 }} / {{ p.docs.modules.length }}
            </p>
            <h1 class="doc-title">
              <span class="doc-ico"><app-icon [name]="m.icon" [size]="22" /></span
              >{{ i18n.t(m.title) }}
            </h1>
            <p class="lead">{{ i18n.t(m.summary) }}</p>
          </div>

          <h2 class="doc-h" id="overview">
            {{ i18n.t(ui.common.overview)
            }}<a
              class="permalink"
              routerLink="."
              fragment="overview"
              [attr.aria-label]="i18n.t(ui.ref.linkToSection)"
              >#</a
            >
          </h2>
          <p class="doc-text">{{ i18n.t(s.overview) }}</p>

          <h2 class="doc-h" id="capabilities">
            {{ i18n.t(ui.common.capabilities)
            }}<a
              class="permalink"
              routerLink="."
              fragment="capabilities"
              [attr.aria-label]="i18n.t(ui.ref.linkToSection)"
              >#</a
            >
          </h2>
          <app-feature-list [items]="i18n.t(s.features)" />

          <h2 class="doc-h" id="how-it-works">
            {{ i18n.t(ui.common.howItWorks)
            }}<a
              class="permalink"
              routerLink="."
              fragment="how-it-works"
              [attr.aria-label]="i18n.t(ui.ref.linkToSection)"
              >#</a
            >
          </h2>
          <ol class="num-list">
            @for (step of i18n.t(s.steps); track $index) {
              <li>{{ step }}</li>
            }
          </ol>

          <h2 class="doc-h" id="configuration">
            {{ i18n.t(ui.common.configuration)
            }}<a
              class="permalink"
              routerLink="."
              fragment="configuration"
              [attr.aria-label]="i18n.t(ui.ref.linkToSection)"
              >#</a
            >
          </h2>
          <div
            class="table-wrap"
            tabindex="0"
            role="region"
            [attr.aria-label]="i18n.t(ui.common.configuration)"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">{{ i18n.t(ui.common.setting) }}</th>
                  <th scope="col">{{ i18n.t(ui.common.description) }}</th>
                </tr>
              </thead>
              <tbody>
                @for (row of i18n.t(s.config); track $index) {
                  <tr>
                    <td>{{ row[0] }}</td>
                    <td>{{ row[1] }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <h2 class="doc-h" id="faq">
            {{ i18n.t(ui.common.faq)
            }}<a
              class="permalink"
              routerLink="."
              fragment="faq"
              [attr.aria-label]="i18n.t(ui.ref.linkToSection)"
              >#</a
            >
          </h2>
          <app-faq [items]="i18n.t(s.faq)" />

          <app-prev-next [prev]="prev()" [next]="next()" />
        </app-docs-layout>
      }
    } @else {
      <app-not-found-page />
    }
  `,
  styleUrl: './doc-prose.scss',
  styles: `
    .kind {
      align-self: flex-start;
      padding: 3px 10px;
      border-radius: 999px;
      background: var(--status-primary-bg);
      color: var(--status-primary-fg);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .kind-tasks {
      background: var(--status-green-bg);
      color: var(--status-green-fg);
    }
    .kind-concepts {
      background: var(--status-sky-bg);
      color: var(--status-sky-fg);
    }
    .kind-help {
      background: var(--status-yellow-bg);
      color: var(--status-yellow-fg);
    }
    .kind-reference,
    .kind-glossary {
      background: var(--status-grey-bg);
      color: var(--status-grey-fg);
    }

    .hub {
      margin-block: 36px 8px;
    }
    .hub-title {
      margin-block-end: 14px;
      font-size: 1.0625rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 14px;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 18px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
      color: var(--text-body);
      text-decoration: none;
      transition:
        border-color var(--dur) var(--ease),
        box-shadow var(--dur) var(--ease);
    }
    .card:hover {
      border-color: var(--primary-300);
      box-shadow: var(--shadow-float);
      text-decoration: none;
    }
    .card:focus-visible {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
    }
    .card-kind {
      align-self: flex-start;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.6875rem;
      font-weight: 600;
    }
    .card-title {
      color: var(--text);
      font-weight: 600;
    }
    .card-desc,
    .card-items {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
    .card-items {
      display: grid;
      gap: 3px;
      margin: 0;
      padding-inline-start: 16px;
    }
    .card-items .more {
      list-style: none;
      margin-inline-start: -16px;
      color: var(--link);
      font-weight: 500;
    }
  `,
})
export class DocsPage extends ProductPageBase {
  readonly moduleId = input.required<string>();
  /** The guide page; empty for a module's landing page. */
  readonly pageId = input<string>();

  protected readonly kindLabel = KIND_LABEL;

  protected readonly index = computed(() =>
    this.product().docs.modules.findIndex((m) => m.id === this.moduleId()),
  );
  protected readonly module = computed(() => this.product().docs.modules[this.index()]);
  /** A full user guide, when the module has one; otherwise the module's short sections. */
  protected readonly guide = computed(() => {
    const m = this.module();
    return m && isGuideModule(m) ? m.guide : null;
  });
  protected readonly sections = computed(() => {
    const m = this.module();
    return m && !isGuideModule(m) && !this.pageId() ? m : null;
  });
  protected readonly guidePage = computed(
    () => this.guide()?.pages.find((pg) => pg.id === (this.pageId() ?? '')) ?? null,
  );

  protected readonly crumbs = computed(() => {
    const p = this.product();
    const m = this.module();
    const pg = this.guidePage();
    const items: { label: string; link?: string }[] = [
      { label: this.i18n.t(p.name), link: this.link() },
      { label: this.i18n.t(this.ui.productNav.docs), link: this.link('docs') },
    ];
    if (pg?.id)
      items.push(
        { label: this.i18n.t(m.title), link: this.link(`docs/${m.id}`) },
        { label: pg.title },
      );
    else items.push({ label: this.i18n.t(m.title) });
    return items;
  });

  protected readonly lead = computed(() => {
    const pg = this.guidePage();
    const m = this.module();
    if (!pg) return '';
    if (!pg.id) return this.i18n.t(m.summary);
    if (pg.kind === 'tasks') {
      const n = pg.items.length;
      return `Step-by-step instructions for ${n} task${n === 1 ? '' : 's'} in ${this.i18n.t(m.title)}.`;
    }
    return pg.summary;
  });

  /** The landing page's "In this guide" cards: every other page of the guide. */
  protected readonly cards = computed(() => {
    const g = this.guide();
    const pg = this.guidePage();
    if (!g || !pg || pg.id) return [];
    return g.pages
      .filter((x) => x.id)
      .map((x) => ({ ...x, link: this.link(`docs/${this.moduleId()}/${x.id}`) }));
  });

  /** Every page in reading order: each guide's pages in turn, then the next module. */
  private readonly sequence = computed<(PagerLink & { key: string })[]>(() =>
    this.product().docs.modules.flatMap((m) => {
      const title = this.i18n.t(m.title);
      if (!isGuideModule(m))
        return [{ key: `${m.id}/`, label: title, link: this.link(`docs/${m.id}`) }];
      return m.guide.pages.map((pg) => ({
        key: `${m.id}/${pg.id}`,
        label: pg.id ? `${title}: ${pg.title}` : title,
        link: this.link(`docs/${m.id}${pg.id ? `/${pg.id}` : ''}`),
      }));
    }),
  );
  private readonly position = computed(() =>
    this.sequence().findIndex((s) => s.key === `${this.moduleId()}/${this.pageId() ?? ''}`),
  );
  protected readonly prev = computed(() => this.sequence()[this.position() - 1] ?? null);
  protected readonly next = computed(() =>
    this.position() < 0 ? null : (this.sequence()[this.position() + 1] ?? null),
  );

  protected readonly toc = computed<readonly TocItem[]>(() => {
    const pg = this.guidePage();
    if (pg) return pg.toc;
    const c = this.ui.common;
    const t = this.i18n.t;
    return [
      { id: 'overview', label: t(c.overview) },
      { id: 'capabilities', label: t(c.capabilities) },
      { id: 'how-it-works', label: t(c.howItWorks) },
      { id: 'configuration', label: t(c.configuration) },
      { id: 'faq', label: t(c.faq) },
    ];
  });

  constructor() {
    super();
    // An effect, not ngOnInit: the router reuses this page when moving between modules and pages,
    // so the title and meta must follow the inputs rather than be set once.
    effect(() => {
      const m = this.module();
      const pg = this.guidePage();
      const found = m && (this.guide() ? !!pg : !this.pageId());
      if (found && pg?.id) {
        this.setSeo(`${pg.title} — ${this.i18n.t(m.title)}`, this.lead(), `docs/${m.id}/${pg.id}`);
      } else if (found) {
        this.setSeo(this.i18n.t(m.title), this.i18n.t(m.summary), `docs/${m.id}`);
      } else {
        this.seo.set({
          title: this.i18n.t(this.ui.common.notFound),
          description: '',
          path: 'not-found',
          noindex: true,
        });
      }
    });
  }
}
