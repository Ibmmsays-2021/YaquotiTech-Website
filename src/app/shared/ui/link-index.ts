import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { IconName } from '../../content/types';
import { Icon } from './icon/icon';

export interface IndexLink {
  readonly label: string;
  readonly desc: string;
  readonly link: string;
  readonly icon: IconName;
}

/**
 * A quiet two-column index of destinations (like a docs table of contents): a hairline,
 * an icon, a link and one short line. Used instead of a grid of identical boxed cards.
 */
@Component({
  selector: 'app-link-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <ul role="list">
      @for (item of items(); track item.link) {
        <li>
          <app-icon [name]="item.icon" [size]="18" />
          <div>
            <a [routerLink]="item.link" class="stretched">{{ item.label }}</a>
            @if (item.desc) {
              <p>{{ item.desc }}</p>
            }
          </div>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
      column-gap: clamp(32px, 5vw, 64px);
    }
    li {
      position: relative;
      display: flex;
      gap: 14px;
      align-items: flex-start;
      padding-block: 22px;
      border-block-start: 1px solid var(--border);
    }
    li > div {
      min-width: 0;
    }
    app-icon {
      color: var(--primary-700);
      margin-block-start: 3px;
    }
    a {
      font-weight: 600;
      font-size: 1.0625rem;
      color: var(--text);
      text-decoration: none;
    }
    li:hover a {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .stretched::after {
      content: '';
      position: absolute;
      inset: 0;
    }
    .stretched:focus-visible {
      outline: none;
    }
    .stretched:focus-visible::after {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
    p {
      margin-block-start: 4px;
      color: var(--text-muted);
      font-size: 0.9375rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `,
})
export class LinkIndex {
  readonly items = input.required<readonly IndexLink[]>();
}
