'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { fetchCourseWithModules } from '@/lib/courses/fetchCourseWithModules';
import { applyLessonStatus } from '@/lib/courses/applyLessonStatus';
import VideoPlayer from '@/components/CoursePlayer/VideoPlayer';
import Reader from '@/components/CoursePlayer/Reader';
import QuizPlayer from '@/components/CoursePlayer/QuizPlayer';
import CurriculumSidebar from '@/components/CoursePlayer/CurriculumSidebar';
import LessonNavigation from '@/components/CoursePlayer/LessonNavigation';
import type { CourseSchema, VideoContent, ReadingContent, QuizContent } from '@/lib/courses/courseTypes';

interface LessonViewPageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default function LessonViewPage({ params }: LessonViewPageProps) {
  const { slug, lessonId } = React.use(params);
  const { user } = useAuth();
  // CORRECTED: markLessonComplete now comes from useCourses(), not useAuth()
  const { enrolledCourses, completedLessonIds, markLessonComplete, isLoading } = useCourses();
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

  const handleMarkComplete = useCallback(() => {
    markLessonComplete(slug, lessonId);
  }, [markLessonComplete, slug, lessonId]);

  if (isLoading || fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!schema || !enrollment || !user) return null;

  const modulesWithStatus = schema.modules.map((mod) => ({
    ...mod,
    lessons: applyLessonStatus(mod.lessons, completedLessonIds),
  }));

  const allLessons = modulesWithStatus.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId);

  if (!currentLesson) {
    router.replace(`/dashboard/courses/${slug}`);
    return null;
  }

  const isCompleted = completedLessonIds.has(lessonId);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Main content area */}
      <div className="flex-1 min-w-0 space-y-4">
        {currentLesson.type === 'video' && (
          <VideoPlayer
            content={currentLesson.content as VideoContent}
            title={currentLesson.title}
            isCompleted={isCompleted}
            onVideoEnd={handleMarkComplete}
          />
        )}

        {currentLesson.type === 'reading' && (
          <Reader
            content={currentLesson.content as ReadingContent}
            title={currentLesson.title}
          />
        )}

        {currentLesson.type === 'quiz' && (
          <QuizPlayer
            content={currentLesson.content as QuizContent}
            title={currentLesson.title}
            isCompleted={isCompleted}
            onQuizComplete={handleMarkComplete}
          />
        )}

        {currentLesson.type === 'interactive' && (
          <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-8 text-center space-y-4">
            <div className="text-4xl">⚡</div>
            <h2 className="text-xl font-bold text-text-primary">{currentLesson.title}</h2>
            <p className="text-text-muted text-sm max-w-sm mx-auto">
              Interactive coding environment — coming in Phase 5 of this build. The lesson data,
              test cases, and grading schema are fully defined in the database; the browser
              execution runtime is being built next.
            </p>
          </div>
        )}

        <LessonNavigation
          modules={modulesWithStatus}
          currentLessonId={lessonId}
          courseSlug={slug}
          lessonType={currentLesson.type}
          onMarkComplete={handleMarkComplete}
          isCompleted={isCompleted}
        />
      </div>

      {/* Curriculum sidebar */}
      <div className="w-full lg:w-80 shrink-0 lg:max-h-[calc(100vh-6rem)] lg:sticky lg:top-6">
        <CurriculumSidebar
          modules={modulesWithStatus}
          currentLessonId={lessonId}
          courseSlug={slug}
          completedLessonIds={completedLessonIds}
        />
      </div>
    </div>
  );
}
