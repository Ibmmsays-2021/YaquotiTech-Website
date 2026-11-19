import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { I18n } from '../../../core/i18n';
import { ui } from '../../../content/ui';
import { Icon } from '../icon/icon';

export interface CodeTab {
  readonly label: string;
  readonly code: string;
}

let nextId = 0;

/**
 * Code window: optional tabs (arrow keys / Home / End move between them, mirrored in RTL),
 * line numbers that are not copied, and a copy button that announces the result.
 * Pass `tabs` for several examples, or `code` + `label` for one.
 */
@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="bar">
      @if (allTabs().length > 1) {
        <div class="tabs" role="tablist" [attr.aria-label]="label() || null">
          @for (t of allTabs(); track t.label; let i = $index) {
            <button
              type="button"
              role="tab"
              class="tab"
              [id]="uid + '-tab-' + i"
              [attr.aria-selected]="active() === i"
              [attr.aria-controls]="uid + '-panel'"
              [attr.tabindex]="active() === i ? 0 : -1"
              (click)="select(i)"
              (keydown)="onTabKey($event, i)"
            >
              {{ t.label }}
            </button>
          }
        </div>
      } @else {
        <span class="name">{{ allTabs()[0]?.label }}</span>
      }
      <button
        type="button"
        class="copy"
        (click)="copy()"
        [attr.aria-label]="i18n.t(ui.common.copy) + ' ' + (allTabs()[active()]?.label ?? '')"
      >
        <app-icon [name]="copied() ? 'check' : 'copy'" [size]="15" />
        {{ i18n.t(copied() ? ui.common.copied : ui.common.copy) }}
      </button>
      <span class="visually-hidden" aria-live="polite">{{
        copied() ? i18n.t(ui.ref.codeCopied) : ''
      }}</span>
    </div>
    <pre
      dir="ltr"
      tabindex="0"
      translate="no"
      [id]="uid + '-panel'"
      [attr.role]="allTabs().length > 1 ? 'tabpanel' : null"
      [attr.aria-labelledby]="allTabs().length > 1 ? uid + '-tab-' + active() : null"
    ><code>@for (line of lines(); track $index) {<span class="ln" aria-hidden="true">{{ $index + 1 }}</span><span class="lc">{{ line }}</span>}</code></pre>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      overflow: hidden;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      padding-inline: 14px 6px;
      border-block-end: 1px solid var(--border);
      background: var(--navy-50);
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
    .name {
      font-weight: 600;
    }
    .tabs {
      display: flex;
      align-self: stretch;
      gap: 4px;
      margin-inline-start: -6px;
    }
    .tab {
      position: relative;
      padding: 0 10px;
      border: 0;
      background: none;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
    }
    .tab:hover {
      color: var(--text);
    }
    .tab[aria-selected='true'] {
      color: var(--text);
      box-shadow: inset 0 -2px 0 var(--color-primary);
    }
    .tab:focus-visible,
    .copy:focus-visible {
      outline-offset: -2px;
    }
    .copy {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-inline-start: auto;
      min-height: 32px;
      padding: 0 10px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: var(--text-body);
      font-size: 0.8125rem;
      cursor: pointer;
    }
    .copy:hover {
      background: var(--navy-100);
    }
    pre {
      margin: 0;
      padding: 14px 16px 16px 0;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.7;
      color: var(--text);
      text-align: left;
      tab-size: 2;
    }
    pre:focus-visible {
      outline-offset: -2px;
    }
    code {
      display: grid;
      grid-template-columns: 3rem auto;
      background: none;
      padding: 0;
    }
    .ln {
      padding-inline-end: 16px;
      text-align: right;
      color: var(--text-muted);
      opacity: 0.7;
      user-select: none;
      font-variant-numeric: tabular-nums;
    }
    .lc {
      white-space: pre;
    }
  `,
})
export class CodeBlock {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  private readonly doc = inject(DOCUMENT);

  /** Several examples shown as tabs (e.g. Request / Response). */
  readonly tabs = input<readonly CodeTab[]>([]);
  /** Or a single example. */
  readonly code = input('');
  readonly label = input('');

  protected readonly uid = `code-${++nextId}`;
  protected readonly active = signal(0);
  protected readonly copied = signal(false);
  protected readonly allTabs = computed<readonly CodeTab[]>(() =>
    this.tabs().length ? this.tabs() : [{ label: this.label(), code: this.code() }],
  );
  protected readonly lines = computed(() =>
    (this.allTabs()[this.active()]?.code ?? '').split('\n'),
  );
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  protected select(i: number): void {
    this.active.set(i);
    this.copied.set(false);
  }

  protected onTabKey(e: KeyboardEvent, i: number): void {
    const n = this.allTabs().length;
    const rtl = this.i18n.dir() === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    let next = -1;
    if (e.key === forward) next = (i + 1) % n;
    if (e.key === back) next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    this.select(next);
    this.doc.getElementById(`${this.uid}-tab-${next}`)?.focus();
  }

  async copy(): Promise<void> {
    try {
      await this.doc.defaultView?.navigator.clipboard.writeText(
        this.allTabs()[this.active()]?.code ?? '',
      );
      this.copied.set(true);
      clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => this.copied.set(false), 2000);
    } catch {
      /* clipboard unavailable: leave the button as is */
    }
  }
}
