import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18n } from '../../../core/i18n';
import type { ProductMeta } from '../../../content/types';
import { brand } from '../../../content/ui';

/**
 * A product's logo. Uses the real logo when the product config has one; otherwise renders the
 * Yaquoti mark + product name as a text wordmark. Drop a real logo into the config to replace it.
 * Pass no product to get the Yaquoti Tech company logo.
 */
@Component({
  selector: 'app-product-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product(); as p) {
      @if (p.logo; as logo) {
        <img
          [src]="'/' + logo.src"
          [srcset]="'/' + logo.src + ' 1x, /' + logo.src2x + ' 2x'"
          [width]="logo.width"
          [height]="logo.height"
          [alt]="i18n.t(p.name)"
          [attr.fetchpriority]="priority() ? 'high' : null"
          [attr.loading]="priority() ? null : 'lazy'"
          decoding="async"
        />
      } @else {
        <span class="wordmark">
          <img
            src="/assets/logos/yaquoti-mark.png"
            srcset="/assets/logos/yaquoti-mark.png 1x, /assets/logos/yaquoti-mark@2x.png 2x"
            width="41"
            height="28"
            alt=""
            [attr.loading]="priority() ? null : 'lazy'"
          />
          <span class="wordmark__name" translate="no">{{ i18n.t(p.name) }}</span>
        </span>
      }
    } @else {
      <img
        class="company"
        src="/assets/logos/yaquoti-tech.png"
        srcset="/assets/logos/yaquoti-tech.png 1x, /assets/logos/yaquoti-tech@2x.png 2x"
        width="154"
        height="32"
        [alt]="i18n.t(brand.name)"
        [attr.fetchpriority]="priority() ? 'high' : null"
        [attr.loading]="priority() ? null : 'lazy'"
      />
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
    }
    img {
      display: block;
      max-width: none;
    }
    .wordmark {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .wordmark img {
      width: auto;
      height: 24px;
    }
    .wordmark__name {
      font-weight: 650;
      font-size: 1.0625rem;
      letter-spacing: -0.02em;
      color: var(--text);
      white-space: nowrap;
    }
    :host(.on-dark) img {
      filter: brightness(0) invert(1);
    }
    :host(.on-dark) .wordmark__name {
      color: #fff;
    }
  `,
})
export class ProductLogo {
  protected readonly i18n = inject(I18n);
  protected readonly brand = brand;
  readonly product = input<ProductMeta | null>(null);
  /** Set for the logo in the header so it loads first. */
  readonly priority = input(false);
}
