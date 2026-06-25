import Image from 'next/image';
import GlowCardHero from '@/components/ui/GlowCardHero';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * MyCoursesHero — the "My Courses" hero card with enrolled/completed
 * counts. Single Responsibility: this one hero section only.
 */
interface MyCoursesHeroProps {
  user: AppUser;
  enrolledCount: number;
  completedCount: number;
}

export default function MyCoursesHero({ user, enrolledCount, completedCount }: MyCoursesHeroProps) {
  return (
    <GlowCardHero>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-cta flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-brand-indigo-500/50 shrink-0">
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.name} width={56} height={56} className="w-full h-full object-cover" />
          ) : (
            user.avatar
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Courses</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            {enrolledCount} enrolled · {completedCount} completed
          </p>
        </div>
      </div>
    </GlowCardHero>
  );
}
