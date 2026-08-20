# Handoff: One-Page Portfolio (Home + About + Projects consolidated)

## Overview

Consolidates the current multi-route portfolio (`/`, `/about`, `/projects`) into a **single scrolling home page** with anchor navigation, so there's no route-jumping. Target repo: **`portfolio-cms`** (Nuxt 4 + Nuxt Content + Nuxt UI, `primary: matcha`, `neutral: stone`). Blog stays a separate route (`/blog`) — only home/about/projects merge.

## About the Design Files

`Portfolio.dc.html` in this bundle is a **design reference built in HTML** — a prototype showing the intended look, layout, and behavior. It is **not** production code to copy. The task is to **recreate it inside the existing Nuxt app** using the repo's established patterns: Nuxt UI components (`UButton`, `UBadge`, `UIcon`, `UPageSection`, etc.), the `matcha`/`stone` color config in `app/app.config.ts`, and content read from the existing `content/*.yml` files via Nuxt Content. Ignore the inline CSS-var theming trick and `.dc.html` runtime — those are prototype-only.

## Fidelity

**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate pixel-close using Nuxt UI + Tailwind, mapping the literal values below onto the design system (see "Mapping to the Nuxt repo").

## Content source (already in the repo — do NOT rewrite copy into components)

All copy already lives in Nuxt Content. Bind to it; don't hardcode.

- `content/index.yml` — hero (`titlePrefix`, `roles`, `links`, availability under `now`), `about`, `experience.items`, `aiWorkflows.items`, `testimonials.items`, `snsLinks`, `profileImage`.
- `content/about.yml` — long bio, `now.currently`, `now.availability`, education/languages (in `content` markdown).
- `content/projects.yml` + `content/projects/*.yml` — the four project entries (title, description, image, url, tags).
- `app/app.config.ts` — `global.email`, `global.meetingLink`, footer `links`.

> Copy edits made in the prototype that you should port back into the YAML: hero paragraph now says **"AI-powered agentic workflows"** (tool-agnostic, not "Claude-powered"); prose was rephrased to remove em-dashes; the About `now.currently` list was expanded (see "Currently card" below).

## Page structure (top → bottom, single `pages/index.vue`)

1. **Sticky nav** (hide-on-scroll)
2. **Hero** (eyebrow, headline, animated `whoami` role, paragraph, 2 CTAs)
3. **About** (2-col: bio + checklist ‖ Currently card + Quick-facts card)
4. **Experience** (vertical timeline, 3 roles)
5. **AI-Augmented Workflows** (full-bleed dark section, 3 cards) — signature section
6. **Projects** (2-col grid, 4 image cards)
7. **Testimonials** (2-col, 2 quote cards)
8. **Beyond the code** (pill chips)
9. **Contact / footer** (dark, CTA + email/cal + social icons)

Section max-width: **1120px**, horizontal padding **28px**, vertical padding **~92px** per section (84px on tinted/footer sections). Anchor ids: `#about #work #workflows #projects #contact`; add `scroll-margin-top: 84px` to each so the sticky nav doesn't overlap.

## Screens / Views

### 1. Sticky Nav

- **Layout:** `position: sticky; top: 0; z-index: 50`, 64px tall, inner flex row (space-between) at max-width 1120px. Translucent bg `rgba(250,250,249,.85)` + `backdrop-filter: saturate(180%) blur(12px)`, bottom border `#E7E5E4`.
- **Left:** 30×30 rounded (8px) monogram "SR" — bg `#0C0A09`, text = accent green, Geist Mono 13px; then "Sean Ramones" 15px/600.
- **Center:** mono 12.5px links — About, Work, AI&nbsp;Workflows, Projects — color `#57534E`.
- **Right:** "Available" with pulsing 8px accent dot; "Résumé" outline button (1px `#D6D3D1`, mono 12px) linking `/documents/sean-ramones-resume.pdf`.
- **Hide-on-scroll behavior:** scrolling **down** past ~130px translates the header `translateY(-100%)`; scrolling **up** brings it back (`translateY(0)`). Transition `transform .38s cubic-bezier(.4,0,.2,1)`. Ignore scroll deltas < 6px. In Vue: a `useScroll`/`watch` composable toggling a `navHidden` ref bound to a class.

### 2. Hero

