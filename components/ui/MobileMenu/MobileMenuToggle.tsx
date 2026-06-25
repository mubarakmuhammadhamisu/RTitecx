/**
 * MobileMenuToggle — the 3-line hamburger button.
 * Single Responsibility: render the toggle button only; owns no state.
 */
interface MobileMenuToggleProps {
  onClick: () => void;
}

export default function MobileMenuToggle({ onClick }: MobileMenuToggleProps) {
  return (
    <button onClick={onClick} aria-label="Toggle menu" className="flex flex-col gap-1 md:hidden">
      <span className="h-0.5 w-6 bg-text-primary" />
      <span className="h-0.5 w-6 bg-text-primary" />
      <span className="h-0.5 w-6 bg-text-primary" />
    </button>
  );
}
