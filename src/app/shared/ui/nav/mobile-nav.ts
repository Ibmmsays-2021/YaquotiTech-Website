import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  NavigationSkipped,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATED } from '../../../core/focus';
import { ContactDialogService } from '../../../core/contact/contact-dialog';
import { I18n } from '../../../core/i18n';
import { PRODUCT_CATALOG } from '../../../content/products/catalog';
import { SERVICES } from '../../../content/services';
import type { ProductMeta } from '../../../content/types';
import { ui } from '../../../content/ui';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { productNavItems } from './product-nav-items';
import { ProductLogo } from '../product-logo/product-logo';

export interface MobileNavData {
  readonly product: ProductMeta | null;
}

/** Slide-in navigation panel for small screens (CDK Dialog: focus trap, Esc, focus restore). */
@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icon, Button, ProductLogo],
  template: `
    <div class="sheet" [attr.dir]="i18n.dir()" [attr.lang]="i18n.lang()">
      <div class="top">
        <app-product-logo [product]="product" />
        <button
          type="button"
          class="close"
          (click)="ref.close()"
          [attr.aria-label]="i18n.t(ui.nav.close)"
        >
          <app-icon name="x" [size]="20" />
        </button>
      </div>

      <nav [attr.aria-label]="i18n.t(ui.nav.main)">
        @if (product; as p) {
          <a class="back" [routerLink]="i18n.link()"
            ><app-icon name="arrow-left" [size]="16" /> {{ i18n.t(ui.nav.backToCompany) }}</a
          >
          <ul role="list">
            @for (item of productItems; track item.path) {
              <li>
                <a
                  class="link"
                  [routerLink]="i18n.link('systems/' + p.id + (item.path ? '/' + item.path : ''))"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: !item.path }"
                  ariaCurrentWhenActive="page"
                  >{{ i18n.t(item.label) }}</a
                >
              </li>
            }
          </ul>
        } @else {
          <ul role="list">
            <li>
              <a
                class="link"
                [routerLink]="i18n.link()"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                ariaCurrentWhenActive="page"
                >{{ i18n.t(ui.nav.home) }}</a
              >
            </li>
          </ul>
          <p class="group">{{ i18n.t(ui.nav.products) }}</p>
          <ul role="list">
            @for (p of products; track p.id) {
              <li>
                <a
                  class="link sub"
                  [routerLink]="i18n.link('products/' + p.id)"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  >{{ i18n.t(p.name) }}</a
                >
              </li>
            }
          </ul>
          <p class="group">{{ i18n.t(ui.nav.services) }}</p>
          <ul role="list">
            @for (s of services; track s.id) {
              <li>
                <a
                  class="link sub"
                  [routerLink]="i18n.link('services/' + s.id)"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  >{{ i18n.t(s.title) }}</a
                >
              </li>
            }
          </ul>
          <ul role="list" class="sep">
            <li>
              <a
                class="link"
                [routerLink]="i18n.link('about')"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >{{ i18n.t(ui.nav.about) }}</a
              >
            </li>
          </ul>
        }
      </nav>

      <div class="foot">
        @if (product) {
          @if (product.tryUrl; as url) {
            <a appButton="secondary" [href]="url" target="_blank" rel="noopener">{{
              i18n.t(ui.nav.trySystem)
            }}</a>
          } @else {
            <button type="button" appButton="secondary" (click)="trySystem()">
              {{ i18n.t(ui.nav.trySystem) }}
            </button>
          }
        }
        <button type="button" appButton="primary" (click)="getInTouch()">
          {{ i18n.t(ui.nav.getInTouch) }}
        </button>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .sheet {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 16px 20px 24px;
      background: var(--surface);
      box-shadow: var(--shadow-float);
      animation: slide 220ms var(--ease) both;
    }
    @keyframes slide {
      from {
        transform: translateX(16px);
        opacity: 0;
      }
    }
    .sheet[dir='rtl'] {
      animation-name: slide-rtl;
    }
    @keyframes slide-rtl {
      from {
        transform: translateX(-16px);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .sheet {
        animation: none;
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 44px;
    }
    .close {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: var(--radius);
      background: transparent;
      color: var(--text);
      cursor: pointer;
    }
    .close:hover {
      background: var(--navy-100);
    }
    nav {
      flex: 1;
    }
    .back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-block-end: 12px;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    .group {
      margin: 18px 12px 4px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
    }
    .link {
      display: block;
      padding: 12px;
      border-radius: var(--radius-sm);
      color: var(--text);
      font-weight: 500;
      text-decoration: none;
    }
    .link.sub {
      padding-inline-start: 20px;
    }
    .link:hover {
      background: var(--navy-100);
    }
    .link.active {
      background: var(--primary-100);
      color: var(--primary-800);
      font-weight: 600;
    }
    .sep {
      margin-block-start: 12px;
      padding-block-start: 12px;
      border-block-start: 1px solid var(--border);
    }
    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-block-start: 16px;
      border-block-start: 1px solid var(--border);
    }
  `,
})
export class MobileNav {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  protected readonly ref = inject(DialogRef);
  private readonly contact = inject(ContactDialogService);
  protected readonly product = inject<MobileNavData>(DIALOG_DATA).product;
  protected readonly products = PRODUCT_CATALOG;
  protected readonly services = SERVICES;
  protected readonly productItems = productNavItems;

  constructor() {
    // Close after any link is followed — including a link to the page we're already on.
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd || e instanceof NavigationSkipped),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.ref.close(NAVIGATED));
  }

  protected trySystem(): void {
    this.ref.close(NAVIGATED);
    if (this.product) this.contact.open({ topic: this.product.id, intent: 'demo' });
  }

  protected getInTouch(): void {
    this.ref.close(NAVIGATED);
    this.contact.open(this.product ? { topic: this.product.id } : {});
  }
}
