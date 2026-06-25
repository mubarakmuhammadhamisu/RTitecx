'use client';

import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { uploadAvatar } from '@/lib/supabase/uploadAvatar';
import type { ProfileRow } from '@/lib/supabase/rowTypes';
import type { AppUser } from './auth/AppUser';
import { rowToAppUser } from './auth/rowToAppUser';
import { attemptReferralClaim } from './auth/attemptReferralClaim';

/**
 * context/AuthContext.tsx
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: session lifecycle (login/register/logout) and
 * profile state/mutations ONLY.
 *
 * Deliberately does NOT own: course catalog, enrollments, lesson
 * completion (see CoursesContext.tsx), or the progress-save toast (see
 * ProgressToastContext.tsx). This split keeps a course-data refetch from
 * re-rendering every component that only cares about "is someone logged
 * in," and vice versa.
 */
interface AuthContextValue {
  user: AppUser | null;
  isLoading: boolean;
  loadError: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: (redirectTo?: string) => Promise<{ error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    referralCode?: string
  ) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (
    data: Partial<Pick<AppUser, 'name' | 'phone' | 'bio' | 'location'>>
  ) => Promise<{ error?: string }>;
  updatePreferences: (prefs: AppUser['preferences']) => Promise<{ error?: string }>;
  updateAvatar: (file: File) => Promise<{ error?: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ error?: string }>;
  deleteAccount: () => Promise<{ error?: string }>;
  refreshBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const router = useRouter();
  const loadedUserIdRef = useRef<string | null>(null);
  const referralClaimedRef = useRef(false);

  const loadProfile = useCallback(async (userId: string, isNewSession = false) => {
    setLoadError(false);
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 15_000)
      );

      const { data: profile, error: profileError } = await Promise.race([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        timeoutPromise,
      ]);

      if (profileError) {
        console.error('[loadProfile] query failed:', profileError.message);
        setLoadError(true);
        return;
      }

      if (profile) {
        setUser(rowToAppUser(profile as ProfileRow));
      }

      if (isNewSession && !referralClaimedRef.current) {
        referralClaimedRef.current = true;
        attemptReferralClaim();
      }
    } catch (err: unknown) {
      console.error('[loadProfile] unexpected error or timeout:', err);
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(async ({ data: { user: authUser } }) => {
        if (authUser) {
          loadedUserIdRef.current = authUser.id;
          await loadProfile(authUser.id);
        }
      })
      .catch((err) => {
        console.error('[AuthProvider] session init error:', err);
        setLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        loadedUserIdRef.current = null;
        referralClaimedRef.current = false;
        setUser(null);
        setIsLoading(false);
        return;
      }
      if (loadedUserIdRef.current === session.user.id) return;
      loadedUserIdRef.current = session.user.id;
      await loadProfile(session.user.id, true);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    try {
      document.cookie = 'titecx_ref=; Max-Age=0; path=/; SameSite=Lax';
    } catch {
      /* private browsing */
    }
    return {};
  };

  /**
   * signInWithGoogle — starts the "Continue with Google" OAuth flow.
   * Supabase redirects the browser to Google, then back to
   * /auth/callback, which exchanges the code for a session and finally
   * redirects to `redirectTo` (defaults to /dashboard). The
   * handle_new_user trigger (migration 0001) auto-creates the profile
   * row for first-time Google sign-ins, same as email/password signup.
   */
  const signInWithGoogle = async (redirectTo = '/dashboard') => {
    const callbackUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl },
    });
    if (error) return { error: error.message };
    return {}; // browser navigates away immediately on success — no further state needed
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    referralCode?: string
  ) => {
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_PATTERN.test(email.trim())) {
      return { error: 'Please enter a valid email address.' };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      if (error.message.includes('already registered')) {
        return { error: 'An account with this email already exists.' };
      }
      return { error: error.message };
    }
    if (!data.user) return { error: 'Registration failed. Please try again.' };

    // The profiles row is auto-created by the handle_new_user trigger
    // (supabase/migrations/0001) — no manual insert needed here.

    if (referralCode) {
      try {
        localStorage.setItem('titecx_ref', referralCode.toUpperCase());
        document.cookie = 'titecx_ref=; Max-Age=0; path=/; SameSite=Lax';
      } catch {
        /* private browsing */
      }
    }

    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  const updateProfile = async (
    data: Partial<Pick<AppUser, 'name' | 'phone' | 'bio' | 'location'>>
  ) => {
    if (!user) return { error: 'Not logged in.' };
    const sanitized = { ...data };
    if (sanitized.name !== undefined) {
      const trimmedName = sanitized.name.trim();
      if (!trimmedName) return { error: 'Name cannot be empty.' };
      if (trimmedName.length > 100) return { error: 'Name must be 100 characters or fewer.' };
      sanitized.name = trimmedName;
    }
    if (sanitized.bio !== undefined && sanitized.bio.length > 500) {
      return { error: 'Bio must be 500 characters or fewer.' };
    }
    const { error } = await supabase.from('profiles').update(sanitized).eq('id', user.id);
    if (error) return { error: error.message };
    setUser((prev) => (prev ? { ...prev, ...sanitized } : prev));
    return {};
  };

  const updatePreferences = async (prefs: AppUser['preferences']) => {
    if (!user) return { error: 'Not logged in.' };
    const { error } = await supabase.from('profiles').update({ preferences: prefs }).eq('id', user.id);
    if (error) return { error: error.message };
    setUser((prev) => (prev ? { ...prev, preferences: prefs } : prev));
    return {};
  };

  const updateAvatar = async (file: File) => {
    if (!user) return { error: 'Not logged in.' };
    const { url, error } = await uploadAvatar(user.id, file);
    if (error || !url) return { error: error ?? 'Upload failed.' };
    await supabase.from('profiles').update({ avatar_url: url }).eq('id', user.id);
    setUser((prev) => (prev ? { ...prev, avatarUrl: url } : prev));
    return {};
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-protection': '1' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({ error: 'Server error' }));
    if (!res.ok) return { error: data.error ?? 'Password update failed' };
    return {};
  };

  const deleteAccount = async () => {
    if (!user) return { error: 'Not logged in.' };
    const res = await fetch('/api/delete-account', {
      method: 'POST',
      headers: { 'x-csrf-protection': '1' },
    });
    if (!res.ok) return { error: 'Failed to delete account. Please contact support.' };
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    return {};
  };

  /**
   * refreshBalance — re-fetches the current profile row to pick up
   * server-side changes to creditBalance/lifetimePoints (e.g. after
   * spending points at checkout, or earning a referral commission).
   * Reuses loadProfile rather than a separate query so the refreshed
   * data goes through the exact same row->AppUser mapping.
   */
  const refreshBalance = async () => {
    if (!user) return;
    await loadProfile(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loadError,
        login,
        signInWithGoogle,
        register,
        logout,
        updateProfile,
        updatePreferences,
        updateAvatar,
        updatePassword,
        deleteAccount,
        refreshBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
