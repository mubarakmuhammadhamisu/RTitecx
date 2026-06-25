import type { CourseRow } from '@/lib/supabase/rowTypes';
import type { CourseSchema, Module } from './courseTypes';

/**
 * lib/courses/rowToCourse.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: convert a raw Supabase `courses` row (snake_case,
 * flat) into the camelCase CourseSchema domain shape used by components.
 *
 * NOTE: this function expects `modules` to be supplied separately (joined
 * in a prior query) since the new schema normalizes modules/lessons into
 * their own tables rather than storing them as JSON on the course row.
 * See lib/courses/fetchCourseWithModules.ts for the full join.
 */
export function rowToCourse(row: CourseRow, modules: Module[] = []): CourseSchema {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description,
    level: row.level,
    duration: row.duration,
    price: row.price,
    instructor: row.instructor,
    thumbnail: row.thumbnail,
    gradientFrom: row.gradient_from,
    gradientTo: row.gradient_to,
    features: row.features ?? [],
    curriculum: row.curriculum ?? [],
    modules,
    premiumPrice: row.premium_price ?? null,
    premiumDeadlineDays: row.premium_deadline_days ?? 60,
    premiumPerks: row.premium_perks ?? [],
  };
}
