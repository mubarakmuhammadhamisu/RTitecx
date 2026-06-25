/**
 * lib/payments/paystackErrorMessages.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: human-readable messages for each paystack_error
 * code set by /api/paystack/callback when redirecting back to
 * /dashboard/my-courses after a failed payment.
 */
export const PAYSTACK_ERROR_MESSAGES: Record<string, string> = {
  no_reference: 'Payment reference was missing. Please try again.',
  server_error: 'A server error occurred during payment processing. Please contact support.',
  verify_failed:
    'We could not verify your payment with Paystack. If money was deducted, contact support.',
  payment_not_successful: 'Your payment did not complete successfully. No money was charged.',
  missing_data: 'Payment data was incomplete. Please try enrolling again.',
  enrollment_failed:
    'Your payment was received but enrollment failed. Please contact support with your payment reference.',
};

export function getPaystackErrorMessage(code: string): string {
  return PAYSTACK_ERROR_MESSAGES[code] ?? 'A payment error occurred. Please contact support.';
}
