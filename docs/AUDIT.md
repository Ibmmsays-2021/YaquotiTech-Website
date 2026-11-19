# web-design-guidelines audit

- **Rules:** fetched from `vercel-labs/web-interface-guidelines` (`command.md`) on 2026-11-16.
- **Scope:** every component and page template under `src/app`, plus `src/styles` and `src/index.html`. That covers every route in EN and AR (both languages render the same templates) and every breakpoint (the responsive CSS lives in the same files).
- **Live checks:** desktop 1440px and mobile 390px in the browser, EN and AR, including the dialog, the mobile nav, focus return, validation and RTL.

Findings are listed `file:line` at the location of the fix. **All are fixed** except the four exceptions at the end, each of which is decided by your brief or doesn't apply.

## Fixed

### src/app/shared/ui/get-in-touch-dialog/get-in-touch-dialog.html
- `:30` (+ all fields) Inputs had no `name` → added meaningful `name` attributes.
- `:52` Email field allowed spellcheck → `spellcheck="false"`, `translate="no"`.
- `:128` Free-text message (non-auth field) → `autocomplete="off"`.
- `:150` Submit showed no progress → spinner + `aria-busy` while sending (submit stays enabled until then).
- `:154` "Required · Prefer email?" middle-dot string → two separate lines.

### src/app/shared/ui/get-in-touch-dialog/get-in-touch-dialog.ts
- `:74` Generic "This field is required." → each error states the fix ("Enter your work email.", "Enter an email address like name@company.com.").
- `:62` Closing the dialog lost typed text → the draft is kept and restored on the next open.
- `:25` Leaving the page with unsent text → `beforeunload` warning.

### src/app/shared/ui/get-in-touch-dialog/get-in-touch-dialog.scss
- `:119` Inputs used `:focus` → `:focus-visible`.
- `:16` No scroll containment in the modal → `overscroll-behavior: contain`.
- Removed `transition` on `border-color` (only transform/opacity may animate).

### src/app/core/contact/contact-dialog.ts
- `:49` Autofocus on every device → only with a fine pointer (desktop); touch devices focus the dialog, so the keyboard doesn't cover the sheet.
- `:60` Panel was flush to the start edge (CDK treats `width: 100%` as full-bleed) → fixed 600px width, centred; mobile stays a full-screen sheet.

### src/app/shared/ui/docs.ts
- `:440` "No modules match" was silent → `role="status"`.
- `:594` Docs filter wasn't in the URL → `?filter=` kept in sync (shareable, restored on load).
- `:114` and `:207` FAQ panels couldn't be deep-linked (unstable ids) → stable `#faq-N` ids; opening one updates the URL, and the URL opens it.
- `:454` Sidebar scroll could chain to the page → `overscroll-behavior: contain`.
- `:39` Code samples could be machine-translated → `translate="no"`.
- `:250` TOC title, sidebar groups and code labels were tracked ALL-CAPS → sentence case.

### src/app/shared/ui/reference.ts
- `:27` Plan names were `h3` directly under the page `h1` → `h2` (heading order).
- `:186` Comparison values → `tabular-nums`.
- `:347` Long API paths could overflow → `overflow-wrap: anywhere`; path `translate="no"`.

### src/app/shared/ui/product-logo/product-logo.ts
- `:24` Below-the-fold logos (footer, mobile nav) loaded eagerly → `loading="lazy"` unless `priority`.
- `:37` Product wordmark could be translated → `translate="no"`.

### src/app/shared/ui/basics.ts
- `:34` Inputs named `title` collide with the DOM property → renamed to `heading` (SectionHeader, Card, Hero, CtaBand).
- `:333` Hero styled projected actions with `::ng-deep` → projected into its own `.actions` slot.
- `:82` Non-clickable content drawn as boxed cards → `plain` variant (hairline, no box).
- `:388` Hero second-language line contrast → navy-500 (4.12:1) at ≥ 24px, which passes AA for large text.

### src/app/shared/ui/icon/icon.ts
- `:131` SVG sizing relied on `::ng-deep` → `width="100%" height="100%"` in the markup.

### src/app/shared/ui/button/button.scss
- Transitions on `background-color`, `border-color` and `color` → removed (only transform/opacity animate).

### src/app/shared/ui/nav/mobile-nav.ts
- `:141` Sheet scroll could chain to the page → `overscroll-behavior: contain`.
- `:252` Delegated `click` on `<nav>` (non-focusable handler) → closes on `NavigationEnd`/`NavigationSkipped`.
- `:198` ALL-CAPS group labels → sentence case.

### src/app/shared/ui/nav/site-header.ts · site-footer.ts
- `site-header.ts:54`, `site-footer.ts:35` Brand and product names could be translated → `translate="no"`.
- `site-footer.ts:99` ALL-CAPS column headings → sentence case.
- Decorative `→` after "All products"/"All services" removed.

### src/app/features/company/product-rows.ts
- `:35`, `:41` Repeated "Overview"/"Go to system" links had identical accessible names → names include the product ("Yaquoti Workflow overview").
- `:14` Non-sequence list as `<ol>` with "01/02/03" → `<ul>`, numbers removed.

### src/app/features/company/home-page.html · services-page.ts
- `home-page.html:49`, `services-page.ts:35` Vague "Learn more" → specific "Consultation details" / "تفاصيل الاستشارات".

