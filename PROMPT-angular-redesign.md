# Prompt: Rebuild Yaquoti Tech website in Angular (new structure + new design)

> Paste everything below the line into Claude Code, opened at the root of `YaquotiTech-Website`.

---

## Role & skills

You are a senior Angular front-end engineer with a strong product-design eye.
**Before writing any UI code, load and follow the `frontend-design` skill** (install it from the official Anthropic plugin marketplace if it is not available). Use it to commit to one clear aesthetic direction: **simple, elegant, calm, with generous whitespace** — think premium SaaS documentation sites, not a busy template. Avoid generic "AI landing page" look (no purple gradient blobs, no glassmorphism, no emoji icons, no stock 3-column feature grids everywhere).

Work in this order and **show me the plan (step 1) before coding**:
1. Read the current repo and write a short migration plan (routes, components, content mapping).
2. Scaffold the Angular app.
3. Build design tokens + layout shells.
4. Build pages.
5. Build the shared "Get in touch" dialog.
6. Port content, verify EN + AR, run build, fix all errors and warnings.

## Context — what exists today

- The repo is a dependency-free Node static site generator (`build.mjs`, `src/pages.mjs`, `src/templates.mjs`, `src/site.mjs`, `src/assets/styles.css`).
- It is **bilingual: English (LTR) and Arabic (RTL)**. Every text is `{ en: '…', ar: '…' }`.
- Content lives in `src/content/`:
  - `company.mjs` — Home, About, Services, Contact text
  - `workflow.mjs` — Workflow product + its 11 modules (docs)
  - `sdb.mjs` — SDB + 7 modules (**placeholder content**)
  - `extras.mjs` — Use cases & Upcoming per product
  - `site.mjs` — brand, nav labels, shared UI strings
- **Reuse all of this content.** Do not rewrite or invent copy where real copy exists. Where content is missing, add clearly marked placeholders (`// TODO: real content`).
- Move the old generator into `legacy/` (do not delete it) so I can compare.

## Tech stack

- **Latest stable Angular**, standalone components only (no NgModules), **signals**, built-in control flow (`@if`, `@for`), `inject()`, lazy-loaded routes.
- **Static prerendering (SSG)** with `@angular/ssr` so every route outputs real HTML (good SEO, deployable to any static host: Azure Static Web Apps / IIS / nginx).
- Styling: **SCSS + CSS custom properties** (design tokens). Use **Angular CDK** (`@angular/cdk/dialog`, `a11y`, `bidi`, `overlay`) for the dialog and menus. Do **not** use full Angular Material themes — keep the UI custom and light.
- i18n: keep EN/AR as runtime content (typed TS objects ported from the `.mjs` files), language in the URL (`/en/...`, `/ar/...`), set `<html lang dir>` correctly, use CSS logical properties (`margin-inline-start`, etc.) so RTL works without separate stylesheets.
- Strict TypeScript, ESLint, Prettier. No unused dependencies.

## Brand

### Logos
Logo files are in `C:\Users\EMAD\Downloads\Yaqouti-logos.zip` → folder `Yaqouti-logos`. Extract it and copy into `src/assets/logos/`.
- **Yaquoti Tech logo** → company site header, footer, favicon.
- **Yaquoti Workflow logo** → header of the Workflow product site.
- Custom Portal and SDB Migration Tools have no logo yet → use the Yaquoti Tech mark + product name as a text wordmark (make it a single `ProductLogo` component so real logos can be dropped in later).
- Prefer SVG; if only PNG exists, use it with correct `width/height` and a `@2x` version.

### Color scheme (use exactly these as tokens)

```scss
:root {
  --color-primary: #7b7df4;   // brand / primary actions / links
  --color-red:     #ee4444;   // errors, destructive
  --color-sky:     #0ea6e9;   // info, accents, "new" badges
  --color-green:   #10b982;   // success, "available" status
  --color-yellow:  #f8b21a;   // warnings, "upcoming / in development" status
  --color-navy:    #1e1a4a;   // our dark: headings, footer, dark surfaces
  --color-grey:    #6c757e;   // body secondary text, borders (tinted)
}
```

