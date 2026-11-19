import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { about, home } from '../../content/company';
import { ui } from '../../content/ui';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Card } from '../../shared/ui/card/card';
import { FeatureList } from '../../shared/ui/feature-list/feature-list';
import { Hero } from '../../shared/ui/hero/hero';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { CtaBand } from '../../shared/ui/cta-band';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Breadcrumbs, SectionHeader, Card, FeatureList, CtaBand, Icon],
  template: `
    <app-hero [heading]="i18n.t(about.title)" [lead]="i18n.t(about.lead)">
      <app-breadcrumbs
        [items]="[
          { label: i18n.t(ui.nav.home), link: i18n.link() },
          { label: i18n.t(ui.nav.about) },
        ]"
      />
    </app-hero>

    <section class="section" aria-labelledby="h-story">
      <div class="container two">
        <app-section-header headingId="h-story" [heading]="i18n.t(about.storyHead)" />
        <div class="prose">
          @for (para of i18n.t(about.story); track $index) {
            <p>{{ para }}</p>
          }
        </div>
      </div>
    </section>

    <section
      class="section"
      aria-label="{{ i18n.t(about.mission.title) }}, {{ i18n.t(about.vision.title) }}"
    >
      <div class="container mv">
        @for (x of [about.mission, about.vision]; track $index) {
          <div class="statement">
            <p class="label"><app-icon [name]="x.icon" [size]="16" />{{ i18n.t(x.title) }}</p>
            <p class="big">{{ i18n.t(x.desc) }}</p>
          </div>
        }
      </div>
    </section>

    <section class="section" aria-labelledby="h-values">
      <div class="container">
        <app-section-header headingId="h-values" [heading]="i18n.t(about.valuesHead)" />
        <div class="grid values">
          @for (v of about.values; track $index) {
            <app-card
              variant="plain"
              [icon]="v.icon"
              [heading]="i18n.t(v.title)"
              [desc]="i18n.t(v.desc)"
            />
          }
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="h-exp">
      <div class="container two">
        <app-section-header headingId="h-exp" [heading]="i18n.t(about.expertiseHead)" />
        <app-feature-list [items]="i18n.t(about.expertise)" />
      </div>
    </section>

    <app-cta-band [heading]="i18n.t(home.cta.title)" [desc]="i18n.t(home.cta.desc)" />
  `,
  styles: `
    .two {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 48px;
      align-items: start;
    }
    .prose {
      display: grid;
      gap: 1.1em;
      font-size: 1.0625rem;
      max-width: 36em;
    }
    .mv {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    .statement {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .statement .eyebrow app-icon {
      color: var(--primary-700);
    }
    .big {
      font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
      line-height: 1.35;
      color: var(--text);
      letter-spacing: -0.015em;
      font-weight: 500;
    }
    .values {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    }
    @media (max-width: 860px) {
      .two,
      .mv {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }
  `,
})
export class AboutPage implements OnInit {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  protected readonly about = about;
  protected readonly home = home;

  ngOnInit(): void {
    this.seo.set({
      title: this.i18n.t(about.title),
      description: this.i18n.t(about.lead),
      path: 'about',
    });
  }
}
