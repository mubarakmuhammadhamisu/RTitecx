/**
 * lib/referral/referralTypes.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: shared types for the referral dashboard.
 */
export interface Referral {
  id: string;
  refereeName: string;
  referredAt: string;
  status: 'pending' | 'converted' | 'expired';
  commissionPoints: number | null;
  convertedAt: string | null;
}

export type PointTransactionType =
  | 'referral_commission'
  | 'points_redeemed'
  | 'admin_grant'
  | 'admin_deduct';

export interface PointTransaction {
  id: string;
  type: PointTransactionType;
  points: number;
  description: string | null;
  createdAt: string;
}

export interface ReferralDashboardData {
  referrals: Referral[];
  transactions: PointTransaction[];
  totalReferrals: number;
  convertedReferrals: number;
  totalEarned: number;
}
