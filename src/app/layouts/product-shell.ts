import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { productMetaById } from '../content/products/catalog';
import { ProductHeader } from '../shared/ui/nav/product-header';
import { SiteFooter } from '../shared/ui/nav/site-footer';
import { ShellBase } from './shell-base';

/** Layout for every product site (/:lang/systems/:productId/…), driven by the product config. */
@Component({
  selector: 'app-product-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ProductHeader, SiteFooter],
  template: `
    @if (product(); as p) {
      <a class="skip-link" [href]="url.path() + '#main'" (click)="skip($event)">{{
        i18n.t(ui.nav.skip)
      }}</a>
      <app-product-header [product]="p" />
      <main id="main" tabindex="-1"><router-outlet /></main>
      <!-- Hydrated when scrolled into view; the placeholder reserves its space on in-app navigation. -->
      @defer (on immediate; hydrate on viewport) {
        <app-site-footer />
      } @placeholder {
        <div class="footer-placeholder" aria-hidden="true"></div>
      }
    }
  `,
  styles: `
    main {
      display: block;
      min-height: 60vh;
      outline: none;
    }
    .footer-placeholder {
      min-height: 420px;
      background: var(--color-navy);
    }
  `,
})
export class ProductShell extends ShellBase {
  /** Bound from the route parameter. */
  readonly productId = input.required<string>();
  protected readonly product = computed(() => productMetaById(this.productId()));

  constructor() {
    super();
    // Keep anchor targets (TOC links) clear of the sticky header.
    inject(ViewportScroller).setOffset([0, 96]);
  }
}
