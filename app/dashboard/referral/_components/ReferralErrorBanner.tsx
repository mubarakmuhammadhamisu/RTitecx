import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * ReferralErrorBanner — shown when /api/referral/dashboard fails.
 * Single Responsibility: this one banner only.
 */
export default function ReferralErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-sm">
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
      <button onClick={onRetry} className="ml-auto flex items-center gap-1 text-xs hover:opacity-80 transition">
        <RefreshCw size={12} /> Retry
      </button>
    </div>
  );
}
