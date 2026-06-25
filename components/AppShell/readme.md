# components/AppShell — Dashboard Shell System

## Purpose
The persistent layout wrapper for every page under `/dashboard/*`:
sidebar navigation, auth gating, and the max-width content shell.

## Type
Shared components (not routes).

## Access Control
`AuthGuard` is the single source of truth for blocking unauthenticated
access — it redirects to `/login?redirect=<original path>` if no session
exists. Every other component in this folder assumes a user IS present.

## Components in this folder

| File | Single Responsibility |
|---|---|
| `AppShellLayout.tsx` | Outer shell: max-width container + sidebar + main slot |
| `ProgressSaveToast.tsx` | The bottom-right error toast (extracted from layout) |
| `AuthGuard.tsx` | Redirect-if-unauthenticated wrapper |
| `Sidebar/SidebarShell.tsx` | Sidebar container, mobile slide animation |
| `Sidebar/SidebarMobileToggle.tsx` | Hamburger button + overlay (mobile only) |
| `Sidebar/SidebarNavList.tsx` | The nav item list + active-state indicator |
| `Sidebar/SidebarUserFooter.tsx` | User avatar/name/email + logout button |
| `Sidebar/sidebarNavItems.ts` | The nav item data array (data, not a component) |

## Data Sources
Reads auth state via `useAuth()` (context/AuthContext.tsx). No direct
Supabase calls in this folder.

## Related Files
`context/AuthContext.tsx`, `components/ui/TitecxForgeLogo.tsx`
