import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactDialogService } from '../../../core/contact/contact-dialog';
import { I18n } from '../../../core/i18n';
import type { ProductMeta } from '../../../content/types';
import { ui } from '../../../content/ui';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ProductLogo } from '../product-logo/product-logo';
import { MobileNavService } from './mobile-nav-launcher';
import { productNavItems } from './product-nav-items';

/** Product-site header: Logo · Home · Docs · … · [Get in touch]. */
@Component({
  selector: 'app-product-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Button, Icon, ProductLogo],
  template: `
    <header>
      <div class="container bar">
        <a
          class="brand"
          [routerLink]="base()"
          [attr.aria-label]="i18n.t(product().name) + ' — ' + i18n.t(ui.productNav.home)"
        >
          <app-product-logo [product]="product()" [priority]="true" />
        </a>

        <nav class="primary" [attr.aria-label]="i18n.t(product().name)">
          <ul role="list">
            @for (item of items; track item.path) {
              <li>
                <a
                  class="nav-link"
                  [routerLink]="base() + (item.path ? '/' + item.path : '')"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: !item.path }"
                  ariaCurrentWhenActive="page"
                  >{{ i18n.t(item.label) }}</a
                >
              </li>
            }
          </ul>
        </nav>

        <div class="actions">
          <button
            type="button"
            appButton="primary"
            size="sm"
            class="desktop-only"
            (click)="contact.open({ topic: product().id })"
          >
            {{ i18n.t(ui.nav.getInTouch) }}
          </button>
          <button
            type="button"
            class="menu-btn"
            aria-haspopup="dialog"
            [attr.aria-label]="i18n.t(ui.nav.menu)"
            (click)="mobileNav.open(product())"
          >
            <app-icon name="menu" [size]="22" />
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.scss',
  styles: `
    .bar {
      gap: 20px;
    }
    .nav-link {
      padding: 0 10px;
      font-size: 0.9rem;
    }
  `,
})
export class ProductHeader {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  protected readonly mobileNav = inject(MobileNavService);
  protected readonly ui = ui;
  protected readonly items = productNavItems;
  readonly product = input.required<ProductMeta>();
  protected base(): string {
    return this.i18n.link(`systems/${this.product().id}`);
  }
}