- **Eyebrow:** 22px accent rule + mono 12px uppercase, letter-spacing .14em, color = deep-accent `--ad`. Text: "AI-Augmented Full-stack Engineer".
- **Headline (h1):** Geist, weight 600, `clamp(38px, 6vw, 74px)`, line-height 1.02, letter-spacing -0.035em, max-width 15ch. Text: "I build full-stack products, **augmented by agentic AI.**" — the second clause colored deep-accent `--ad`.
- **`whoami` line:** mono `clamp(14px,2vw,18px)`. Renders `$` (muted `#A8A29E`) + `whoami` (`#1C1917`) + an **animated rolling word** in deep-accent + a blinking accent caret (9px×1.1em, `sr-blink 1.1s step-end infinite`). Roles cycle through `content/index.yml → hero.roles`: "Full-Stack AI Engineer", "AI Product Engineer", "AI Integrations & Workflow Engineer", "Agentic Workflow Developer". Prototype uses a pure-CSS vertical roll (`sr-roll 9s infinite`, 5 stacked lines, translateY 0→-80%); in Vue a simple interval swapping the active role with a transition is fine.
- **Paragraph:** `clamp(16px,2vw,19px)`, color `#57534E`, max-width 60ch, `text-wrap: pretty`. Text: "7+ years turning complex ideas into fast, seamless web apps. I pair solid frontend craft and backend systems work with AI-powered agentic workflows, so I stay on the architecture and review while the tooling handles the busywork and speeds up delivery."
- **CTAs (flex, gap 12px):** primary "Download Résumé" (bg accent, text `#04231A`, mono 13px, radius 9px, hover `brightness(.94)`) → resume PDF; secondary "Let's talk" (white bg, 1px `#D6D3D1`, hover border+text accent) → `global.meetingLink`.

### 3. About

- **Layout:** grid `1.35fr 1fr`, gap 56px, `align-items: start`. Collapse to 1 col below ~900px.
- **Section label** (repeated pattern for every section): 6px accent square rotated 45° + mono 12px uppercase deep-accent label.
- **Left:** h2 `clamp(24px,3vw,34px)`/600, -0.025em, max-width 20ch: "I like building products that feel effortless, and systems that stay clean as they grow." Then 2 bio paragraphs (`#57534E`, max-width 58ch; **bold tech names** in `#1C1917`). Then a **2×2 checklist** (grid, gap 12px 28px): accent check icon + `#44403C` 15px text — "Type-safe code & clean architecture", "Reusable components & design systems", "Performance, accessibility & DX", "CI/CD & review culture that scales".
- **Right column (flex column, gap 18px):**
  - **Currently card** (white, 1px `#E7E5E4`, radius 14px, pad 20/22): mono uppercase "Currently" label with pulsing accent dot, then 4 rows (icon + `#44403C` 14.5px). Source these into `about.yml → now.currently`:
    1. "Building data-rich dashboards and unifying data from CRMs, BigQuery, and Postgres into one synced system"
    2. "Wiring up automation workflows with n8n"
    3. "Shaping agentic dev workflows that juggle heavy context-switching and AI bottlenecks at once"
    4. "Digging into advanced serverless patterns"
  - **Quick-facts card** (same card style): 4 rows, mono uppercase muted label (`#A8A29E`) left / value (600, 15px) right, hairline `#F0EEEC` dividers between:
    - Experience — 7+ years
    - Based in — Dumaguete · UTC+8
    - Education — BSIT · Silliman Univ.
    - Languages — English · Filipino · Cebuano

### 4. Experience (timeline)

- Container: `border-left: 1.5px solid #E7E5E4; padding-left: 34px`, flex column gap 46px, max-width 760px.
- Each item (`position: relative`): a 15px dot at `left: -42px` (first/current = accent fill; others = white fill with 1.5px `#D6D3D1` ring, 3px `#FAFAF9` halo). Mono 12px muted date, h3 20px/600 role, mono 13px deep-accent company link (with " ↗"), then `#57534E` description (max-width 62ch). Bind to `content/index.yml → experience.items` (position, date, company.name/url, description). Dates use en-dash ("May 2019 – Present").

### 5. AI-Augmented Workflows (signature, dark, full-bleed)

