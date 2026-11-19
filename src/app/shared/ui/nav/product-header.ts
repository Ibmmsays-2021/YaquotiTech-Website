import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactDialogService } from '../../../core/contact/contact-dialog';
import { DocsSearchService } from '../../../core/docs-search';
import { I18n } from '../../../core/i18n';
import type { ProductMeta } from '../../../content/types';
import { ui } from '../../../content/ui';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ProductLogo } from '../product-logo/product-logo';
import { MobileNavService } from './mobile-nav-launcher';
import { productNavItems } from './product-nav-items';

/** Product-site header: Logo · Home · Docs · … · [Search] [Try system] [Get in touch]. */
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
            class="search-btn"
            aria-haspopup="dialog"
            [attr.aria-label]="i18n.t(ui.search.button)"
            aria-keyshortcuts="Control+K Meta+K"
            (click)="openSearch()"
          >
            <app-icon name="search" [size]="16" />
            <span class="search-label">{{ i18n.t(ui.search.button) }}</span>
            <kbd class="search-kbd">{{ shortcut }}</kbd>
          </button>
          @if (product().tryUrl; as url) {
            <a
              appButton="secondary"
              size="sm"
              class="desktop-only"
              [href]="url"
              target="_blank"
              rel="noopener"
              >{{ i18n.t(ui.nav.trySystem) }}</a
            >
          } @else {
            <button
              type="button"
              appButton="secondary"
              size="sm"
              class="desktop-only"
              (click)="contact.open({ topic: product().id, intent: 'demo' })"
            >
              {{ i18n.t(ui.nav.trySystem) }}
            </button>
          }
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
    .actions {
      gap: 10px;
    }
    .nav-link {
      padding: 0 10px;
      font-size: 0.9rem;
    }
    .nav-link::after {
      inset-inline: 10px;
    }
    /* Search: a field-like button with its shortcut; icon-only where the bar gets tight. */
    .search-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 8px 0 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      color: var(--text-muted);
      font: inherit;
      font-size: 0.84375rem;
      cursor: pointer;
      transition:
        border-color var(--dur) var(--ease),
        color var(--dur) var(--ease);
    }
    .search-btn:hover {
      border-color: var(--border-strong);
      color: var(--text);
    }
    .search-label {
      min-width: 88px;
      text-align: start;
    }
    .search-kbd {
      font-size: 0.6875rem;
    }
    @media (max-width: 1320px) {
      .search-btn {
        width: 36px;
        padding: 0;
        justify-content: center;
      }
      .search-label,
      .search-kbd {
        display: none;
      }
    }
    @media (max-width: 1080px) {
      .search-btn {
        width: 44px;
        height: 44px;
        border: 0;
        background: transparent;
        color: var(--text);
      }
    }
  `,
  host: {
    '(document:keydown)': 'onKey($event)',
  },
})
export class ProductHeader {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  protected readonly mobileNav = inject(MobileNavService);
  protected readonly ui = ui;
  protected readonly items = productNavItems;
  readonly product = input.required<ProductMeta>();
  private readonly search = inject(DocsSearchService);
  private readonly platform = inject(PLATFORM_ID);
  /** Shown on the search button: ⌘K on Apple devices, Ctrl K elsewhere. */
  protected readonly shortcut =
    isPlatformBrowser(this.platform) && /Mac|iPhone|iPad/.test(navigator.platform)
      ? '⌘K'
      : 'Ctrl K';

  protected openSearch(): void {
    void this.search.open(this.product().id);
  }

  /** Ctrl/⌘ + K opens search anywhere; "/" too, unless the visitor is typing. */
  protected onKey(event: KeyboardEvent): void {
    const typing = (event.target as HTMLElement | null)?.closest?.(
      'input, textarea, select, [contenteditable]',
    );
    const combo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
    if (
      combo ||
      (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey)
    ) {
      event.preventDefault();
      this.openSearch();
    }
  }

  protected base(): string {
    return this.i18n.link(`systems/${this.product().id}`);
  }
}
