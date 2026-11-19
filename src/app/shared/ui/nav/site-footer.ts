import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactDialogService } from '../../../core/contact/contact-dialog';
import { I18n } from '../../../core/i18n';
import { PRODUCT_CATALOG } from '../../../content/products/catalog';
import { SERVICES } from '../../../content/services';
import { brand, ui } from '../../../content/ui';
import { ProductLogo } from '../product-logo/product-logo';

/** Footer shared by both shells. */
@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ProductLogo],
  template: `
    <footer>
      <div class="container">
        <div class="grid">
          <div class="brand">
            <a [routerLink]="i18n.link()" [attr.aria-label]="i18n.t(brand.name)"
              ><app-product-logo class="on-dark"
            /></a>
            <p>{{ i18n.t(brand.tagline) }}</p>
            <p class="contact">
              <a [href]="'mailto:' + brand.email" dir="ltr">{{ brand.email }}</a>
              <span>{{ i18n.t(ui.contact.hours) }}</span>
            </p>
          </div>
          <nav [attr.aria-label]="i18n.t(ui.nav.products)">
            <h2>{{ i18n.t(ui.nav.products) }}</h2>
            <ul role="list">
              @for (p of products; track p.id) {
                <li>
                  <a [routerLink]="i18n.link('products/' + p.id)" translate="no">{{
                    i18n.t(p.name)
                  }}</a>
                </li>
              }
            </ul>
          </nav>
          <nav [attr.aria-label]="i18n.t(ui.nav.services)">
            <h2>{{ i18n.t(ui.nav.services) }}</h2>
            <ul role="list">
              @for (s of services; track s.id) {
                <li>
                  <a [routerLink]="i18n.link('services/' + s.id)">{{ i18n.t(s.title) }}</a>
                </li>
              }
            </ul>
          </nav>
          <nav [attr.aria-label]="i18n.t(ui.common.company)">
            <h2>{{ i18n.t(ui.common.company) }}</h2>
            <ul role="list">
              <li>
                <a [routerLink]="i18n.link('about')">{{ i18n.t(ui.nav.about) }}</a>
              </li>
              <li>
                <button type="button" class="linkish" (click)="contact.open()">
                  {{ i18n.t(ui.nav.getInTouch) }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div class="bottom">
          <span
            >© {{ year }} <span translate="no">{{ i18n.t(brand.name) }}</span>.
            {{ i18n.t(ui.common.rights) }}</span
          >
        </div>
      </div>
    </footer>
  `,
  styles: `
    footer {
      background: var(--color-navy);
      color: color-mix(in srgb, var(--color-navy) 35%, white);
      padding-block: 72px 32px;
      font-size: 0.9375rem;
    }
    .grid {
      display: grid;
      grid-template-columns: 1.6fr repeat(3, 1fr);
      gap: 40px;
    }
    .brand {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 22em;
    }
    .contact {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    h2 {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #fff;
      margin-block-end: 16px;
    }
    ul {
      display: grid;
      gap: 10px;
    }
    a,
    .linkish {
      color: color-mix(in srgb, var(--color-navy) 35%, white);
    }
    a:hover,
    .linkish:hover {
      color: #fff;
    }
    .linkish {
      padding: 0;
      border: 0;
      background: none;
      font: inherit;
      cursor: pointer;
      text-align: start;
    }
    .linkish:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-block-start: 56px;
      padding-block-start: 24px;
      border-block-start: 1px solid color-mix(in srgb, white 14%, var(--color-navy));
      font-size: 0.875rem;
    }
    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
      .brand {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 480px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class SiteFooter {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  protected readonly ui = ui;
  protected readonly brand = brand;
  protected readonly products = PRODUCT_CATALOG;
  protected readonly services = SERVICES;
  protected readonly year = new Date().getFullYear();
}
