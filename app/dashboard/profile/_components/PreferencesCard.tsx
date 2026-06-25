import { Settings } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * PreferencesCard — email/recommendation/digest notification toggles.
 * Single Responsibility: this one card only.
 */
const PREFERENCE_ROWS: { label: string; key: keyof AppUser['preferences'] }[] = [
  { label: 'Email notifications', key: 'email_notifications' },
  { label: 'Course recommendations', key: 'course_recommendations' },
  { label: 'Weekly digest', key: 'weekly_digest' },
];

interface PreferencesCardProps {
  preferences: AppUser['preferences'];
  prefError: string;
  onToggle: (key: keyof AppUser['preferences'], value: boolean) => void;
}

export default function PreferencesCard({ preferences, prefError, onToggle }: PreferencesCardProps) {
  return (
    <GlowCard>
      <h3 className="text-sm font-bold text-text-muted mb-4 flex items-center gap-2">
        <Settings size={15} className="text-brand-purple-400" /> Preferences
      </h3>
      <div className="space-y-3">
        {PREFERENCE_ROWS.map(({ label, key }) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={preferences[key]}
              onChange={(e) => onToggle(key, e.target.checked)}
              className="w-4 h-4 rounded accent-brand-indigo-500"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition">{label}</span>
          </label>
        ))}
      </div>
      {prefError && (
        <p className="mt-3 text-xs text-danger bg-danger/10 border border-danger/20 px-3 py-2 rounded-lg">{prefError}</p>
      )}
    </GlowCard>
  );
}
