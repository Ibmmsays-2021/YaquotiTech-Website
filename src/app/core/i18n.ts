import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import type { Lang, Tr } from '../content/types';

/**
 * Current language. Set once per language subtree by the route guard in app.routes.ts,
 * before any page renders, so prerendered HTML is correct for each language.
 */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>('en');
  readonly dir = computed<'ltr' | 'rtl'>(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));

  /** Pick the current-language value of an `{ en, ar }` object. Reactive in templates. */
  readonly t = <T>(value: Tr<T>): T => value[this.lang()];

  /** Fill a '{x}' template in the current language: f(ui.common.detailsOf, 'Integration'). */
  readonly f = (template: Tr<string>, x: string): string => this.t(template).replace('{x}', x);

  /** Absolute app path in the current language, e.g. link('products/workflow') → '/en/products/workflow'. */
  readonly link = (path = ''): string => `/${this.lang()}${path ? `/${path}` : ''}`;

  use(lang: Lang): void {
    this.lang.set(lang);
    const html = this.doc.documentElement;
    html.lang = lang;
    html.dir = this.dir();
  }
}
