import { inject } from '@angular/core';
import type { CanActivateFn, CanMatchFn, Route, Routes } from '@angular/router';
import { I18n } from './core/i18n';
import { LANGS, type Lang } from './content/types';

// Lazy page components (each becomes its own chunk).
const companyShell = () => import('./layouts/company-shell').then((m) => m.CompanyShell);
const productShell = () => import('./layouts/product-shell').then((m) => m.ProductShell);
const home = () => import('./features/company/home-page').then((m) => m.HomePage);
const products = () => import('./features/company/products-page').then((m) => m.ProductsPage);
const productOverview = () =>
  import('./features/company/product-overview-page').then((m) => m.ProductOverviewPage);
const services = () => import('./features/company/services-page').then((m) => m.ServicesPage);
const service = () => import('./features/company/service-page').then((m) => m.ServicePage);
const about = () => import('./features/company/about-page').then((m) => m.AboutPage);
const notFound = () => import('./features/company/not-found-page').then((m) => m.NotFoundPage);

/** Sets the language before any page in its subtree renders (so prerendered HTML has the right lang/dir). */
const useLang =
  (lang: Lang): CanActivateFn =>
  () => {
    inject(I18n).use(lang);
    return true;
  };

/** Only known products get a product site; content is loaded lazily so it stays out of the main bundle. */
const knownProduct: CanMatchFn = (_route, segments) =>
  import('./content/products/catalog').then((m) => !!m.productMetaById(segments[1]?.path ?? ''));

/**
 * Old URLs from the previous site → new URLs. Prerendered as redirect pages; the same list is
 * turned into real 301s for Azure SWA / IIS by scripts/sitemap.mjs (see `legacyRedirects` there).
 */
function legacyRedirects(lang: Lang): Routes {
  const to = (path: string) => `/${lang}/${path}`;
  return [
    { path: 'solutions', pathMatch: 'full', redirectTo: to('products') },
    { path: 'solutions/workflow', pathMatch: 'full', redirectTo: to('products/workflow') },
    { path: 'solutions/sdb', pathMatch: 'full', redirectTo: to('products/custom-portal-sdb') },
    { path: 'docs', pathMatch: 'full', redirectTo: to('products') },
    { path: 'docs/workflow', pathMatch: 'full', redirectTo: to('systems/workflow/docs') },
    {
      path: 'docs/workflow/:moduleId',
      pathMatch: 'full',
      redirectTo: `/${lang}/systems/workflow/docs/:moduleId`,
    },
    { path: 'docs/sdb', pathMatch: 'full', redirectTo: to('systems/custom-portal-sdb/docs') },
    {
      path: 'docs/sdb/:moduleId',
      pathMatch: 'full',
      redirectTo: `/${lang}/systems/custom-portal-sdb/docs/:moduleId`,
    },
    {
      path: 'systems/workflow/demo',
      pathMatch: 'full',
      redirectTo: to('contact?topic=workflow&intent=demo'),
    },
    {
      path: 'systems/sdb/demo',
      pathMatch: 'full',
      redirectTo: to('contact?topic=custom-portal-sdb&intent=demo'),
    },
    { path: 'systems/sdb', pathMatch: 'full', redirectTo: to('systems/custom-portal-sdb') },
    {
      path: 'systems/sdb/:page',
      pathMatch: 'full',
      redirectTo: `/${lang}/systems/custom-portal-sdb/:page`,
    },
  ];
}

function langTree(lang: Lang): Route {
  return {
    path: lang,
    canActivate: [useLang(lang)],
    children: [
      ...legacyRedirects(lang),
      {
        path: 'systems/:productId',
        canMatch: [knownProduct],
        loadComponent: productShell,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/product/product-home-page').then((m) => m.ProductHomePage),
          },
          {
            path: 'docs',
            loadComponent: () =>
              import('./features/product/docs-index-page').then((m) => m.DocsIndexPage),
          },
          {
            path: 'docs/:moduleId',
            loadComponent: () => import('./features/product/docs-page').then((m) => m.DocsPage),
          },
          {
            // A page of a module's user guide: concepts, a how-to group, reference, troubleshooting.
            path: 'docs/:moduleId/:pageId',
            loadComponent: () => import('./features/product/docs-page').then((m) => m.DocsPage),
          },
          {
            path: 'use-cases',
            loadComponent: () =>
              import('./features/product/use-cases-page').then((m) => m.UseCasesPage),
          },
          {
            path: 'upcoming',
            loadComponent: () =>
              import('./features/product/upcoming-page').then((m) => m.UpcomingPage),
          },
          {
            path: 'pricing',
            loadComponent: () =>
              import('./features/product/pricing-page').then((m) => m.PricingPage),
          },
          {
            path: 'apis',
            loadComponent: () => import('./features/product/apis-page').then((m) => m.ApisPage),
          },
          {
            path: 'release-notes',
            loadComponent: () =>
              import('./features/product/release-notes-page').then((m) => m.ReleaseNotesPage),
          },
          { path: '**', loadComponent: notFound, data: { standalone: true } },
        ],
      },
      {
        path: '',
        loadComponent: companyShell,
        children: [
          { path: '', loadComponent: home },
          { path: 'products', loadComponent: products },
          { path: 'products/:productId', loadComponent: productOverview },
          { path: 'services', loadComponent: services },
          { path: 'services/:serviceId', loadComponent: service },
          { path: 'about', loadComponent: about },
          // Old /contact links: home page with the "Get in touch" dialog opened on load.
          { path: 'contact', loadComponent: home, data: { openContact: true } },
          { path: 'not-found', loadComponent: notFound, data: { standalone: true } },
          { path: '**', loadComponent: notFound, data: { standalone: true } },
        ],
      },
    ],
  };
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/root-page').then((m) => m.RootPage),
  },
  ...LANGS.map(langTree),
  // The site was bilingual: send old /ar/... links to the same page in English.
  {
    matcher: (segments) => (segments[0]?.path === 'ar' ? { consumed: segments } : null),
    redirectTo: ({ url, fragment }) => {
      const rest = url
        .slice(1)
        .map((s) => s.path)
        .join('/');
      return `/en${rest ? `/${rest}` : ''}${fragment ? `#${fragment}` : ''}`;
    },
  },
  { path: '**', redirectTo: '/en/not-found' },
];
