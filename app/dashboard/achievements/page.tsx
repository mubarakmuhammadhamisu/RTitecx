'use client';

import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { buildCertificates } from '@/lib/achievements/buildCertificates';
import { buildBadges } from '@/lib/achievements/buildBadges';
import { computeTotalPoints } from '@/lib/achievements/computeTotalPoints';
import { useCertificateActions } from '@/lib/achievements/useCertificateActions';
import DashboardLoadErrorState from '@/components/courses/DashboardLoadErrorState';
import AchievementsHero from './_components/AchievementsHero';
import AchievementsStatsGrid from './_components/AchievementsStatsGrid';
import CertificatesSection from './_components/CertificatesSection';
import BadgesSection from './_components/BadgesSection';
import LearningRankCard from './_components/LearningRankCard';

/**
 * /dashboard/achievements — certificates, badges, points/rank. Composes
 * section components; all derivation logic lives in lib/achievements/.
 */
export default function AchievementsPage() {
  const { user } = useAuth();
  const { enrolledCourses, loadError } = useCourses();
  const certificateActions = useCertificateActions(user?.name ?? '');

  if (!user) return null;
  if (loadError) return <DashboardLoadErrorState />;

  const completedCourses = enrolledCourses.filter((c) => c.progress === 100);
  const certificates = buildCertificates(completedCourses);
  const badges = buildBadges(completedCourses, enrolledCourses);
  const totalPoints = computeTotalPoints(enrolledCourses);

  return (
    <div className="space-y-6">
      <AchievementsHero user={user} />

      <AchievementsStatsGrid
        certificatesCount={certificates.length}
        badgesEarnedCount={badges.filter((b) => b.earned).length}
        badgesTotalCount={badges.length}
        totalPoints={totalPoints}
      />

      <CertificatesSection
        certificates={certificates}
        copiedId={certificateActions.copiedId}
        onShare={certificateActions.handleShare}
        onDownload={certificateActions.handleDownload}
      />

      <BadgesSection badges={badges} />

      <LearningRankCard userFirstName={user.name.split(' ')[0]} totalPoints={totalPoints} />
    </div>
  );
}
