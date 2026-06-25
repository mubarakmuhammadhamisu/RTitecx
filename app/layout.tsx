import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CoursesProvider } from '@/context/CoursesContext';
import { ProgressToastProvider } from '@/context/ProgressToastContext';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

// metadataBase MUST point at the real deployed URL — required for
// OpenGraph/Twitter Card previews (e.g. WhatsApp link previews) to
// resolve images correctly. Falls back to localhost only for local dev.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TITECX FORGE',
    template: '%s | TITECX FORGE',
  },
  description: 'High-quality courses built for real-world skills.',
  openGraph: {
    siteName: 'TITECX FORGE',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProgressToastProvider>
          <AuthProvider>
            <CoursesProvider>{children}</CoursesProvider>
          </AuthProvider>
        </ProgressToastProvider>
      </body>
    </html>
  );
}
