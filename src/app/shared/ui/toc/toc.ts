import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n';
import { scrollSpy } from '../../../core/scroll-spy';
import { ui } from '../../../content/ui';

export interface TocItem {
  readonly id: string;
  readonly label: string;
  /** 2 for a section, 3 for a sub-section (shown indented). */
  readonly level?: number;
}

@Component({
  selector: 'app-toc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav [attr.aria-label]="i18n.t(ui.common.onThisPage)">
      <p class="title">{{ i18n.t(ui.common.onThisPage) }}</p>
      <ul role="list">
        @for (item of items(); track item.id) {
          <li>
            <a
              routerLink="."
              [fragment]="item.id"
              [class.active]="active() === item.id"
              [class.sub]="item.level === 3"
              [attr.aria-current]="active() === item.id ? 'location' : null"
              >{{ item.label }}</a
            >
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    /* The docs layout makes this column sticky. */
    :host {
      display: block;
    }
    .title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-block-end: 12px;
    }
    ul {
      display: grid;
      gap: 2px;
      border-inline-start: 1px solid var(--border);
    }
    a {
      display: block;
      padding: 5px 0;
      padding-inline-start: 14px;
      margin-inline-start: -1px;
      border-inline-start: 1px solid transparent;
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
    a:hover {
      color: var(--text);
      text-decoration: none;
    }
    a.sub {
      padding-inline-start: 26px;
      font-size: 0.78125rem;
    }
    a.active {
      color: var(--primary-700);
      border-inline-start-color: var(--color-primary);
      font-weight: 600;
    }
  `,
})
export class Toc {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly items = input.required<readonly TocItem[]>();
  protected readonly active = scrollSpy(() => this.items().map((i) => i.id));
}
