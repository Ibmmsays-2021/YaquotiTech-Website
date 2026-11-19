import { ChangeDetectionStrategy, Component, OnInit, computed } from '@angular/core';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Hero } from '../../shared/ui/hero/hero';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Faq } from '../../shared/ui/faq/faq';
import { ComparisonTable } from '../../shared/ui/comparison-table/comparison-table';
import { PricingCard } from '../../shared/ui/pricing-card/pricing-card';
import { ProductPageBase } from './product-page-base';

@Component({
  selector: 'app-pricing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, SectionHeader, PricingCard, ComparisonTable, Faq],
  template: `
    @let p = product();
    <app-hero
      class="compact"
      [heading]="i18n.t(ui.productNav.pricing)"
      [lead]="i18n.t(p.pricing.lead)"
    >
      <app-breadcrumbs
        [items]="[
          { label: i18n.t(p.name), link: link() },
          { label: i18n.t(ui.productNav.pricing) },
        ]"
      />
    </app-hero>

    <section class="section section--tight" [attr.aria-label]="i18n.t(ui.productNav.pricing)">
      <div class="container plans">
        @for (plan of p.pricing.plans; track plan.id) {
          <app-pricing-card [plan]="plan" [productId]="p.id" />
        }
      </div>
    </section>

    <section class="section section--tight" aria-labelledby="h-compare">
      <div class="container">
        <app-section-header headingId="h-compare" [heading]="i18n.t(ui.common.compare)" />
        <app-comparison-table
          [plans]="planNames()"
          [rows]="p.pricing.comparison"
          [caption]="i18n.t(ui.common.compare)"
        />
      </div>
    </section>

    <section class="section section--tight" aria-labelledby="h-faq">
      <div class="container narrow">
        <app-section-header headingId="h-faq" [heading]="i18n.t(ui.common.faq)" />
        <app-faq [items]="i18n.t(p.pricing.faq)" />
      </div>
    </section>
  `,
  styles: `
    .plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
      gap: 20px;
      align-items: stretch;
    }
    .narrow > * {
      max-width: 820px;
    }
  `,
})
export class PricingPage extends ProductPageBase implements OnInit {
  protected readonly planNames = computed(() => this.product().pricing.plans.map((pl) => pl.name));

  ngOnInit(): void {
    this.setSeo(
      this.i18n.t(this.ui.productNav.pricing),
      this.i18n.t(this.product().pricing.lead),
      'pricing',
    );
  }
}
