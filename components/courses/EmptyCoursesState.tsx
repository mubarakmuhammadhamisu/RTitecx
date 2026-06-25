/**
 * EmptyCoursesState — "No courses yet" waitlist call-to-action.
 * Single Responsibility: this one empty state. Wording preserved exactly
 * from the original codebase per brand-fidelity requirement.
 */
export default function EmptyCoursesState() {
  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 py-16 text-center space-y-4">
      <p className="text-2xl font-bold text-text-primary">No courses yet</p>
      <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
        We&apos;re adding new courses soon. Check back shortly or join the waitlist.
      </p>
      <a
        href="mailto:support@TITECX.com?subject=Course Waitlist"
        className="inline-block mt-2 px-6 py-3 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white font-semibold text-sm transition"
      >
        Join the Waitlist
      </a>
    </div>
  );
}
