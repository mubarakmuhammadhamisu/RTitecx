import { Zap, BookOpen } from 'lucide-react';
import type { LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * LeaderboardTabToggle — Credits / Learning tab switcher.
 * Single Responsibility: this one toggle only.
 */
interface LeaderboardTabToggleProps {
  activeTab: LeaderboardTab;
  onSwitch: (tab: LeaderboardTab) => void;
}

const TABS: LeaderboardTab[] = ['credits', 'learning'];

export default function LeaderboardTabToggle({ activeTab, onSwitch }: LeaderboardTabToggleProps) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-surface-900/80 border border-brand-indigo-500/20 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onSwitch(tab)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === tab ? 'bg-brand-indigo-600 text-white shadow-md shadow-brand-indigo-500/20' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          {tab === 'credits' ? (
            <>
              <Zap size={13} className={activeTab === tab ? 'text-warning' : 'text-text-faint'} /> Credits
            </>
          ) : (
            <>
              <BookOpen size={13} className={activeTab === tab ? 'text-success' : 'text-text-faint'} /> Learning
            </>
          )}
        </button>
      ))}
    </div>
  );
}
