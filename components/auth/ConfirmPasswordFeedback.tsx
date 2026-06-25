import { CheckCircle2 } from 'lucide-react';

/**
 * ConfirmPasswordFeedback — the real-time "Passwords match" / "do not
 * match" message shown below the confirm-password field.
 * Single Responsibility: this one feedback message only.
 */
interface ConfirmPasswordFeedbackProps {
  password: string;
  confirmPassword: string;
}

export default function ConfirmPasswordFeedback({
  password,
  confirmPassword,
}: ConfirmPasswordFeedbackProps) {
  if (confirmPassword.length === 0) return null;

  const matches = confirmPassword === password;

  if (matches) {
    return (
      <p className="text-xs text-success mt-1 flex items-center gap-1">
        <CheckCircle2 size={11} /> Passwords match
      </p>
    );
  }

  return <p className="text-xs text-danger mt-1">Passwords do not match</p>;
}
