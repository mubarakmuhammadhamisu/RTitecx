# Route Documentation

## Route
`/login`

## Purpose
Email/password login. Redirects to `?redirect=` target (sanitized) on
success, or to `/dashboard` by default.

## Type
`page` (Client Component, Suspense-wrapped for useSearchParams)

## Access Control
Public. If already logged in, auto-redirects to the target immediately
(see useEffect in LoginPageContent).

## Input — Request / Props / Params
**Search params:** `?redirect=<path>` — sanitized via
`sanitizeRedirectPath` to prevent open-redirect (rejects absolute/
protocol-relative URLs).

## Output — Returned State
On success: `router.replace(redirect)`.
On "email not confirmed": shows ResendVerificationPanel instead of an error.

## Data Sources
Calls `useAuth().login()`. No direct Supabase calls in this file.

## Related Files
`components/auth/LoginForm.tsx`,
`components/auth/ResendVerificationPanel.tsx`,
`lib/forms/sanitizeRedirectPath.ts`, `context/AuthContext.tsx`
