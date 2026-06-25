import Link from 'next/link';
import type React from 'react';

/**
 * AuthCardWrapper — the shared TITECX-logo-link + bordered card shell
 * used by every reset-password screen. Single Responsibility: this one
 * wrapper, reused instead of repeating the shell markup 5 times.
 */
export default function AuthCardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-950 text-text-secondary flex flex-col items-center justify-center px-4">
      <Link href="/" className="text-2xl font-extrabold text-text-primary mb-8 hover:text-brand-indigo-300 transition">
        TITECX
      </Link>
      <div className="w-full max-w-md bg-surface-900 rounded-2xl border border-brand-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.1)] p-8">
        {children}
      </div>
    </div>
  );
}
