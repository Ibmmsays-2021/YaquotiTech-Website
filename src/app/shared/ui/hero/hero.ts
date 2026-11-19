import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Lang } from '../../../content/types';

/** The same headline in the other language, shown beside the main one (home page only). */
export interface HeroCounterpart {
  readonly text: string;
  readonly lang: Lang;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container hero" [class.has-aside]="aside()" [class.bilingual]="!!counterpart()">
      <div class="copy">
        <ng-content select="app-breadcrumbs" />
        <h1 [class.display]="size() === 'display'">{{ heading() }}</h1>
        @if (counterpart(); as cp) {
          <p
            class="counterpart"
            [attr.lang]="cp.lang"
            [attr.dir]="cp.lang === 'ar' ? 'rtl' : 'ltr'"
            aria-hidden="true"
          >
            {{ cp.text }}
          </p>
        }
        @if (lead()) {
          <p class="lead">{{ lead() }}</p>
        }
        <ng-content />
        <div class="actions"><ng-content select="[heroAction]" /></div>
      </div>
      @if (aside()) {
        <div class="aside"><ng-content select="[heroAside]" /></div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: clamp(56px, 9vw, 112px) clamp(48px, 7vw, 88px);
      border-block-end: 1px solid var(--border);
    }
    :host(.compact) {
      padding-block: clamp(40px, 6vw, 72px) clamp(32px, 5vw, 56px);
    }
    .hero {
      display: grid;
      gap: clamp(32px, 6vw, 72px);
      align-items: center;
    }
    .hero.has-aside {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    }
    .copy {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      min-width: 0;
    }
    .bilingual .copy {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
      column-gap: clamp(32px, 6vw, 96px);
      row-gap: 20px;
      align-items: end;
    }
    .bilingual .copy > :not(h1):not(.counterpart) {
      grid-column: 1 / -1;
    }
    h1 {
      max-width: 22ch;
    }
    h1.display {
      max-width: 17ch;
    }
    /* The other-language line: quieter, in its own script, set against the far edge. */
    .counterpart {
      justify-self: end;
      margin-block-end: 0.4em;
      max-width: 18ch;
      font-size: clamp(1.5rem, 1rem + 1.6vw, 2.25rem);
      line-height: 1.45;
      font-weight: 500;
      color: var(--navy-500);
      text-align: start;
    }
    .counterpart[lang='ar'] {
      font-family: 'IBM Plex Sans Arabic Optional', var(--font-ar);
    }
    .counterpart[lang='en'] {
      font-family: var(--font-sans);
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-block-start: 12px;
    }
    .actions:empty {
      display: none;
    }
    @media (max-width: 900px) {
      .hero.has-aside,
      .bilingual .copy {
        grid-template-columns: minmax(0, 1fr);
      }
      .counterpart {
        justify-self: start;
        margin-block-end: 0;
      }
    }
  `,
})
export class Hero {
  readonly heading = input.required<string>();
  readonly lead = input('');
  readonly size = input<'display' | 'page'>('page');
  readonly aside = input(false);
  readonly counterpart = input<HeroCounterpart | null>(null);
}
