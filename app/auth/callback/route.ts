import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { sanitizeRedirectPath } from '@/lib/forms/sanitizeRedirectPath';

/**
 * GET /auth/callback
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: exchange the OAuth `code` param for a Supabase
 * session, then redirect to the original target. See readme.md for the
 * full contract.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTarget = sanitizeRedirectPath(searchParams.get('redirect'));

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('[auth/callback] code exchange failed:', error.message);
    return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
  }

  return NextResponse.redirect(`${origin}${redirectTarget}`);
}
