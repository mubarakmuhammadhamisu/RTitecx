'use client';

import { useState, useCallback, useEffect } from 'react';
import { normaliseLeaderboardEntry } from './normaliseLeaderboardEntry';
import { LEADERBOARD_PAGE_SIZE } from './leaderboardTypes';
import type { LeaderboardTab, LeaderboardPageData, MyRankData } from './leaderboardTypes';

/**
 * lib/leaderboard/useLeaderboardData.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch leaderboard page data + the current
 * user's rank for whichever tab is active, and own all related
 * loading/error/pagination state. Extracted from the page component so
 * the page only orchestrates UI.
 */
export function useLeaderboardData() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('credits');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<LeaderboardPageData | null>(null);
  const [myRank, setMyRank] = useState<MyRankData | null>(null);
  const [loading, setLoading] = useState(true);
  const [myRankLoading, setMyRankLoading] = useState(true);
  const [error, setError] = useState('');

  const totalPages = data ? Math.ceil(data.total / LEADERBOARD_PAGE_SIZE) : 1;

  const fetchPage = useCallback(async (p: number, tab: LeaderboardTab) => {
    setLoading(true);
    setError('');
    try {
      const url =
        tab === 'credits'
          ? `/api/admin/leaderboard?page=${p}&limit=${LEADERBOARD_PAGE_SIZE}`
          : `/api/leaderboard/learning?page=${p}&limit=${LEADERBOARD_PAGE_SIZE}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('fetch failed');
      const json = await res.json();
      setData({
        leaderboard: (json.leaderboard ?? []).map((e: Parameters<typeof normaliseLeaderboardEntry>[0]) =>
          normaliseLeaderboardEntry(e, tab)
        ),
        total: json.total,
        page: json.page,
      });
      setPage(p);
    } catch {
      setError('Could not load leaderboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyRank = useCallback(async (tab: LeaderboardTab) => {
    setMyRankLoading(true);
    try {
      const res = await fetch(`/api/leaderboard/my-rank?tab=${tab}`);
      if (!res.ok) throw new Error();
      setMyRank(await res.json());
    } catch {
      setMyRank(null);
    } finally {
      setMyRankLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1, 'credits');
    fetchMyRank('credits');
    // Intentionally runs once on mount only — subsequent tab/page changes
    // are driven by switchTab/fetchPage calls from the UI, not this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchTab = (tab: LeaderboardTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setData(null);
    setMyRank(null);
    fetchPage(1, tab);
    fetchMyRank(tab);
  };

  return {
    activeTab,
    page,
    data,
    myRank,
    loading,
    myRankLoading,
    error,
    totalPages,
    fetchPage,
    switchTab,
  };
}
