# components/legal — Shared Legal Page Components

## Purpose
Reusable pieces shared by /privacy and /terms — both pages previously
duplicated an identical local `LegalSection` component; extracted here
to a single shared definition.

## Type
Shared components (not routes).

## Access Control
N/A — pure presentation.

## Components

| File | Single Responsibility |
|---|---|
| `LegalSection.tsx` | One numbered section card (title + body) |
| `LegalPageHero.tsx` | The hero banner ("Privacy Policy" / "Terms of Service" + last-updated date) |

## Content data
Legal text content lives in `app/privacy/privacyContent.tsx` and
`app/terms/termsContent.tsx` respectively — NOT in this folder — since
that content is page-specific, not a reusable component.

## Related Files
`app/privacy/page.tsx`, `app/terms/page.tsx`