- Full-bleed section (no max-width on the section; inner content capped at 1120px). Background `#0C0A09`, text `#FAFAF9`. **This is the differentiator — keep it visually distinct.**
- Accent eyebrow "AI-Augmented Workflows"; h2 `clamp(26px,4vw,44px)`/600: "How I ship faster **without cutting corners.**" (second clause accent). Muted intro `#A8A29E`, max-width 56ch.
- **3-card grid** (`repeat(3,1fr)`, gap 20px). Card: 1px `#292524`, bg `#161311`, radius 16px, pad 26/24, flex column. Top: 42px rounded-10 icon tile, bg `rgba(0,220,130,.12)`, accent-colored icon. h3 18px/600, muted 14.5px body (flex:1), then mono 11px pill tags (bg `rgba(255,255,255,.05)`, 1px `#292524`). Bind to `aiWorkflows.items` (title, description, tools). The prototype exposes a **Light** variant (bg white, cards `#FAFAF9`) — optional; Dark is the default and recommended.

### 6. Projects

- Header: section label "Featured Projects" + h2 `clamp(24px,3vw,34px)`: "HR-tech platforms, financial tools, and data-rich products."
- **Grid `1fr 1fr`, gap 22px.** Card = `<a>` (whole card clickable → project `url`, target \_blank): 1px `#E7E5E4`, radius 16px, `overflow: hidden`, white. Hover: border→accent + `translateY(-3px)` (add a `transition`). Top: 208px image (`object-fit: cover`). Body pad 22/24: row with h3 19px/600 + muted up-right arrow icon; `#57534E` 14.5px description; wrap of mono 11px **green tag pills** (bg `#F0FBF4`, 1px `#D6F3E1`, text deep-accent). Bind to `content/projects/*.yml` (queryCollection sorted by date desc): Pharus Tech AB, Roommejts AB, Sysarb AB, Up Planner · Up Adviser.

### 7. Testimonials

- Tinted band: `border-top: 1px #EFEDEB; background: #F5F5F4`, inner pad 84px.
- **Grid `1fr 1fr`, gap 22px.** `<figure>` card (white, 1px `#E7E5E4`, radius 16px, pad 30/30/26): big accent "&ldquo;" glyph, blockquote `#44403C` 16px/1.6, then figcaption = 40px dark circle monogram (accent text) + name (14.5px/600) + role (12.5px `#78716C`). Bind to `testimonials.items` (quote, author.name/description). Two entries: Andrew Vincoy, Asa Bain.

### 8. Beyond the code

- Section label + a wrapping flex of **pill chips** (gap 12px, max-width 820px). Chip: 1px `#E7E5E4`, radius 999px, white, pad 11/18, 14.5px `#44403C`, leading 7px accent dot. Items: Brewing coffee, Pickleball, Running, Free diving, Road-trips & travel, Cross-fit, Anime & manga, Dota 2 · Stardew Valley (from the `faq` "outside of work" answer / `about.yml`).

### 9. Contact / footer (dark)

- Background `#0C0A09`, text `#FAFAF9`, inner pad 92/28/40.
- Pulsing accent dot + mono line "Available for full-time · contract · remote (UTC+8 overlap)" (from `now.openTo`). h2 `clamp(30px,5vw,56px)`/600: "Let's build something that ships." CTAs: email button (accent bg) → `mailto:global.email`; "Book a 15-min call ↗" outline → `meetingLink`.
- Bottom bar (`border-top: 1px #1C1917`): mono 12px "© {year} Sean Erick Ramones · Built with intention." + social icon buttons (38px, radius 9px, 1px `#292524`, hover border+icon accent) from `snsLinks` — LinkedIn, GitHub, X, Instagram.

## Interactions & Behavior

- **Sticky nav hide/show** on scroll direction (see Nav). Respect `prefers-reduced-motion`.
- **Anchor links** smooth-scroll to sections (`scroll-behavior: smooth` + `scroll-margin-top: 84px`).
- **Rolling `whoami` role** cycles hero.roles (~2.2–2.6s each) with a blinking caret.
- **Availability pulse** (`sr-pulse 2s infinite` box-shadow ring) on nav + footer dots.
- **Card hovers:** project cards lift + accent border; buttons darken/gain accent border; social + company links → accent.
- **Responsive:** About grid, Projects grid, Workflows 3-col, Testimonials 2-col all collapse to single column on tablet/mobile; nav center links collapse (hamburger or hide) below ~720px.

