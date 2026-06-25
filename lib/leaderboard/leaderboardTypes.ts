/**
 * lib/leaderboard/leaderboardTypes.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: shared types for the two-track leaderboard
 * system — Credits Board (lifetime referral points, Track A, stored) vs
 * Learning Board (derived real-time progress points, Track B).
 */
export type LeaderboardTab = 'credits' | 'learning';

export interface LeaderboardDisplayEntry {
  id: string;
  name: string;
  avatar: string;
  avatarUrl: string | null;
  points: number;
  coursesCompleted: number;
  coursesInProgress?: number; // learning tab only
  rank: number;
}

export interface LeaderboardPageData {
  leaderboard: LeaderboardDisplayEntry[];
  total: number;
  page: number;
}

export interface MyRankData {
  rank: number | null;
  points: number;
  total: number;
}

export const LEADERBOARD_PAGE_SIZE = 20;
