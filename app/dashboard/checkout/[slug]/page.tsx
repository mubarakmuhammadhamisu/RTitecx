'use client';

import React, { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { usePaystackScript } from '@/lib/checkout/usePaystackScript';
import { usePointsEnabledFlag } from '@/lib/checkout/usePointsEnabledFlag';
import { useCouponForm } from '@/lib/checkout/useCouponForm';
import { usePointsForm } from '@/lib/checkout/usePointsForm';
import { useCheckoutSubmission } from '@/lib/checkout/useCheckoutSubmission';
import { computeCheckoutPricing, parsePriceString } from '@/lib/checkout/computeCheckoutPricing';
import '@/lib/checkout/paystackTypes'; // augments the global Window type
import CheckoutCourseNotFoundState from './_components/CheckoutCourseNotFoundState';
import CheckoutSuccessScreen from './_components/CheckoutSuccessScreen';
import CheckoutBreadcrumb from './_components/CheckoutBreadcrumb';
import FreeCourseSection from './_components/FreeCourseSection';
import PaidCourseSection from './_components/PaidCourseSection';
import OrderSummarySidebar from './_components/OrderSummarySidebar';

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * /dashboard/checkout/[slug] — full checkout flow. Composes section
 * components; all business logic (pricing, Paystack, coupon/points
 * forms, submission paths) is delegated to lib/checkout/ hooks. This
 * file's only job is wiring those hooks' outputs into the right
 * sub-components.
 */
export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = React.use(params);
  const { user } = useAuth();
  const { courses } = useCourses();

  const course = useMemo(() => courses.find((c) => c.slug === slug), [courses, slug]);

  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('standard');
  const [agreed, setAgreed] = useState(false);

  const isFree = course?.price === 'Free';
  const { ready: paystackReady, loadError: paystackLoadError } = usePaystackScript();
  const pointsEnabled = usePointsEnabledFlag(user?.id, isFree);

  const couponForm = useCouponForm();
  const handleSelectPlan = (plan: 'standard' | 'premium') => {
    setSelectedPlan(plan);
    couponForm.resetCoupon();
  };

  const hasPremium = !!course?.premiumPrice;
  const activePriceString = hasPremium && selectedPlan === 'premium' ? course!.premiumPrice! : (course?.price ?? '');
  const numericPrice = parsePriceString(activePriceString);
  const numericStandardPrice = parsePriceString(course?.price ?? '');
  const numericPremiumPrice = parsePriceString(course?.premiumPrice ?? '');

  // afterCoupon depends only on price + coupon, never on points — so it
  // can be computed directly without needing a placeholder pricing call.
  const couponDiscount = couponForm.couponApplied
    ? Math.floor((numericPrice * couponForm.discountPercent) / 100)
    : 0;
  const afterCoupon = numericPrice - couponDiscount;

  // NOTE: all hooks below this line must run unconditionally on every
  // render, regardless of whether `course` was found — the
  // course-not-found early return happens AFTER this point, never
  // before, to satisfy React's rules of hooks (a hook count that
  // differs between renders is undefined behavior).
  const pointsForm = usePointsForm(user?.creditBalance ?? 0, afterCoupon);

  const pricing = computeCheckoutPricing(
    numericPrice,
    couponForm.couponApplied,
    couponForm.discountPercent,
    pointsForm.pointsToApply
  );

  // useCheckoutSubmission must still be called unconditionally (rules of
  // hooks) even when `course` is undefined — it accepts `course:
  // CourseSchema | undefined` and no-ops internally when course is
  // missing, since none of its handlers are reachable from the UI in
  // that case anyway (we render CheckoutCourseNotFoundState instead).
  const submission = useCheckoutSubmission({
    course,
    hasPremium,
    selectedPlan,
    totalKobo: pricing.finalKobo,
    couponApplied: couponForm.couponApplied,
    coupon: couponForm.coupon,
    pointsToApply: pointsForm.pointsToApply,
    agreed,
  });

  if (!course) return <CheckoutCourseNotFoundState />;

  if (submission.done) {
    return <CheckoutSuccessScreen courseTitle={course.title} courseSlug={course.slug} />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <CheckoutBreadcrumb courseTitle={course.title} courseSlug={course.slug} />

      <div>
        <h1 className="text-2xl font-extrabold text-text-primary">Complete Your Enrollment</h1>
        <p className="text-text-muted text-sm mt-1">You&apos;re one step away from unlocking this course.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3">
          {isFree ? (
            <FreeCourseSection
              agreed={agreed}
              onToggleAgreed={() => setAgreed((v) => !v)}
              paymentError={submission.paymentError}
              processing={submission.processing}
              onEnroll={submission.handleFreeEnroll}
            />
          ) : (
            user && (
              <PaidCourseSection
                course={course}
                user={user}
                hasPremium={hasPremium}
                selectedPlan={selectedPlan}
                onSelectPlan={handleSelectPlan}
                numericStandardPrice={numericStandardPrice}
                numericPremiumPrice={numericPremiumPrice}
                numericPrice={numericPrice}
                pricing={pricing}
                paystackReady={paystackReady}
                paystackLoadError={paystackLoadError}
                coupon={couponForm.coupon}
                onCouponChange={couponForm.handleCouponChange}
                onApplyCoupon={couponForm.applyCoupon}
                couponApplied={couponForm.couponApplied}
                discountPercent={couponForm.discountPercent}
                couponError={couponForm.couponError}
                pointsEnabled={pointsEnabled}
                pointsInput={pointsForm.pointsInput}
                onPointsInputChange={pointsForm.handlePointsInputChange}
                onMaxPoints={pointsForm.handleMaxPoints}
                onApplyPoints={pointsForm.applyPoints}
                pointsToApply={pointsForm.pointsToApply}
                pointsError={pointsForm.pointsError}
                agreed={agreed}
                onToggleAgreed={() => setAgreed((v) => !v)}
                paymentError={submission.paymentError}
                processing={submission.processing}
                onZeroAmountEnroll={submission.handleZeroAmountEnroll}
                onPaystackPay={() => submission.handlePaystackPay(paystackReady)}
              />
            )
          )}
        </div>

        <OrderSummarySidebar
          course={course}
          isFree={isFree}
          numericPrice={numericPrice}
          pricing={pricing}
          couponApplied={couponForm.couponApplied}
          hasPremium={hasPremium}
          selectedPlan={selectedPlan}
        />
      </div>
    </div>
  );
}
