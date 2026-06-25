/**
 * AuthDivider — the "or" divider line between the OAuth button and the
 * email/password form. Single Responsibility: this one divider only.
 */
export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-glass-border" />
      <span className="text-xs text-text-faint">or</span>
      <div className="flex-1 h-px bg-glass-border" />
    </div>
  );
}
