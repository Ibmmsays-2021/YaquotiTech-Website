import { ChangeDetectionStrategy, Component, OnInit, computed } from '@angular/core';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Button } from '../../shared/ui/button/button';
import { type TocItem } from '../../shared/ui/toc/toc';
import { Icon } from '../../shared/ui/icon/icon';
import { LinkIndex, type IndexLink } from '../../shared/ui/link-index';
import { DocsLayout } from './docs-layout';
import { ProductPageBase } from './product-page-base';

@Component({
  selector: 'app-docs-index-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsLayout, Breadcrumbs, Button, Icon, LinkIndex],
  template: `
    @let p = product();
    <app-docs-layout [product]="p" [toc]="toc()" [sidebar]="p.docs.modules.length > 0">
      <div class="doc-head">
        <app-breadcrumbs
          [items]="[{ label: i18n.t(p.name), link: link() }, { label: i18n.t(ui.productNav.docs) }]"
        />
        <h1>{{ i18n.t(ui.common.docsHome) }}</h1>
        <p class="lead">{{ i18n.t(p.summary) }}</p>
      </div>

      @if (p.docs.modules.length) {
        <h2 class="doc-h" id="getting-started">{{ i18n.t(ui.common.gettingStarted) }}</h2>
        <ol class="num-list">
          @for (s of i18n.t(p.docs.gettingStarted); track $index) {
            <li>{{ s }}</li>
          }
        </ol>

        <h2 class="doc-h" id="modules">{{ i18n.t(ui.common.allModules) }}</h2>
        <!-- Grouped overview: each stage with its modules, as a quiet link index. -->
        @for (g of overview(); track g.label) {
          <section class="ov-group" [attr.aria-label]="g.label">
            <h3>{{ g.label }}</h3>
            <app-link-index [items]="g.items" />
          </section>
        }
      } @else {
        <div class="empty">
          <span class="doc-ico"><app-icon name="book" [size]="22" /></span>
          <h2>{{ i18n.t(ui.common.docsComing) }}</h2>
          <p>{{ i18n.t(ui.common.docsComingLead) }}</p>
          <button
            type="button"
            appButton="primary"
            (click)="contact.open({ topic: p.id, intent: 'demo' })"
          >
            {{ i18n.t(ui.common.requestDemo) }}
          </button>
        </div>
      }
    </app-docs-layout>
  `,
  styleUrl: './doc-prose.scss',
  styles: `
    .ov-group {
      margin-block-start: 28px;
    }
    .ov-group h3 {
      margin-block-end: 4px;
      font-size: 1rem;
      color: var(--text);
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
      margin-block-start: 40px;
      padding: 40px;
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-lg);
    }
    .empty h2 {
      font-size: 1.25rem;
    }
  `,
})
export class DocsIndexPage extends ProductPageBase implements OnInit {
  /** Modules grouped by stage (Design, Run, Measure, Administer…) for the overview. */
  protected readonly overview = computed(() => {
    const p = this.product();
    const byId = new Map(p.docs.modules.map((m) => [m.id, m]));
    return p.docs.groups.map((g) => ({
      label: this.i18n.t(g.label),
      items: g.modules
        .map((id) => byId.get(id))
        .filter((m) => !!m)
        .map((m): IndexLink => ({
          icon: m.icon,
          label: this.i18n.t(m.title),
          desc: this.i18n.t(m.summary),
          link: this.link(`docs/${m.id}`),
        })),
    }));
  });

  protected readonly toc = computed<readonly TocItem[]>(() =>
    this.product().docs.modules.length
      ? [
          { id: 'getting-started', label: this.i18n.t(this.ui.common.gettingStarted) },
          { id: 'modules', label: this.i18n.t(this.ui.common.allModules) },
        ]
      : [],
  );

  ngOnInit(): void {
    this.setSeo(this.i18n.t(this.ui.common.docsHome), this.i18n.t(this.product().summary), 'docs');
  }
}
