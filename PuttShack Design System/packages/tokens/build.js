/**
 * PuttShack Design System — Token Build
 * Runs Style Dictionary against Figma DTCG exports to produce:
 *   build/css/tokens.css        → :root CSS custom properties (light + desktop)
 *   build/css/tokens.dark.css   → [data-theme="dark"] overrides
 *   build/css/tokens.mobile.css → @media (max-width: 440px) spacing overrides
 *   build/js/tokens.js          → ES module with all semantic token values
 *   build/js/tokens.d.ts        → TypeScript declaration
 *   build/tailwind/preset.js    → Tailwind CSS preset
 */

import path from 'path';
import { fileURLToPath } from 'url';
import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const EXTRACTED = path.join(REPO_ROOT, 'Design Tokens JSON', 'extracted');

// ─────────────────────────────────────────────
// Source file paths
// ─────────────────────────────────────────────
const SRC = {
  colorLight:     path.join(EXTRACTED, 'Colors - Semantic', 'Light.tokens.json'),
  colorDark:      path.join(EXTRACTED, 'Colors - Semantic', 'Dark.tokens.json'),
  spacingDesktop: path.join(EXTRACTED, 'Spacing- Semantic', 'Desktop.tokens.json'),
  spacingMobile:  path.join(EXTRACTED, 'Spacing- Semantic', 'Mobile.tokens.json'),
};

// ─────────────────────────────────────────────
// Figma-internal tokens to exclude from build
// ─────────────────────────────────────────────
const FIGMA_INTERNAL = new Set([
  'Screen Width', 'Mobile 0', 'Desktop 0', 'Kiosk 0', 'Kiosk 1', 'Mode',
]);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * Convert Figma's DTCG color object → CSS color string.
 * Figma exports color $value as: { colorSpace, components, alpha, hex }
 * Solid colors use hex; transparent use rgba().
 */
function figmaColorToCSS(value) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return String(value);
  const { components, alpha, hex } = value;
  if (alpha !== undefined && alpha < 0.9999) {
    const [r, g, b] = components;
    const a = Math.round(alpha * 100) / 100;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
  }
  return hex || String(value);
}

/**
 * Sanitize a token path array into a CSS-safe kebab name.
 * "Text + Icon" / "Top-Vertical" / "X-Small" all become valid identifiers.
 */
function sanitizePath(pathArr, prefix) {
  const name = pathArr
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return prefix ? `${prefix}-${name}` : name;
}

// ─────────────────────────────────────────────
// Register custom transforms
// ─────────────────────────────────────────────

StyleDictionary.registerTransform({
  name: 'color/figma',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => figmaColorToCSS(token.$value),
});

// Renamed away from 'size/px' to avoid collision with SD's built-in transform.
// We also handle the conversion in our custom formats directly (more reliable).
StyleDictionary.registerTransform({
  name: 'ps/size-px',
  type: 'value',
  filter: (token) => token.$type === 'number',
  transform: (token) => `${token.$value}px`,
});

/**
 * Single name transform for all PuttShack tokens.
 * Adds 'color-' prefix for color type, 'spacing-' for numeric type.
 */
StyleDictionary.registerTransform({
  name: 'name/puttshack',
  type: 'name',
  transform: (token) => {
    const prefix = token.$type === 'color' ? 'color' : 'spacing';
    return sanitizePath(token.path, prefix);
  },
});

// ─────────────────────────────────────────────
// Register custom filters
// ─────────────────────────────────────────────

StyleDictionary.registerFilter({
  name: 'filter/figma-internal',
  filter: (token) => !FIGMA_INTERNAL.has(token.path[0]),
});

// ─────────────────────────────────────────────
// Register custom formats
// ─────────────────────────────────────────────

StyleDictionary.registerFormat({
  name: 'css/media-query',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file });
    const vars = dictionary.allTokens
      .map((t) => {
        const val = typeof t.$value === 'number' ? `${t.$value}px` : t.$value;
        return `    --${t.name}: ${val};`;
      })
      .join('\n');
    return `${header}${options.mediaQuery} {\n  :root {\n${vars}\n  }\n}\n`;
  },
});

