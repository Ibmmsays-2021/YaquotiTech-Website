import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { brand } from '../content/ui';
import { LANGS } from '../content/types';
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from './config';
import { I18n } from './i18n';

export interface PageSeo {
  /** Page title without the brand suffix. Omit on the home page. */
  readonly title?: string;
  readonly description: string;
  /** Path after the language segment: '' for home, 'products/workflow', … */
  readonly path: string;
  readonly noindex?: boolean;
}

/** Title, description, canonical, hreflang alternates and Open Graph for each page. */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly i18n = inject(I18n);

  set(page: PageSeo): void {
    const lang = this.i18n.lang();
    const name = this.i18n.t(brand.name);
    const title = page.title
      ? `${page.title} · ${name}`
      : `${name} — ${this.i18n.t(brand.tagline)}`;
    const url = (l: string) => `${SITE_ORIGIN}/${l}${page.path ? `/${page.path}` : ''}`;

    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: page.noindex ? 'noindex' : 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url(lang) });
    this.meta.updateTag({ property: 'og:site_name', content: name });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'ar' ? 'ar_AR' : 'en_US' });
    this.meta.updateTag({ property: 'og:image', content: `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}` });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.doc.head.querySelectorAll('link[data-seo]').forEach((el) => el.remove());
    this.addLink({ rel: 'canonical', href: url(lang) });
    if (!page.noindex) {
      for (const l of LANGS) this.addLink({ rel: 'alternate', hreflang: l, href: url(l) });
      this.addLink({ rel: 'alternate', hreflang: 'x-default', href: url('en') });
    }
  }

  private addLink(attrs: Record<string, string>): void {
    const link = this.doc.createElement('link');
    for (const [k, v] of Object.entries(attrs)) link.setAttribute(k, v);
    link.setAttribute('data-seo', '');
    this.doc.head.appendChild(link);
  }
}
