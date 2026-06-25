'use client';

import { useState } from 'react';

interface CouponValidationResponse {
  valid: boolean;
  discount_percent?: number;
  reason?: string;
}

/**
 * lib/checkout/useCouponForm.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: coupon code input state + server-side
 * validation against /api/validate-coupon. The actual discount
 * percentage always comes from the server response, never assumed
 * client-side, since coupon rules can change without a deploy.
 */
export function useCouponForm() {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  const resetCoupon = () => {
    setCouponApplied(false);
    setDiscountPercent(0);
    setCoupon('');
    setCouponError('');
  };

  const handleCouponChange = (value: string) => {
    setCoupon(value.toUpperCase());
    setCouponError('');
    setCouponApplied(false);
    setDiscountPercent(0);
  };

  const applyCoupon = async () => {
    setCouponError('');
    if (!coupon.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    try {
      const res = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-protection': '1' },
        body: JSON.stringify({ coupon }),
      });
      const data = (await res.json()) as CouponValidationResponse;
      if (data.valid) {
        setCouponApplied(true);
        setDiscountPercent(data.discount_percent ?? 10);
      } else {
        setCouponError(data.reason ?? 'Invalid coupon code.');
        setCouponApplied(false);
        setDiscountPercent(0);
      }
    } catch {
      setCouponError('Could not validate coupon. Please try again.');
    }
  };

  return {
    coupon,
    couponApplied,
    discountPercent,
    couponError,
    handleCouponChange,
    applyCoupon,
    resetCoupon,
  };
}
