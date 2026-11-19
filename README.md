# Yaquoti Tech website

Bilingual (English / Arabic, RTL) company site plus one product site per product. Built with **Angular 22**: standalone components, signals, zoneless, and prerendered to static HTML with `@angular/ssr` (every route, both languages).

The previous dependency-free generator is kept in [`legacy/`](legacy/) for comparison (`node legacy/build.mjs && node legacy/serve.mjs`).

## Run, build, deploy

```bash
npm install
npm start              # dev server with live reload → http://localhost:4200/en
npm run build          # prerender every route (en + ar) → dist/yaquoti-tech/browser, then sitemap + host config
npm run preview        # serve the built static files like a plain host → http://localhost:4300
npm run lint           # ESLint (TypeScript + template accessibility rules)
npm run format         # Prettier
```

`npm run build` writes a **fully static** site to `dist/yaquoti-tech/browser/`: one `index.html` per route and language, plus `sitemap.xml`, `robots.txt`, `staticwebapp.config.json` and `web.config`. No Node server is needed at runtime.

| Host | Deploy | Old-URL redirects and 404 |
|---|---|---|
| **Azure Static Web Apps** | Point the app at `dist/yaquoti-tech/browser` (no API, no build in Azure, or `npm run build` as the build command). | `staticwebapp.config.json` (generated): 301s + `/en/not-found` |
| **IIS / Azure App Service (Windows)** | Copy the folder contents to the site root. | `web.config` (generated; needs the URL Rewrite module) |
| **nginx** | `root …/browser;` + `try_files $uri $uri/index.html =404;` + `error_page 404 /en/not-found/index.html;` | Every old URL also has a prerendered redirect page, so redirects work on any static host. |

Before going live, set the real domain in `src/app/core/config.ts` (`SITE_ORIGIN`). It is used for canonical URLs, hreflang, Open Graph and the sitemap.

## Where to edit content

Every user-facing string is `{ en: '…', ar: '…' }`.

| What | File |
|---|---|
| Brand name, email, nav labels, shared UI text, contact dialog text | `src/app/content/ui.ts` |
| Home, About, Services intro, contact copy | `src/app/content/company.ts` |
| Consultation / Integration service pages | `src/app/content/services/consultation.ts`, `integration.ts` |
| A product: overview, capabilities, who it's for, docs modules, use cases, upcoming | `src/app/content/products/<id>/product.ts` |
| A product's pricing / API reference / release notes | `src/app/content/products/<id>/pricing.ts`, `api.ts`, `releases.ts` |
| A product's name, tagline, summary, logo | `src/app/content/products/<id>/meta.ts` |
| Which products exist (menus, routes, sitemap and dialog topics follow) | `src/app/content/products/catalog.ts` (identity) + `index.ts` (full content) |
| Shared placeholder text (pricing tiers, "who it's for") | `src/app/content/placeholders.ts` |
| Site domain | `src/app/core/config.ts` |
| Colours, spacing, type scale | `src/styles/tokens.scss`, `typography.scss` |
| Logos | `public/assets/logos/` (served), `src/assets/logos/` (originals and notes) |

### Add a product

1. Copy `src/app/content/products/migration-tools/` to `src/app/content/products/<new-id>/` and edit the five files (`meta.ts`, `product.ts`, `pricing.ts`, `api.ts`, `releases.ts`).
2. Add its meta to `PRODUCT_CATALOG` in `products/catalog.ts` and its config to `PRODUCTS` in `products/index.ts`. The two lists are separate so pages that only show a product's name don't download its docs.

That's all. The company menu, the product overview page, the product site (`/:lang/systems/<new-id>/…`), prerendering, the sitemap and the "Get in touch" topic list are generated from these lists. To give it a real logo, set `logo` in its `meta.ts`. Without one, the Yaquoti mark and product name are shown.

### Contact form

The shared "Get in touch" dialog sends through `ContactService` (`src/app/core/contact/contact.ts`). By default it opens the visitor's email app with the message ready (`mailto:hello@yaquotitech.com`). To post to a backend instead, add one provider in `src/app/app.config.ts`:

```ts
{ provide: CONTACT_ENDPOINT, useValue: 'https://api.example.com/contact' }
```