- Generate tints/shades (50–900) for primary and navy with `color-mix()`; derive neutral surfaces from navy/grey (e.g. page bg = near-white with a hint of primary).
- Usage rules: **mostly white space + navy text**; primary used sparingly (main CTA, active nav, links, focus ring). Status colors only for status (badges, release-note tags, form feedback) — never decoration.
- Check WCAG AA contrast. `#7b7df4` on white fails for small body text → use a darker primary shade for text links, keep `#7b7df4` for fills/large text.
- Light mode only (as today).

### Design direction
- Lots of whitespace: wide section padding (≈ 96–128px desktop), max content width ≈ 1120px, docs text width ≈ 72ch.
- Typography: one refined sans for Latin + a matching Arabic face (e.g. *Manrope* or *Plus Jakarta Sans* + *IBM Plex Sans Arabic*), clear type scale, generous line height. Self-host the fonts.
- Thin 1px borders, soft radii (8–12px), almost no shadows (one subtle shadow for the dialog and dropdowns).
- Simple line icons (one icon set, e.g. Lucide), consistent stroke.
- Subtle motion only: fade/slide on dialog and menus, respect `prefers-reduced-motion`.
- Fully responsive (mobile nav as a slide-in panel), keyboard accessible, visible focus states.

## Information architecture

### A. Company site

Header nav (left → right; mirrored in RTL):

```
[Yaquoti Tech logo]   Home   Products ▾   Services ▾   About            [Get in touch]  [EN | ع]
```

- **Products ▾** (dropdown / mega-menu with name + one-line description + icon):
  1. **Yaquoti Workflow**
  2. **Custom Portal**
  3. **SDB Migration Tools**
- **Services ▾**:
  1. **Consultation**
  2. **Integration**
- **About**
- **Get in touch** = primary button that opens the shared dialog (see C). Remove the old separate Contact page from the nav (keep `/contact` as a route that just opens the dialog on load, for old links).

Company routes:

| Route | Page |
|---|---|
| `/:lang` | Home: hero, the 3 products, the 2 services, why us, CTA |
| `/:lang/products` | All products overview |
| `/:lang/products/:productId` | **Product overview page** (on the company site): what it is, key capabilities, who it's for, a screenshot/illustration placeholder, and two buttons: **"Go to system →"** (opens the product site) and **"Get in touch"** |
| `/:lang/services` | Services overview |
| `/:lang/services/:serviceId` | Service page: what we cover, approach, deliverables, **Get in touch** CTA |
| `/:lang/about` | About |

Product ids: `workflow`, `custom-portal`, `sdb-migration`. Service ids: `consultation`, `integration`.

### B. Product site (one per product, its own layout/shell)

Clicking **"Go to system"** opens the product's own site with a **different header** (product logo, product nav) and a small "← Yaquoti Tech" link back to the company site.

```
[Product logo]   Home   Docs   Use cases   Upcoming   Pricing   APIs   Release notes      [Get in touch]  [EN | ع]
```

| Route | Page |
|---|---|
| `/:lang/systems/:productId` | Product **Home** |
| `/:lang/systems/:productId/docs` | Docs index |
| `/:lang/systems/:productId/docs/:moduleId` | Docs page: left sidebar (filterable module list), content, right "On this page" TOC, prev/next. Port the existing Workflow (11) and SDB (7) module docs. |
| `/:lang/systems/:productId/use-cases` | Use cases (from `extras.mjs`) |
| `/:lang/systems/:productId/upcoming` | Roadmap with status badges (In development = yellow, Planned = sky, Exploring = grey) |
| `/:lang/systems/:productId/pricing` | Pricing: 3 plan cards (placeholder tiers + "Contact sales" → opens dialog with "Pricing" preselected), feature comparison table, FAQ |
| `/:lang/systems/:productId/apis` | API reference: overview, auth, base URL, endpoint list (method badge, path, description, request/response code blocks with copy button). Placeholder data in a typed JSON/TS file per product. |
| `/:lang/systems/:productId/release-notes` | Release notes timeline: version, date, tags (New = green, Improved = sky, Fixed = primary, Breaking = red). Placeholder data per product. |