### src/app/features/product/release-notes-page.ts · use-cases-page.ts · upcoming-page.ts
- `release-notes-page.ts:29`, `use-cases-page.ts:38`, `upcoming-page.ts:35` Empty lists rendered nothing → empty-state message with a next step.

### src/app/features/product/product-home-page.ts · docs-index-page.ts · company/product-overview-page.ts
- Repeated generic card labels ("Learn more", "View documentation", "Go to system") → removed. The card heading is the link and the whole card is the target.

### src/app/app.config.ts
- `:24` `withEventReplay()` is redundant on Angular 22 (on by default) → removed.

### src/styles/base.scss
- `:65` No `touch-action` / tap highlight → `touch-action: manipulation`, intentional tap colour.
- `:77` Long words could overflow text containers → `overflow-wrap: break-word`.

### src/styles/typography.scss
- `:7` Fonts weren't preloadable (hashed names) → self-hosted under stable names, `font-display: swap`.
- `:158` Tracked ALL-CAPS `.eyebrow` → sentence-case `.label`, used only where it informs.

### src/index.html
- `:11` Critical font not preloaded → `<link rel="preload">` for the Latin variable font.
- `:8` `theme-color` was navy, page is near-white → `#fcfcff`.

### src/app/content/company.ts · ui.ts · products/workflow/product.ts
- `company.ts:185` Straight quotes → curly quotes (same words).
- `ui.ts:7`, `products/workflow/product.ts:12` Brand names could break across lines → non-breaking spaces.

## Pass

- `src/app/layouts/*`: skip link, `<main>` focus target.
- `shared/ui/nav/nav-dropdown.ts` + `.scss`: disclosure button with `aria-expanded`/`aria-controls`, Esc returns focus, opacity/transform only.
- `shared/ui/nav/lang-switch.ts`, `product-header.ts`, `cta-band.ts`, `screenshot-placeholder.ts`.
- `features/product/docs-page.ts`, `apis-page.ts`, `pricing-page.ts`, `docs-layout.ts`.
- `features/company/about-page.ts`, `service-page.ts`, `not-found-page.ts`, `features/root-page.ts`.
- `core/i18n.ts`, `core/seo.ts`, `core/current-url.ts`.

## Not changed: rule decided by the brief or not applicable

| Rule | Decision |
|---|---|
| "Use Title Case for headings and buttons" | The brief writes every label in sentence case ("Get in touch", "Go to system →", "Request a demo"), and frontend-design says the same. Arabic has no letter case. |
| "Use second person, avoid first person" | UI strings address the visitor ("Tell us…", "Enter your…"). The company's own marketing copy says "we" and is ported verbatim, as the brief requires. |
| "Guard date/time rendering against hydration mismatch" | Release dates use `Intl` with a fixed `timeZone: 'UTC'` (deterministic). The footer year can only differ across New Year's Eve, and Angular re-renders that text binding without error. |
| "Virtualize lists over 50 items" | No list on the site exceeds 11 items. |

## Pass 2: skills run through the skill command (after the renames and the softer background)

### web-design-guidelines: re-audit of changed files

- **`src/app/layouts/company-shell.ts:18`, `product-shell.ts:21`** The deferred footer had no placeholder, so it popped in on in-app navigation → navy placeholder of the same height.
- **`src/app/features/company/home-page.html:29`** The deferred lower sections had no reserved space → placeholder with reserved height.
- **`src/app/content/products/custom-portal-sdb/meta.ts:10`, `migration-tools/meta.ts:8`** Brand names could wrap ("Custom Portal / SDB") → non-breaking spaces.
- **Pass:** `link-index.ts`, `tokens.scss`, `base.scss`, `typography.scss`, `cta-band.ts`, `hero/hero.ts`, `product-overview-page.ts`, `product-home-page.ts`, `pricing-page.ts`, `migration-tools/product.ts`.

### angular-developer: code review against its references

| Reference | Finding | Fix |
|---|---|---|
| naming-conventions | `basics.ts`, `docs.ts` and `reference.ts` each held several components (15 in total); file names should match the class | Split into one folder per component (`shared/ui/hero/hero.ts`, `faq/faq.ts`, …); every import updated |
| deferrable-views | `@defer` blocks had no placeholder ("give placeholders the same dimensions as the final content") | Placeholders with reserved height (see above) |
| deferrable-views + SSR | Below-the-fold content should not block start-up | Footer and the home page's lower sections are server-rendered and hydrate on viewport (`hydrate on viewport`) |
| SSR / hydration | `withEventReplay()` is on by default in Angular 22 | Removed (pass 1) |
| forms | Signal Forms is the v22 default for new forms | **Kept typed Reactive Forms**, which the client's brief specifies |
| angular-aria | Accordions can use `@angular/aria` | **Kept** the FAQ's own implementation: it already follows the WAI-ARIA accordion pattern and needs custom deep-linking; one accordion doesn't justify a new dependency |

### frontend-design: critique of rendered screenshots

See `docs/DESIGN.md` → "Pass 2" for the details: softer page, `em`-based line lengths, no doubled gap before the closing band, no section divider lines, link index instead of six boxed cards, plain module columns, start-aligned FAQ, shared spacing between sections.