The dialog then POSTs JSON there and shows "Thanks — we'll reply within 1 business day."

## Routes

| Company site | Product site (per product: `workflow`, `custom-portal-sdb`, `migration-tools`) |
|---|---|
| `/:lang` home | `/:lang/systems/:productId` home |
| `/:lang/products` | `…/docs` · `…/docs/:moduleId` |
| `/:lang/products/:productId` (overview + "Go to system →") | `…/use-cases` · `…/upcoming` |
| `/:lang/services` · `/:lang/services/:serviceId` | `…/pricing` · `…/apis` · `…/release-notes` |
| `/:lang/about` · `/:lang/contact` (opens the dialog; accepts `?topic=&intent=`) | |

`/` sends visitors to `/en` or `/ar` (saved choice, then browser language). Old URLs redirect: `/solutions/*` → `/products/*`, `/docs/<product>/*` → `/systems/<product>/docs/*`, `/solutions/sdb`, `/docs/sdb/*` and `/systems/sdb/*` → Custom Portal SDB (`custom-portal-sdb`), `/systems/*/demo` → `/contact?intent=demo`.

## Design and quality notes

- `docs/DESIGN.md`: design plan (tokens, layout, principles) and what changed after the frontend-design review.
- `docs/AUDIT.md`: web-design-guidelines audit, finding by finding.
- **Product docs, APIs and release notes** follow the layouts from `yaquoti-docs-apis-release.zip`, rebuilt in this site's design and in both languages:
  - **Docs:** grouped overview; sidebar search across titles, summaries and group names (kept in `?filter=`); `#` section links.
  - **APIs:** sticky index that follows scrolling; Overview / Authentication / resource groups / Errors; parameter tables; Request/Response tabs with line numbers and copy.
  - **Release notes:** timeline; category filters; collapsible releases; copy-link; `#v4-2-0` deep links.

  The zip's own text was placeholder only, so the site's content is kept. Edit API groups, parameters and errors in `content/products/<id>/api.ts`, and releases in `releases.ts`.
- `docs/screenshots/`: Home, a product overview, a docs page and the dialog, EN + AR, desktop + mobile.
- Brand colours are used exactly. Contrast decisions (button and link shades, badge text) are documented at the top of `src/styles/tokens.scss`.
- Fonts (Plus Jakarta Sans, IBM Plex Sans Arabic; SIL OFL 1.1) are self-hosted in `public/fonts/`. Icons are Lucide (ISC).

## Content still to provide (TODO)

Search the code for `TODO` to find each one.

| What | Where |
|---|---|
| Production domain | `src/app/core/config.ts` |
| Home lead still says "Two products — Workflow and SDB" | `src/app/content/company.ts` (`home.lead`) |
| About story calls SDB "our second solution" | `src/app/content/company.ts` (`about.story`) |
| **Custom Portal SDB**: tagline, summary, capabilities, 7 docs modules, use cases, upcoming (ported from the old site's placeholder SDB text) | `src/app/content/products/custom-portal-sdb/meta.ts`, `product.ts` |
| **Migration Tools**: all copy (tagline, summary, capabilities, use cases, upcoming) and its documentation modules | `src/app/content/products/migration-tools/meta.ts`, `product.ts` |
| "Who it's for" for all three products | `src/app/content/placeholders.ts` → `audiencePlaceholder` (or a per-product `audience`) |
| Pricing tiers, prices, comparison rows, pricing FAQ (all three products) | `src/app/content/products/*/pricing.ts`, `placeholders.ts` |
| API reference: base URL, auth, endpoints, payloads (all three) | `src/app/content/products/*/api.ts` |
| Release notes: versions, dates, notes (all three) | `src/app/content/products/*/releases.ts` |
| Product screenshots (overview + product home use a framed placeholder) | `src/app/shared/ui/screenshot-placeholder.ts` |
| Arabic product names to confirm: "ياقوتي Workflow", "البوابة المخصصة SDB", "أدوات الترحيل" | `meta.ts` of each product |
| Logos for Custom Portal SDB and Migration Tools; SVG versions of all logos | `src/assets/logos/README.md` |
