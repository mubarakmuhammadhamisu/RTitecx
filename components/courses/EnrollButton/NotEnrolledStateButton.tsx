import { ShoppingCart, Zap, Loader2 } from 'lucide-react';

/**
 * NotEnrolledStateButton — the button shown when the student is not yet
 * enrolled ("Enroll Now" / "Enroll for Free"). Single Responsibility:
 * this one visual state only.
 */
interface NotEnrolledStateButtonProps {
  isNavigating: boolean;
  isFree: boolean;
  onClick: () => void;
}

export default function NotEnrolledStateButton({
  isNavigating,
  isFree,
  onClick,
}: NotEnrolledStateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isNavigating}
      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white font-semibold transition shadow-lg shadow-brand-indigo-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isNavigating ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isFree ? (
        <Zap size={16} />
      ) : (
        <ShoppingCart size={16} />
      )}
      {isNavigating ? 'Loading...' : isFree ? 'Enroll for Free' : 'Enroll Now'}
    </button>
  );
}
