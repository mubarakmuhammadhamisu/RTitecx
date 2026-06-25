import { audienceData } from './audienceData';

/**
 * AudienceSection — "Who TITECX Is For" grid.
 * Single Responsibility: rendering only — data lives in audienceData.ts.
 */
export default function AudienceSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20 border-t border-glass-border">
      <h2 className="text-2xl font-bold mb-8">Who TITECX Is For</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {audienceData.map((item) => (
          <div key={item} className="p-6 rounded-2xl bg-surface-900 border border-glass-border">
            <p className="text-text-secondary">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
