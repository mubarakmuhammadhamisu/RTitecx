/**
 * context/auth/AppUser.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the AppUser type used by AuthContext. Isolated
 * from the context implementation so other files (e.g. admin components
 * displaying a student) can import the type without pulling in the
 * entire context module.
 */
export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarUrl: string | null;
  role: 'student' | 'admin';
  location: string;
  bio: string;
  phone: string;
  creditBalance: number;
  lifetimePoints: number;
  referralCode: string;
  preferences: {
    email_notifications: boolean;
    course_recommendations: boolean;
    weekly_digest: boolean;
  };
}
