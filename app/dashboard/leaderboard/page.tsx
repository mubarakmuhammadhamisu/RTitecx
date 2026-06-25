'use client';

import { useAuth } from '@/context/AuthContext';
import { useLeaderboardData } from '@/lib/leaderboard/useLeaderboardData';
import LeaderboardHeader from './_components/LeaderboardHeader';
import LeaderboardTabToggle from './_components/LeaderboardTabToggle';
import YourStatusCard from './_components/YourStatusCard';
import ParticipantsStatsBar from './_components/ParticipantsStatsBar';
import LeaderboardErrorBanner from './_components/LeaderboardErrorBanner';
import PodiumSection from './_components/PodiumSection';
import RankingsList from './_components/RankingsList';
import LeaderboardEmptyState from './_components/LeaderboardEmptyState';
import LeaderboardLoadingSkeleton from './_components/LeaderboardLoadingSkeleton';
import LeaderboardPagination from './_components/LeaderboardPagination';

/**
 * /dashboard/leaderboard — two-track leaderboard (Credits / Learning).
 * Composes 13 focused sub-components; all data-fetching/pagination
 * state is delegated to useLeaderboardData.
 */
export default function LeaderboardPage() {
  const { user } = useAuth();
  const { activeTab, page, data, myRank, loading, myRankLoading, error, totalPages, fetchPage, switchTab } =
    useLeaderboardData();

  const entries = data?.leaderboard ?? [];
  const top3 = page === 1 ? entries.slice(0, 3) : [];
  const rest = page === 1 ? entries.slice(3) : entries;
  const hasPodium = page === 1 && top3.length >= 3;
  const listToShow = hasPodium ? rest : entries;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <LeaderboardHeader activeTab={activeTab} />
      <LeaderboardTabToggle activeTab={activeTab} onSwitch={switchTab} />
      <YourStatusCard myRank={myRank} tab={activeTab} loading={myRankLoading} />
      <ParticipantsStatsBar total={data?.total} tab={activeTab} loading={loading} />

      {error && <LeaderboardErrorBanner message={error} onRetry={() => fetchPage(page, activeTab)} />}

      {!loading && hasPodium && <PodiumSection top3={top3} tab={activeTab} />}

      {!loading && entries.length > 0 && (
        <RankingsList entries={listToShow} showHeading={hasPodium} tab={activeTab} currentUserId={user?.id} />
      )}

      {!loading && entries.length === 0 && !error && <LeaderboardEmptyState tab={activeTab} />}

      {loading && <LeaderboardLoadingSkeleton />}

      {totalPages > 1 && !loading && (
        <LeaderboardPagination page={page} totalPages={totalPages} onPageChange={(p) => fetchPage(p, activeTab)} />
      )}
    </div>
  );
}
