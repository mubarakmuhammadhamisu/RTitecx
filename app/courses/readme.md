# Route Documentation

## Route
`/courses`

## Purpose
Public course catalog listing — every published course as a card grid.

## Type
`page` (Server Component)

## Access Control
Public.

## Input — Request / Props / Params
None.

## Output — Response / Returned State
Server-renders the full list of `is_published = true` courses fetched
via `fetchPublishedCoursesServer()`.

## Data Sources
Reads: `courses` table (published only).

## Side Effects
None.

## Related Files
`lib/courses/fetchPublishedCoursesServer.ts`,
`components/courses/CourseCardGrid.tsx`, `loading.tsx` (skeleton state)
