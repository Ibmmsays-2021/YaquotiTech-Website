import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { home, servicesIntro } from '../../content/company';
import { SERVICES } from '../../content/services';
import { ui } from '../../content/ui';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { FeatureList } from '../../shared/ui/feature-list/feature-list';
import { Hero } from '../../shared/ui/hero/hero';
import { Button } from '../../shared/ui/button/button';
import { CtaBand } from '../../shared/ui/cta-band';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-services-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Hero, Breadcrumbs, FeatureList, Button, CtaBand, Icon],
  template: `
    <app-hero [heading]="i18n.t(intro.title)" [lead]="i18n.t(intro.lead)">
      <app-breadcrumbs
        [items]="[
          { label: i18n.t(ui.nav.home), link: i18n.link() },
          { label: i18n.t(ui.nav.services) },
        ]"
      />
    </app-hero>
    <section class="section section--tight">
      <div class="container list">
        @for (s of services; track s.id) {
          <article>
            <div class="head">
              <span class="ico"><app-icon [name]="s.icon" [size]="22" /></span>
              <h2>{{ i18n.t(s.title) }}</h2>
              <p class="lead">{{ i18n.t(s.lead) }}</p>
              <a appButton="secondary" [routerLink]="i18n.link('services/' + s.id)">{{
                i18n.f(ui.common.detailsOf, i18n.t(s.title))
              }}</a>
            </div>
            <div>
              <p class="label">{{ i18n.t(s.deliversHead) }}</p>
              <app-feature-list [items]="i18n.t(s.delivers)" />
            </div>
          </article>
        }
      </div>
    </section>
    <app-cta-band [heading]="i18n.t(home.cta.title)" [desc]="i18n.t(home.cta.desc)" />
  `,
  styles: `
    .list {
      display: grid;
    }
    article {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
      gap: 48px;
      padding-block: 48px;
      border-block-start: 1px solid var(--border);
    }
    article:last-child {
      border-block-end: 1px solid var(--border);
    }
    .head {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
    .ico {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: var(--radius);
      background: var(--primary-50);
      color: var(--primary-700);
    }
    .label {
      font-weight: 600;
      color: var(--text);
      margin-block-end: 16px;
    }
    @media (max-width: 860px) {
      article {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }
  `,
})
export class ServicesPage implements OnInit {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  protected readonly home = home;
  protected readonly intro = servicesIntro;
  protected readonly services = SERVICES;

  ngOnInit(): void {
    this.seo.set({
      title: this.i18n.t(servicesIntro.title),
      description: this.i18n.t(servicesIntro.lead),
      path: 'services',
    });
  }
}
