# app/ — Root Layout & Global Routes

## Route
`/` (root layout wraps every route in the app)

## Purpose
`layout.tsx` sets up fonts, global metadata (title/OG/Twitter), and the
provider tree (Auth → Courses, plus ProgressToast). `page.tsx` is the
public landing page. `globals.css` holds the full design-token system.

## Type
`layout`

## Access Control
Public — no guard at this level. Auth gating happens per-section
(AuthGuard wraps /dashboard/*, an admin guard wraps /admin/*).

## Input — Request / Props / Params
`children: React.ReactNode` (every nested route).

## Output — Response / Returned State
Renders `<html><body>` with fonts applied and providers wrapping
`children`. No data is fetched at this level.

## Provider nesting (must stay in this order)
```
ProgressToastProvider          ← no dependencies
  AuthProvider                 ← owns session/profile
    CoursesProvider            ← reads current user from AuthContext
      {children}
```

## Metadata
- `metadataBase` MUST be set to the real deployed URL (`NEXT_PUBLIC_SITE_URL`)
  or WhatsApp/social link previews will not resolve OG images correctly.
- Title: "TITECX FORGE" (exact casing/wording preserved from original).

## Related Files
`context/AuthContext.tsx`, `context/CoursesContext.tsx`,
`context/ProgressToastContext.tsx`, `app/globals.css`
