'use client';

import React from 'react';
import Link from 'next/link';
import type { Module, Lesson, LessonType } from '@/lib/courses/courseTypes';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface LessonNavigationProps {
  modules: Module[];
  currentLessonId: string;
  courseSlug: string;
  lessonType: LessonType;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export default function LessonNavigation({
  modules, currentLessonId, courseSlug, lessonType, onMarkComplete, isCompleted = false,
}: LessonNavigationProps) {
  const lessons: Lesson[] = modules.flatMap((m) => m.lessons);
  const idx = lessons.findIndex((l) => l.id === currentLessonId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const requiresCompletion = lessonType === 'reading' || lessonType === 'quiz' || lessonType === 'interactive';
  const canGoNext = requiresCompletion ? isCompleted : true;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-brand-indigo-500/20">
      {prev ? (
        <Link href={`/dashboard/courses/${courseSlug}/view/${prev.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-surface-800 hover:bg-surface-700 text-text-primary rounded-lg transition">
          <ChevronLeft size={18} /><span className="text-sm font-medium">Previous</span>
        </Link>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-900 text-text-faint rounded-lg opacity-50 cursor-not-allowed">
          <ChevronLeft size={18} /><span className="text-sm font-medium">Previous</span>
        </div>
      )}

      {lessonType === 'reading' && (
        <button onClick={onMarkComplete} disabled={isCompleted}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition font-medium text-sm ${
            isCompleted
              ? 'bg-success/20 text-success border border-success/50 cursor-default'
              : 'bg-brand-purple-600 hover:bg-brand-purple-700 text-white'
          }`}>
          <CheckCircle2 size={18} />
          <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
        </button>
      )}

      {next && canGoNext ? (
        <Link href={`/dashboard/courses/${courseSlug}/view/${next.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white rounded-lg transition">
          <span className="text-sm font-medium">Next</span><ChevronRight size={18} />
        </Link>
      ) : (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-not-allowed ${
          canGoNext ? 'bg-surface-900 text-text-faint opacity-50' : 'bg-brand-indigo-600/30 text-brand-indigo-400/60 border border-brand-indigo-500/30'
        }`}>
          <span className="text-sm font-medium">
            {requiresCompletion && !isCompleted
              ? lessonType === 'quiz'
                ? 'Complete quiz to continue'
                : lessonType === 'interactive'
                  ? 'Pass the challenge to continue'
                  : 'Complete to Continue'
              : next ? 'Next' : 'Course Complete 🎉'}
          </span>
          <ChevronRight size={18} />
        </div>
      )}
    </div>
  );
}
