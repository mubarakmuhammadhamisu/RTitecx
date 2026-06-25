'use client';

import { useState } from 'react';

/**
 * lib/checkout/usePointsForm.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: points-to-apply input state + client-side
 * bounds validation (server re-validates regardless — this is purely
 * for immediate UX feedback before the payment is attempted).
 */
export function usePointsForm(creditBalance: number, afterCouponPrice: number) {
  const [pointsInput, setPointsInput] = useState('');
  const [pointsToApply, setPointsToApply] = useState(0);
  const [pointsError, setPointsError] = useState('');

  const handlePointsInputChange = (value: string) => {
    setPointsInput(value);
    setPointsError('');
    if (!value) setPointsToApply(0);
  };

  const handleMaxPoints = () => {
    const maxApplicable = Math.min(creditBalance, afterCouponPrice);
    setPointsToApply(maxApplicable);
    setPointsInput(String(maxApplicable));
    setPointsError('');
  };

  const applyPoints = () => {
    setPointsError('');
    const val = parseInt(pointsInput.trim(), 10);
    if (!pointsInput.trim() || isNaN(val) || val <= 0) {
      setPointsError('Please enter a valid number of points.');
      return;
    }
    if (val > creditBalance) {
      setPointsError(`You only have ${creditBalance.toLocaleString()} points available.`);
      return;
    }
    if (val > afterCouponPrice) {
      setPointsError(`Max ${afterCouponPrice.toLocaleString()} points can be applied to this purchase.`);
      return;
    }
    setPointsToApply(val);
  };

  return {
    pointsInput,
    pointsToApply,
    pointsError,
    handlePointsInputChange,
    handleMaxPoints,
    applyPoints,
  };
}
