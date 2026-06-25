'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { ReferralDashboardData } from './referralTypes';

/**
 * lib/referral/useReferralDashboardData.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch the referral dashboard data
 * (referrals + transactions + summary counts) and own loading/error state.
 *
 * NOTE: /api/referral/dashboard does not exist yet in this rewrite — it
 * is backend work for a later phase. This hook's contract with it is
 * preserved exactly from the original codebase, with response field
 * names converted to camelCase via the API route's own response shape
 * (the route is expected to return camelCase, unlike raw Supabase rows).
 */
export function useReferralDashboardData() {
  const { user } = useAuth();
  const [data, setData] = useState<ReferralDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/referral/dashboard', {
        headers: { 'x-csrf-protection': '1' },
      });
      if (!res.ok) throw new Error('Failed to load data');
      const json = (await res.json()) as ReferralDashboardData;
      setData(json);
    } catch {
      setError('Could not load referral data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
