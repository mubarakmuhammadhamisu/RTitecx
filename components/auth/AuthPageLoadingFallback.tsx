/**
 * AuthPageLoadingFallback — the Suspense fallback shown briefly while
 * an auth page reads useSearchParams() (required because
 * useSearchParams forces a client-side-only render boundary in the App
 * Router). Single Responsibility: this one fallback UI.
 */
export default function AuthPageLoadingFallback() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-cta animate-pulse" />
        <p className="text-text-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}
