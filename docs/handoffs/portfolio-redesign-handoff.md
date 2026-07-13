# Handoff: Portfolio Redesign — Single-Page Layout

## Context

Redesigned [seancramones.com](https://seancramones.com) from a multi-page layout (Home, /projects, /about, /blog) into a single-page portfolio (except /blog stays separate). Inspired by [andrew.vinsys.dev](https://andrew.vinsys.dev/) — minimal, typography-first, subtle dot-grid background.

## Changes Made

### Files Modified

| File                  | What Changed                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| `app/pages/index.vue` | Complete rewrite — 6 sections: Hero → About → Projects → Experience → Skills → Contact                    |
| `app/utils/links.ts`  | Nav trimmed to: Home, Blog (removed Projects, About)                                                      |
| `nuxt.config.ts`      | `prerender.routes` → `['/', '/blog']` only; added routeRules redirects for `/about` and `/projects` → `/` |
| `assets/css/main.css` | Added subtle dot-grid background via `radial-gradient` on `<body>`                                        |

### Files Replaced (now 301 redirects to /)

- `app/pages/about.vue` — `navigateTo('/', { redirectCode: 301 })`
- `app/pages/projects.vue` — `navigateTo('/', { redirectCode: 301 })`

### Files Removed

- `app/components/landing/Hero.vue`
- `app/components/landing/About.vue`
- `app/components/landing/WorkExperience.vue`
- `app/components/landing/Blog.vue`
- `app/components/landing/AIWorkflows.vue`
- `app/components/landing/Testimonials.vue`
- `app/components/landing/FAQ.vue`
- `app/components/PolaroidItem.vue`

## Architecture

- **Framework:** Nuxt 4.4.8 + @nuxt/ui v4 + @nuxt/content v3
- **Primary color:** `matcha` (sage green) — defined in `app.config.ts`
- **Fonts:** Public Sans (sans) + Instrument Serif (serif)
- **All content is CMS-driven** via YAML files in `content/` — index.yml drives hero/about/experience/contact, projects/\*.yml drives project cards
- **Dark mode:** Supported via `ColorModeButton.vue` with circular wipe transition
- **Search:** Cmd+K search still works for blog content
- **Build:** Typecheck + production build verified clean (0 errors)

## Data Flow

- **Hero, About, Experience, Contact data** → `queryCollection('index').first()` from `content/index.yml`
- **Projects** → `queryCollection('projects').all()` from `content/projects/*.yml`
- **Blog** → `queryCollection('blog')` — untouched, separate route

## Current State of index.vue Sections

1. **Hero** — Small label "AI-AUGMENTED FULL-STACK ENGINEER" in mono, profile pic, name/headline from content, description, status dot with "Available for new projects", "Open to" tags, resume download + social links
2. **About** — Single paragraph from `page.about.description`
3. **Projects** — 2-column card grid with images, year, tags, description, "View Project" link
4. **Experience** — Vertical timeline with border-left, dots, date/position/company/description
5. **Skills** — 2-column grid of categories (Frontend, Backend, Cloud & DevOps, AI & Agentic, Tools) with pill tags — values are hardcoded in `skillCategories` computed
6. **Contact** — Profile pic, name, title, availability, Email/LinkedIn/Schedule buttons, social icons

## What's Hardcoded (not from CMS)

- `skillCategories` array in index.vue script — categorized tech skills as static data

## What's Prerendered

- `/` — home page
- `/blog` — blog index + all 34 blog articles
- `/about`, `/projects` — will redirect (301) to `/`

## Suggested skills for the next session

- `claude-design` — for the design process and taste guidance
- `popular-web-designs` — for design system references

## Suggested Next Work

- User said they "might need a few tweaks" — likely adjustments to the new layout
- Possible tweaks: section ordering, card styling, spacing, skill categorization, adding anchor links for sections, adding back any removed content the user misses
