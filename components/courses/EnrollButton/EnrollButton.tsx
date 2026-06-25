'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import EnrolledStateButton from './EnrolledStateButton';
import NotEnrolledStateButton from './NotEnrolledStateButton';

/**
 * EnrollButton — composes the two button states and owns the click
 * routing logic (go to course / go to login / go to checkout).
 *
 * CORRECTED from the original codebase: `isEnrolled` now reads from
 * useCourses() rather than useAuth(), matching this rewrite's
 * AuthContext/CoursesContext split (see context/readme.md).
 */
interface EnrollButtonProps {
  slug: string;
  price: string;
}

export default function EnrollButton({ slug, price }: EnrollButtonProps) {
  const { user } = useAuth();
  const { isEnrolled } = useCourses();
  const router = useRouter();
  const isFree = price === 'Free';
  const alreadyEnrolled = isEnrolled(slug);

  // Prevents double-tap / double-click from firing two navigations. The
  // component unmounts on successful navigation so no reset is needed.
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    if (alreadyEnrolled) {
      router.push(`/dashboard/courses/${slug}`);
      return;
    }
    if (!user) {
      router.push(`/login?redirect=/courses/${slug}`);
      return;
    }
    router.push(`/dashboard/checkout/${slug}`);
  };

  if (alreadyEnrolled) {
    return <EnrolledStateButton isNavigating={isNavigating} onClick={handleClick} />;
  }

  return (
    <NotEnrolledStateButton isNavigating={isNavigating} isFree={isFree} onClick={handleClick} />
  );
}
