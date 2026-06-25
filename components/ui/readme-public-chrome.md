# components/ui — Public Site Chrome

## Purpose
Navbar, Footer, and mobile menu used on every public (non-dashboard)
page. Auth-aware (shows different links when logged in vs guest) but
contains no data fetching beyond reading AuthContext.

## Type
Shared components (not routes).

## Access Control
Public — renders different content based on `useAuth().user`, but does
not gate access to anything itself.

## Components

| File | Single Responsibility |
|---|---|
| `Navbar.tsx` | Top nav bar shell, hides itself on /dashboard routes |
| `Footer/FooterBrand.tsx` | Brand blurb column |
| `Footer/FooterLegalLinks.tsx` | Terms/Privacy links column |
| `Footer/FooterSocialLinks.tsx` | Social icon links column |
| `Footer/Footer.tsx` | Composes the three columns + copyright line |
| `MobileMenu/MobileMenuToggle.tsx` | Hamburger button (presentation only) |
| `MobileMenu/MobileMenuPanel.tsx` | Slide-down panel shell + backdrop |
| `MobileMenu/MobileMenuGuestLinks.tsx` | Nav links shown when logged out |
| `MobileMenu/MobileMenuUserLinks.tsx` | Nav links shown when logged in |
| `MobileMenu/MobileMenu.tsx` | Composes toggle + panel + correct link set |

## Data Sources
Reads `useAuth()` only. No direct Supabase calls.

## Related Files
`context/AuthContext.tsx`, `components/ui/TitecxForgeLogo.tsx`
