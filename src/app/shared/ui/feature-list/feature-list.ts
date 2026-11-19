import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-feature-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <ul role="list">
      @for (item of items(); track $index) {
        <li>
          <app-icon name="check" [size]="18" [stroke]="2" /><span>{{ item }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      display: grid;
      gap: 12px;
    }
    li {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      color: var(--text-body);
    }
    li span {
      min-width: 0;
    }
    app-icon {
      color: var(--primary-700);
      margin-block-start: 4px;
    }
  `,
})
export class FeatureList {
  readonly items = input.required<readonly string[]>();
}
