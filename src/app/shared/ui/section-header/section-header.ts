import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 [id]="headingId() || null">{{ heading() }}</h2>
    @if (desc()) {
      <p class="desc">{{ desc() }}</p>
    }
    <ng-content />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 720px;
      margin-block-end: clamp(32px, 5vw, 56px);
    }
    .desc {
      color: var(--text-body);
      font-size: 1.0625rem;
      max-width: 36em;
    }
  `,
})
export class SectionHeader {
  readonly heading = input.required<string>();
  readonly desc = input('');
  readonly headingId = input('');
}
