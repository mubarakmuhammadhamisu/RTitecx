# components/auth — Shared Auth Form Components

## Purpose
Reusable pieces shared across /login, /register, /reset-password —
primarily the password input with show/hide toggle, and the
resend-verification-email panel (shown on both login and register when
Supabase reports an unconfirmed email).

## Type
Shared components (not routes).

## Access Control
N/A — presentation + form logic only.

## Components

| File | Single Responsibility |
|---|---|
| `PasswordInput.tsx` | Password field with show/hide toggle, reused by login/register/reset |
| `ResendVerificationPanel.tsx` | "Email not verified" resend-link panel |
| `AuthErrorBanner.tsx` | The red inline error banner shown under auth forms |
| `AuthPageLoadingFallback.tsx` | Suspense fallback for pages using useSearchParams |

## Data Sources
`ResendVerificationPanel` calls `supabase.auth.resend()` directly (the
only auth component with a direct Supabase call — everything else goes
through `useAuth()`).

## Related Files
`context/AuthContext.tsx`, `lib/supabase/client.ts`
