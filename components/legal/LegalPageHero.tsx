/**
 * LegalPageHero — the gradient hero banner shared by /privacy and /terms.
 * Single Responsibility: this one hero banner only.
 */
interface LegalPageHeroProps {
  titlePrefix: string;
  titleHighlight: string;
  lastUpdated: string;
}

export default function LegalPageHero({ titlePrefix, titleHighlight, lastUpdated }: LegalPageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-brand-indigo-600/20 via-brand-purple-600/10 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          {titlePrefix} <span className="text-brand-indigo-400">{titleHighlight}</span>
        </h1>
        <p className="mt-4 text-text-muted">Last Updated: {lastUpdated}</p>
      </div>
    </section>
  );
}
