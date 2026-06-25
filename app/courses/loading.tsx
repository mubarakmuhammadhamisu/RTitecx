/**
 * app/courses/loading.tsx
 * ────────────────────────────────────────────────────────────────────────
 * Next.js renders this automatically while courses/page.tsx is fetching.
 * Without it, the page shows a blank screen for the duration of the
 * Supabase query. Skeleton structure mirrors the real page layout so
 * the loading → content transition feels smooth rather than jarring.
 */
export default function CoursesLoading() {
  return (
    <main className="min-h-screen bg-surface-950 text-text-secondary">
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4 flex flex-col items-center">
          <div className="h-12 bg-surface-800 rounded-xl w-72" />
          <div className="h-4 bg-surface-800 rounded-lg w-96 max-w-full" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-surface-900 border border-glass-border overflow-hidden">
              <div className="h-44 bg-surface-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-surface-800 rounded-lg w-3/4" />
                <div className="h-3 bg-surface-800 rounded w-full" />
                <div className="h-3 bg-surface-800 rounded w-2/3" />
                <div className="flex justify-between pt-1">
                  <div className="h-3 bg-surface-800 rounded w-20" />
                  <div className="h-3 bg-surface-800 rounded w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
