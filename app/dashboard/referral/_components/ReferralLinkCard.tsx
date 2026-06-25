import { Users, Copy, CheckCircle2, Clock } from 'lucide-react';

/**
 * ReferralLinkCard — the "Your Referral Link" card with copy button.
 * Single Responsibility: this one card only. Copy logic is owned by
 * useCopyReferralLink in the parent page.
 */
interface ReferralLinkCardProps {
  referralLink: string;
  copied: boolean;
  onCopy: () => void;
}

export default function ReferralLinkCard({ referralLink, copied, onCopy }: ReferralLinkCardProps) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-surface-900/80 to-surface-800/40 border border-brand-indigo-500/20 p-6 shadow-[0_0_40px_rgba(99,102,241,0.08)] space-y-4">
      <div>
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <Users size={16} className="text-brand-indigo-400" /> Your Referral Link
        </h2>
        <p className="text-sm text-text-muted mt-1">
          Anyone who signs up via your link and purchases a course within 30 days earns you
          <span className="text-brand-indigo-300 font-semibold"> 10% commission in points</span>.
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex-1 px-4 py-3 rounded-xl bg-surface-800 border border-brand-indigo-500/20 text-sm text-brand-indigo-300 font-mono truncate select-all">
          {referralLink || 'Loading...'}
        </div>
        <button
          onClick={onCopy}
          disabled={!referralLink}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition shrink-0 ${
            copied ? 'bg-success text-white' : 'bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white'
          }`}
        >
          {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-brand-indigo-500/10 border border-brand-indigo-500/20 text-xs text-brand-indigo-300">
        <Clock size={13} className="shrink-0 mt-0.5" />
        Commission is earned when your referee purchases any course within 30 days of signup.
        Points are added to your balance instantly after their payment clears.
      </div>
    </div>
  );
}
