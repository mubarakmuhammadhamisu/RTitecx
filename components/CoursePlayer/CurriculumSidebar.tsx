'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Module } from '@/lib/courses/courseTypes';
import { ChevronDown, CheckCircle2, Circle, Video, BookOpen, Brain, Lock, Code } from 'lucide-react';

interface CurriculumSidebarProps {
  modules: Module[];
  currentLessonId: string;
  courseSlug: string;
  completedLessonIds: Set<string>;
}

export default function CurriculumSidebar({
  modules, currentLessonId, courseSlug, completedLessonIds,
}: CurriculumSidebarProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(modules.map((m) => m.id)));

  const toggle = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  const allLessonIds = new Set(modules.flatMap((m) => m.lessons.map((l) => l.id)));
  const completedInCourse = [...completedLessonIds].filter((id) => allLessonIds.has(id)).length;
  const totalInCourse = allLessonIds.size;

  const completedInModule = (lessons: { id: string }[]) =>
    lessons.filter((l) => completedLessonIds.has(l.id)).length;

  const isModuleLocked = (moduleIdx: number): boolean => {
    if (moduleIdx === 0) return false;
    const prev = modules[moduleIdx - 1];
    if (!prev || prev.lessons.length === 0) return false;
    return !completedLessonIds.has(prev.lessons[prev.lessons.length - 1].id);
  };

  const isLocked = (lessonId: string, isActive: boolean): boolean => {
    if (isActive) return false;
    for (let mi = 0; mi < modules.length; mi++) {
      const li = modules[mi].lessons.findIndex((l) => l.id === lessonId);
      if (li === -1) continue;
      if (isModuleLocked(mi)) return true;
      if (li === 0) return false;
      return !completedLessonIds.has(modules[mi].lessons[li - 1].id);
    }
    return false;
  };

  return (
    <div className="bg-surface-900 rounded-xl border border-brand-indigo-500/20 overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-brand-indigo-500/20 bg-surface-950">
        <h3 className="text-sm font-semibold text-text-primary">Curriculum</h3>
        <p className="text-xs text-text-faint mt-0.5">
          {completedInCourse} of {totalInCourse} lessons done
        </p>
      </div>

      <div className="overflow-y-auto flex-1 space-y-1 p-2">
        {modules.map((module, moduleIdx) => {
          const done = completedInModule(module.lessons);
          const total = module.lessons.length;
          const moduleLocked = isModuleLocked(moduleIdx);
          return (
            <div key={module.id}>
              <button
                onClick={() => toggle(module.id)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-800 rounded-lg transition text-left group"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${moduleLocked ? 'text-text-faint' : 'text-brand-indigo-400'} ${expanded.has(module.id) ? '' : '-rotate-90'}`}
                />
                <span className={`text-sm font-medium transition flex-1 ${moduleLocked ? 'text-text-faint' : 'text-text-secondary group-hover:text-text-primary'}`}>
                  {module.title}
                </span>
                {moduleLocked
                  ? <Lock size={12} className="text-text-faint shrink-0" />
                  : <span className="text-xs text-text-faint">{done}/{total}</span>
                }
              </button>

              {expanded.has(module.id) && (
                <div className="ml-6 space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isDone = completedLessonIds.has(lesson.id);
                    const locked = isLocked(lesson.id, isActive);

                    const sharedInner = (
                      <>
                        {isDone
                          ? <CheckCircle2 size={15} className="text-success shrink-0" />
                          : locked
                          ? <Lock size={15} className="text-text-faint shrink-0" />
                          : <Circle size={15} className={`shrink-0 ${isActive ? 'text-brand-indigo-400' : 'text-text-faint'}`} />
                        }
                        {lesson.type === 'video'       && <Video    size={13} className={`shrink-0 ${locked ? 'text-text-faint' : 'text-brand-indigo-400'}`} />}
                        {lesson.type === 'reading'     && <BookOpen size={13} className={`shrink-0 ${locked ? 'text-text-faint' : 'text-brand-purple-400'}`} />}
                        {lesson.type === 'quiz'        && <Brain    size={13} className={`shrink-0 ${locked ? 'text-text-faint' : 'text-brand-pink-400'}`} />}
                        {lesson.type === 'interactive' && <Code     size={13} className={`shrink-0 ${locked ? 'text-text-faint' : 'text-brand-indigo-300'}`} />}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo-400 shrink-0" />}
                      </>
                    );

                    if (locked) {
                      return (
                        <div key={lesson.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-faint cursor-not-allowed opacity-60">
                          {sharedInner}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={lesson.id}
                        href={`/dashboard/courses/${courseSlug}/view/${lesson.id}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm group ${
                          isActive
                            ? 'bg-brand-indigo-500/20 border border-brand-indigo-500/50 text-brand-indigo-200'
                            : 'text-text-muted hover:text-text-primary hover:bg-surface-800'
                        }`}
                      >
                        {sharedInner}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
