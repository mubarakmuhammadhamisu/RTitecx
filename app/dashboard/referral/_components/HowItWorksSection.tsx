/**
 * HowItWorksSection — static 3-step explainer. Wording preserved
 * exactly from the original codebase. Single Responsibility: this one
 * section only.
 */
const STEPS = [
  { step: '1', title: 'Share Your Link', desc: 'Copy your unique referral link and send it to friends.' },
  { step: '2', title: 'They Sign Up & Buy', desc: 'Your friend signs up and purchases any course within 30 days.' },
  {
    step: '3',
    title: 'You Earn Points',
    desc: 'Instantly receive 10% of their purchase as spendable points (₦1 each).',
  },
];

export default function HowItWorksSection() {
  return (
    <div className="rounded-2xl bg-linear-to-br from-surface-900/40 to-surface-800/20 border border-brand-indigo-500/10 p-6 space-y-4">
      <h3 className="font-bold text-text-secondary text-sm uppercase tracking-widest">How It Works</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {STEPS.map(({ step, title, desc }) => (
          <div key={step} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-brand-indigo-600 flex items-center justify-center text-xs font-black text-white shrink-0 mt-0.5">
              {step}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{title}</p>
              <p className="text-xs text-text-faint mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