- All product sites share the **same shell and components**, driven by a typed `Product` config (id, name, logo, nav, content). Adding a 4th product must only require adding a config + content file.
- Remove the old "Book a demo" page; demo requests go through the shared dialog ("Request a demo" preselected).
- Redirect old URLs (`/solutions/*`, `/systems/*/demo`, `/contact`) to the new ones.

### C. Shared "Get in touch" dialog (one component for everything)

- One `GetInTouchDialogComponent` opened via a `ContactDialogService.open({ topic?, intent? })`, built on `@angular/cdk/dialog` (focus trap, Esc to close, `aria-labelledby`, returns focus to trigger, full-screen sheet on mobile).
- Used by: header button on both shells, every product overview page, every service page, pricing "Contact sales", product-site CTAs, and `/contact`.
- **Context-aware**: preselect the topic from where it was opened (e.g. from SDB Migration Tools pricing → topic = "SDB Migration Tools", intent = "Pricing").
- Fields (Reactive Forms, typed): Full name*, Work email*, Company, Phone (optional), **Topic*** (Yaquoti Workflow / Custom Portal / SDB Migration Tools / Consultation / Integration / Something else), **I'd like to…** (Request a demo / Ask about pricing / General question / Start a project), Message*.
- Inline validation, disabled submit while sending, success state inside the dialog ("Thanks — we'll reply within 1 business day"), error state in red.
- Submission goes through a `ContactService` interface. Default implementation = `mailto:` to `hello@yaquotitech.com` (current behaviour) with the subject/body prefilled; make it easy to swap to an HTTP endpoint later (inject an `InjectionToken` for the endpoint).
- All labels in EN + AR.

## Component inventory (build these, reuse everywhere)

`SiteHeader`, `ProductHeader`, `NavDropdown`, `MobileNav`, `LangSwitch`, `SiteFooter`, `Hero`, `SectionHeader`, `Card`, `FeatureList`, `StatusBadge`, `Button` (primary / secondary / ghost), `ProductLogo`, `DocsSidebar`, `Toc`, `PrevNext`, `CodeBlock` (copy button), `PricingCard`, `ComparisonTable`, `Faq` (accessible accordion), `ReleaseNote`, `ApiEndpoint`, `GetInTouchDialog`, `Breadcrumbs`.

Suggested structure:

```
src/app/
  core/        (i18n, lang guard/resolver, seo/meta service, contact service + dialog service)
  shared/ui/   (components above)
  layouts/     (company-shell, product-shell)
  features/
    company/   (home, products, product-overview, services, service, about)
    product/   (home, docs, use-cases, upcoming, pricing, apis, release-notes)
  content/     (ported typed content: company.ts, products/*.ts, services/*.ts)
src/styles/    (tokens.scss, typography.scss, base.scss)
```

## SEO & quality

- Per-route `<title>`, meta description, canonical, `hreflang` en/ar alternates, Open Graph.
- Sitemap generated at build time.
- Lighthouse targets: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- No layout shift from fonts/logos.

## Acceptance checklist

- [ ] `npm run build` prerenders every route for **en and ar** with no errors or warnings.
- [ ] Company nav: Logo · Home · Products (Workflow, Custom Portal, SDB Migration Tools) · Services (Consultation, Integration) · About · Get in touch.
- [ ] Each product has an overview page on the company site with a working **Go to system** button.
- [ ] Each product site has: Home · Docs · Use cases · Upcoming · Pricing · APIs · Release notes, with its own logo/header.
- [ ] One shared Get in touch dialog, opened from every product and service, with the correct topic preselected.
- [ ] Brand colors used exactly as specified; AA contrast passes.
- [ ] Arabic pages are fully RTL (nav, dropdowns, sidebar, dialog, icons that imply direction are mirrored).
- [ ] Logos from `Yaqouti-logos` used for Yaquoti Tech and Yaquoti Workflow.
- [ ] Existing content ported; placeholders clearly marked with `TODO`.
- [ ] README updated: how to run, build, deploy, and **where to edit content** (table like the current one).

When done, give me: the route list, screenshots of Home, a product overview, a product docs page and the dialog (EN + AR, desktop + mobile), and the list of TODO placeholders I need to fill.
