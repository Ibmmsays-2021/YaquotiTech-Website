import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { scrollToSection } from '../../../core/docs-search';
import { NAVIGATED } from '../../../core/focus';
import { I18n } from '../../../core/i18n';
import { productById } from '../../../content/products';
import { ui } from '../../../content/ui';
import { Icon } from '../icon/icon';
import { buildIndex, search, type SearchResult } from './search-index';

export interface DocsSearchData {
  readonly productId: string;
}

let uid = 0;

/** Search across every module of a product's docs; each result shows where it is and what it says. */
@Component({
  selector: 'app-docs-search-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="search" role="search">
      <app-icon name="search" [size]="18" />
      <label class="visually-hidden" [for]="ids.input">{{ i18n.t(ui.search.placeholder) }}</label>
      <input
        #field
        [id]="ids.input"
        type="search"
        role="combobox"
        autocomplete="off"
        spellcheck="false"
        aria-autocomplete="list"
        [attr.aria-expanded]="results().length > 0"
        [attr.aria-controls]="ids.list"
        [attr.aria-activedescendant]="results().length ? ids.option + active() : null"
        [placeholder]="i18n.t(ui.search.placeholder)"
        [value]="query()"
        (input)="setQuery($any($event.target).value)"
        (keydown)="onKey($event)"
      />
      <button
        type="button"
        class="close"
        (click)="ref.close()"
        [attr.aria-label]="i18n.t(ui.nav.close)"
      >
        <kbd>Esc</kbd>
      </button>
    </div>

    <div class="body" #body>
      @if (!query().trim()) {
        <p class="hint">{{ i18n.f(ui.search.hint, modules() + '') }}</p>
      } @else if (!results().length) {
        <p class="hint" role="status">{{ i18n.f(ui.search.none, query().trim()) }}</p>
      } @else {
        <p class="visually-hidden" role="status">
          {{ i18n.f(ui.search.count, results().length + '') }}
        </p>
        <ul
          class="results"
          role="listbox"
          [id]="ids.list"
          [attr.aria-label]="i18n.t(ui.search.results)"
        >
          @for (r of results(); track r.entry.path + '#' + r.entry.fragment; let i = $index) {
            <li
              role="option"
              [id]="ids.option + i"
              [attr.aria-selected]="i === active()"
              [class.active]="i === active()"
              (mousemove)="active.set(i)"
            >
              <a [href]="href(r)" (click)="go(r, $event)" tabindex="-1">
                <span class="trail">
                  @for (crumb of r.entry.trail; track $index; let last = $last) {
                    <span>{{ crumb }}</span>
                    @if (!last) {
                      <app-icon class="sep" name="chevron" [size]="12" />
                    }
                  }
                </span>
                <span class="heading">
                  <app-icon name="file" [size]="16" />
                  <span>
                    @for (p of r.heading; track $index) {
                      @if (p.hit) {
                        <mark>{{ p.text }}</mark>
                      } @else {
                        <span>{{ p.text }}</span>
                      }
                    }
                  </span>
                </span>
                @if (r.snippet.length) {
                  <span class="snippet">
                    @for (p of r.snippet; track $index) {
                      @if (p.hit) {
                        <mark>{{ p.text }}</mark>
                      } @else {
                        <span>{{ p.text }}</span>
                      }
                    }
                  </span>
                }
              </a>
            </li>
          }
        </ul>
      }
    </div>

    <footer>
      <span><kbd>↑</kbd><kbd>↓</kbd> {{ i18n.t(ui.search.move) }}</span>
      <span><kbd>Enter</kbd> {{ i18n.t(ui.search.open) }}</span>
      <span><kbd>Esc</kbd> {{ i18n.t(ui.nav.close) }}</span>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      max-height: min(640px, calc(100dvh - 15vh));
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
      box-shadow: 0 24px 64px rgb(30 26 74 / 0.22);
      overflow: hidden;
    }
    .search {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px;
      border-block-end: 1px solid var(--border);
      color: var(--text-muted);
    }
    input {
      flex: 1;
      min-width: 0;
      padding: 18px 0;
      border: 0;
      background: transparent;
      color: var(--text);
      font: inherit;
      font-size: 1rem;
      outline: none;
    }
    input::-webkit-search-cancel-button {
      display: none;
    }
    .close {
      display: grid;
      place-items: center;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
    }
    .body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 8px;
    }
    .hint {
      padding: 28px 12px;
      color: var(--text-muted);
      font-size: 0.875rem;
      text-align: center;
    }
    .results {
      display: grid;
      gap: 2px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .results a {
      display: grid;
      gap: 4px;
      padding: 10px 12px;
      border-radius: var(--radius);
      color: var(--text-body);
      text-decoration: none;
    }
    li.active a {
      background: color-mix(in srgb, var(--color-primary) 9%, var(--surface));
    }
    .trail {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      color: var(--text-muted);
      font-size: 0.75rem;
      line-height: 1.4;
    }
    .sep {
      transform: rotate(-90deg);
      opacity: 0.7;
    }
    :host-context([dir='rtl']) .sep {
      transform: rotate(90deg);
    }
    .heading {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      color: var(--text);
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.4;
    }
    .heading app-icon {
      flex: none;
      margin-block-start: 2px;
      color: var(--text-muted);
    }
    li.active .heading app-icon {
      color: var(--primary-700);
    }
    .snippet {
      padding-inline-start: 24px;
      color: var(--text-muted);
      font-size: 0.8125rem;
      line-height: 1.55;
      overflow-wrap: anywhere;
    }
    mark {
      padding: 0 1px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--color-primary) 18%, transparent);
      color: var(--primary-800);
    }
    footer {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 10px 16px;
      border-block-start: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.75rem;
    }
    footer span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    @media (max-width: 640px) {
      :host {
        height: 100dvh;
        max-height: none;
        border: 0;
        border-radius: 0;
      }
      footer {
        display: none;
      }
    }
  `,
})
export class DocsSearchDialog {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  protected readonly ref = inject(DialogRef);
  private readonly router = inject(Router);
  private readonly data = inject<DocsSearchData>(DIALOG_DATA);
  private readonly body = viewChild<ElementRef<HTMLElement>>('body');

  private readonly n = ++uid;
  protected readonly ids = {
    input: `docs-search-${this.n}`,
    list: `docs-search-list-${this.n}`,
    option: `docs-search-${this.n}-opt-`,
  };

  private readonly product = productById(this.data.productId);
  private readonly docsRoot = this.i18n.link(`systems/${this.data.productId}/docs`);
  /** Built once per dialog; the guides are parsed into sections on open. */
  private readonly index = this.product ? buildIndex(this.product, this.i18n.t, this.docsRoot) : [];

  protected readonly modules = signal(this.product?.docs.modules.length ?? 0);
  protected readonly query = signal('');
  protected readonly active = signal(0);
  protected readonly results = computed(() => search(this.index, this.query()));

  protected setQuery(value: string): void {
    this.query.set(value);
    this.active.set(0);
    this.body()?.nativeElement.scrollTo(0, 0);
  }

  protected onKey(event: KeyboardEvent): void {
    const count = this.results().length;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!count) return;
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      this.active.set((this.active() + step + count) % count);
      this.body()
        ?.nativeElement.querySelector(`#${this.ids.option}${this.active()}`)
        ?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      const r = this.results()[this.active()];
      if (!r) return;
      event.preventDefault();
      this.open(r);
    }
  }

  protected href(r: SearchResult): string {
    return r.entry.path + (r.entry.fragment ? `#${r.entry.fragment}` : '');
  }

  protected go(r: SearchResult, event: MouseEvent): void {
    // Let the browser handle new-tab and new-window clicks.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    this.open(r);
  }

  private open(r: SearchResult): void {
    this.ref.close(NAVIGATED);
    void this.router.navigateByUrl(this.href(r)).then((ok) => {
      if (ok) scrollToSection(r.entry.fragment);
    });
  }
}
