'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCopyReferralLink } from '@/lib/referral/useCopyReferralLink';
import { useReferralDashboardData } from '@/lib/referral/useReferralDashboardData';
import ReferralStatsGrid from './_components/ReferralStatsGrid';
import ReferralLinkCard from './_components/ReferralLinkCard';
import ReferralErrorBanner from './_components/ReferralErrorBanner';
import ReferralHistorySection from './_components/ReferralHistorySection';
import TransactionHistorySection from './_components/TransactionHistorySection';
import HowItWorksSection from './_components/HowItWorksSection';

/**
 * /dashboard/referral — referral link, points stats, referral history,
 * transaction ledger, how-it-works. Composes section components; all
 * data/state logic is delegated to lib/referral/ hooks.
 */
export default function ReferralPage() {
  const { user } = useAuth();
  const { referralLink, copied, copyLink } = useCopyReferralLink();
  const { data, loading, error, refetch } = useReferralDashboardData();
  const [txExpanded, setTxExpanded] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-text-muted">Please log in to view your referral dashboard.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary">Referral &amp; Points</h1>
          <p className="text-text-muted text-sm mt-1">Share your link, earn commission on every purchase.</p>
        </div>
        <Link
          href="/dashboard/leaderboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-900 border border-brand-indigo-500/20 text-sm text-brand-indigo-300 hover:border-brand-indigo-500/50 transition self-start sm:self-auto"
        >
          <Trophy size={14} /> Leaderboard <ExternalLink size={12} />
        </Link>
      </div>

      <ReferralStatsGrid
        user={user}
        totalReferrals={data?.totalReferrals ?? 0}
        convertedReferrals={data?.convertedReferrals ?? 0}
        loading={loading}
      />

      <ReferralLinkCard referralLink={referralLink} copied={copied} onCopy={copyLink} />

      {error && <ReferralErrorBanner message={error} onRetry={refetch} />}

      <ReferralHistorySection referrals={data?.referrals ?? []} loading={loading} />

      <TransactionHistorySection
        transactions={data?.transactions ?? []}
        loading={loading}
        expanded={txExpanded}
        onToggle={() => setTxExpanded((v) => !v)}
      />

      <HowItWorksSection />
    </div>
  );
}
