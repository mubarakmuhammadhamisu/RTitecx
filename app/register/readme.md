# Route Documentation

## Route
`/register`

## Purpose
Account creation with name/email/password, optional referral code
attribution, and a post-signup "check your email" screen.

## Type
`page` (Client Component, Suspense-wrapped for useSearchParams)

## Access Control
Public. If already logged in, auto-redirects to the target immediately.

## Input — Request / Props / Params
**Search params:**
- `?redirect=<path>` — sanitized via `sanitizeRedirectPath`
- `?ref=<code>` — referral code; falls back to the `titecx_ref` cookie
  if absent (see `useReferralCode`)

## Output — Returned State
On success: shows `RegisterSuccessScreen` (does NOT auto-redirect —
the person must confirm their email first).

## Data Sources
Calls `useAuth().register()`. The referral code itself is attributed
server-side later, via `attemptReferralClaim()` on first login after
email confirmation (see `context/auth/attemptReferralClaim.ts`).

## Related Files
`components/auth/RegisterForm.tsx`,
`components/auth/RegisterSuccessScreen.tsx`,
`lib/forms/useReferralCode.ts`, `lib/forms/sanitizeRedirectPath.ts`
