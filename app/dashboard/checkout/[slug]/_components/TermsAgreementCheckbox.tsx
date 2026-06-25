import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

/**
 * TermsAgreementCheckbox — "I agree to the Terms..." checkbox, reused
 * by both the free-course and paid-course sections.
 * Single Responsibility: this one checkbox only.
 */
interface TermsAgreementCheckboxProps {
  agreed: boolean;
  onToggle: () => void;
}

export default function TermsAgreementCheckbox({ agreed, onToggle }: TermsAgreementCheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        onClick={onToggle}
        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition shrink-0 cursor-pointer ${
          agreed ? 'bg-brand-indigo-600 border-brand-indigo-500' : 'border-surface-600 group-hover:border-brand-indigo-500/50'
        }`}
      >
        {agreed && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <span className="text-sm text-text-muted leading-snug">
        I agree to the{' '}
        <Link href="/terms" className="text-brand-indigo-400 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-brand-indigo-400 hover:underline">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}
