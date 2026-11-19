import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n';
import type { ProductMeta } from '../../content/types';
import { ui } from '../../content/ui';
import { Icon } from '../../shared/ui/icon/icon';

/** The products as an index of rows (home + products page). */
@Component({
  selector: 'app-product-rows',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <ul role="list">
      @for (p of products(); track p.id) {
        <li>
          <div class="name">
            <span class="ico"><app-icon [name]="p.icon" [size]="20" /></span>
            <div>
              <h3>
                <a [routerLink]="i18n.link('products/' + p.id)" translate="no">{{
                  i18n.t(p.name)
                }}</a>
              </h3>
              <p class="tag">{{ i18n.t(p.tagline) }}</p>
            </div>
          </div>
          @if (detailed()) {
            <p class="summary">{{ i18n.t(p.summary) }}</p>
          }
          <div class="links">
            <a
              [routerLink]="i18n.link('products/' + p.id)"
              class="more"
              [attr.aria-label]="i18n.f(ui.common.overviewOf, i18n.t(p.name))"
              >{{ i18n.t(ui.common.overview) }}</a
            >
            <a
              [routerLink]="i18n.link('systems/' + p.id)"
              class="sys"
              [attr.aria-label]="i18n.f(ui.common.goToSystemOf, i18n.t(p.name))"
              >{{ i18n.t(ui.common.goToSystem) }}</a
            >
          </div>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      border-block-start: 1px solid var(--border);
    }
    li {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) auto;
      gap: 24px;
      align-items: center;
      padding-block: 28px;
      border-block-end: 1px solid var(--border);
    }
    :host(:not(.detailed)) li {
      grid-template-columns: minmax(0, 1fr) auto;
    }
    .name {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      min-width: 0;
    }
    .name > div {
      min-width: 0;
    }
    .ico {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      flex: none;
      border-radius: var(--radius);
      background: var(--primary-50);
      color: var(--primary-700);
    }
    h3 {
      font-size: 1.25rem;
    }
    h3 a {
      color: var(--text);
    }
    .tag {
      margin-block-start: 4px;
      color: var(--text-body);
      font-size: 0.9375rem;
    }
    .summary {
      color: var(--text-muted);
      font-size: 0.9375rem;
    }
    .links {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .sys {
      color: var(--text-muted);
    }
    .sys:hover {
      color: var(--text);
    }
    @media (max-width: 860px) {
      li,
      :host(:not(.detailed)) li {
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .links {
        flex-direction: row;
        align-items: center;
        gap: 20px;
      }
    }
  `,
  host: { '[class.detailed]': 'detailed()' },
})
export class ProductRows {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly products = input.required<readonly ProductMeta[]>();
  readonly detailed = input(false);
}
