import type React from 'react';

/**
 * lib/forms/focusNextOnEnter.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: move focus to the next field on Enter instead
 * of submitting the form. Used on non-final form fields — the final
 * field lets the form's onSubmit handle Enter naturally.
 */
export function focusNextOnEnter(
  e: React.KeyboardEvent<HTMLInputElement>,
  nextRef: React.RefObject<HTMLInputElement | null>
) {
  if (e.key === 'Enter') {
    e.preventDefault(); // stop form submission
    nextRef.current?.focus();
  }
}
