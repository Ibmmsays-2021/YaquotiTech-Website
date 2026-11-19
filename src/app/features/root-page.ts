import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Seo } from '../core/seo';
import { ProductLogo } from '../shared/ui/product-logo/product-logo';

/**
 * "/" — sends visitors to the English site. Without JavaScript it shows a plain link, so the page
 * still works and crawlers find the site.
 */
@Component({
  selector: 'app-root-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ProductLogo],
  template: `
    <main class="wrap">
      <app-product-logo [priority]="true" />
      <h1 class="visually-hidden">Yaquoti Tech</h1>
      <a routerLink="/en" hreflang="en" lang="en">Continue to Yaquoti Tech</a>
    </main>
  `,
  styles: `
    .wrap {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      color: var(--text-muted);
    }
    a {
      padding: 10px 18px;
      border: 1px solid var(--border-strong);
      border-radius: var(--radius);
      color: var(--text);
      font-weight: 600;
      text-decoration: none;
    }
    a:hover {
      border-color: var(--color-primary);
      color: var(--text);
    }
  `,
})
export class RootPage {
  constructor() {
    inject(Seo).set({ description: 'Yaquoti Tech', path: '', noindex: true });
    const router = inject(Router);
    afterNextRender(() => void router.navigateByUrl('/en', { replaceUrl: true }));
  }
}
