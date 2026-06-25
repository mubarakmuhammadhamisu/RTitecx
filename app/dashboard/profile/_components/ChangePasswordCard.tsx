import { Lock, Eye, EyeOff } from 'lucide-react';
import type { PasswordFormFields } from '@/lib/profile/useChangePasswordForm';

/**
 * ChangePasswordCard — current/new/confirm password fields with
 * show/hide toggles and a length-based strength bar on the new
 * password field.
 *
 * Single Responsibility: this one card only. Note: this uses a
 * simpler length-threshold strength indicator than the registration
 * page's PasswordStrengthMeter (preserved from the original codebase's
 * distinct implementation here) rather than sharing that component,
 * since the visual treatment (4 thin bars filled by length) differs
 * from the registration meter's percentage-based fill.
 */
interface PasswordFieldConfig {
  label: string;
  key: keyof PasswordFormFields;
  show: boolean;
  toggle: () => void;
  placeholder: string;
}

interface ChangePasswordCardProps {
  pwForm: PasswordFormFields;
  onFieldChange: (key: keyof PasswordFormFields, value: string) => void;
  pwError: string;
  pwSuccess: boolean;
  pwLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  visibility: { current: boolean; new: boolean; confirm: boolean };
  onToggleVisibility: (key: keyof PasswordFormFields) => void;
}

export default function ChangePasswordCard({
  pwForm,
  onFieldChange,
  pwError,
  pwSuccess,
  pwLoading,
  onSubmit,
  visibility,
  onToggleVisibility,
}: ChangePasswordCardProps) {
  const fields: PasswordFieldConfig[] = [
    {
      label: 'Current Password',
      key: 'current',
      show: visibility.current,
      toggle: () => onToggleVisibility('current'),
      placeholder: 'Your current password',
    },
    {
      label: 'New Password',
      key: 'new',
      show: visibility.new,
      toggle: () => onToggleVisibility('new'),
      placeholder: 'At least 8 characters',
    },
    {
      label: 'Confirm New Password',
      key: 'confirm',
      show: visibility.confirm,
      toggle: () => onToggleVisibility('confirm'),
      placeholder: 'Re-enter your new password',
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-brand-indigo-500/30">
      <div className="flex items-center gap-2 mb-5">
        <Lock size={18} className="text-brand-indigo-400" />
        <h2 className="text-lg font-bold text-text-primary">Change Password</h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map(({ label, key, show, toggle, placeholder }) => (
          <div key={key}>
            <label className="text-xs text-text-muted font-medium">{label}</label>
            <div className="relative mt-1.5">
              <input
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                value={pwForm[key]}
                onChange={(e) => onFieldChange(key, e.target.value)}
                className={`w-full px-4 py-3 pr-10 rounded-lg bg-surface-800 border text-text-primary text-sm placeholder-text-faint focus:outline-none transition ${
                  key === 'confirm' && pwForm.confirm && pwForm.new !== pwForm.confirm
                    ? 'border-danger/50'
                    : 'border-brand-indigo-500/20 focus:border-brand-indigo-500/50'
                }`}
              />
              <button
                type="button"
                onClick={toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {key === 'new' && pwForm.new && (
              <div className="mt-1.5 flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      pwForm.new.length >= i * 3
                        ? i <= 1
                          ? 'bg-danger'
                          : i <= 2
                            ? 'bg-warning'
                            : i <= 3
                              ? 'bg-info'
                              : 'bg-success'
                        : 'bg-surface-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {pwError && (
          <p className="text-sm text-danger bg-danger/10 border border-danger/20 px-4 py-2.5 rounded-lg">{pwError}</p>
        )}
        {pwSuccess && (
          <p className="text-sm text-success bg-success/10 border border-success/20 px-4 py-2.5 rounded-lg">
            ✓ Password updated successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={pwLoading}
          className="w-full py-3 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60"
        >
          {pwLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
