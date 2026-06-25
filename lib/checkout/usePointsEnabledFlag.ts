'use client';

import { useState, useEffect } from 'react';

/**
 * lib/checkout/usePointsEnabledFlag.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch the server-driven `pointsEnabled` flag
 * (admins can disable points redemption platform-wide). Non-fatal on
 * failure — falls back to showing the points input anyway, since the
 * server validates the actual redemption regardless.
 */
export function usePointsEnabledFlag(userId: string | undefined, isFree: boolean) {
  const [pointsEnabled, setPointsEnabled] = useState(true);

  useEffect(() => {
    if (!userId || isFree) return;
    fetch('/api/points/balance')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setPointsEnabled(d.pointsEnabled ?? false);
      })
      .catch(() => {
        // Non-fatal — server validates the actual redemption regardless.
      });
  }, [userId, isFree]);

  return pointsEnabled;
}
