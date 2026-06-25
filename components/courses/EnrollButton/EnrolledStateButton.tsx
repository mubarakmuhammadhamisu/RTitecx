import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

/**
 * EnrolledStateButton — the button shown when the student is already
 * enrolled ("Go to Course"). Single Responsibility: this one visual
 * state only.
 */
interface EnrolledStateButtonProps {
  isNavigating: boolean;
  onClick: () => void;
}

export default function EnrolledStateButton({ isNavigating, onClick }: EnrolledStateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isNavigating}
      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-success hover:opacity-90 text-white font-semibold transition shadow-lg shadow-success/20 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isNavigating ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
      Already Enrolled — Go to Course
      {!isNavigating && <ArrowRight size={16} />}
    </button>
  );
}
