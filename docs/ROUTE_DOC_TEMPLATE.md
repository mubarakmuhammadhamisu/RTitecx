# Route Documentation Template

Every directory under `app/` (App Router) that contains a `page.tsx`,
`route.ts`, or `layout.tsx` MUST contain a `readme.md` written BEFORE
the code file, following this exact structure. Copy this template,
fill it in, then write the code.

---

## Route

`<the URL path, e.g. /dashboard/courses/[slug]>`

## Purpose

One or two sentences: what does a user/admin see or accomplish here.

## Type

`page` | `layout` | `api route` | `loading` | `error` | `not-found`

## Access Control

Who can reach this route — `public`, `authenticated student`, `admin only`.
Name the guard mechanism used (e.g. `AuthGuard`, `AdminGuard`, RLS policy name).

## Input — Request / Props / Params

- **URL params:** (e.g. `slug: string`)
- **Search params:** (e.g. `?tab=overview`)
- **Request body (API routes only):** exact shape, with types
- **Props received (components):** exact shape, with types

## Output — Response / Returned State

- **API routes:** exact JSON response shape, success and error cases, HTTP status codes
- **Pages:** what data is fetched server-side and passed down; what client state is initialized

## Data Sources

Which Supabase tables/views are read or written. Which external APIs are called
(Paystack, Bunny, Gumlet, etc).

## Side Effects

Anything beyond rendering: writes, emails, webhooks triggered, cache invalidation.

## Related Files

Links to the helper files, sub-components, and types this route depends on.

---

### Example (filled in)

## Route
`/api/enroll`

## Purpose
Enrolls an authenticated student in a course after payment verification.

## Type
`api route` — POST

## Access Control
Authenticated student only. Verified via Supabase session cookie.

## Input — Request / Props / Params
**Request body:**
```ts
{
  courseSlug: string;
  paystackReference: string;
  couponCode?: string;
}
```

## Output — Response / Returned State
**Success (200):**
```ts
{ success: true; enrollmentId: string }
```
**Error (400/402/409):**
```ts
{ success: false; error: string }
```

## Data Sources
Reads: `courses`, `coupons`. Writes: `enrollments`, `payments`.
Calls: Paystack verify-transaction API.

## Side Effects
Triggers a row insert in `payments`; on premium tier, sets `premium_deadline`
on the enrollment row.

## Related Files
`lib/verifyPaystackPayment.ts`, `lib/courses.ts`, `supabase/migrations/0003_enrollments.sql`
