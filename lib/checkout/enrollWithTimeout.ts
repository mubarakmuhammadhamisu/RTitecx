/**
 * lib/checkout/enrollWithTimeout.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: call /api/enroll with a 20-second timeout.
 *
 * Without a timeout, the fetch hangs forever on slow connections. An
 * AbortController cancels the request after 20 seconds and throws
 * 'TIMEOUT' so the caller can show a specific message telling the
 * person their payment likely went through even if the enrollment
 * confirmation timed out (important for payment UX — never leave
 * someone unsure if they were charged).
 */
export interface EnrollResponse {
  enrolled?: boolean;
  alreadyExisted?: boolean;
  enrollmentId?: string;
  error?: string;
}

export interface EnrollRequestBody {
  courseSlug: string;
  isFree?: boolean;
  reference?: string;
  purchaseType?: 'standard' | 'premium';
  couponCode?: string;
  pointsApplied?: number;
}

export async function enrollWithTimeout(body: EnrollRequestBody): Promise<EnrollResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch('/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-protection': '1' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // Always try to parse JSON; if the server returned an HTML error
    // page (e.g. a platform 500 page), catch the JSON parse failure
    // gracefully instead of letting it bubble up as a generic "Network
    // error" that hides the real HTTP status.
    const data = await res.json().catch(() => ({
      error: `Server error (HTTP ${res.status}). Please try again.`,
    }));
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('TIMEOUT');
    }
    throw err;
  }
}
