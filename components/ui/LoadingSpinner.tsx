import React from 'react';

/**
 * LoadingSpinner — full-screen branded loading state.
 *
 * Single Responsibility: render the pulse-gradient loading indicator
 * used by AuthGuard and any other route that needs a full-page loading
 * state. Pass `message` to override the default copy.
 */
interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-cta animate-pulse" />
        <p className="text-text-muted text-sm">{message}</p>
      </div>
    </div>
  );
}
