# Titecx Forge — Setup Guide

Follow this guide in order. Each section produces the values needed for
`.env.local` (copy `.env.example` first: `cp .env.example .env.local`).

---

## 1. Supabase Project Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)
3. Run the migrations in order. In the Supabase SQL Editor, run each file
   from `supabase/migrations/` **in filename order** (0001, 0002, 0003...):
   - `0001_extensions_and_profiles.sql`
   - `0002_courses_modules_lessons.sql`
   - `0003_enrollments_and_progress.sql`
   - `0004_interactive_lessons.sql`
   - `0005_payments_coupons_points_referrals.sql`
   - `0006_grading_strategy_flexibility.sql`

   Or, if using the Supabase CLI:
   ```bash
   supabase link --project-ref your-project-ref
   supabase db push
   ```
4. Create the `avatars` storage bucket:
   - Go to **Storage → New bucket** → name it `avatars` → make it **public**.
5. Promote your own account to admin after registering once through the
   app's `/register` page:
   ```sql
   update profiles set role = 'admin' where email = 'you@example.com';
   ```

---

## 1b. Google Sign-In ("Continue with Google") Setup

This enables the "Continue with Google" / "Sign up with Google" buttons
on `/login` and `/register`. Two parts: a Google Cloud OAuth client, and
enabling the provider in Supabase.

### Step 1 — Create a Google OAuth client

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and
   create a project (or pick an existing one).
2. Go to **APIs & Services → OAuth consent screen**. Choose **External**,
   fill in the app name ("TITECX FORGE"), support email, and your
   domain. Add your domain to **Authorized domains**.
3. Go to **APIs & Services → Credentials → Create Credentials → OAuth
   client ID**. Choose **Web application**.
4. Under **Authorized redirect URIs**, add your Supabase callback URL —
   found in Supabase under **Authentication → Providers → Google**
   (it looks like `https://your-project-ref.supabase.co/auth/v1/callback`).
   Add this BEFORE saving — Google requires it to match exactly.
5. Save, then copy the generated **Client ID** and **Client Secret**.

### Step 2 — Enable Google in Supabase

1. In the Supabase dashboard, go to **Authentication → Providers →
   Google**.
2. Toggle it **on**, paste in the **Client ID** and **Client Secret**
   from Step 1.
3. Save.

### Step 3 — Configure redirect URLs for your deployed domain

1. In Supabase, go to **Authentication → URL Configuration**.
2. Set **Site URL** to your deployed domain (e.g.
   `https://yourdomain.com`).
3. Under **Redirect URLs**, add `https://yourdomain.com/auth/callback`
   (and `http://localhost:3000/auth/callback` for local development).

No additional environment variables are needed for Google sign-in — the
OAuth client credentials live entirely in the Supabase dashboard, not
in `.env.local`. The app-side code (`AuthContext.signInWithGoogle` and
`app/auth/callback/route.ts`) requires no provider-specific
configuration; it would work identically if you later enabled GitHub,
Apple, or any other Supabase-supported OAuth provider through the same
dashboard flow.

---

## 2. Paystack Setup

1. Create an account at [paystack.com](https://paystack.com).
2. Go to **Settings → API Keys & Webhooks**:
   - Copy the **Public Key** → `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - Copy the **Secret Key** → `PAYSTACK_SECRET_KEY`
3. Under **Webhooks**, add an endpoint:
   `https://yourdomain.com/api/paystack/webhook`
   Set this same value as `PAYSTACK_WEBHOOK_URL`.
4. Use **test mode** keys (`pk_test_...` / `sk_test_...`) until you're
   ready to go live, then swap to live keys before launch.

---

## 3. Video Provider Setup (only configure what you'll actually use)

The platform supports exactly four video sources. You do not need to set
up all of them — only the ones courses will actually use.

### YouTube
No setup required. Paste a YouTube video URL when creating a lesson.

### Google Drive
No API key required. Share the video file as "Anyone with the link can
view" and paste the file ID when creating a lesson.

### Bunny Stream
1. Create a Stream library at [bunny.net](https://bunny.net).
2. Get your **Stream API key** (per-library) from the library's API page
   → `BUNNY_STREAM_API_KEY`.
3. Get your **Account API key** (account-wide, for library settings like
   player color/watermark) from **Account Settings → API** →
   `BUNNY_ACCOUNT_API_KEY`.
4. Add the library via `/admin/video-providers` in the app once deployed.

### Gumlet
1. Create a workspace at [gumlet.com](https://gumlet.com).
2. Get your API key from **Settings → API Keys** → `GUMLET_API_KEY`.
3. Copy your workspace ID → `GUMLET_WORKSPACE_ID`.
4. Add the account via `/admin/video-providers` in the app once deployed.

---

## 4. Interactive Code Engine Setup

These power the admin-configurable code playgrounds and graded tests.

- **HTML/CSS/JS** — runs in a sandboxed `<iframe>`. No setup required.
- **Python** — uses [Pyodide](https://pyodide.org) loaded from a CDN by
  default. No key required. Optionally self-host by setting
  `NEXT_PUBLIC_PYODIDE_CDN_URL`.
- **C** — uses an Emscripten-compiled clang/WASM toolchain loaded
  client-side. Optionally set `NEXT_PUBLIC_WASM_CLANG_CDN_URL` if
  self-hosting the WASM binaries (recommended for production — see
  performance note below).
- **Java** — uses [CheerpJ](https://cheerpj.com). Set
  `NEXT_PUBLIC_CHEERPJ_VERSION` to the CheerpJ loader version you want
  to pin (check cheerpj.com for the current stable version).

**Performance note:** Pyodide, the C/WASM toolchain, and CheerpJ are all
multi-megabyte downloads. They load **lazily** — only when a student
opens a lesson using that specific language — never on initial page load.

### Grading strategy: client-side today, server-side later

By default, the interactive test engine grades **entirely client-side**
to avoid server compute costs: the browser's WASM runtime runs the
student's code against every test case (visible and hidden), and the
server only compares the reported outputs against stored expected
values — it never executes code itself.

This is a deliberate tradeoff for staying on free-tier hosting. It
still defeats a hardcoded `print()` matching one known string, but a
sufficiently motivated person could forge the network request reporting
results. When ready to move to a paid compute tier, flip
`GRADING_STRATEGY` in `lib/interactive/gradingStrategy.ts` from
`'client-execution'` to `'server-execution'` — this swaps in real
server-side code execution against hidden cases with zero schema
changes required. See that file's comments for the swap-in point.

---

## 5. Running Locally

```bash
pnpm install
cp .env.example .env.local   # then fill in the values from sections 1-4
pnpm dev
```

---

## 6. What NOT to Commit

`.gitignore` already excludes all of the following, but as a sanity
check before any `git push`, confirm none of these are staged:

- `.env`, `.env.local`, `.env*.local`
- Supabase service role key (anywhere)
- Paystack secret key (anywhere)
- Bunny/Gumlet API keys (anywhere)
- `/node_modules`, `/.next`, `/out`, `/build`
