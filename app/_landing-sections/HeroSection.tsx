import Link from 'next/link';
import Image from 'next/image';

/**
 * HeroSection — landing page hero. Wording preserved exactly from the
 * original codebase per brand-fidelity requirement; only styling now
 * references design tokens instead of hardcoded gray/indigo classes.
 */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12 lg:pt-14 lg:pb-24">
      <div className="absolute inset-0 bg-linear-to-br from-brand-indigo-600/20 via-brand-purple-600/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Learn Skills That <span className="text-brand-indigo-400">Actually Matter</span>
          </h1>
          <p className="mt-6 text-xl text-text-secondary">
            High-quality courses built for real-world skills. Join our growing community.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/courses"
              className="px-8 py-4 rounded-2xl bg-white text-surface-900 font-bold hover:bg-surface-200 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 rounded-2xl bg-brand-indigo-600 text-white font-bold hover:bg-brand-indigo-700 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-glass-border">
            <Image
              src="/brainAndshelld1.png"
              alt="Learning environment"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface-900/90 backdrop-blur p-4 rounded-2xl border border-glass-border hidden md:block">
            <p className="text-sm font-semibold">Course: AI Engineering</p>
          </div>
        </div>
      </div>
    </section>
  );
}
