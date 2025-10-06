<!--
Sync Impact Report:
- Version change: none → 1.0.0 (initial constitution creation)
- Added principles: Content-First Architecture, Type-Safe Schema Validation, Nuxt UI Component System, Composition API Patterns, pnpm Workflow Standards
- Added sections: Development Standards, Content Management Guidelines
- Templates requiring updates: ✅ Updated all references in plan-template.md
- Follow-up TODOs: None
-->

# Nuxt Portfolio CMS Constitution

## Core Principles

### I. Content-First Architecture (NON-NEGOTIABLE)
All page content MUST be managed via YAML/Markdown files in `content/` directory with strict Zod schemas defined in `content.config.ts`. Content-driven architecture ensures separation of concerns, enables non-technical content updates, and provides automatic type safety. NO hardcoded content in components except structural elements.

**Rationale**: Content management flexibility and maintainability are core to portfolio template usability.

### II. Type-Safe Schema Validation
Every content collection MUST have a corresponding Zod schema in `content.config.ts` that validates structure and generates TypeScript types. All content operations MUST leverage auto-generated types from `@nuxt/content`. Schema changes require version consideration and migration planning.

**Rationale**: Type safety prevents runtime errors and provides excellent developer experience for content management.

### III. Nuxt UI Component System
Components MUST use Nuxt UI library components over custom implementations. Custom CSS SHOULD be avoided in favor of Tailwind utilities and Nuxt UI's variant system (`color`, `variant`, `size` props). When custom components are necessary, they MUST follow PascalCase naming and expose consistent variant APIs.

**Rationale**: Consistency, maintainability, and leveraging battle-tested component patterns.

### IV. Composition API Patterns
All Vue components MUST use Composition API with `<script setup>` syntax. TypeScript interfaces MUST be defined for all props. Components MUST import specific types from `@nuxt/content` rather than using generic types.

**Rationale**: Modern Vue patterns, better TypeScript integration, and explicit type safety.

### V. pnpm Workflow Standards
Package management MUST use `pnpm` exclusively (not npm/yarn). ESLint configuration MUST follow project standards: comma-dangle: never, braceStyle: 1tbs. All commands MUST be executed through pnpm scripts defined in package.json.

**Rationale**: Consistent tooling, performance benefits of pnpm, and standardized code formatting.

## Development Standards

**Technology Stack Requirements**:
- Nuxt 4 with Vue 3 Composition API
- TypeScript for all logic
- Nuxt UI (Tailwind-based) for components
- Nuxt Content for file-based CMS
- Motion-v for animations
- @nuxt/eslint for code quality

**Critical File Dependencies**:
- `content.config.ts` - Schema definitions (changes require careful review)
- `app/app.config.ts` - Global configuration (colors, UI settings, profile data)
- `nuxt.config.ts` - Module configuration and prerendering settings

## Content Management Guidelines

**Content Structure Standards**:
- `content/index.yml` - Homepage content (hero, about, testimonials, FAQ)
- `content/projects/*.yml` - Individual project data files
- `content/blog/*.md` - Blog posts with frontmatter metadata
- `content/{about,projects,blog,speaking}.yml` - Page-specific configurations

**Content Creation Process**:
1. Reference Zod schema in `content.config.ts` for required fields
2. Validate content structure against schema
3. Test content rendering in development environment
4. Verify TypeScript compilation passes

**Animation Standards**:
Motion-v animations MUST follow consistent patterns with opacity, scale, and blur transitions. Standard timing: duration 0.6s, delay 0.1s increments.

## Governance

This constitution supersedes all other development practices and guidelines. All changes to core architecture, content schemas, or component patterns MUST be evaluated against these principles. Violations require explicit justification and approval process.

**Amendment Process**:
- MAJOR version: Backward incompatible principle changes or removal
- MINOR version: New principle additions or expanded guidance  
- PATCH version: Clarifications, wording improvements, non-semantic updates

**Compliance Requirements**:
- All PRs MUST verify adherence to content-first architecture
- Schema changes MUST include migration plan
- New components MUST follow Nuxt UI patterns
- Use `.github/copilot-instructions.md` for detailed runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2025-10-07 | **Last Amended**: 2025-10-07