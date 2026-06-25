import { ShieldCheck, RefreshCw, Zap, Lock } from 'lucide-react';
import TermsAgreementCheckbox from './TermsAgreementCheckbox';
import PaymentErrorBanner from './PaymentErrorBanner';

/**
 * PayButtonCard — terms checkbox + inline error + the Pay/Enroll button
 * (switches between "free via points/coupon" and real Paystack payment
 * based on whether totalKobo is 0) + the SSL trust line.
 *
 * Single Responsibility: this one card only.
 */
interface PayButtonCardProps {
  agreed: boolean;
  onToggleAgreed: () => void;
  paymentError: string;
  totalKobo: number;
  total: number;
  processing: boolean;
  paystackReady: boolean;
  selectedPlan: 'standard' | 'premium';
  onZeroAmountEnroll: () => void;
  onPaystackPay: () => void;
}

export default function PayButtonCard({
  agreed,
  onToggleAgreed,
  paymentError,
  totalKobo,
  total,
  processing,
  paystackReady,
  selectedPlan,
  onZeroAmountEnroll,
  onPaystackPay,
}: PayButtonCardProps) {
  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-5 space-y-4">
      <TermsAgreementCheckbox agreed={agreed} onToggle={onToggleAgreed} />

      {paymentError && <PaymentErrorBanner message={paymentError} />}

      {totalKobo === 0 ? (
        <button
          onClick={onZeroAmountEnroll}
          disabled={!agreed || processing}
          className="w-full py-4 rounded-xl bg-linear-to-r from-success to-teal-600 hover:opacity-90 text-white font-bold text-base transition shadow-lg shadow-success/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {processing ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
          {processing ? 'Enrolling...' : 'Complete Enrollment — Free with Points'}
        </button>
      ) : (
        <button
          onClick={onPaystackPay}
          disabled={!agreed || !paystackReady || processing}
          className="w-full py-4 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-bold text-base transition shadow-lg shadow-brand-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          {processing
            ? 'Processing...'
            : !paystackReady
              ? 'Loading payment system...'
              : selectedPlan === 'premium'
                ? `Pay ₦${total.toLocaleString()} — Premium Plan 🎁`
                : `Pay ₦${total.toLocaleString()} — Secure Checkout`}
        </button>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-text-faint">
        <ShieldCheck size={13} className="text-brand-indigo-400" />
        Powered by Paystack · 256-bit SSL encryption
      </div>
    </div>
  );
}
