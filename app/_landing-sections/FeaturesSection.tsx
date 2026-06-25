import { featuresData } from './featuresData';

/**
 * FeaturesSection — the "Why TITECX" three-card feature grid.
 * Single Responsibility: rendering only — data lives in featuresData.ts.
 */
export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-6">
      {featuresData.map((f) => (
        <div key={f.title} className="p-6 rounded-2xl bg-surface-900 border border-glass-border">
          <h3 className="font-semibold">{f.title}</h3>
          <p className="mt-2 text-sm text-text-muted">{f.description}</p>
        </div>
      ))}
    </section>
  );
}
