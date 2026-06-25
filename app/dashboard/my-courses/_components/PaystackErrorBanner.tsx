import { AlertCircle } from 'lucide-react';

/**
 * PaystackErrorBanner — shown when redirected back with a
 * ?paystack_error= code. Single Responsibility: this one banner only.
 */
interface PaystackErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function PaystackErrorBanner({ message, onDismiss }: PaystackErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
      <AlertCircle size={16} className="text-danger shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold mb-0.5">Payment issue</p>
        <p>{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-danger/60 hover:text-danger transition text-lg leading-none shrink-0"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
