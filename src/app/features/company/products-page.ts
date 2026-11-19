import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { home } from '../../content/company';
import { PRODUCT_CATALOG } from '../../content/products/catalog';
import { ui } from '../../content/ui';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Hero } from '../../shared/ui/hero/hero';
import { CtaBand } from '../../shared/ui/cta-band';
import { ProductRows } from './product-rows';

@Component({
  selector: 'app-products-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, ProductRows, CtaBand],
  template: `
    <app-hero [heading]="i18n.t(home.productsHead.title)" [lead]="i18n.t(home.productsHead.desc)">
      <app-breadcrumbs
        [items]="[
          { label: i18n.t(ui.nav.home), link: i18n.link() },
          { label: i18n.t(ui.nav.products) },
        ]"
      />
    </app-hero>
    <section class="section section--tight">
      <div class="container">
        <app-product-rows [products]="products" [detailed]="true" />
      </div>
    </section>
    <app-cta-band [heading]="i18n.t(home.cta.title)" [desc]="i18n.t(home.cta.desc)" />
  `,
})
export class ProductsPage implements OnInit {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  protected readonly home = home;
  protected readonly products = PRODUCT_CATALOG;

  ngOnInit(): void {
    this.seo.set({
      title: this.i18n.t(ui.nav.products),
      description: this.i18n.t(home.productsHead.desc),
      path: 'products',
    });
  }
}