## State Management

Minimal. `navHidden` (bool, from scroll direction) and `activeRoleIndex` (rolling hero title). Everything else is static content from Nuxt Content — use `queryCollection()` as the existing pages already do. No data fetching beyond content.

## Design Tokens

**Colors**

- Page bg `#FAFAF9` · surface `#FFFFFF` · tinted band `#F5F5F4`
- Text: strong `#1C1917`, body `#57534E`, secondary `#44403C`, muted `#A8A29E`, faint `#78716C`
- Border `#E7E5E4` · hairline `#F0EEEC` / `#EFEDEB` · input border `#D6D3D1`
- **Accent (Nuxt green, keep):** `#00DC82`. Prototype token `--a`. **On-accent text** `#04231A`.
- **Deep accent (`--ad`) for green text/links/labels on light bg:** default `#00844E` (= accent × 0.6). _Important:_ the prototype **derives `--ad` from the accent** (multiply RGB by 0.6) so recoloring the brand shifts headline highlight, labels, links, and role text together. Reproduce this: green _text_ should be a darkened accent, not a fixed hex. In the Nuxt repo this maps to `matcha` shades — use a light-mode-legible step (e.g. `text-[var]` or a `matcha-700`-ish token) for text and the base matcha for fills/dots.
- Green tag pill: bg `#F0FBF4`, border `#D6F3E1`, text = deep-accent.
- Dark sections: bg `#0C0A09`, card `#161311`, border `#292524`, muted text `#A8A29E`.
- Link hover (light): `#00A66B`. Selection: bg `#C7F9E3`, text `#04231A`.

**Typography** — **Geist** (body/UI) + **Geist Mono** (labels, eyebrows, dates, tags, nav, buttons). Google Fonts. Weights 300–700. Display headings 600, tight tracking (-0.02 to -0.035em). Do NOT use Inter/Roboto/Arial.

**Radius:** buttons 8–10px · cards 14–16px · pills 999px · monogram 8px.
**Spacing:** section V-pad 84–92px, gutter 28px, max-width 1120px, card pad 20–30px, grid gaps 18–22px.
**Motion:** nav `.38s cubic-bezier(.4,0,.2,1)`; pulse 2s; caret blink 1.1s step-end; role roll 9s.

## Assets

In `./assets/` (copied from the repo's `public/`):

- `projects/*.jpg` — the 4 project screenshots (already `public/projects/recent_projects_*.jpg`).
- `profile-1.png`, `profile-2.png` — avatars (`public/avatars/`).
- `about/*.jpg` — lifestyle photos (`public/about/`). **Note:** the About photo collage was removed per review; these aren't used in the current design but are included for reference.
- `tech/*.png` — stack logos (`public/hero/`). **Note:** the tech-logo marquee was removed per review; logos unused in current design.
  Use the repo's existing `public/` assets directly; no new assets needed. Icons in the prototype are inline stroke SVGs — swap for `UIcon` (`i-lucide-*` / `i-simple-icons-*`, already used in the content YAML) in implementation.

## Mapping to the Nuxt repo (practical notes)

- Build as **`app/pages/index.vue`** composing section components under `app/components/landing/` (Hero, About, Experience, AiWorkflows, Projects, Testimonials, Beyond, Contact). Redirect or drop `/about` and `/projects` routes (or keep as anchor redirects to `/#about`, `/#projects`).
- Keep **`primary: matcha`** in `app.config.ts`. Everywhere the prototype uses `#00DC82` → matcha base; deep-accent green text → a darker matcha step legible on light bg.
- Prefer Nuxt UI primitives: `UButton` (CTAs/résumé), `UBadge` (tags), `UIcon` (all icons), `UPageSection`/`UContainer` for section scaffolding, `UPageHero` if useful for the hero.
- Read every piece of copy from Content (`queryCollection('index')`, `queryCollection('projects')`, etc.) — the prototype's literal text mirrors those files with the copy edits noted above; port those edits into the YAML.
- Sticky-hide nav belongs in the layout/header component (`app/components/AppHeader.vue`), not per-page.

## Files

- `Portfolio.dc.html` — the full high-fidelity design reference (all 9 sections). Open in a browser to see final look, motion, and hover states.
- `assets/` — supporting images/logos (see Assets; several are unused in the final design).
