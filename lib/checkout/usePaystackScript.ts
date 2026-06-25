'use client';

import { useState, useEffect } from 'react';

const PAYSTACK_SCRIPT_SRC = 'https://js.paystack.co/v1/inline.js';
const LOAD_TIMEOUT_MS = 7000;

/**
 * lib/checkout/usePaystackScript.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: load the Paystack Inline JS script once per
 * page lifetime and report whether it's ready (or failed — commonly due
 * to ad blockers). Disabling the Pay button until `ready` is true
 * prevents the "PaystackPop is not defined" error on slow connections.
 *
 * The script tag is intentionally never removed on unmount —
 * `window.PaystackPop` should persist across re-renders/navigations
 * within the same page session.
 */
export function usePaystackScript() {
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.PaystackPop) {
      setReady(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src*="paystack"]`);
    let didLoad = false;
    const timeout = setTimeout(() => {
      if (!didLoad) setLoadError(true);
    }, LOAD_TIMEOUT_MS);

    if (existing) {
      const onLoad = () => {
        didLoad = true;
        clearTimeout(timeout);
        setReady(true);
      };
      const onError = () => {
        didLoad = true;
        clearTimeout(timeout);
        setLoadError(true);
      };
      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', onError);
      return () => {
        clearTimeout(timeout);
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
      };
    }

    const script = document.createElement('script');
    script.src = PAYSTACK_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      didLoad = true;
      clearTimeout(timeout);
      setReady(true);
    };
    script.onerror = () => {
      didLoad = true;
      clearTimeout(timeout);
      setLoadError(true);
    };
    document.body.appendChild(script);

    return () => clearTimeout(timeout);
  }, []);

  return { ready, loadError };
}
