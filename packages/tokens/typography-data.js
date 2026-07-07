/**
 * PuttShack Design System — Text Styles
 *
 * Hand-verified against Figma's 17 local text styles (Typography variable
 * collection, modes: Mobile / Desktop / Kiosk) via the Plugin API — not
 * derived from a DTCG JSON export, since Figma Text Styles (as opposed to
 * Variables) aren't exposed through that pipeline.
 *
 * fontWeight values (325 / 700) come from Figma's own dev-mode annotation
 * for the Ringside Regular "Book" and "Bold" cuts — not the CSS defaults.
 *
 * Known Figma authoring quirks, reproduced faithfully rather than "fixed":
 *   - title-small-capital is bound to line-height/large (28px desktop),
 *     not line-height/small (20px) like its sibling title-small.
 *   - label-x-small's line-height SHRINKS desktop vs mobile (14px→12px)
 *     while its font-size grows slightly (11px→12px) — inverted vs every
 *     other style, but genuinely what's bound in the file.
 */

export const FONT_FAMILY = 'Ringside Regular';

export const FONT_WEIGHT = {
  regular: 325,
  bold: 700,
};

// lineHeight values are pre-formatted CSS strings: px, unitless multiplier,
// or 'normal' (Figma's AUTO). letterSpacing is pre-converted from Figma's
// percent-of-font-size to CSS em (percent / 100).
export const TEXT_STYLES = [
  {
    key: 'headline-xx-large',
    jsName: 'headlineXxLarge',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0.02em',
    lineHeight: { mobile: '1.1', desktop: '1.1', kiosk: '1.1' },
    fontSize: { mobile: 64, desktop: 160, kiosk: 160 },
  },
  {
    key: 'headline-x-large',
    jsName: 'headlineXLarge',
    weight: 'regular',
    textCase: 'uppercase',
    letterSpacing: '0.02em',
    lineHeight: { mobile: '1.1', desktop: '1.1', kiosk: '1.1' },
    fontSize: { mobile: 48, desktop: 64, kiosk: 96 },
  },
  {
    key: 'headline-large',
    jsName: 'headlineLarge',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    lineHeight: { mobile: '40px', desktop: '60px', kiosk: '60px' },
    fontSize: { mobile: 32, desktop: 64, kiosk: 64 },
  },
  {
    key: 'headline-medium',
    jsName: 'headlineMedium',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    lineHeight: { mobile: '32px', desktop: '44px', kiosk: '44px' },
    fontSize: { mobile: 28, desktop: 40, kiosk: 40 },
  },
  {
    key: 'headline-small',
    jsName: 'headlineSmall',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    lineHeight: { mobile: 'normal', desktop: 'normal', kiosk: 'normal' },
    fontSize: { mobile: 24, desktop: 32, kiosk: 32 },
  },
  {
    key: 'title-large',
    jsName: 'titleLarge',
    weight: 'bold',
    textCase: 'none',
    letterSpacing: '0px',
    lineHeight: { mobile: '24px', desktop: '28px', kiosk: '28px' },
    fontSize: { mobile: 18, desktop: 24, kiosk: 24 },
  },
  {
    key: 'title-large-capital',
    jsName: 'titleLargeCapital',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    lineHeight: { mobile: '24px', desktop: '28px', kiosk: '28px' },
    fontSize: { mobile: 18, desktop: 24, kiosk: 24 },
  },
  {
    key: 'title-medium',
    jsName: 'titleMedium',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    lineHeight: { mobile: '22px', desktop: '24px', kiosk: '24px' },
    fontSize: { mobile: 16, desktop: 20, kiosk: 20 },
  },
  {
    key: 'title-small',
    jsName: 'titleSmall',
    weight: 'bold',
    textCase: 'none',
    letterSpacing: '0px',
    lineHeight: { mobile: '20px', desktop: '20px', kiosk: '20px' },
    fontSize: { mobile: 14, desktop: 16, kiosk: 18 },
  },
  {
    key: 'title-small-capital',
    jsName: 'titleSmallCapital',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    // Bound to line-height/large in Figma — see file header note.
    lineHeight: { mobile: '24px', desktop: '28px', kiosk: '28px' },
    fontSize: { mobile: 14, desktop: 16, kiosk: 18 },
  },
  {
    key: 'body-large',
    jsName: 'bodyLarge',
    weight: 'regular',
    textCase: 'none',
    letterSpacing: '0px',
    lineHeight: { mobile: '24px', desktop: '28px', kiosk: '28px' },
    fontSize: { mobile: 18, desktop: 24, kiosk: 24 },
  },
  {
    key: 'body-medium',
    jsName: 'bodyMedium',
    weight: 'regular',
    textCase: 'none',
    letterSpacing: '0px',
    lineHeight: { mobile: '22px', desktop: '24px', kiosk: '24px' },
    fontSize: { mobile: 16, desktop: 20, kiosk: 20 },
  },
  {
    key: 'body-small',
    jsName: 'bodySmall',
    weight: 'regular',
    textCase: 'none',
    letterSpacing: '0px',
    lineHeight: { mobile: '1.2', desktop: '1.2', kiosk: '1.2' },
    fontSize: { mobile: 14, desktop: 16, kiosk: 18 },
  },
  {
    key: 'label-large',
    jsName: 'labelLarge',
    weight: 'regular',
    textCase: 'uppercase',
    letterSpacing: '0.04em',
    lineHeight: { mobile: '16px', desktop: '16px', kiosk: '16px' },
    fontSize: { mobile: 12, desktop: 14, kiosk: 14 },
  },
  {
    key: 'label-medium',
    jsName: 'labelMedium',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    lineHeight: { mobile: '16px', desktop: '16px', kiosk: '16px' },
    fontSize: { mobile: 12, desktop: 14, kiosk: 14 },
  },
  {
    key: 'label-small',
    jsName: 'labelSmall',
    weight: 'regular',
    textCase: 'none',
    letterSpacing: '0px',
    lineHeight: { mobile: '16px', desktop: '16px', kiosk: '16px' },
    fontSize: { mobile: 12, desktop: 14, kiosk: 14 },
  },
  {
    key: 'label-x-small',
    jsName: 'labelXSmall',
    weight: 'bold',
    textCase: 'uppercase',
    letterSpacing: '0px',
    // Line-height shrinks desktop vs mobile — see file header note.
    lineHeight: { mobile: '14px', desktop: '12px', kiosk: '12px' },
    fontSize: { mobile: 11, desktop: 12, kiosk: 12 },
  },
];
