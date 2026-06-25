'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { enrollWithTimeout } from './enrollWithTimeout';
import { generatePaymentRef } from './generatePaymentRef';
import type { CourseSchema } from '@/lib/courses/courseTypes';

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '';

/**
 * lib/checkout/useCheckoutSubmission.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: own the 3 enrollment submission paths — free
 * course, Paystack-paid course, and "free after points/coupon discount"
 * — plus the shared processing/error/done state they all write to.
 *
 * On payment-confirmation failure (timeout or network error AFTER
 * Paystack's callback already fired), the error message always
 * prominently includes the payment reference and a support email, so
 * the person never wonders if they were charged without recourse —
 * this is the single most important UX property of a payment flow.
 */
interface UseCheckoutSubmissionArgs {
  /** Undefined when the course isn't found yet (still loading or
   *  invalid slug) — the hook still runs (rules of hooks require
   *  unconditional calls) but every handler no-ops without a course. */
  course: CourseSchema | undefined;
  hasPremium: boolean;
  selectedPlan: 'standard' | 'premium';
  totalKobo: number;
  couponApplied: boolean;
  coupon: string;
  pointsToApply: number;
  agreed: boolean;
}

export function useCheckoutSubmission({
  course,
  hasPremium,
  selectedPlan,
  totalKobo,
  couponApplied,
  coupon,
  pointsToApply,
  agreed,
}: UseCheckoutSubmissionArgs) {
  const { user, refreshBalance } = useAuth();
  const { enroll } = useCourses();

  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const purchaseType = hasPremium ? selectedPlan : 'standard';

  const handleSuccessfulEnrollment = (enrollmentId?: string) => {
    if (!course) return;
    enroll(course.slug, enrollmentId);
    refreshBalance();
    setDone(true);
  };

  /** Path 1: completely free course (no coupon/points involved). */
  const handleFreeEnroll = async () => {
    if (!agreed || !user || !course) return;
    setProcessing(true);
    setPaymentError('');

    try {
      const data = await enrollWithTimeout({ courseSlug: course.slug, isFree: true });
      if (data.enrolled) {
        handleSuccessfulEnrollment(data.enrollmentId);
      } else {
        setPaymentError(data.error ?? 'Enrollment failed. Please try again.');
      }
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.message === 'TIMEOUT';
      setPaymentError(
        isTimeout
          ? 'The request timed out — your internet connection may be slow. Please try again.'
          : 'A network error occurred. Please check your connection and try again.'
      );
    } finally {
      setProcessing(false);
    }
  };

  /** Path 2: a paid course fully covered by coupon + points (₦0 due). */
  const handleZeroAmountEnroll = async () => {
    if (!agreed || !user || !course || processing) return;
    setPaymentError('');
    setProcessing(true);

    try {
      const data = await enrollWithTimeout({
        courseSlug: course.slug,
        purchaseType,
        couponCode: couponApplied ? coupon : undefined,
        pointsApplied: pointsToApply > 0 ? pointsToApply : undefined,
      });
      if (data.enrolled) {
        handleSuccessfulEnrollment(data.enrollmentId);
      } else {
        setPaymentError(data.error ?? 'Enrollment failed. Please try again.');
      }
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.message === 'TIMEOUT';
      setPaymentError(isTimeout ? 'Request timed out. Please try again.' : 'Network error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  /** Path 3: a real Paystack payment via the inline popup. */
  const handlePaystackPay = (paystackReady: boolean) => {
    if (!agreed || !user || !course || processing) return;
    setPaymentError('');

    if (!paystackReady || !window.PaystackPop) {
      setPaymentError('The payment system is still loading. Please wait a moment and try again.');
      return;
    }
    if (!PAYSTACK_PUBLIC_KEY) {
      setPaymentError('Payment is not configured on this server. Please contact support@TITECX.com.');
      return;
    }

    const ref = generatePaymentRef(course.slug);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: totalKobo,
      currency: 'NGN',
      ref,
      metadata: {
        course_slug: course.slug,
        purchase_type: purchaseType,
        ...(couponApplied && coupon.trim() ? { coupon_code: coupon.trim().toUpperCase() } : {}),
        custom_fields: [
          { display_name: 'Course', variable_name: 'course', value: course.title },
          { display_name: 'Student', variable_name: 'student', value: user.name },
          { display_name: 'Plan', variable_name: 'plan', value: purchaseType },
        ],
      },

      // Paystack's SDK does not await this callback's return value, so
      // .then()/.catch() is used instead of async/await deliberately.
      callback(response: { reference: string }) {
        setProcessing(true);
        setPaymentError('');

        enrollWithTimeout({
          reference: response.reference,
          courseSlug: course.slug,
          purchaseType,
          couponCode: couponApplied ? coupon : undefined,
          pointsApplied: pointsToApply > 0 ? pointsToApply : undefined,
        })
          .then((data) => {
            if (data.enrolled) {
              handleSuccessfulEnrollment(data.enrollmentId);
            } else {
              setPaymentError(
                `Enrollment failed: ${data.error ?? 'Unknown error'}. ` +
                  `Your payment reference is ${response.reference}. ` +
                  `Email support@TITECX.com with this reference and we will enroll you.`
              );
            }
          })
          .catch((err: unknown) => {
            const isTimeout = err instanceof Error && err.message === 'TIMEOUT';
            setPaymentError(
              isTimeout
                ? `Request timed out on your current connection. Your payment reference is ` +
                  `${response.reference} — your money was received by Paystack. Email ` +
                  `support@TITECX.com with this reference and we will complete your enrollment.`
                : `Network error after payment. Your payment reference is ${response.reference}. ` +
                  `Email support@TITECX.com with this reference and we will enroll you manually.`
            );
          })
          .finally(() => setProcessing(false));
      },

      onClose() {
        setProcessing(false);
      },
    });

    // Disable the button before the popup opens so it can't be
    // double-clicked while Paystack's iframe is loading.
    setProcessing(true);
    handler.openIframe();
  };

  return {
    processing,
    done,
    paymentError,
    handleFreeEnroll,
    handleZeroAmountEnroll,
    handlePaystackPay,
  };
}
