# Migration plan: Yaquoti Tech → Angular 22 (static prerender)

Step 1 of 6. Nothing has been coded yet. This plan needs your OK first.

## 0. What I found

| | |
|---|---|
| Current site | Dependency-free Node generator, 74 pages (37 × EN/AR). Text is in `src/site.mjs` + `src/content/*.mjs`, every string `{ en, ar }`. |
| Toolchain | Node 24.22, npm 11.19, Angular CLI **22.2** (latest stable). Chrome + Edge installed, for headless screenshots and Lighthouse. |
| Logos (zip) | `yaqouti-company.png` 988×205 (Yaquoti Technologies mark + wordmark), `logo-Loading.png` 962×263 (**Yaquoti Workflow**), `favicon-32x32.png` is really a **.ico** (16 + 32 px). **No SVGs.** |
| Repo | Not a git repository. |

## 1. Repo layout

```
legacy/                 ← build.mjs, serve.mjs, src/, dist/, old package.json + README (moved, untouched, still runnable)
src/app/
  core/                 i18n (Lang, LangService, lang guard), seo.service, contact/ (ContactService, MailtoContactService,
                        CONTACT_ENDPOINT token, ContactDialogService)
  shared/ui/            the component inventory (below)
  layouts/              company-shell, product-shell
  features/company/     home, products, product-overview, services, service, about, contact
  features/product/     home, docs-index, docs-page, use-cases, upcoming, pricing, apis, release-notes
  content/              ui.ts, company.ts, services/{consultation,integration}.ts,
                        products/{index,workflow,custom-portal,sdb-migration}.ts, types.ts
src/styles/             tokens.scss, typography.scss, base.scss
public/assets/logos/    logos (+ resized 1x/2x), favicon.ico
scripts/                sitemap.mjs (post-build), logos.mjs (one-off resize/crop)
```

Angular setup: standalone components, signals, `@if`/`@for`, `inject()`, lazy `loadComponent`, `outputMode: 'static'` with `@angular/ssr`, zoneless (Angular 22 default), strict TS, angular-eslint, Prettier.

## 2. Routes

Every route below is prerendered for `en` and `ar` using `getPrerenderParams` in `app.routes.server.ts`.

**Company shell**

| Route | Page |
|---|---|
| `/:lang` | Home: hero, 3 products, 2 services, why us, CTA |
| `/:lang/products` | All products |
| `/:lang/products/:productId` | Overview + **Go to system →** + Get in touch |
| `/:lang/services` · `/:lang/services/:serviceId` | Services index · service page |
| `/:lang/about` | About |
| `/:lang/contact` | Home + dialog opens on load (accepts `?topic=&intent=`) |

**Product shell** (`productId` = `workflow` · `custom-portal` · `sdb-migration`)

| Route | Page |
|---|---|
| `/:lang/systems/:productId` | Product home |
| `…/docs` · `…/docs/:moduleId` | Docs index · module page (sidebar filter, TOC, prev/next) |
| `…/use-cases` · `…/upcoming` | Use cases · roadmap with status badges |
| `…/pricing` · `…/apis` · `…/release-notes` | Plans + comparison + FAQ · API reference · release timeline |

**Redirects from old URLs:** Angular `redirectTo` routes, prerendered as meta-refresh pages, plus real 301s in `staticwebapp.config.json` (Azure SWA), `web.config` (IIS) and an nginx snippet in the README.

| Old | New |
|---|---|
| `/:lang/solutions` · `/:lang/solutions/:id` | `/:lang/products` · `/:lang/products/:newId` |
| `/:lang/systems/sdb/**` | `/:lang/systems/sdb-migration/**` |
| `/:lang/systems/:id/demo` | `/:lang/contact?topic=:id&intent=demo` |
| `/:lang/docs/workflow/:m` · `/:lang/docs/sdb/:m` | `/:lang/systems/{workflow,sdb-migration}/docs/:m` |
| `/` | `/en` (or `/ar` if the browser or a saved choice says so) |

Expected output: about **98 pages** plus redirect stubs.

## 3. Component inventory → where it's used

| Component | Used by |
|---|---|
| `SiteHeader` · `ProductHeader` · `NavDropdown` · `MobileNav` (CDK overlay slide-in) · `LangSwitch` · `SiteFooter` | shells |
| `ProductLogo` | one input `product`; renders the real logo if one is set, otherwise the Yaquoti mark + name as a wordmark |
| `Hero` · `SectionHeader` · `Card` · `FeatureList` · `Button` (primary/secondary/ghost) · `Breadcrumbs` · `StatusBadge` | all pages |
| `DocsSidebar` · `Toc` · `PrevNext` · `CodeBlock` (copy) | docs, APIs |
| `PricingCard` · `ComparisonTable` · `Faq` (accessible accordion) | pricing, docs |
| `ReleaseNote` · `ApiEndpoint` | release notes, APIs |
| `GetInTouchDialog` | everywhere, through `ContactDialogService.open({ topic?, intent? })` |
| `Icon` | one component, using the `lucide` core package; direction-implying icons flip in RTL |

A product site is driven by one typed `Product` config: id, name, logo, nav, plus content for home, modules, use cases, upcoming, pricing, APIs and release notes. Adding a 4th product means one content file plus one line in `products/index.ts`.

