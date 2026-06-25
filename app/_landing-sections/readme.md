# app/_landing-sections — Landing Page Section Components

## Purpose
Each section of the landing page (`app/page.tsx`), split into its own
file. Originally one 152-line page mixing Hero/Features/CoursePreview/
FinalCTA markup in a single component.

## Type
Page-section components (not routes themselves — composed by
`app/page.tsx`).

## Access Control
Public.

## Components

| File | Single Responsibility |
|---|---|
| `HeroSection.tsx` | Headline, subhead, CTA buttons |
| `FeaturesSection.tsx` | "Why TITECX" feature grid |
| `CoursePreviewSection.tsx` | Server component: fetches + renders 3 popular courses |
| `FinalCtaSection.tsx` | Bottom-of-page CTA banner |

## Data Sources
`CoursePreviewSection.tsx` is the only section that fetches data — via
`fetchPublishedCoursesServer()` (server-side Supabase call, no client
loading spinner needed since this renders at request time).

## Related Files
`app/page.tsx`, `lib/courses/fetchPublishedCoursesServer.ts`,
`components/courses/CourseCard.tsx`
