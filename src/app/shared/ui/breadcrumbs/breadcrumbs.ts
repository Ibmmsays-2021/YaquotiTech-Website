import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Crumb {
  readonly label: string;
  readonly link?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav [attr.aria-label]="label()">
      <ol role="list">
        @for (c of items(); track $index; let last = $last) {
          <li>
            @if (c.link && !last) {
              <a [routerLink]="c.link">{{ c.label }}</a>
              <span class="sep" aria-hidden="true">/</span>
            } @else {
              <span aria-current="page">{{ c.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: `
    ol {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    li {
      display: inline-flex;
      gap: 8px;
      min-width: 0;
    }
    a {
      color: var(--text-muted);
    }
    a:hover {
      color: var(--text);
    }
    .sep {
      color: var(--border-strong);
    }
    [aria-current] {
      color: var(--text);
    }
  `,
})
export class Breadcrumbs {
  readonly items = input.required<readonly Crumb[]>();
  readonly label = input('Breadcrumb');
}
