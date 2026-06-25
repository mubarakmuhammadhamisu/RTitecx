/**
 * lib/checkout/paystackTypes.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: TypeScript types for the Paystack Inline JS
 * SDK, loaded as a global `window.PaystackPop` by usePaystackScript.ts.
 */
export interface PaystackCustomField {
  display_name: string;
  variable_name: string;
  value: string;
}

export interface PaystackMetadata {
  course_slug: string;
  purchase_type: string;
  coupon_code?: string;
  custom_fields: PaystackCustomField[];
}

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata?: PaystackMetadata;
  callback(response: { reference: string }): void;
  onClose(): void;
}

declare global {
  interface Window {
    PaystackPop: {
      setup(options: PaystackOptions): { openIframe(): void };
    };
  }
}

// Required to make this file a module (not a script) so the `declare
// global` augmentation above applies correctly project-wide.
export {};
