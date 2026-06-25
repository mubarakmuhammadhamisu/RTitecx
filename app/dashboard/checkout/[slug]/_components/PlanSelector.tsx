import { CheckCircle2, Clock, Award } from 'lucide-react';
import type { CourseSchema } from '@/lib/courses/courseTypes';

const STANDARD_PERKS = ['Full course access', 'Digital certificate', 'Lifetime access'];
const DEFAULT_PREMIUM_PERKS = [
  'Everything in Standard',
  'Premium certificate design',
  'Printed physical certificate',
  'Mystery box delivered to you',
  'Free delivery in supported states',
];

/**
 * PlanSelector — Standard vs Premium plan cards, only shown when the
 * course has a premium tier. Single Responsibility: this one selector
 * + its deadline info banner only.
 */
interface PlanSelectorProps {
  course: CourseSchema;
  selectedPlan: 'standard' | 'premium';
  numericStandardPrice: number;
  numericPremiumPrice: number;
  onSelectPlan: (plan: 'standard' | 'premium') => void;
}

export default function PlanSelector({
  course,
  selectedPlan,
  numericStandardPrice,
  numericPremiumPrice,
  onSelectPlan,
}: PlanSelectorProps) {
  const premiumPerks = course.premiumPerks.length > 0 ? course.premiumPerks : DEFAULT_PREMIUM_PERKS;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-text-primary">Choose Your Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelectPlan('standard')}
          className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
            selectedPlan === 'standard'
              ? 'border-brand-indigo-500 bg-brand-indigo-500/10'
              : 'border-surface-700 bg-surface-900 hover:border-surface-600'
          }`}
        >
          {selectedPlan === 'standard' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-indigo-500 flex items-center justify-center">
              <CheckCircle2 size={13} className="text-white" />
            </div>
          )}
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Standard</p>
          <p className="text-2xl font-extrabold text-text-primary mb-3">₦{numericStandardPrice.toLocaleString()}</p>
          <div className="space-y-1.5">
            {STANDARD_PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-xs text-text-secondary">
                <CheckCircle2 size={12} className="text-brand-indigo-400 shrink-0" />
                {perk}
              </div>
            ))}
          </div>
        </button>

        <button
          onClick={() => onSelectPlan('premium')}
          className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
            selectedPlan === 'premium'
              ? 'border-brand-pink-500 bg-brand-pink-500/10 shadow-lg shadow-brand-pink-500/15'
              : 'border-surface-700 bg-surface-900 hover:border-brand-pink-500/50'
          }`}
        >
          <div className="absolute -top-3 left-4">
            <span className="bg-linear-to-r from-brand-pink-500 to-brand-pink-400 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-md">
              🎁 MYSTERY BOX
            </span>
          </div>
          {selectedPlan === 'premium' && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-pink-500 flex items-center justify-center">
              <CheckCircle2 size={13} className="text-white" />
            </div>
          )}
          <p className="text-xs font-semibold text-brand-pink-400 uppercase tracking-wide mb-1 mt-1">Premium</p>
          <p className="text-2xl font-extrabold text-text-primary mb-1">₦{numericPremiumPrice.toLocaleString()}</p>
          <p className="text-xs text-brand-pink-300 mb-3 flex items-center gap-1">
            <Clock size={11} />
            Complete within {course.premiumDeadlineDays} days
          </p>
          <div className="space-y-1.5">
            {premiumPerks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-xs text-text-secondary">
                <CheckCircle2 size={12} className="text-brand-pink-400 shrink-0" />
                {perk}
              </div>
            ))}
          </div>
        </button>
      </div>

      {selectedPlan === 'premium' && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-brand-pink-500/10 border border-brand-pink-500/20">
          <Award size={16} className="text-brand-pink-400 shrink-0 mt-0.5" />
          <p className="text-xs text-brand-pink-200 leading-relaxed">
            Complete the course within <span className="font-bold">{course.premiumDeadlineDays} days</span> of
            purchase to unlock your mystery box and printed certificate. If you don&apos;t finish in time, you
            keep the premium certificate design but lose the physical rewards.
          </p>
        </div>
      )}
    </div>
  );
}
