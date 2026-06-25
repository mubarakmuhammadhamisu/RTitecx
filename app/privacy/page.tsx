import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';
import LegalPageHero from '@/components/legal/LegalPageHero';
import LegalSection from '@/components/legal/LegalSection';

/**
 * /privacy — Privacy Policy. Content preserved EXACTLY (word-for-word,
 * including the NDPR compliance section's specific legal language) from
 * the original codebase per brand/legal-fidelity requirement.
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface-950 text-text-secondary">
      <Navbar />

      <LegalPageHero titlePrefix="Privacy" titleHighlight="Policy" lastUpdated="January 22, 2026" />

      <section className="max-w-4xl mx-auto px-4 pb-32 space-y-10">
        <LegalSection title="1. Information We Collect">
          We collect information you provide directly when creating an account — your name,
          email address, and optionally your profile photo, phone number, location, and bio. We
          also collect course progress data and payment transaction references processed through
          Paystack.
        </LegalSection>

        <LegalSection title="2. How We Use Your Information">
          We use your information to provide and improve the TITECX platform, process course
          enrollments, track your learning progress, send account-related communications, and
          personalise your experience. We do not sell your personal data to third parties.
        </LegalSection>

        <LegalSection title="3. Payment Data">
          TITECX does not store your card details. All payments are handled by Paystack, a
          PCI-DSS compliant payment processor. We only store a payment reference ID to confirm
          your enrollment. Please review Paystack&apos;s privacy policy for details on how they
          handle payment data.
        </LegalSection>

        <LegalSection title="4. Data Storage and Security">
          Your data is stored securely using Supabase infrastructure hosted on cloud servers. We
          apply industry-standard security practices including encrypted connections (HTTPS),
          row-level database security, and access controls. However, no transmission over the
          internet is 100% secure.
        </LegalSection>

        <LegalSection title="5. Cookies and Analytics">
          TITECX uses authentication cookies to keep you logged in across sessions. We may use
          anonymised analytics to understand how users interact with the platform. These do not
          identify you personally.
        </LegalSection>

        <LegalSection title="6. Your Rights">
          You may request access to, correction of, or deletion of your personal data at any time
          by using the &quot;Delete Account&quot; feature in your profile settings, or by
          contacting our support team. Account deletion removes your profile, enrollments, and
          progress data permanently.
        </LegalSection>

        <LegalSection title="7. Data Retention">
          We retain your personal data for as long as your account is active. Upon account
          deletion, personal data is removed within 30 days. Payment records may be retained for
          up to 7 years as required by Nigerian financial regulations.
        </LegalSection>

        <LegalSection title="8. NDPR Compliance (Nigeria Data Protection Regulation)">
          TITECX is fully committed to compliance with the Nigeria Data Protection Regulation
          (NDPR) issued by the National Information Technology Development Agency (NITDA). We
          process your personal data in accordance with the following principles:{' '}
          <br />
          <br />
          <strong className="text-text-primary">Lawful Basis:</strong> We collect and process
          your data only where we have a lawful basis to do so — specifically, to perform the
          contract of service (providing courses you have enrolled in) and to comply with our
          legal obligations under Nigerian law.{' '}
          <br />
          <br />
          <strong className="text-text-primary">Purpose Limitation:</strong> Your data is
          collected solely for educational purposes — to create and manage your account, process
          course enrollments, track your learning progress, issue certificates of completion, and
          communicate service-related updates. We do not use your data for unrelated advertising
          or sell it to any third party.{' '}
          <br />
          <br />
          <strong className="text-text-primary">Data Storage:</strong> All personal data is
          stored securely via Supabase, a cloud database platform with enterprise-grade security.
          Data is encrypted at rest and in transit using industry-standard TLS/SSL protocols.
          Row-Level Security (RLS) ensures that each user can only access their own data.{' '}
          <br />
          <br />
          <strong className="text-text-primary">Data Subject Rights:</strong> Under the NDPR, you
          have the right to: access a copy of your personal data; request correction of
          inaccurate data; withdraw consent to data processing; and request deletion of your
          data. You may exercise any of these rights by using the &quot;Delete Account&quot;
          option in your Profile Settings, or by contacting our Data Protection Officer at{' '}
          <span className="text-brand-indigo-400">privacy@TITECX.com</span>.{' '}
          <br />
          <br />
          <strong className="text-text-primary">Data Deletion:</strong> To request full deletion
          of your personal data outside of the in-app account deletion flow, email{' '}
          <span className="text-brand-indigo-400">privacy@TITECX.com</span> with the subject line
          &quot;Data Deletion Request&quot; and your registered email address. We will confirm
          deletion within 14 days.
        </LegalSection>

        <LegalSection title="9. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify you of significant
          changes via email or an in-app notice. Continued use of the platform after changes
          constitutes acceptance of the revised policy.
        </LegalSection>

        <LegalSection title="10. Contact">
          If you have questions about this Privacy Policy, wish to exercise your data rights, or
          need to submit a Data Deletion Request, please contact our Data Protection Officer at{' '}
          <span className="text-brand-indigo-400">privacy@TITECX.com</span>. For general support
          enquiries, email <span className="text-brand-indigo-400">support@TITECX.com</span>. We
          aim to respond within 2 business days.
        </LegalSection>
      </section>

      <Footer />
    </main>
  );
}
