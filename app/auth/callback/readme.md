# Route Documentation

## Route
`/auth/callback`

## Purpose
Exchanges the OAuth authorization code (from Google, or any future
OAuth provider) for a Supabase session, then redirects to the original
target page. This is the redirect target Supabase sends the browser to
after a successful "Continue with Google" flow.

## Type
`api route` — GET (Route Handler, not a page — it never renders UI,
only redirects)

## Access Control
Public (this IS the auth mechanism — no session exists yet when this
route runs).

## Input — Request / Parameters
**Query params (set by Supabase):**
- `code` — the OAuth authorization code to exchange
- `redirect` — the original `redirectTo` we passed when starting the
  flow (see `AuthContext.signInWithGoogle`), re-sanitized here as a
  defense-in-depth measure since query params can be tampered with

## Output — Response
HTTP redirect (302) to either:
- the sanitized `redirect` target on success
- `/login?error=oauth_failed` on failure

## Data Sources
Writes: a new `profiles` row is auto-created via the `handle_new_user`
trigger (migration 0001) if this is the user's first sign-in.

## Side Effects
Establishes a Supabase session (sets auth cookies via the server client).

## Related Files
`context/AuthContext.tsx` (signInWithGoogle),
`lib/supabase/serverClient.ts`, `lib/forms/sanitizeRedirectPath.ts`
