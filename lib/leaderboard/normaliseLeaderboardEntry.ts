import type { LeaderboardDisplayEntry, LeaderboardTab } from './leaderboardTypes';

/**
 * lib/leaderboard/normaliseLeaderboardEntry.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: normalise the two different API response
 * shapes (/api/admin/leaderboard for credits, /api/leaderboard/learning
 * for learning) into one shared LeaderboardDisplayEntry shape.
 *
 * The two backing endpoints return different field names for the same
 * concept (lifetime_points vs learning_points), hence this adapter.
 */
interface RawLeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  avatar_url: string | null;
  lifetime_points?: number;
  learning_points?: number;
  points?: number;
  courses_completed?: number;
  coursesCompleted?: number;
  courses_in_progress?: number;
  rank: number;
}

export function normaliseLeaderboardEntry(
  raw: RawLeaderboardEntry,
  tab: LeaderboardTab
): LeaderboardDisplayEntry {
  return {
    id: raw.id,
    name: raw.name,
    avatar: raw.avatar,
    avatarUrl: raw.avatar_url,
    points: tab === 'credits' ? (raw.lifetime_points ?? raw.points ?? 0) : (raw.learning_points ?? raw.points ?? 0),
    coursesCompleted: raw.courses_completed ?? raw.coursesCompleted ?? 0,
    coursesInProgress: raw.courses_in_progress,
    rank: raw.rank,
  };
}
