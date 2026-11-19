import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { home } from '../../content/company';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { FeatureList } from '../../shared/ui/feature-list/feature-list';
import { Hero } from '../../shared/ui/hero/hero';
import { CtaBand } from '../../shared/ui/cta-band';
import { Icon } from '../../shared/ui/icon/icon';
import { ProductPageBase } from './product-page-base';

@Component({
  selector: 'app-use-cases-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, FeatureList, CtaBand, Icon],
  template: `
    @let p = product();
    <app-hero
      class="compact"
      [heading]="i18n.t(ui.productNav.useCases)"
      [lead]="i18n.t(p.useCases.lead)"
    >
      <app-breadcrumbs
        [items]="[
          { label: i18n.t(p.name), link: link() },
          { label: i18n.t(ui.productNav.useCases) },
        ]"
      />
    </app-hero>
    <section class="section section--tight">
      <div class="container">
        <ol role="list" class="cases">
          @for (u of p.useCases.items; track $index; let i = $index) {
            <li>
              <div class="head">
                <span class="ico"><app-icon [name]="u.icon" [size]="20" /></span>
                <h2>{{ i18n.t(u.title) }}</h2>
              </div>
              <p>{{ i18n.t(u.desc) }}</p>
              <app-feature-list [items]="i18n.t(u.outcomes)" />
            </li>
          } @empty {
            <li class="empty">{{ i18n.t(ui.common.nothingYet) }}</li>
          }
        </ol>
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
    .cases > li {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 1fr);
      gap: 32px;
      padding-block: 36px;
      border-block-start: 1px solid var(--border);
    }
    .cases > li.empty {
      display: block;
      color: var(--text-muted);
    }
    .cases > li:last-child {
      border-block-end: 1px solid var(--border);
    }
    .head {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    h2 {
      font-size: 1.25rem;
    }
    .ico {
      display: inline-grid;
      place-items: center;
      width: 40px;
      height: 40px;
      flex: none;
      border-radius: var(--radius);
      background: var(--primary-50);
      color: var(--primary-700);
    }
    p {
      color: var(--text-body);
    }
    @media (max-width: 900px) {
      .cases > li {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `,
})
export class UseCasesPage extends ProductPageBase implements OnInit {
  protected readonly home = home;
  ngOnInit(): void {
    this.setSeo(
      this.i18n.t(this.ui.productNav.useCases),
      this.i18n.t(this.product().useCases.lead),
      'use-cases',
    );
  }
}
