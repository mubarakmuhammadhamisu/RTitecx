import React from 'react';

/**
 * Button — single shared button primitive for the whole app.
 *
 * Single Responsibility: map a `variant` prop to the correct token-based
 * styling. No component outside this file should write its own button
 * gradient/color classes — import and use this instead.
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-cta text-white shadow-lg shadow-brand-indigo-500/30 hover:opacity-90',
  secondary:
    'bg-surface-800 text-text-primary border border-surface-600 hover:border-brand-indigo-500/50',
  danger:
    'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-800',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
