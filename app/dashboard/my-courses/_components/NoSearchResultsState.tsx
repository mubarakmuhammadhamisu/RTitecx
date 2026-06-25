import { BookOpen } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

/**
 * NoSearchResultsState — shown when search/filter return no enrolled
 * courses. Single Responsibility: this one empty state only.
 */
export default function NoSearchResultsState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <GlowCard className="text-center py-14">
      <BookOpen className="mx-auto mb-4 text-text-faint" size={44} />
      <h3 className="text-lg font-semibold text-text-secondary mb-2">No courses found</h3>
      <p className="text-text-faint text-sm">
        {hasSearch ? 'Try a different search term.' : 'Browse the catalogue below to enroll.'}
      </p>
    </GlowCard>
  );
}
