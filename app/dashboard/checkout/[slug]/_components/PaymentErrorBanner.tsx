import { AlertCircle } from 'lucide-react';

/**
 * PaymentErrorBanner — inline error shown below the Pay/Enroll button.
 * Replaces native alert() (blocking, unstyled, looks like a scam popup
 * on Android). Single Responsibility: this one banner only.
 */
export default function PaymentErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
      <AlertCircle size={15} className="shrink-0 mt-0.5" />
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}
