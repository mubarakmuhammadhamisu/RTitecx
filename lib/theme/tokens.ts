/**
 * lib/theme/tokens.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: export the design-token values as typed JS
 * constants for the rare cases a component needs a raw color value in
 * JavaScript (e.g. passing a hex to a charting library, or a video
 * provider's "player key color" setting).
 *
 * This file does NOT define new colors — it mirrors app/globals.css.
 * If you change a value here, change it in globals.css too (and vice
 * versa). They must never drift apart.
 * ────────────────────────────────────────────────────────────────────────
 */

export const brandGradients = {
  x: {
    from: '#4a97f0',
    via: '#3f2af8',
    to: '#4a97f0',
  },
  forge: {
    from: '#9c39f8',
    via: '#e62481',
    to: '#983af0',
  },
  cta: {
    from: '#6366f1', // indigo-500
    to: '#a855f7',   // purple-500
  },
} as const;

export const accentColors = {
  indigo: {
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
  },
  purple: {
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
  },
  pink: {
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
  },
} as const;

export const surfaceColors = {
  950: '#0a0a0f',
  900: '#111118',
  800: '#1a1a24',
  700: '#25252f',
  600: '#34343f',
} as const;

export const semanticColors = {
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  info: accentColors.indigo[400],
  bronze: '#b45309',
} as const;

/** Default chart/player accent — used as the fallback "key color" for any
 *  video provider settings panel that requires a hex value (e.g. Bunny's
 *  PlayerKeyColor field). */
export const playerAccentDefault = accentColors.indigo[500];
