/**
 * featuresData.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the "Why TITECX" feature list DATA only.
 * Wording preserved exactly from the original codebase.
 */
export interface FeatureItem {
  title: string;
  description: string;
}

export const featuresData: FeatureItem[] = [
  { title: 'Expert-Built Courses', description: 'Focused on real skills.' },
  { title: 'Learn at Your Pace', description: 'Pause, resume anytime.' },
  { title: 'Lifetime Access', description: 'Buy once, learn forever.' },
];
