import { AlertTriangle, Trash2 } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

/**
 * DangerZoneCard — the delete-account trigger card.
 * Single Responsibility: this one card only.
 */
export default function DangerZoneCard({ onDeleteClick }: { onDeleteClick: () => void }) {
  return (
    <GlowCard className="border-danger/20 hover:border-danger/30">
      <h3 className="text-sm font-bold text-danger mb-2 flex items-center gap-2">
        <AlertTriangle size={14} /> Danger Zone
      </h3>
      <p className="text-xs text-text-faint mb-3 leading-relaxed">
        Permanently delete your account. All data, enrollments, and progress will be wiped forever.
      </p>
      <button
        onClick={onDeleteClick}
        className="w-full py-2.5 rounded-lg border border-danger/30 text-danger text-xs font-medium hover:bg-danger/10 hover:border-danger/60 transition flex items-center justify-center gap-2"
      >
        <Trash2 size={13} /> Delete My Account
      </button>
    </GlowCard>
  );
}
