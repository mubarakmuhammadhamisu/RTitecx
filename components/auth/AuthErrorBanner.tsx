import { AlertCircle } from 'lucide-react';

/**
 * AuthErrorBanner — the red inline error banner shown under auth forms.
 * Single Responsibility: this one banner, reused across login/register.
 */
export default function AuthErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
      <AlertCircle size={15} className="shrink-0" />
      {message}
    </div>
  );
}
