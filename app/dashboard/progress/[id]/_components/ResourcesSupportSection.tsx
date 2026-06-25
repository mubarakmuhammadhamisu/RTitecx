import { BookOpen, Brain, Award } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { CourseSchema, EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ResourcesSupportSection — "Resources & Support" 3-card row (study
 * materials count, quiz count, certificate status). Lesson/quiz counts
 * are derived from the real module/lesson schema, not fabricated.
 * Single Responsibility: this one section only.
 */
interface ResourcesSupportSectionProps {
  schema: CourseSchema;
  enrolledCourse: EnrolledCourse;
}

export default function ResourcesSupportSection({ schema, enrolledCourse }: ResourcesSupportSectionProps) {
  const allLessons = schema.modules.flatMap((m) => m.lessons);
  const quizCount = allLessons.filter((l) => l.type === 'quiz').length;

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Resources &amp; Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlowCard className="group cursor-pointer hover:border-brand-indigo-500/50 transition">
          <div className="flex items-center gap-3">
            <BookOpen className="text-brand-indigo-400/60 group-hover:text-brand-indigo-400 transition" size={22} />
            <div>
              <h3 className="font-bold text-text-primary text-sm">Study Materials</h3>
              <p className="text-text-muted text-xs">
                {schema.modules.length > 0 ? `${allLessons.length} lessons` : 'Coming Soon'}
              </p>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="group cursor-pointer hover:border-brand-purple-500/50 transition">
          <div className="flex items-center gap-3">
            <Brain className="text-brand-indigo-400/60 group-hover:text-brand-indigo-400 transition" size={22} />
            <div>
              <h3 className="font-bold text-text-primary text-sm">Practice Quizzes</h3>
              <p className="text-text-muted text-xs">{quizCount > 0 ? `${quizCount} quizzes` : 'Coming Soon'}</p>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="group cursor-pointer hover:border-brand-indigo-500/50 transition">
          <div className="flex items-center gap-3">
            <Award className="text-brand-indigo-400/60 group-hover:text-brand-indigo-400 transition" size={22} />
            <div>
              <h3 className="font-bold text-text-primary text-sm">Certificate</h3>
              <p className="text-text-muted text-xs">
                {enrolledCourse.progress === 100 ? 'Ready to download' : 'Earn on completion'}
              </p>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
