# components/ui — Shared Design-System Primitives

## Purpose
Reusable, presentation-only building blocks consumed across the public
site, student dashboard, and admin dashboard. Nothing in this folder
contains business logic, data fetching, or auth checks.

## Type
Shared components (not routes).

## Access Control
N/A — pure UI primitives, render based on props only.

## Components in this folder

| File | Single Responsibility |
|---|---|
| `GlowCard.tsx` | Standard glass-panel card (default variant only) |
| `GlowCardHero.tsx` | Hero-variant glass panel (stronger gradient, used on landing/CTAs) |
| `Button.tsx` | Primary/secondary/danger button styles using design tokens |
| `LoadingSpinner.tsx` | Centered branded loading state |

## Data Sources
None.

## Related Files
`app/globals.css` (design tokens), `lib/theme/tokens.ts`
