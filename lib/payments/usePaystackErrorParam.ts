'use client';

import { useState, useEffect } from 'react';
import { getPaystackErrorMessage } from '@/lib/payments/paystackErrorMessages';

/**
 * lib/payments/usePaystackErrorParam.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: read the ?paystack_error= query param directly
 * from window.location (NOT useSearchParams, which would force this
 * page into a Suspense boundary unnecessarily) and clean it from the
 * URL so it doesn't persist on refresh.
 */
export function usePaystackErrorParam() {
  const [paystackError, setPaystackError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('paystack_error');
    if (code) {
      setPaystackError(getPaystackErrorMessage(code));
      const url = new URL(window.location.href);
      url.searchParams.delete('paystack_error');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  return { paystackError, clearPaystackError: () => setPaystackError(null) };
}
