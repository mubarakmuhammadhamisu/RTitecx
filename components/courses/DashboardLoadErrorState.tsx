'use client';

import { RefreshCw, WifiOff } from 'lucide-react';

/**
 * DashboardLoadErrorState — shown when a dashboard data fetch fails.
 * Single Responsibility: this one error state. Reused by any dashboard
 * page that needs a consistent "could not load" fallback.
 */
export default function DashboardLoadErrorState() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
        <WifiOff size={28} className="text-danger" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Could not load your dashboard</h2>
        <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
          There was a problem connecting to the server. Your data is safe — this is usually a
          temporary issue.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white font-semibold text-sm transition"
      >
        <RefreshCw size={16} />
        Reload Page
      </button>
    </div>
  );
}
