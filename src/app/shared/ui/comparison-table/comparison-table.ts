import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18n } from '../../../core/i18n';
import type { ComparisonRow, Text } from '../../../content/types';
import { ui } from '../../../content/ui';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-comparison-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="wrap" tabindex="0" role="region" [attr.aria-label]="caption()">
      <table>
        <caption class="visually-hidden">
          {{
            caption()
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col">{{ i18n.t(ui.common.feature) }}</th>
            @for (p of plans(); track $index) {
              <th scope="col">{{ i18n.t(p) }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr>
              <th scope="row">{{ i18n.t(row.label) }}</th>
              @for (v of row.values; track $index) {
                <td>
                  @if (v === true) {
                    <app-icon name="check" [size]="18" [stroke]="2" class="yes" />
                    <span class="visually-hidden">{{ i18n.t(ui.common.included) }}</span>
                  } @else if (v === false) {
                    <span class="no" aria-hidden="true">—</span>
                    <span class="visually-hidden">{{ i18n.t(ui.common.notIncluded) }}</span>
                  } @else {
                    {{ i18n.t(v) }}
                  }
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .wrap {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9375rem;
      min-width: 560px;
    }
    th,
    td {
      padding: 14px 20px;
      text-align: start;
      border-block-end: 1px solid var(--border);
    }
    tbody tr:last-child > * {
      border-block-end: 0;
    }
    thead th {
      font-size: 0.875rem;
      color: var(--text);
      background: var(--navy-50);
    }
    tbody th {
      font-weight: 500;
      color: var(--text);
    }
    td {
      color: var(--text-body);
      font-variant-numeric: tabular-nums;
    }
    .yes {
      color: var(--status-green-fg);
    }
    .no {
      color: var(--text-muted);
    }
  `,
})
export class ComparisonTable {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly plans = input.required<readonly Text[]>();
  readonly rows = input.required<readonly ComparisonRow[]>();
  readonly caption = input('');
}
