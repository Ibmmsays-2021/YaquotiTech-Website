# Design plan (frontend-design pass)

## Subject, audience, job

- **Subject:** Yaquoti Tech, a regional B2B software company. It sells three products (workflow automation, branded portals, data migration) and two services (consultation, integration), all in Arabic and English.
- **Audience:** operations and IT leaders comparing systems, often reading in both languages.
- **Job of the site:**
  - Company site: understand the three products in under a minute, then start a conversation.
  - Product sites: read docs, pricing and APIs without friction.

## Tokens

| Role | Value | Use |
|---|---|---|
| Paper | `#f2f2f9` page / `#fdfdff` surfaces | A soft, low-glare page (5% primary + 3% navy), with cards, inputs and the dialog on a barely tinted white |
| Ink | `#1e1a4a` (navy) | Headings, body (82% mixed with grey), footer, the one dark band |
| Quiet | `#606776` (brand grey deepened 15% with navy) | Secondary text: 5.07:1 on the soft page (the brand grey alone is 4.20:1 there) |
| Accent | `#7b7df4` (primary) | Primary button (600 shade), active nav underline, links (700 shade), focus ring. Nothing else. |
| Status | red, sky, green, yellow | Only on badges, release tags, method tags and form feedback |

- **Type:** Plus Jakarta Sans (variable) for Latin and IBM Plex Sans Arabic for Arabic, both named in the brief. One family per script, self-hosted.
- **Scale:** 14 · 16 · 18 · 21 · 28 · 36 · 48 · 64 px, close to the classic scale in *Elements of Typographic Style*.
- **Measure:** under 72ch for docs, 60ch for leads.

## Layout concept

```
[logo]  Home  Products▾  Services▾  About                 [Get in touch]  EN | ع
──────────────────────────────────────────────────────────────────────────────
We build, integrate and advise on
the systems that run your business.          نبني وندمج ونستشير في
                                             الأنظمة التي تُدير أعمالك.
Two products — … (lead)
[Explore products]  [Get in touch]
──────────────────────────────────────────────────────────────────────────────
Solutions built for real operations
  Yaquoti Workflow    tagline ………………………   summary ……………   Overview / Go to system
  ────────────────────────────────────────────────────────────────────────────
  Custom Portal       …
──────────────────────────────────────────────────────────────────────────────
Services             Consultation           │  Integration
                     lead, 4 topics         │  lead, 4 topics
──────────────────────────────────────────────────────────────────────────────
Why teams choose us   4 short statements on one hairline row
[ navy band: closing call to action ]
```

- **Alignment:** everything is start-aligned (left in English, right in Arabic), with no centred heroes. Structure comes from whitespace and 1px hairlines, not boxes.

## Principles

1. **One bold moment: the bilingual hero.** The headline is set large in the page language, with the same line in the other language beside it, quieter and in its own script and direction. It shows the company's real difference (native Arabic and English) using copy that already exists. Everything else stays quiet.
2. **Boxes only for things you click.** "Inside the system" links, docs module links and pricing plans are cards. Capabilities, service topics and values are plain text on a hairline.
3. **Labels only when they inform.** Sentence case, never tracked ALL-CAPS, no label above every heading. Breadcrumbs give context.
4. **Numbers only for real sequences:** engagement phases, getting-started steps, "Module 2 / 11".
5. **No decorative arrows.** The `→` stays only where the brief asks for it ("Go to system →") and on prev/next, where it shows direction.
6. **Motion only in answer to an action:** dialog, menu, accordion. It uses transform and opacity, and is off under reduced motion.

## Review against the brief: what changed from the first build, and why

| First build | Why it was generic | Now |
|---|---|---|
| ALL-CAPS tracked eyebrow above most headings, numbered "01 / 02 / 03" | Template chrome; the sections are not a sequence | Removed. Section headings stand alone; numbers only where order matters |
| `→` icon appended to most buttons and links | Generated-page tell | Kept only on "Go to system →" (brief) and prev/next |
| Capabilities, service topics and values as bordered 3-up cards | SaaS card kit; the brief says no "stock 3-column feature grids everywhere" | Plain hairline columns. Cards only for click targets |
| Plain single-language hero | Says nothing specific about this company | Bilingual hero (principle 1) |
| Middle-dot strings in UI ("Required · Prefer email?") | Template chrome | Separate lines |
| Hover transitions on every card | Generic, and the guidelines allow transform and opacity only | Instant colour change; motion reserved for open/close |

The brief overrides the frontend-design skill in two places:
- **Typeface:** Plus Jakarta Sans is one of the brief's two named options, so it stays.
- **Button and heading labels** stay in sentence case ("Get in touch", "Go to system →"). The brief writes them that way, although web-design-guidelines asks for Title Case.

## Pass 2: critique from rendered screenshots (frontend-design skill)

The user asked for a background that's easier on the eyes, and the products were renamed (Custom Portal SDB, Migration Tools). I reviewed full-page screenshots of home, a product overview, a product home and pricing against this plan.

| Seen in the screenshots | Why it matters | Change |
|---|---|---|
| Page was near-white with pure-white cards | Glare; the user asked for something more restful | Page `#f2f2f9`, surfaces `#fdfdff`; secondary text deepened to keep AA |
| Hero lead and section descriptions ran ~85–90 characters per line | Over the ~80-character limit. Plus Jakarta Sans has wide digits, so `ch` (width of "0") gave far longer lines than intended | Measures in `em`: leads 34–36em (~70 characters), docs `--measure: 40rem` |
| ~250px empty gap before the navy closing band | The previous section's bottom padding plus the band's own top padding (the specificity clash the skill warns about) | The band has bottom padding only |
| Hairline between every section, plus hairlines inside each list | Too many lines; decoration, not information | Section dividers removed (one accessory off); whitespace separates sections |
| "Inside the system" as six identical rounded boxes with icon tiles | The SaaS card kit; the brief rules out stock 3-column grids | A two-column link index (hairline, small icon, link, one line), like a docs contents page |
| Module groups in four boxes of uneven height | Boxes around lists of links | Plain columns on a hairline. The 1–4 numbers stay because Design → Run → Measure → Administer is a real sequence |
| Pricing FAQ centred in a narrow column | Breaks the start-aligned layout | Start-aligned, same measure |

Kept on purpose: the bilingual hero (the one bold element), the navy closing band (the only dark block besides the footer), and boxed pricing plans (each plan is a unit with its own action).

Copy note for the client: the home lead (ported verbatim) still says "Two products — Workflow and SDB". It needs real copy for three products. Listed in the README TODOs.
