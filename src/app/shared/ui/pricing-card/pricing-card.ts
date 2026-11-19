import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ContactDialogService } from '../../../core/contact/contact-dialog';
import { I18n } from '../../../core/i18n';
import type { PricingPlan } from '../../../content/types';
import { ui } from '../../../content/ui';
import { Button } from '../button/button';
import { FeatureList } from '../feature-list/feature-list';

@Component({
  selector: 'app-pricing-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureList, Button],
  template: `
    <div class="head">
      <h2>{{ i18n.t(plan().name) }}</h2>
      @if (plan().featured) {
        <span class="tag">{{ i18n.t(ui.common.mostPopular) }}</span>
      }
    </div>
    <p class="desc">{{ i18n.t(plan().desc) }}</p>
    <p class="price">
      <span class="amount">{{ i18n.t(plan().price) }}</span>
      <span class="period">{{ i18n.t(plan().period) }}</span>
    </p>
    <button
      type="button"
      [appButton]="plan().featured ? 'primary' : 'secondary'"
      (click)="contact.open({ topic: productId(), intent: 'pricing' })"
    >
      {{ i18n.t(ui.common.contactSales) }}
    </button>
    <app-feature-list [items]="i18n.t(plan().features)" />
  `,
  host: { '[class.featured]': '!!plan().featured' },
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 32px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
    }
    :host(.featured) {
      border-color: var(--color-primary);
      box-shadow: inset 0 3px 0 var(--color-primary);
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    h2 {
      font-size: 1.125rem;
      letter-spacing: -0.01em;
    }
    .tag {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-700);
    }
    .desc {
      color: var(--text-body);
      font-size: 0.9375rem;
      min-height: 3em;
    }
    .price {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .amount {
      font-size: 1.75rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text);
    }
    .period {
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    button {
      width: 100%;
    }
  `,
})
export class PricingCard {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  protected readonly ui = ui;
  readonly plan = input.required<PricingPlan>();
  readonly productId = input.required<string>();
}
