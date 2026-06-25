/**
 * lib/courses/courseTypes.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: TypeScript types for the course/lesson domain
 * model used throughout client components. Mirrors the Supabase schema
 * in supabase/migrations/0002 and 0004.
 *
 * NEW vs. the original codebase: LessonType now includes 'interactive',
 * and InteractiveContent / InteractiveTestCase are new shapes backing
 * the code playground / graded test engine.
 */

export type LessonType = 'video' | 'reading' | 'quiz' | 'interactive';
export type LessonStatus = 'completed' | 'current' | 'locked';
export type FilterStatus = 'all' | 'in-progress' | 'completed';

export type VideoProvider = 'youtube' | 'gumlet' | 'bunny' | 'gdrive';

export interface VideoContent {
  videoUrl: string;
  duration: string;
  topics?: string[];
  videoProvider?: VideoProvider;
}

export interface ReadingContent {
  markdownBody: string;
  topics?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizContent {
  questions: QuizQuestion[];
  topics?: string[];
}

/** Which client-side runtime executes the student's code. */
export type InteractiveLanguage = 'web' | 'python' | 'c' | 'java';

/** 'playground' = freeform sandbox, no grading. 'test' = graded challenge. */
export type InteractiveMode = 'playground' | 'test';

export interface InteractiveStarterCodeWeb {
  html: string;
  css: string;
  js: string;
}

export interface InteractiveStarterCodeSingleFile {
  code: string;
}

export type InteractiveStarterCode = InteractiveStarterCodeWeb | InteractiveStarterCodeSingleFile;

/** A single visible (non-hidden) example case shown to the student. */
export interface InteractiveVisibleTestCase {
  id: string;
  label: string;
  input: string;
  expectedOutput: string;
}

/** A test case as delivered to the client for execution. Under the
 *  client-execution grading strategy, ALL cases (including hidden ones)
 *  are sent so the browser's WASM runtime can run the student's code
 *  against them — but expectedOutput is null for hidden cases, so the
 *  student never sees what "correct" looks like for those. See
 *  lib/interactive/gradingStrategy.ts for the full design. */
export interface InteractiveExecutableTestCase {
  id: string;
  label: string;
  input: string;
  isHidden: boolean;
  expectedOutput: string | null;
}

export interface InteractiveContent {
  mode: InteractiveMode;
  language: InteractiveLanguage;
  problemStatement: string;
  starterCode: InteractiveStarterCode;
  timeLimitSeconds?: number;
  topics?: string[];
  /** All test cases (visible + hidden) under client-execution grading —
   *  hidden cases carry input but expectedOutput is null. See
   *  InteractiveExecutableTestCase and lib/interactive/gradingStrategy.ts. */
  testCases: InteractiveExecutableTestCase[];
}

export type LessonContent = VideoContent | ReadingContent | QuizContent | InteractiveContent;

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  status: LessonStatus;
  content: LessonContent;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseSchema {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  instructor: string;
  thumbnail: string;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
  curriculum: string[];
  modules: Module[];
  premiumPrice: string | null;
  premiumDeadlineDays: number;
  premiumPerks: string[];
}

export interface EnrolledCourse {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  progress: number;
  duration: string;
  students: number;
  thumbnail: string;
  gradientFrom: string;
  gradientTo: string;
  nextLessonId?: string;
  completedAt?: string | null;
  enrolledAt?: string;
  purchaseType?: 'standard' | 'premium' | 'free';
  premiumDeadline?: string | null;
  mysteryBoxStatus?: 'pending' | 'earned' | 'forfeited' | null;
}
