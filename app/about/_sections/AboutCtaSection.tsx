import Link from 'next/link';

/**
 * AboutCtaSection — closing CTA. Wording preserved exactly from the
 * original codebase.
 */
export default function AboutCtaSection() {
  return (
    <section className="py-24 text-center border-t border-glass-border">
      <h2 className="text-3xl font-bold">Start Learning With Confidence</h2>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/courses" className="px-6 py-3 rounded-2xl bg-white text-surface-900 font-semibold">
          Browse Courses
        </Link>
        <Link href="/register" className="px-6 py-3 rounded-2xl bg-brand-indigo-600 text-white font-semibold">
          Create Account
        </Link>
      </div>
    </section>
  );
}
