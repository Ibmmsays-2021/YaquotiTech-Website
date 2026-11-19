import { RenderMode, type ServerRoute } from '@angular/ssr';
import { PRODUCTS, productById } from './content/products';
import { SERVICES } from './content/services';
import { LANGS, isGuideModule } from './content/types';

/**
 * Every page is prerendered to static HTML for each language. Routes with parameters list their
 * values here; they are generated from the content, so a new product or module is picked up
 * automatically.
 */
const pages = (path: string): ServerRoute => ({ path, renderMode: RenderMode.Prerender });
const withParams = (path: string, params: () => Record<string, string>[]): ServerRoute => ({
  path,
  renderMode: RenderMode.Prerender,
  getPrerenderParams: async () => params(),
});

const productIds = () => PRODUCTS.map((p) => ({ productId: p.id }));
const moduleParams = () =>
  PRODUCTS.flatMap((p) => p.docs.modules.map((m) => ({ productId: p.id, moduleId: m.id })));
/** The sub-pages of every user guide (its landing page is the module route above). */
const guidePageParams = () =>
  PRODUCTS.flatMap((p) =>
    p.docs.modules
      .filter(isGuideModule)
      .flatMap((m) =>
        m.guide.pages
          .filter((pg) => pg.id)
          .map((pg) => ({ productId: p.id, moduleId: m.id, pageId: pg.id })),
      ),
  );
const modulesOf = (id: string) => () =>
  (productById(id)?.docs.modules ?? []).map((m) => ({ moduleId: m.id }));

const PRODUCT_PAGES = [
  '',
  '/docs',
  '/use-cases',
  '/upcoming',
  '/pricing',
  '/apis',
  '/release-notes',
];

export const serverRoutes: ServerRoute[] = [
  pages(''),
  ...LANGS.flatMap((l): ServerRoute[] => [
    // company site
    pages(l),
    pages(`${l}/products`),
    withParams(`${l}/products/:productId`, productIds),
    pages(`${l}/services`),
    withParams(`${l}/services/:serviceId`, () => SERVICES.map((s) => ({ serviceId: s.id }))),
    pages(`${l}/about`),
    pages(`${l}/contact`),
    pages(`${l}/not-found`),
    // product sites
    ...PRODUCT_PAGES.map((sub) => withParams(`${l}/systems/:productId${sub}`, productIds)),
    withParams(`${l}/systems/:productId/docs/:moduleId`, moduleParams),
    withParams(`${l}/systems/:productId/docs/:moduleId/:pageId`, guidePageParams),
    // old URLs (redirect pages)
    pages(`${l}/solutions`),
    pages(`${l}/solutions/workflow`),
    pages(`${l}/solutions/sdb`),
    pages(`${l}/docs`),
    pages(`${l}/docs/workflow`),
    withParams(`${l}/docs/workflow/:moduleId`, modulesOf('workflow')),
    pages(`${l}/docs/sdb`),
    withParams(`${l}/docs/sdb/:moduleId`, modulesOf('custom-portal-sdb')),
    pages(`${l}/systems/workflow/demo`),
    pages(`${l}/systems/sdb/demo`),
    pages(`${l}/systems/sdb`),
    withParams(`${l}/systems/sdb/:page`, () => [{ page: 'use-cases' }, { page: 'upcoming' }]),
  ]),
  // Anything else (unknown URLs) renders in the browser and shows the not-found page.
  { path: '**', renderMode: RenderMode.Client },
];
