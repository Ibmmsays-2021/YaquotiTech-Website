import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { home } from '../../content/company';
import type { ReleaseTag } from '../../content/types';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { CtaBand } from '../../shared/ui/cta-band';
import { Hero } from '../../shared/ui/hero/hero';
import {
  RELEASE_ORDER,
  RELEASE_TONE,
  ReleaseNote,
  releaseId,
} from '../../shared/ui/release-note/release-note';
import { ProductPageBase } from './product-page-base';

/**
 * Release notes as a timeline: a sticky category filter, releases newest first, each one
 * collapsible and linkable (#v4-2-0 opens and scrolls to it).
 */
@Component({
  selector: 'app-release-notes-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, ReleaseNote, CtaBand],
  templateUrl: './release-notes-page.html',
  styleUrl: './release-notes-page.scss',
})
export class ReleaseNotesPage extends ProductPageBase implements OnInit {
  protected readonly home = home;
  protected readonly categories = RELEASE_ORDER;
  protected readonly tone = RELEASE_TONE;

  /** Selected categories; empty = all. */
  protected readonly filter = signal<ReadonlySet<ReleaseTag>>(new Set());
  /** Releases the visitor opened or closed explicitly. */
  private readonly toggledIds = signal<Readonly<Record<string, boolean>>>({});
  private readonly fragment = toSignal(inject(ActivatedRoute).fragment);

  protected readonly visible = computed(() => {
    const f = this.filter();
    return this.product().releases.filter((r) => !f.size || r.notes.some((n) => f.has(n.tag)));
  });

  protected readonly releaseId = releaseId;

  /** The newest release, a release named in the URL, and all releases while filtering are open. */
  protected isOpen(id: string, first: boolean): boolean {
    const explicit = this.toggledIds()[id];
    if (explicit !== undefined) return explicit;
    return first || this.fragment() === id || this.filter().size > 0;
  }

  protected toggleOpen(id: string, first: boolean): void {
    const next = !this.isOpen(id, first);
    this.toggledIds.update((m) => ({ ...m, [id]: next }));
  }

  protected toggleCategory(tag: ReleaseTag): void {
    this.filter.update((s) => {
      const n = new Set(s);
      if (n.has(tag)) n.delete(tag);
      else n.add(tag);
      return n;
    });
  }

  protected clearFilters(): void {
    this.filter.set(new Set());
  }

  constructor() {
    super();
    // The filter bar is sticky too, so anchor jumps (#v4-2-0) must clear header + filters.
    const scroller = inject(ViewportScroller);
    scroller.setOffset([0, 180]);
    inject(DestroyRef).onDestroy(() => scroller.setOffset([0, 96]));
  }

  ngOnInit(): void {
    const name = this.i18n.t(this.product().name);
    this.setSeo(
      this.i18n.t(this.ui.productNav.releaseNotes),
      this.i18n.f(this.ui.ref.releasesLead, name),
      'release-notes',
    );
  }
}
