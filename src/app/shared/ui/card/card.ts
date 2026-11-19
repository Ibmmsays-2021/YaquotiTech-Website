import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { IconName } from '../../../content/types';
import { Icon } from '../icon/icon';

/**
 * `boxed` (default) is for things you click: the whole card is the link target.
 * `plain` is for information (capabilities, topics, values): text on a hairline, no box.
 */
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink],
  template: `
    @if (icon(); as ic) {
      <span class="ico"><app-icon [name]="ic" [size]="20" /></span>
    }
    <h3>
      @if (link()) {
        <a [routerLink]="link()" class="stretched">{{ heading() }}</a>
      } @else {
        {{ heading() }}
      }
    </h3>
    @if (desc()) {
      <p>{{ desc() }}</p>
    }
    <ng-content />
    @if (link() && linkLabel()) {
      <span class="more" aria-hidden="true">{{ linkLabel() }}</span>
    }
  `,
  host: { '[class]': '"card--" + variant()', '[class.is-link]': '!!link()' },
  styles: `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 0;
    }
    :host(.card--boxed) {
      padding: 28px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
    }
    :host(.card--plain) {
      padding-block-start: 24px;
      border-block-start: 1px solid var(--border);
    }
    :host(.is-link:hover) {
      border-color: var(--primary-300);
    }
    .ico {
      display: inline-grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius);
      background: var(--primary-50);
      color: var(--primary-700);
      margin-block-end: 8px;
    }
    :host(.card--plain) .ico {
      width: auto;
      height: auto;
      background: none;
      margin-block-end: 4px;
      justify-content: start;
    }
    h3 a {
      color: inherit;
      text-decoration: none;
    }
    .stretched::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }
    .stretched:focus-visible {
      outline: none;
    }
    .stretched:focus-visible::after {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
    }
    p {
      color: var(--text-body);
      font-size: 0.9375rem;
    }
    .more {
      margin-block-start: auto;
      padding-block-start: 12px;
      color: var(--link);
      font-weight: 600;
      font-size: 0.875rem;
    }
    :host(.is-link:hover) .more {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  `,
})
export class Card {
  readonly icon = input<IconName | null>(null);
  readonly heading = input.required<string>();
  readonly desc = input('');
  readonly link = input('');
  readonly linkLabel = input('');
  readonly variant = input<'boxed' | 'plain'>('boxed');
}
