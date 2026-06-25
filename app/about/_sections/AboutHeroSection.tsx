/**
 * AboutHeroSection — wording preserved exactly from the original codebase.
 */
export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-brand-indigo-600/20 via-brand-purple-600/10 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          About <span className="text-brand-indigo-400">TITECX</span>
        </h1>
        <p className="mt-6 text-text-secondary text-lg">
          A learning platform built to help people gain real, practical skills that actually
          matter.
        </p>
      </div>
    </section>
  );
}
