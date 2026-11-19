import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    @for (item of items(); track $index; let i = $index) {
      <div class="item" [id]="idPrefix() + '-' + (i + 1)">
        <h3>
          <button
            type="button"
            [id]="idPrefix() + '-q' + (i + 1)"
            [attr.aria-expanded]="open().has(i)"
            [attr.aria-controls]="idPrefix() + '-a' + (i + 1)"
            (click)="toggle(i)"
          >
            <span>{{ item[0] }}</span>
            <app-icon name="chevron" [size]="18" [class.rot]="open().has(i)" />
          </button>
        </h3>
        <div
          class="answer"
          role="region"
          [id]="idPrefix() + '-a' + (i + 1)"
          [attr.aria-labelledby]="idPrefix() + '-q' + (i + 1)"
          [hidden]="!open().has(i)"
        >
          <p>{{ item[1] }}</p>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
      border-block-start: 1px solid var(--border);
    }
    .item {
      border-block-end: 1px solid var(--border);
    }
    h3 {
      font-size: 1em;
    }
    button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 18px 0;
      background: none;
      border: 0;
      text-align: start;
      font-weight: 600;
      color: var(--text);
      cursor: pointer;
    }
    app-icon {
      color: var(--text-muted);
      transition: transform var(--dur) var(--ease);
    }
    app-icon.rot {
      transform: rotate(180deg);
    }
    .answer {
      padding-block-end: 18px;
      color: var(--text-body);
    }
  `,
})
export class Faq {
  readonly items = input.required<readonly (readonly [string, string])[]>();
  /** Stable ids (#faq-2) so an answer can be linked to; one Faq per page. */
  readonly idPrefix = input('faq');
  protected readonly open = signal<ReadonlySet<number>>(new Set());
  private readonly doc = inject(DOCUMENT);

  constructor() {
    // Deep link: /…/pricing#faq-2 opens the second answer.
    afterNextRender(() => {
      const prefix = `#${this.idPrefix()}-`;
      const hash = this.doc.location?.hash ?? '';
      const i = hash.startsWith(prefix) ? Number(hash.slice(prefix.length)) - 1 : -1;
      if (i >= 0 && i < this.items().length) this.open.set(new Set([i]));
    });
  }

  toggle(i: number): void {
    const opening = !this.open().has(i);
    this.open.update((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
    // The URL reflects the last opened answer, so it can be shared.
    const win = this.doc.defaultView;
    if (win) {
      const { pathname, search } = win.location;
      win.history.replaceState(
        win.history.state,
        '',
        pathname + search + (opening ? `#${this.idPrefix()}-${i + 1}` : ''),
      );
    }
  }
}
