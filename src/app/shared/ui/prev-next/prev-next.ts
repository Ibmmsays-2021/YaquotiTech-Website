import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n';
import { ui } from '../../../content/ui';
import { Icon } from '../icon/icon';

export interface PagerLink {
  readonly label: string;
  readonly link: string;
}

@Component({
  selector: 'app-prev-next',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <nav aria-label="Pagination">
      @if (prev(); as p) {
        <a class="pg prev" [routerLink]="p.link" rel="prev">
          <small><app-icon name="arrow-left" [size]="14" /> {{ i18n.t(ui.common.previous) }}</small>
          <span>{{ p.label }}</span>
        </a>
      } @else {
        <span></span>
      }
      @if (next(); as n) {
        <a class="pg next" [routerLink]="n.link" rel="next">
          <small>{{ i18n.t(ui.common.next) }} <app-icon name="arrow" [size]="14" /></small>
          <span>{{ n.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-block-start: 64px;
    }
    .pg {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px 20px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      color: var(--text);
      text-decoration: none;
    }
    .pg:hover {
      border-color: var(--primary-300);
      color: var(--text);
    }
    .next {
      text-align: end;
      align-items: flex-end;
    }
    small {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--text-muted);
      font-size: 0.8125rem;
    }
    span {
      font-weight: 600;
      color: var(--primary-700);
    }
    @media (max-width: 560px) {
      nav {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class PrevNext {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly prev = input<PagerLink | null>(null);
  readonly next = input<PagerLink | null>(null);
}
