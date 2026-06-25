import Image from 'next/image';
import GlowCardHero from '@/components/ui/GlowCardHero';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * AchievementsHero — welcome banner for the achievements page.
 * Single Responsibility: this one hero section only.
 */
export default function AchievementsHero({ user }: { user: AppUser }) {
  return (
    <GlowCardHero>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-cta flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-brand-indigo-500/50 shrink-0">
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.name} width={64} height={64} className="w-full h-full object-cover" />
          ) : (
            user.avatar
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Achievements</h1>
          <p className="text-text-secondary text-sm mt-0.5">Celebrate your learning milestones</p>
        </div>
      </div>
    </GlowCardHero>
  );
}
