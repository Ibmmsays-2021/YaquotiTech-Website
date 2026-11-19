import { ChangeDetectionStrategy, Component, OnInit, computed } from '@angular/core';
import type { RoadmapStatus } from '../../content/types';
import { BadgeTone, StatusBadge } from '../../shared/ui/status-badge/status-badge';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Hero } from '../../shared/ui/hero/hero';
import { Icon } from '../../shared/ui/icon/icon';
import { ProductPageBase } from './product-page-base';

/** Roadmap. Status colours: In development = yellow, Planned = sky, Exploring = grey. */
const STATUS_TONE: Record<RoadmapStatus, BadgeTone> = {
  dev: 'yellow',
  planned: 'sky',
  exploring: 'grey',
};
const ORDER: readonly RoadmapStatus[] = ['dev', 'planned', 'exploring'];

@Component({
  selector: 'app-upcoming-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, StatusBadge, Icon],
  template: `
    @let p = product();
    <app-hero
      class="compact"
      [heading]="i18n.t(ui.productNav.upcoming)"
      [lead]="i18n.t(p.upcoming.lead)"
    >
      <app-breadcrumbs
        [items]="[
          { label: i18n.t(p.name), link: link() },
          { label: i18n.t(ui.productNav.upcoming) },
        ]"
      />
    </app-hero>
    <section class="section section--tight">
      <div class="container columns">
        @if (!columns().length) {
          <p class="empty">{{ i18n.t(ui.common.nothingYet) }}</p>
        }
        @for (col of columns(); track col.status) {
          <section [attr.aria-labelledby]="'st-' + col.status">
            <h2 [id]="'st-' + col.status">
              <app-status-badge [tone]="tone[col.status]" [label]="i18n.t(ui.status[col.status])" />
              <span class="count">{{ col.items.length }}</span>
            </h2>
            <ul role="list">
              @for (it of col.items; track $index) {
                <li>
                  <app-icon [name]="it.icon" [size]="18" />
                  <div>
                    <h3>{{ i18n.t(it.title) }}</h3>
                    <p>{{ i18n.t(it.desc) }}</p>
                  </div>
                </li>
              }
            </ul>
          </section>
        }
      </div>
    </section>
  `,
  styles: `
    .columns {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
      align-items: start;
    }
    h2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-block-end: 14px;
      margin-block-end: 8px;
      border-block-end: 1px solid var(--border);
      font-size: 1rem;
    }
    .empty {
      grid-column: 1 / -1;
      color: var(--text-muted);
    }
    .count {
      font-size: 0.875rem;
      color: var(--text-muted);
      font-variant-numeric: tabular-nums;
    }
    ul {
      display: grid;
    }
    li {
      display: flex;
      gap: 14px;
      padding-block: 18px;
      border-block-end: 1px solid var(--border);
    }
    li > div {
      min-width: 0;
    }
    li app-icon {
      color: var(--primary-700);
      margin-block-start: 3px;
    }
    h3 {
      font-size: 1rem;
      margin-block-end: 4px;
    }
    p {
      color: var(--text-body);
      font-size: 0.9375rem;
    }
    @media (max-width: 900px) {
      .columns {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class UpcomingPage extends ProductPageBase implements OnInit {
  protected readonly tone = STATUS_TONE;
  protected readonly columns = computed(() =>
    ORDER.map((status) => ({
      status,
      items: this.product().upcoming.items.filter((i) => i.status === status),
    })).filter((c) => c.items.length),
  );

  ngOnInit(): void {
    this.setSeo(
      this.i18n.t(this.ui.productNav.upcoming),
      this.i18n.t(this.product().upcoming.lead),
      'upcoming',
    );
  }
}
