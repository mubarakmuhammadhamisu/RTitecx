/**
 * ContactSection — "Get in Touch". Wording AND email addresses
 * preserved exactly from the original codebase per brand-fidelity
 * requirement — these are real contact points, not placeholders.
 */
export default function ContactSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20 border-t border-glass-border">
      <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
      <p className="text-text-muted leading-relaxed mb-8">
        Have a question about a course, a billing issue, or just want to say hello? We respond to
        every message within 2 business days.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-surface-900 border border-glass-border space-y-2">
          <p className="text-sm font-semibold text-brand-indigo-400 uppercase tracking-wide">
            General Support
          </p>
          <a
            href="mailto:support@TITECX.com"
            className="text-text-primary font-medium hover:text-brand-indigo-300 transition break-all"
          >
            support@TITECX.com
          </a>
          <p className="text-text-faint text-sm">Course access, enrollment issues, refund requests.</p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-900 border border-glass-border space-y-2">
          <p className="text-sm font-semibold text-brand-indigo-400 uppercase tracking-wide">
            Data &amp; Privacy
          </p>
          <a
            href="mailto:privacy@TITECX.com"
            className="text-text-primary font-medium hover:text-brand-indigo-300 transition break-all"
          >
            privacy@TITECX.com
          </a>
          <p className="text-text-faint text-sm">Data deletion requests, NDPR enquiries.</p>
        </div>
      </div>
    </section>
  );
}
