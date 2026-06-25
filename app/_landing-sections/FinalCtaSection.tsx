import Link from 'next/link';

/**
 * FinalCtaSection — bottom-of-page CTA banner. Wording preserved
 * exactly from the original codebase per brand-fidelity requirement.
 */
export default function FinalCtaSection() {
  return (
    <section className="py-24 text-center">
      <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/register" className="px-6 py-3 rounded-2xl bg-white text-surface-900 font-semibold">
          Create Account
        </Link>
        <Link href="/courses" className="px-6 py-3 rounded-2xl border border-glass-border">
          Browse Courses
        </Link>
      </div>
    </section>
  );
}
