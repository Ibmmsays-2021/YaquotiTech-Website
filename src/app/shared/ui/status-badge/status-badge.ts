import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeTone = 'green' | 'sky' | 'yellow' | 'red' | 'primary' | 'grey';

@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="dot" aria-hidden="true"></span>{{ label() }}`,
  host: { '[class]': '"tone-" + tone()' },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 1.5;
      white-space: nowrap;
      background: var(--bg-tone);
      color: var(--fg-tone);
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    :host(.tone-green) {
      --bg-tone: var(--status-green-bg);
      --fg-tone: var(--status-green-fg);
    }
    :host(.tone-sky) {
      --bg-tone: var(--status-sky-bg);
      --fg-tone: var(--status-sky-fg);
    }
    :host(.tone-yellow) {
      --bg-tone: var(--status-yellow-bg);
      --fg-tone: var(--status-yellow-fg);
    }
    :host(.tone-red) {
      --bg-tone: var(--status-red-bg);
      --fg-tone: var(--status-red-fg);
    }
    :host(.tone-primary) {
      --bg-tone: var(--status-primary-bg);
      --fg-tone: var(--status-primary-fg);
    }
    :host(.tone-grey) {
      --bg-tone: var(--status-grey-bg);
      --fg-tone: var(--status-grey-fg);
    }
  `,
})
export class StatusBadge {
  readonly tone = input.required<BadgeTone>();
  readonly label = input.required<string>();
}
