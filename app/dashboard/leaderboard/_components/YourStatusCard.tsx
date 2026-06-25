import YourStatusLoadingState from './YourStatusLoadingState';
import YourStatusRankedState from './YourStatusRankedState';
import YourStatusUnrankedState from './YourStatusUnrankedState';
import type { LeaderboardTab, MyRankData } from '@/lib/leaderboard/leaderboardTypes';

/**
 * YourStatusCard — sticky "Your Status" card, always visible regardless
 * of which page the student is on. Single Responsibility: pick the
 * correct one of 3 mutually-exclusive states; each state's markup is
 * delegated to its own file.
 */
interface YourStatusCardProps {
  myRank: MyRankData | null;
  tab: LeaderboardTab;
  loading: boolean;
}

export default function YourStatusCard({ myRank, tab, loading }: YourStatusCardProps) {
  if (loading) return <YourStatusLoadingState />;
  if (myRank?.rank !== null && myRank?.rank !== undefined) {
    return <YourStatusRankedState myRank={myRank} tab={tab} />;
  }
  return <YourStatusUnrankedState tab={tab} />;
}
