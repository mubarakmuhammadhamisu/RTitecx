# Route Documentation

## Route
`/reset-password`

## Purpose
Handles BOTH halves of the password reset flow on one route:
1. Requesting a reset link (enter email)
2. Setting a new password (after clicking the emailed link)

## Type
`page` (Client Component, Suspense-wrapped for useSearchParams)

## Access Control
Public. Case 2 (set new password) additionally requires a valid,
unexpired recovery token in the URL (query param or hash fragment) —
validated via `useRecoveryFlowDetection`.

## Input — Request / Props / Params
**Search params:** `?type=recovery` (Case 2 entry signal)
**Hash fragment:** `#access_token=...&type=recovery` (alternate Case 2
signal — different Supabase versions/email clients vary in which they use)

## Output — Returned State
One of 5 screens depending on state:
`RequestResetFormScreen` → `ResetEmailSentScreen` (Case 1), or
`SetNewPasswordScreen` → `PasswordUpdatedScreen` (Case 2), or
`TokenExpiredScreen` (Case 2, invalid/used token)

## Data Sources
Calls `supabase.auth.resetPasswordForEmail()` and
`supabase.auth.updateUser()` directly (not through AuthContext — this
flow is intentionally independent of the logged-in-session state since
the person isn't authenticated yet when requesting a reset).

## Related Files
`lib/forms/useRecoveryFlowDetection.ts`, `lib/forms/validateNewPassword.ts`,
`_screens/*.tsx`
