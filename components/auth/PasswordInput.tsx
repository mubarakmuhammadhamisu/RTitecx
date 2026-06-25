'use client';

import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * PasswordInput — password field with a show/hide toggle.
 * Single Responsibility: this one form field, reused across
 * login/register/reset-password instead of duplicating the toggle
 * logic three times.
 */
interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { className = '', ...rest },
  ref
) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPw ? 'text' : 'password'}
        placeholder="••••••••"
        className={`w-full px-4 py-3 pr-10 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/60 transition ${className}`}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShowPw((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-secondary transition"
        aria-label={showPw ? 'Hide password' : 'Show password'}
      >
        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
});

export default PasswordInput;
