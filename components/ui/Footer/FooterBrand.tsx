/**
 * FooterBrand — the brand name + one-line blurb column.
 * Single Responsibility: brand identity copy only.
 */
export default function FooterBrand() {
  return (
    <div className="col-span-2">
      <h3 className="text-text-primary font-bold text-xl mb-4">TITECX</h3>
      <p className="max-w-xs">
        Empowering learners with real-world skills through expert-led courses.
      </p>
    </div>
  );
}
