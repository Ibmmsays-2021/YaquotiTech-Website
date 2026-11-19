import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light';

/**
 * Button styles for native <a> and <button> elements, so links stay links:
 * `<a appButton="primary" routerLink="…">` or `<button appButton="secondary" type="button">`.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[appButton], button[appButton]',
  template: '<ng-content />',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"btn--" + (appButton() || "primary") + (size() === "sm" ? " btn--sm" : "")',
  },
})
export class Button {
  readonly appButton = input<ButtonVariant | ''>('primary');
  readonly size = input<'md' | 'sm'>('md');
}
