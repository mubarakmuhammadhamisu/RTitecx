import {
  getPasswordStrength,
  PASSWORD_STRENGTH_BAR_COLORS,
  PASSWORD_STRENGTH_LABELS,
  PASSWORD_STRENGTH_TEXT_COLORS,
} from '@/lib/forms/getPasswordStrength';

/**
 * PasswordStrengthMeter — the 4-bar strength indicator shown below the
 * password field on registration. Single Responsibility: this one
 * meter only; strength calculation itself lives in getPasswordStrength.ts.
 */
interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= strength ? PASSWORD_STRENGTH_BAR_COLORS[strength] : 'bg-surface-700'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${PASSWORD_STRENGTH_TEXT_COLORS[strength]}`}>
        {PASSWORD_STRENGTH_LABELS[strength]}
      </p>
    </div>
  );
}
