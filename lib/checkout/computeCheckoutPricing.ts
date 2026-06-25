/**
 * lib/checkout/computeCheckoutPricing.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the single source of truth for all checkout
 * price math — coupon discount, points discount, final total in both
 * Naira and kobo (Paystack requires amounts in kobo, the smallest NGN
 * unit). Pure function, no side effects, easy to verify independently
 * of any UI.
 *
 * Order of operations: coupon discount applies to the base price FIRST,
 * then points can only reduce the POST-coupon price (never below ₦0).
 */
export interface CheckoutPricing {
  couponDiscount: number;
  afterCoupon: number;
  pointsDiscount: number;
  finalNaira: number;
  finalKobo: number;
}

export function computeCheckoutPricing(
  numericPrice: number,
  couponApplied: boolean,
  discountPercent: number,
  pointsToApply: number
): CheckoutPricing {
  const couponDiscount = couponApplied ? Math.floor((numericPrice * discountPercent) / 100) : 0;
  const afterCoupon = numericPrice - couponDiscount;
  const pointsDiscount = Math.min(pointsToApply, afterCoupon);
  const finalNaira = afterCoupon - pointsDiscount;

  return {
    couponDiscount,
    afterCoupon,
    pointsDiscount,
    finalNaira,
    finalKobo: finalNaira * 100,
  };
}

/** Extract the numeric Naira value from a price string like "₦15,000"
 *  or "Free". Returns 0 for non-numeric strings. */
export function parsePriceString(priceString: string): number {
  const raw = priceString.replace(/[^\d]/g, '');
  return raw ? parseInt(raw, 10) : 0;
}