## 4. Content mapping (copy reused as-is, nothing rewritten)

| From | To | Notes |
|---|---|---|
| `site.mjs` (brand, nav, shared UI) | `content/ui.ts` | plus new strings: dialog, pricing, APIs, release notes (EN + AR) |
| `company.mjs` home / about / contact | `content/company.ts` | "Contact" page copy → dialog intro |
| `company.mjs` services | `content/services/*.ts` | |
| `workflow.mjs` + extras (use cases, upcoming) | `content/products/workflow.ts` | 11 modules, real copy |
| `sdb.mjs` + extras | `content/products/sdb-migration.ts` | 7 modules, **already placeholder**, marked TODO (see question 1) |
| — | `content/products/custom-portal.ts` | everything **TODO** placeholder |
| — | pricing / APIs / release notes for all 3 | **TODO** placeholder data, typed |

## 5. Design system

- **Tokens:** your 7 colours exactly, with 50–900 scales for primary and navy via `color-mix()`, and neutral surfaces derived from navy/grey.
- **Contrast** (measured on white):

| Colour | Ratio | Use |
|---|---|---|
| `#7b7df4` | 3.45 | fills, focus ring, active indicator, icons and large text only |
| `#7b7df4` darkened (primary-700, `#5f5fc1`) | 5.39 | text links, active nav text |
| White text on `#7b7df4` | 3.45 | **fails** for button text. Primary buttons use **primary-600 `#6869d2`** (4.63) |
| Status colours as text | 1.9–3.8 | all fail. Badges use a 12% tint background plus text darkened toward navy to ≥ 4.5 |
| Grey `#6c757e` | 4.68 | ok for body secondary text |

- **Type:** Plus Jakarta Sans + IBM Plex Sans Arabic, self-hosted (`@fontsource`, woff2, latin/arabic subsets), preloaded, with metric-matched fallbacks so there is no layout shift.
- **Layout:** max width 1120px, docs measure 72ch, section padding 96–128px, 1px borders, 8–12px radii, one subtle shadow (dialog and menus), fade/slide motion that respects `prefers-reduced-motion`. Light mode only; RTL through logical properties.
- **Logos:** PNG only, so I generate exact 1x/2x sizes once (`sharp` via `npx`, not a project dependency) and set width/height on every `<img>`. I also crop the mark from the company logo for the ProductLogo wordmark. Favicon is the `.ico` from the zip plus a 180px touch icon.
- Note: the logos use a teal → violet gradient that isn't in the token palette. The logos stay as they are and the UI uses only your tokens.

## 6. Get in touch dialog

- **Mechanics:** CDK Dialog (focus trap, Esc to close, `aria-labelledby`, focus returns to the trigger, full-screen sheet under 640px).
- **Form:** typed Reactive Form with the fields you listed. Topic and intent are preselected from the caller.
- **Submission:** `ContactService` is an abstract class. The default `MailtoContactService` opens the email app with subject and body filled in. Providing `CONTACT_ENDPOINT` swaps in an `HttpContactService` (no other change needed).
- **mailto caveat:** a mailto link can't confirm the message was sent. The success state will say "Your email app is open with the message ready — send it and we'll reply within 1 business day". It switches to your exact wording once an HTTP endpoint is configured.

## 7. SEO & quality

- **Per route:** title, description, canonical, `hreflang` en/ar/x-default, Open Graph, and `<html lang dir>` set during prerender.
- **Sitemap:** `sitemap.xml` + `robots.txt` generated after the build from Angular's prerendered-routes list.
- **Checks:** `npm run build` and `npm run lint` must both finish with no errors and no warnings.
- **Lighthouse:** run headless on Home, a product overview, a docs page and pricing. I'll report the real scores.
- **Screenshots:** headless Chrome, EN + AR at 1440px and 390px, saved to `docs/screenshots/`.

## 8. Order of work

1. ✅ This plan
2. git init + snapshot, move old site to `legacy/`, scaffold Angular, lint/format config
3. Tokens, typography, base styles, both shells, header/footer/mobile nav/lang switch
4. Pages: company first, then the product shell and its pages
5. Get in touch dialog + `/contact` + redirects
6. Port content, EN + AR pass, sitemap, build/lint clean, screenshots, Lighthouse, README

## 9. Decisions I'll take unless you say otherwise

1. **SDB → SDB Migration Tools:** the 7 SDB modules describe a *database platform* (data modeling, query API, backup…), not migration tools. As instructed, I'll port them under `sdb-migration`, with every page marked TODO so they are clearly placeholder.
2. **Custom Portal** is treated as a separate product, not the Workflow "Customer Portal" module. Its docs index will say "Documentation coming soon", with no module pages until there is content.
3. **Primary button fill** is `#6869d2` (one step darker than `#7b7df4`) so white button text passes AA. `#7b7df4` stays for the focus ring, active indicators, icons and large display text.
4. **Site origin** for canonical, hreflang and sitemap is `https://yaquotitech.com`, set in one config line. **Please confirm the real domain.**
5. **git:** I'll run `git init` and commit the current site before moving anything, so the whole migration is one reviewable diff.
6. **frontend-design skill:** it is in the Anthropic directory but not enabled in this session. If you enable it, I'll load it before step 3. If not, I'll follow the same brief (calm, whitespace-led, no generic AI-landing look) without it.
