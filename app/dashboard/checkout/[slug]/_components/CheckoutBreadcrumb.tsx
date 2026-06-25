import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

/**
 * CheckoutBreadcrumb — Courses > Course Title > Checkout trail.
 * Single Responsibility: this one breadcrumb only.
 */
export default function CheckoutBreadcrumb({ courseTitle, courseSlug }: { courseTitle: string; courseSlug: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-text-faint">
      <Link href="/dashboard/my-courses" className="hover:text-text-secondary transition flex items-center gap-1">
        <ArrowLeft size={14} /> Courses
      </Link>
      <ChevronRight size={14} />
      <Link href={`/courses/${courseSlug}`} className="hover:text-text-secondary transition truncate max-w-40">
        {courseTitle}
      </Link>
      <ChevronRight size={14} />
      <span className="text-text-secondary font-medium">Checkout</span>
    </div>
  );
}
