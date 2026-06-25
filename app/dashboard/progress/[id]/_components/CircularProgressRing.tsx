/**
 * CircularProgressRing — the SVG ring showing overall course % on the
 * progress detail page. Single Responsibility: this one visual only.
 */
interface CircularProgressRingProps {
  progress: number;
}

const CIRCUMFERENCE = 170; // 2 * PI * r(27), pre-computed to match the original's exact visual proportions

export default function CircularProgressRing({ progress }: CircularProgressRingProps) {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="4" className="text-surface-800" />
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={`${CIRCUMFERENCE * (progress / 100)} ${CIRCUMFERENCE}`}
          className={progress === 100 ? 'text-success' : 'text-brand-indigo-500'}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