// Custom CSS variables format that handles number→px conversion directly.
// Replaces the built-in css/variables for spacing to guarantee px units.
StyleDictionary.registerFormat({
  name: 'css/variables-px',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file });
    const selector = options.selector || ':root';
    const vars = dictionary.allTokens
      .map((t) => {
        const val = typeof t.$value === 'number' ? `${t.$value}px` : t.$value;
        return `  --${t.name}: ${val};`;
      })
      .join('\n');
    return `${header}${selector} {\n${vars}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'js/es-module',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const consts = dictionary.allTokens
      .map((t) => {
        const key = t.name
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const val = typeof t.$value === 'string'
          ? JSON.stringify(t.$value)
          : t.$value;
        return `export const ${key} = ${val};`;
      })
      .join('\n');
    return `${header}${consts}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/declarations',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const decls = dictionary.allTokens
      .map((t) => {
        const key = t.name
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const type = typeof t.$value === 'number' ? 'number' : 'string';
        return `export declare const ${key}: ${type};`;
      })
      .join('\n');
    return `${header}${decls}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: async ({ dictionary }) => {
    // Flat key-value: avoids path collisions like "inverse" vs "inverse-subtle"
    const colors = {};
    const spacing = {};

    dictionary.allTokens.forEach((t) => {
      if (t.name.startsWith('color-')) {
        colors[t.name.slice('color-'.length)] = `var(--${t.name})`;
      } else if (t.name.startsWith('spacing-')) {
        spacing[t.name.slice('spacing-'.length)] = `var(--${t.name})`;
      }
    });

    const lines = [
      '// Auto-generated by @puttshack/tokens build — do not edit',
      "/** @type {import('tailwindcss').Config} */",
      'export default {',
      '  theme: {',
      '    extend: {',
      '      colors: {',
      ...Object.entries(colors).map(([k, v]) => `        '${k}': '${v}',`),
      '      },',
      '      spacing: {',
      ...Object.entries(spacing).map(([k, v]) => `        '${k}': '${v}',`),
      '      },',
      '    },',
      '  },',
      '};',
      '',
    ];
    return lines.join('\n');
  },
});

// ─────────────────────────────────────────────
// Build functions
// ─────────────────────────────────────────────

async function buildColors(sourcePath, outputFile, selector, label) {
  console.log(`\n→ Building ${label} colors…`);
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent' },
    source: [sourcePath],
    platforms: {
      css: {
        transforms: ['color/figma', 'name/puttshack'],
        buildPath: 'build/css/',
        files: [
          {
            destination: outputFile,
            format: 'css/variables',
            filter: 'filter/figma-internal',
            options: { selector },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  console.log(`  ✓ build/css/${outputFile}`);
}

async function buildSpacing(sourcePath, outputFile, isMediaQuery) {
  const label = isMediaQuery ? 'mobile' : 'desktop';
  console.log(`\n→ Building ${label} spacing…`);
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent' },
    source: [sourcePath],
    platforms: {
      css: {
        transforms: ['ps/size-px', 'name/puttshack'],
        buildPath: 'build/css/',
        files: isMediaQuery
          ? [
              {
                destination: outputFile,
                format: 'css/media-query',
                filter: 'filter/figma-internal',
                options: { mediaQuery: '@media (max-width: 440px)' },
              },
            ]
          : [
              {
                destination: outputFile,
                format: 'css/variables-px',
                filter: 'filter/figma-internal',
                options: { selector: ':root' },
              },
            ],
      },
    },
  });
  await sd.buildAllPlatforms();
  console.log(`  ✓ build/css/${outputFile}`);
}

async function buildJS() {
  console.log('\n→ Building JS/TS tokens…');
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent' },
    source: [SRC.colorLight, SRC.spacingDesktop],
    platforms: {
      js: {
        transforms: ['color/figma', 'ps/size-px', 'name/puttshack'],
        buildPath: 'build/js/',
        files: [
          {
            destination: 'tokens.js',
            format: 'js/es-module',
            filter: 'filter/figma-internal',
          },
          {
            destination: 'tokens.d.ts',
            format: 'typescript/declarations',
            filter: 'filter/figma-internal',
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  console.log('  ✓ build/js/tokens.js');
  console.log('  ✓ build/js/tokens.d.ts');
}

async function buildTailwindPreset() {
  console.log('\n→ Building Tailwind preset…');
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent' },
    source: [SRC.colorLight, SRC.spacingDesktop],
    platforms: {
      tailwind: {
        // Unified name transform: color→'color-' prefix, number→'spacing-' prefix
        transforms: ['color/figma', 'ps/size-px', 'name/puttshack'],
        buildPath: 'build/tailwind/',
        files: [
          {
            destination: 'preset.js',
            format: 'tailwind/preset',
            filter: 'filter/figma-internal',
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  console.log('  ✓ build/tailwind/preset.js');
}

// ─────────────────────────────────────────────
// Run all builds
// ─────────────────────────────────────────────

async function run() {
  console.log('PuttShack Design System — Token Build\n');

  await Promise.all([
    buildColors(SRC.colorLight,  'tokens.css',      ':root',              'light'),
    buildColors(SRC.colorDark,   'tokens.dark.css', '[data-theme="dark"]','dark'),
    buildSpacing(SRC.spacingDesktop, 'tokens.spacing.css',        false),
    buildSpacing(SRC.spacingMobile,  'tokens.mobile.css',         true),
    buildJS(),
    buildTailwindPreset(),
  ]);

  console.log('\n✓ All tokens built successfully.\n');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
