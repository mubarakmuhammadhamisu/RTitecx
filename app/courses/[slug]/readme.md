# Route Documentation

## Route
`/courses/[slug]`

## Purpose
Public marketing/detail page for a single course — hero, price/enroll
card, description, features, curriculum. Not the course PLAYER (that's
`/dashboard/courses/[slug]`, gated by enrollment).

## Type
`page` (Server Component)

## Access Control
Public. The EnrollButton sub-component is the only client-interactive
piece and branches behavior based on auth/enrollment state client-side.

## Input — Request / Props / Params
**URL params:** `slug: string`

## Output — Response / Returned State
404s via `notFound()` if no published course matches the slug.
Otherwise server-renders the course's marketing content.

## Data Sources
Reads: `courses` table (published only) via `fetchCourseBySlugServer`.

## Side Effects
None on this page itself. EnrollButton navigates to `/login`,
`/dashboard/checkout/[slug]`, or `/dashboard/courses/[slug]` depending
on auth/enrollment state — no direct writes happen here.

## Related Files
`lib/courses/fetchCourseBySlugServer.ts`,
`components/courses/EnrollButton/EnrollButton.tsx`,
`_sections/*.tsx` (page section components)
