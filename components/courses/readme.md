# components/courses — Shared Course Display Components

## Purpose
Course card and related presentational pieces reused across the landing
page's "Popular Courses" preview and the full `/courses` listing page.

## Type
Shared components (not routes).

## Access Control
N/A — pure presentation, takes a CourseSchema as props.

## Components

| File | Single Responsibility |
|---|---|
| `CourseCard.tsx` | One course card (thumbnail, level/price badges, title, meta) |
| `CourseCardGrid.tsx` | Responsive grid wrapper for a list of CourseCards |
| `EmptyCoursesState.tsx` | "No courses yet" waitlist state |
| `CoursesLoadErrorState.tsx` | Error state when course fetch fails |

## Data Sources
None directly — receives course data as props from the page/section
that fetched it.

## Related Files
`lib/courses/courseTypes.ts`, `lib/courses/fetchPublishedCourses.ts`
