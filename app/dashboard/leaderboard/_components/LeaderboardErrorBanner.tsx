/**
 * LeaderboardErrorBanner — fetch error with a retry link.
 * Single Responsibility: this one banner only.
 */
interface LeaderboardErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export default function LeaderboardErrorBanner({ message, onRetry }: LeaderboardErrorBannerProps) {
  return (
    <div className="px-5 py-4 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onRetry} className="text-xs underline">
        Retry
      </button>
    </div>
  );
}
