import { Lock, AlertCircle } from 'lucide-react';

const PAYMENT_METHODS = ['Credit / Debit Card', 'Bank Transfer', 'USSD', 'Mobile Money'];

/**
 * SecurePaymentInfoCard — "Secure Payment via Paystack" explainer +
 * payment method icons + script-load-error banner.
 * Single Responsibility: this one card only.
 */
export default function SecurePaymentInfoCard({ paystackLoadError }: { paystackLoadError: boolean }) {
  return (
    <>
      <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-5 space-y-4">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <Lock size={15} className="text-brand-indigo-400" />
          Secure Payment via Paystack
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Clicking &quot;Pay Now&quot; opens a secure Paystack popup. Your card details are entered directly on
          Paystack&apos;s encrypted form — we never see or store your card information.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method}
              className="flex items-center gap-2 text-xs text-text-secondary bg-surface-800/60 rounded-lg px-3 py-2 border border-brand-indigo-500/10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo-400" />
              {method}
            </div>
          ))}
        </div>
      </div>

      {paystackLoadError && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-warning/10 border border-warning/20 text-warning text-sm">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>
            Payment system failed to load. This is often caused by an ad blocker. Please disable your ad blocker
            or try a different browser.
          </span>
        </div>
      )}
    </>
  );
}
