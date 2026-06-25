'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { fetchCourseWithModules } from '@/lib/courses/fetchCourseWithModules';
import { applyLessonStatus } from '@/lib/courses/applyLessonStatus';
import CurriculumSidebar from '@/components/CoursePlayer/CurriculumSidebar';
import type { CourseSchema } from '@/lib/courses/courseTypes';

interface CourseOverviewPageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseOverviewPage({ params }: CourseOverviewPageProps) {
  const { slug } = React.use(params);
  const { user } = useAuth();
  const { enrolledCourses, completedLessonIds, isLoading } = useCourses();
  const router = useRouter();

  const [schema, setSchema] = useState<CourseSchema | null>(null);
  const [fetching, setFetching] = useState(true);

  const enrollment = enrolledCourses.find((c) => c.slug === slug);

  useEffect(() => {
    if (isLoading) return;
    if (!enrollment) {
      router.replace(`/courses/${slug}`);
      return;
    }
    fetchCourseWithModules(slug)
      .then((s) => setSchema(s))
      .finally(() => setFetching(false));
  }, [slug, enrollment, isLoading, router]);

  if (isLoading || fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!schema || !enrollment) return null;

  const modulesWithStatus = schema.modules.map((mod) => ({
    ...mod,
    lessons: applyLessonStatus(mod.lessons, completedLessonIds),
  }));

  const nextLesson = enrollment.nextLessonId ?? modulesWithStatus[0]?.lessons[0]?.id;

  return (
    <div className="space-y-6">
      <div
        className="relative rounded-2xl overflow-hidden p-8 border border-brand-indigo-500/20"
        style={{ background: `linear-gradient(to bottom right, ${schema.gradientFrom}30, ${schema.gradientTo}20, var(--surface-900))` }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div
            className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 border border-glass-border"
            style={{ background: `linear-gradient(to bottom right, ${schema.gradientFrom}, ${schema.gradientTo})` }}
          >
            <Image src={schema.thumbnail} alt={schema.title} fill sizes="96px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-text-primary leading-snug">{schema.title}</h1>
            <p className="text-text-secondary text-sm mt-1">by {schema.instructor} · {schema.level}</p>
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-text-muted">
                <span>Progress</span>
                <span className={enrollment.progress === 100 ? 'text-success font-semibold' : 'text-brand-indigo-400 font-semibold'}>
                  {enrollment.progress}%
                </span>
              </div>
              <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${enrollment.progress === 100 ? 'bg-success' : 'bg-gradient-cta'}`}
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>
            </div>
          </div>
          {nextLesson && (
            <Link
              href={`/dashboard/courses/${slug}/view/${nextLesson}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-semibold text-sm transition shadow-lg shadow-brand-indigo-500/20 whitespace-nowrap shrink-0"
            >
              {enrollment.progress > 0 ? '▶ Continue' : '▶ Start'}
            </Link>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-text-primary mb-4">Curriculum</h2>
        <CurriculumSidebar
          modules={modulesWithStatus}
          currentLessonId=""
          courseSlug={slug}
          completedLessonIds={completedLessonIds}
        />
      </div>
    </div>
  );
}
