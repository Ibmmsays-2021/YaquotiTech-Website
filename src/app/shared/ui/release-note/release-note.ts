import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { I18n } from '../../../core/i18n';
import type { Release, ReleaseTag } from '../../../content/types';
import { ui } from '../../../content/ui';
import { type BadgeTone } from '../status-badge/status-badge';

/** New = green, Improved = sky, Fixed = primary, Breaking = red (status colours only). */
export const RELEASE_TONE: Record<ReleaseTag, BadgeTone> = {
  new: 'green',
  improved: 'sky',
  fixed: 'primary',
  breaking: 'red',
};

export const RELEASE_ORDER: readonly ReleaseTag[] = ['new', 'improved', 'fixed', 'breaking'];

/** Stable anchor for a release: v4.2.0 → "v4-2-0". */
export const releaseId = (r: Release): string => `v${r.version.replace(/[^\w]+/g, '-')}`;

/** How many changes a collapsed release shows. */
const PREVIEW = 2;

/**
 * One release on the timeline: version and date beside a node on the spine, the summary,
 * a copy-link button, and its changes grouped by category (filtered, collapsible).
 */
@Component({
  selector: 'app-release-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="when">
      <span class="node" aria-hidden="true"></span>
      <h2 class="version" [id]="id() + '-title'" dir="ltr">v{{ release().version }}</h2>
      <p class="date">
        <time [attr.datetime]="release().date">{{ date() }}</time>
      </p>
    </div>
    <article class="entry" [attr.aria-labelledby]="id() + '-title'">
      <div class="head">
        <p class="summary">{{ i18n.t(release().title) }}</p>
        <button type="button" class="permalink" (click)="copyLink()">
          {{ i18n.t(copied() ? ui.ref.linkCopied : ui.ref.copyLink) }}
        </button>
        <span class="visually-hidden" aria-live="polite">{{
          copied() ? i18n.t(ui.ref.linkCopied) : ''
        }}</span>
      </div>

      <div class="groups" [id]="id() + '-details'">
        @for (g of shownGroups(); track g.tag) {
          <section class="group" [attr.aria-label]="i18n.t(ui.releaseCategory[g.tag])">
            <h3 [class]="'cat tone-' + tone[g.tag]">
              <span class="dot" aria-hidden="true"></span>{{ i18n.t(ui.releaseCategory[g.tag]) }}
            </h3>
            <ul role="list" [class]="'tone-' + tone[g.tag]">
              @for (n of g.items; track $index) {
                <li>{{ i18n.t(n.text) }}</li>
              }
            </ul>
          </section>
        }
      </div>

      @if (total() > preview) {
        <button
          type="button"
          class="toggle"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="id() + '-details'"
          (click)="toggled.emit()"
        >
          {{ open() ? i18n.t(ui.ref.showFewer) : i18n.f(ui.ref.showAll, total().toString()) }}
        </button>
      }
    </article>
  `,
  host: { '[id]': 'id()' },
  styleUrl: './release-note.scss',
})
export class ReleaseNote {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  protected readonly tone = RELEASE_TONE;
  protected readonly preview = PREVIEW;
  private readonly doc = inject(DOCUMENT);

  readonly release = input.required<Release>();
  /** Categories to show; empty = all. */
  readonly filter = input<ReadonlySet<ReleaseTag>>(new Set());
  readonly open = input(false);
  readonly toggled = output<void>();

  protected readonly id = computed(() => releaseId(this.release()));
  protected readonly copied = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;

  /** Changes grouped by category, in a fixed order, after the filter. */
  private readonly groups = computed(() => {
    const f = this.filter();
    return RELEASE_ORDER.filter((tag) => !f.size || f.has(tag))
      .map((tag) => ({ tag, items: this.release().notes.filter((n) => n.tag === tag) }))
      .filter((g) => g.items.length);
  });

  protected readonly total = computed(() => this.groups().reduce((n, g) => n + g.items.length, 0));

  /** Collapsed: only the first few changes, in category order. */
  protected readonly shownGroups = computed(() => {
    if (this.open()) return this.groups();
    let left = PREVIEW;
    return this.groups()
      .map((g) => {
        const items = g.items.slice(0, Math.max(0, left));
        left -= items.length;
        return { ...g, items };
      })
      .filter((g) => g.items.length);
  });

  protected readonly date = computed(() =>
    new Intl.DateTimeFormat(this.i18n.lang() === 'ar' ? 'ar' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${this.release().date}T00:00:00Z`)),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Copies a link to this release and puts its anchor in the address bar. */
  protected async copyLink(): Promise<void> {
    const win = this.doc.defaultView;
    if (!win) return;
    const url = `${win.location.origin}${win.location.pathname}#${this.id()}`;
    try {
      await win.navigator.clipboard.writeText(url);
      win.history.replaceState(win.history.state, '', `${win.location.pathname}#${this.id()}`);
      this.copied.set(true);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.copied.set(false), 1800);
    } catch {
      this.copied.set(false);
    }
  }
}
