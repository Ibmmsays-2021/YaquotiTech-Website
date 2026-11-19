import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { ContactDialogService } from '../../core/contact/contact-dialog';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { home } from '../../content/company';
import { serviceById } from '../../content/services';
import { ui } from '../../content/ui';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Card } from '../../shared/ui/card/card';
import { FeatureList } from '../../shared/ui/feature-list/feature-list';
import { Hero } from '../../shared/ui/hero/hero';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { CtaBand } from '../../shared/ui/cta-band';
import { NotFoundPage } from './not-found-page';

@Component({
  selector: 'app-service-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, SectionHeader, Card, FeatureList, Button, CtaBand, NotFoundPage],
  template: `
    @if (service(); as s) {
      <app-hero [heading]="i18n.t(s.title)" [lead]="i18n.t(s.lead)">
        <app-breadcrumbs
          [items]="[
            { label: i18n.t(ui.nav.home), link: i18n.link() },
            { label: i18n.t(ui.nav.services), link: i18n.link('services') },
            { label: i18n.t(s.title) },
          ]"
        />
        <ng-container ngProjectAs="[heroAction]">
          <button
            type="button"
            appButton="primary"
            (click)="contact.open({ topic: s.id, intent: 'project' })"
          >
            {{ i18n.t(ui.nav.getInTouch) }}
          </button>
        </ng-container>
      </app-hero>

      <section class="section" aria-labelledby="h-cover">
        <div class="container">
          <app-section-header headingId="h-cover" [heading]="i18n.t(s.coverHead)" />
          <div class="grid grid--3">
            @for (c of s.cover; track $index) {
              <app-card
                variant="plain"
                [icon]="c.icon"
                [heading]="i18n.t(c.title)"
                [desc]="i18n.t(c.desc)"
              />
            }
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="h-phases">
        <div class="container">
          <app-section-header headingId="h-phases" [heading]="i18n.t(s.phasesHead)" />
          <ol class="phases" role="list">
            @for (ph of s.phases; track $index; let i = $index) {
              <li>
                <span class="n">{{ i + 1 }}</span>
                <h3>{{ i18n.t(ph.title) }}</h3>
                <p>{{ i18n.t(ph.desc) }}</p>
              </li>
            }
          </ol>
        </div>
      </section>

      <section class="section" aria-labelledby="h-deliver">
        <div class="container two">
          <app-section-header
            headingId="h-deliver"
            [heading]="i18n.t(s.deliversHead)"
            [desc]="i18n.t(s.summary)"
          />
          <app-feature-list [items]="i18n.t(s.delivers)" />
        </div>
      </section>

      <app-cta-band
        [heading]="i18n.t(home.cta.title)"
        [desc]="i18n.t(home.cta.desc)"
        [topic]="s.id"
        intent="project"
      />
    } @else {
      <app-not-found-page />
    }
  `,
  styles: `
    .phases {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
      gap: 0;
      border-block-start: 1px solid var(--border);
    }
    .phases li {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 28px 24px 28px 0;
      padding-inline: 0 24px;
    }
    .n {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--color-primary);
      color: var(--primary-700);
      font-weight: 600;
      font-size: 0.875rem;
    }
    .phases p {
      color: var(--text-body);
      font-size: 0.9375rem;
    }
    .two {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 48px;
      align-items: start;
    }
    @media (max-width: 860px) {
      .two {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  `,
})
export class ServicePage implements OnInit {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  protected readonly home = home;
  readonly serviceId = input.required<string>();
  protected readonly service = computed(() => serviceById(this.serviceId()));

  ngOnInit(): void {
    const s = this.service();
    this.seo.set(
      s
        ? {
            title: this.i18n.t(s.title),
            description: this.i18n.t(s.summary),
            path: `services/${s.id}`,
          }
        : {
            title: this.i18n.t(ui.common.notFound),
            description: '',
            path: `services/${this.serviceId()}`,
            noindex: true,
          },
    );
  }
}
