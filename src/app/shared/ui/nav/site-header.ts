import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactDialogService } from '../../../core/contact/contact-dialog';
import { CurrentUrl } from '../../../core/current-url';
import { I18n } from '../../../core/i18n';
import { PRODUCT_CATALOG } from '../../../content/products/catalog';
import { SERVICES } from '../../../content/services';
import { brand, ui } from '../../../content/ui';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ProductLogo } from '../product-logo/product-logo';
import { MobileNavService } from './mobile-nav-launcher';
import { NavDropdown } from './nav-dropdown';

/** Company-site header: Logo · Home · Products ▾ · Services ▾ · About · [Get in touch] [EN | ع]. */
@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Button, Icon, ProductLogo, NavDropdown],
  template: `
    <header>
      <div class="container bar">
        <a
          class="brand"
          [routerLink]="i18n.link()"
          [attr.aria-label]="i18n.t(brand.name) + ' — ' + i18n.t(ui.nav.home)"
        >
          <app-product-logo [priority]="true" />
        </a>

        <nav class="primary" [attr.aria-label]="i18n.t(ui.nav.main)">
          <ul role="list">
            <li>
              <a
                class="nav-link"
                [routerLink]="i18n.link()"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page"
                >{{ i18n.t(ui.nav.home) }}</a
              >
            </li>
            <li>
              <app-nav-dropdown
                [label]="i18n.t(ui.nav.products)"
                [active]="section() === 'products'"
                [wide]="true"
              >
                @for (p of products; track p.id) {
                  <a class="menu-item" [routerLink]="i18n.link('products/' + p.id)">
                    <span class="mi-ico"><app-icon [name]="p.icon" [size]="18" /></span>
                    <span>
                      <strong translate="no">{{ i18n.t(p.name) }}</strong>
                      <small>{{ i18n.t(p.tagline) }}</small>
                    </span>
                  </a>
                }
                <a class="menu-foot" [routerLink]="i18n.link('products')">{{
                  i18n.t(ui.common.allProducts)
                }}</a>
              </app-nav-dropdown>
            </li>
            <li>
              <app-nav-dropdown
                [label]="i18n.t(ui.nav.services)"
                [active]="section() === 'services'"
              >
                @for (s of services; track s.id) {
                  <a class="menu-item" [routerLink]="i18n.link('services/' + s.id)">
                    <span class="mi-ico"><app-icon [name]="s.icon" [size]="18" /></span>
                    <span>
                      <strong>{{ i18n.t(s.title) }}</strong>
                      <small>{{ i18n.t(s.summary) }}</small>
                    </span>
                  </a>
                }
                <a class="menu-foot" [routerLink]="i18n.link('services')">{{
                  i18n.t(ui.common.allServices)
                }}</a>
              </app-nav-dropdown>
            </li>
            <li>
              <a
                class="nav-link"
                [routerLink]="i18n.link('about')"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >{{ i18n.t(ui.nav.about) }}</a
              >
            </li>
          </ul>
        </nav>

        <div class="actions">
          <button
            type="button"
            appButton="primary"
            size="sm"
            class="desktop-only"
            (click)="contact.open()"
          >
            {{ i18n.t(ui.nav.getInTouch) }}
          </button>
          <button
            type="button"
            class="menu-btn"
            aria-haspopup="dialog"
            [attr.aria-label]="i18n.t(ui.nav.menu)"
            (click)="mobileNav.open(null)"
          >
            <app-icon name="menu" [size]="22" />
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.scss',
})
export class SiteHeader {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  protected readonly mobileNav = inject(MobileNavService);
  private readonly url = inject(CurrentUrl);
  protected readonly ui = ui;
  protected readonly brand = brand;
  protected readonly products = PRODUCT_CATALOG;
  protected readonly services = SERVICES;
  protected readonly section = computed(() => this.url.pathAfterLang().split('/')[0] ?? '');
}
