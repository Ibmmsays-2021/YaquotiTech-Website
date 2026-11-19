import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactDialogService } from '../../core/contact/contact-dialog';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { home } from '../../content/company';
import { productById } from '../../content/products';
import { ui } from '../../content/ui';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Card } from '../../shared/ui/card/card';
import { Hero } from '../../shared/ui/hero/hero';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { CtaBand } from '../../shared/ui/cta-band';
import { Icon } from '../../shared/ui/icon/icon';
import { LinkIndex, type IndexLink } from '../../shared/ui/link-index';
import { ScreenshotPlaceholder } from '../../shared/ui/screenshot-placeholder';
import { NotFoundPage } from './not-found-page';

/** Product overview on the company site, with "Go to system →" into the product site. */
@Component({
  selector: 'app-product-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Hero,
    Breadcrumbs,
    SectionHeader,
    Card,
    Button,
    CtaBand,
    Icon,
    ScreenshotPlaceholder,
    NotFoundPage,
    LinkIndex,
  ],
  template: `
    @if (product(); as p) {
      <app-hero [heading]="i18n.t(p.name)" [lead]="i18n.t(p.tagline)" [aside]="true">
        <app-breadcrumbs
          [items]="[
            { label: i18n.t(ui.nav.home), link: i18n.link() },
            { label: i18n.t(ui.nav.products), link: i18n.link('products') },
            { label: i18n.t(p.name) },
          ]"
        />
        <p class="summary">{{ i18n.t(p.summary) }}</p>
        <ng-container ngProjectAs="[heroAction]">
          <a appButton="primary" [routerLink]="i18n.link('systems/' + p.id)"
            >{{ i18n.t(ui.common.goToSystem) }} <app-icon name="arrow" [size]="16"
          /></a>
          <button type="button" appButton="secondary" (click)="contact.open({ topic: p.id })">
            {{ i18n.t(ui.nav.getInTouch) }}
          </button>
        </ng-container>
        <app-screenshot-placeholder heroAside [name]="i18n.t(p.name)" />
      </app-hero>

      <section class="section" aria-labelledby="h-cap">
        <div class="container">
          <app-section-header headingId="h-cap" [heading]="i18n.t(ui.common.capabilities)" />
          <div class="grid grid--3">
            @for (c of p.capabilities; track $index) {
              <app-card
                variant="plain"
                [icon]="c.icon"
                [heading]="i18n.t(c.title)"
                [desc]="i18n.t(c.desc)"
              />
            }
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="h-who">
        <div class="container two">
          <app-section-header
            headingId="h-who"
            [heading]="i18n.t(ui.common.whoFor)"
            [desc]="i18n.t(p.audience.lead)"
          />
          <dl class="who">
            @for (a of p.audience.items; track $index) {
              <div>
                <dt><app-icon [name]="a.icon" [size]="18" />{{ i18n.t(a.title) }}</dt>
                <dd>{{ i18n.t(a.desc) }}</dd>
              </div>
            }
          </dl>
        </div>
      </section>

      <section class="section" aria-labelledby="h-inside">
        <div class="container">
          <app-section-header headingId="h-inside" [heading]="i18n.t(ui.common.insideHead)" />
          <app-link-index [items]="insideLinks()" />
        </div>
      </section>

      <app-cta-band
        [heading]="i18n.t(home.cta.title)"
        [desc]="i18n.t(home.cta.desc)"
        [topic]="p.id"
      />
    } @else {
      <app-not-found-page />
    }
  `,
  styles: `
    .summary {
      color: var(--text-muted);
      max-width: 36em;
    }
    .two {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 48px;
      align-items: start;
    }
    .who {
      margin: 0;
      border-block-start: 1px solid var(--border);
    }
    .who > div {
      padding-block: 22px;
      border-block-end: 1px solid var(--border);
    }
    dt {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      color: var(--text);
    }
    dt app-icon {
      color: var(--primary-700);
    }
    dd {
      margin: 6px 0 0;
      color: var(--text-body);
    }
    @media (max-width: 860px) {
      .two {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  `,
})
export class ProductOverviewPage implements OnInit {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  protected readonly home = home;

  readonly productId = input.required<string>();
  protected readonly product = computed(() => productById(this.productId()));

  /** "Inside the system" as a quiet link index, not a grid of identical boxes. */
  protected readonly insideLinks = computed<readonly IndexLink[]>(() =>
    this.inside().map((l) => ({
      icon: l.icon,
      label: this.i18n.t(l.label),
      desc: l.desc,
      link: this.i18n.link(`systems/${this.productId()}${l.path ? `/${l.path}` : ''}`),
    })),
  );

  private readonly inside = computed(() => {
    const p = this.product();
    if (!p) return [];
    const t = this.i18n.t;
    const n = p.docs.modules.length;
    return [
      {
        path: 'docs',
        icon: 'book' as const,
        label: ui.productNav.docs,
        desc: n ? `${n} ${t(ui.common.modules)}` : t(ui.common.docsComing),
      },
      {
        path: 'use-cases',
        icon: 'target' as const,
        label: ui.productNav.useCases,
        desc: t(p.useCases.lead),
      },
      {
        path: 'upcoming',
        icon: 'zap' as const,
        label: ui.productNav.upcoming,
        desc: t(p.upcoming.lead),
      },
      {
        path: 'pricing',
        icon: 'tag' as const,
        label: ui.productNav.pricing,
        desc: t(p.pricing.lead),
      },
      { path: 'apis', icon: 'code' as const, label: ui.productNav.apis, desc: t(p.api.overview) },
      {
        path: 'release-notes',
        icon: 'file' as const,
        label: ui.productNav.releaseNotes,
        desc: p.releases[0] ? `v${p.releases[0].version} — ${t(p.releases[0].title)}` : '',
      },
    ];
  });

  ngOnInit(): void {
    const p = this.product();
    if (!p) {
      this.seo.set({
        title: this.i18n.t(ui.common.notFound),
        description: '',
        path: `products/${this.productId()}`,
        noindex: true,
      });
      return;
    }
    this.seo.set({
      title: this.i18n.t(p.name),
      description: this.i18n.t(p.summary),
      path: `products/${p.id}`,
    });
  }
}
