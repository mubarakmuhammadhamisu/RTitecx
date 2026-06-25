/**
 * lib/supabase/rowTypes.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: TypeScript shapes mirroring the Supabase table
 * rows defined in supabase/migrations/. No logic, no client instance —
 * just types, kept in one place so a schema change only requires editing
 * one file plus the matching migration.
 */

export interface ProfileRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string | null;
  role: 'student' | 'admin';
  location: string;
  bio: string;
  phone: string;
  preferences: {
    email_notifications: boolean;
    course_recommendations: boolean;
    weekly_digest: boolean;
  };
  created_at: string;
}

export interface CourseRow {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  instructor: string;
  thumbnail: string;
  gradient_from: string;
  gradient_to: string;
  features: string[];
  curriculum: string[];
  is_published: boolean;
  premium_price: string | null;
  premium_deadline_days: number;
  premium_perks: string[];
  created_at: string;
  updated_at: string;
}

export interface ModuleRow {
  id: string;
  course_id: string;
  title: string;
  sort_order: number;
}

export type LessonType = 'video' | 'reading' | 'quiz' | 'interactive';

export interface LessonRow {
  id: string;
  module_id: string;
  title: string;
  lesson_type: LessonType;
  sort_order: number;
}

export interface EnrollmentRow {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  completed_at: string | null;
  enrolled_at: string;
  purchase_type: 'standard' | 'premium' | 'free';
  premium_deadline: string | null;
  mystery_box_status: 'pending' | 'earned' | 'forfeited' | null;
}

export interface LessonCompletionRow {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

export interface PaymentRow {
  id: string;
  user_id: string;
  course_id: string;
  paystack_reference: string;
  amount_kobo: number;
  status: 'success' | 'failed' | 'pending';
  paid_at: string | null;
}
