import { ChangeDetectionStrategy, Component, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { home } from '../../content/company';
import { Card } from '../../shared/ui/card/card';
import { Hero } from '../../shared/ui/hero/hero';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { CtaBand } from '../../shared/ui/cta-band';
import { Icon } from '../../shared/ui/icon/icon';
import { LinkIndex, type IndexLink } from '../../shared/ui/link-index';
import { ScreenshotPlaceholder } from '../../shared/ui/screenshot-placeholder';
import { ProductPageBase } from './product-page-base';

@Component({
  selector: 'app-product-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Hero,
    SectionHeader,
    Card,
    Button,
    CtaBand,
    Icon,
    ScreenshotPlaceholder,
    LinkIndex,
  ],
  template: `
    @let p = product();
    <app-hero [heading]="i18n.t(p.tagline)" [lead]="i18n.t(p.summary)" [aside]="true">
      <ng-container ngProjectAs="[heroAction]">
        <a appButton="primary" [routerLink]="link('docs')">{{ i18n.t(ui.common.viewDocs) }}</a>
        <button
          type="button"
          appButton="secondary"
          (click)="contact.open({ topic: p.id, intent: 'demo' })"
        >
          {{ i18n.t(ui.common.requestDemo) }}
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

    @if (groups().length) {
      <section class="section" aria-labelledby="h-fit">
        <div class="container">
          <app-section-header
            headingId="h-fit"
            [heading]="i18n.t(ui.common.fitHead)"
            [desc]="p.docs.modules.length + ' ' + i18n.t(ui.common.modules)"
          />
          <ol class="fit" role="list">
            @for (g of groups(); track $index; let i = $index) {
              <li>
                <p class="fit-label">
                  <span>{{ i + 1 }}</span>{{ g.label }}
                </p>
                <ul role="list">
                  @for (m of g.modules; track m.id) {
                    <li>
                      <a [routerLink]="link('docs/' + m.id)"
                        ><app-icon [name]="m.icon" [size]="16" />{{ m.title }}</a
                      >
                    </li>
                  }
                </ul>
              </li>
            }
          </ol>
        </div>
      </section>
    }

    <section class="section" aria-labelledby="h-explore">
      <div class="container">
        <app-section-header headingId="h-explore" [heading]="i18n.t(ui.common.insideHead)" />
        <app-link-index [items]="explore()" />
      </div>
    </section>

    <app-cta-band
      [heading]="i18n.t(home.cta.title)"
      [desc]="i18n.t(home.cta.desc)"
      [topic]="p.id"
      intent="demo"
      [label]="i18n.t(ui.common.requestDemo)"
    />
  `,
  styles: `
    /* The four stages are a real sequence (Design → Run → Measure → Administer), so they keep their
       numbers; they sit on a hairline instead of in boxes. */
    .fit {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
      column-gap: 32px;
    }
    .fit > li {
      padding-block: 20px;
      border-block-start: 1px solid var(--border);
    }
    .fit-label {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-block-end: 12px;
      font-weight: 600;
      color: var(--text);
    }
    .fit-label span {
      display: inline-grid;
      place-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid var(--color-primary);
      color: var(--primary-700);
      font-size: 0.75rem;
    }
    .fit ul {
      display: grid;
      gap: 2px;
    }
    .fit a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      margin-inline-start: -10px;
      border-radius: var(--radius-sm);
      color: var(--text-body);
      font-size: 0.9rem;
      text-decoration: none;
    }
    .fit a app-icon {
      color: var(--text-muted);
    }
    .fit a:hover {
      background: var(--primary-50);
      color: var(--text);
    }
  `,
})
export class ProductHomePage extends ProductPageBase implements OnInit {
  protected readonly home = home;

  protected readonly groups = computed(() => {
    const p = this.product();
    const byId = new Map(p.docs.modules.map((m) => [m.id, m]));
    return p.docs.groups.map((g) => ({
      label: this.i18n.t(g.label),
      modules: g.modules
        .map((id) => byId.get(id))
        .filter((m) => !!m)
        .map((m) => ({ id: m.id, icon: m.icon, title: this.i18n.t(m.title) })),
    }));
  });

  /** "Inside the system" as a quiet link index (docs and the rest are already in the header). */
  protected readonly explore = computed<readonly IndexLink[]>(() => {
    const p = this.product();
    const t = this.i18n.t;
    const nav = this.ui.productNav;
    const latest = p.releases[0];
    return [
      {
        icon: 'target',
        label: t(nav.useCases),
        desc: t(p.useCases.lead),
        link: this.link('use-cases'),
      },
      {
        icon: 'zap',
        label: t(nav.upcoming),
        desc: t(p.upcoming.lead),
        link: this.link('upcoming'),
      },
      { icon: 'tag', label: t(nav.pricing), desc: t(p.pricing.lead), link: this.link('pricing') },
      { icon: 'code', label: t(nav.apis), desc: t(p.api.overview), link: this.link('apis') },
      {
        icon: 'file',
        label: t(nav.releaseNotes),
        desc: latest ? `v${latest.version} — ${t(latest.title)}` : '',
        link: this.link('release-notes'),
      },
    ];
  });

  ngOnInit(): void {
    this.setSeo(undefined, this.i18n.t(this.product().summary));
  }
}
