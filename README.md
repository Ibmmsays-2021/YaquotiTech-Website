# Company website (EN / AR)

Static, dependency-free bilingual site: company profile, 2 services, 2 solutions, and one docs page per module. Each solution has an overview page on the company site (`solutions/<id>/`) with a **Show system** button that opens the system's own site (`systems/<id>/`), which has its own nav: Overview, Documentation, Use cases, Upcoming and Book a demo. The site is light-mode only.

```bash
node build.mjs        # generates dist/ (generated for en + ar)
node serve.mjs 4173   # preview at http://localhost:4173
```

Deploy `dist/` to any static host (Azure Static Web Apps / App Service / IIS / nginx).

## Where to edit

| What | File |
|---|---|
| Brand name, email, nav labels, shared UI text | `src/site.mjs` |
| Home, About, Services, Contact text | `src/content/company.mjs` |
| Use cases & Upcoming for each solution | `src/content/extras.mjs` |
| Workflow solution + its 11 modules | `src/content/workflow.mjs` |
| SDB solution + its 7 modules (**placeholder content**) | `src/content/sdb.mjs` |
| Layout, header/footer, components | `src/templates.mjs` |
| Page structure & routes | `src/pages.mjs` |
| Colours, spacing, RTL, dark mode | `src/assets/styles.css` |

Every text is `{ en: '…', ar: '…' }`. To add a module, append an object to the module array — its docs page,
sidebar entry, menus and prev/next links are generated automatically (add its id to `fitGroups` to place it in the diagram).

## Palette

Indigo 50–900 (primary = 600) and Slate 50–900 from the product's `tailwind.config.js` / `styles.scss`,
exposed as CSS variables at the top of `styles.css`. Dark mode follows the OS and can be toggled.
