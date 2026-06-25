import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

/**
 * CheckoutSuccessScreen — "You're enrolled!" confirmation.
 * Single Responsibility: this one screen only.
 */
export default function CheckoutSuccessScreen({ courseTitle, courseSlug }: { courseTitle: string; courseSlug: string }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-linear-to-br from-success to-teal-400 flex items-center justify-center shadow-2xl shadow-success/40">
          <CheckCircle2 size={44} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary mb-2">You&apos;re enrolled!</h1>
        <p className="text-text-muted mb-2">
          Welcome to <span className="text-brand-indigo-300 font-semibold">{courseTitle}</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href={`/dashboard/courses/${courseSlug}`}
            className="px-6 py-3 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-semibold transition shadow-lg shadow-brand-indigo-500/20"
          >
            Start Learning →
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-surface-800 border border-brand-indigo-500/20 hover:border-brand-indigo-500/50 text-text-primary font-medium transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
