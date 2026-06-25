import { Zap, RefreshCw } from 'lucide-react';
import TermsAgreementCheckbox from './TermsAgreementCheckbox';
import PaymentErrorBanner from './PaymentErrorBanner';

/**
 * FreeCourseSection — the entire payment-section content when the
 * course price is "Free". Single Responsibility: this one section only.
 */
interface FreeCourseSectionProps {
  agreed: boolean;
  onToggleAgreed: () => void;
  paymentError: string;
  processing: boolean;
  onEnroll: () => void;
}

export default function FreeCourseSection({
  agreed,
  onToggleAgreed,
  paymentError,
  processing,
  onEnroll,
}: FreeCourseSectionProps) {
  return (
    <div className="rounded-2xl bg-surface-900 border border-success/30 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/20 border border-success/30 flex items-center justify-center">
          <Zap size={18} className="text-success" />
        </div>
        <div>
          <p className="font-bold text-text-primary">This course is completely free</p>
          <p className="text-text-muted text-xs">No payment information required.</p>
        </div>
      </div>

      <div className="mt-2">
        <TermsAgreementCheckbox agreed={agreed} onToggle={onToggleAgreed} />
      </div>

      {paymentError && <PaymentErrorBanner message={paymentError} />}

      <button
        onClick={onEnroll}
        disabled={!agreed || processing}
        className="w-full py-3.5 rounded-xl bg-linear-to-r from-success to-teal-500 hover:opacity-90 text-white font-bold transition shadow-lg shadow-success/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} />}
        {processing ? 'Enrolling...' : 'Enroll for Free'}
      </button>
    </div>
  );
}
