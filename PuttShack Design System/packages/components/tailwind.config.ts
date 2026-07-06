import type { Config } from 'tailwindcss';
import puttshackPreset from '@puttshack/tokens/tailwind';

export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  presets: [puttshackPreset],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Ringside Regular"', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        book: '400',
        bold: '700',
      },
    },
  },
} satisfies Config;
