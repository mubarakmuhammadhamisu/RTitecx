import Link from 'next/link';

/**
 * FooterLegalLinks — Terms/Privacy links column.
 * Single Responsibility: legal navigation links only.
 */
export default function FooterLegalLinks() {
  return (
    <div>
      <h4 className="text-text-primary font-semibold mb-4">Legal</h4>
      <ul className="space-y-2">
        <li>
          <Link href="/terms" className="hover:text-text-primary transition-colors">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:text-text-primary transition-colors">
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
