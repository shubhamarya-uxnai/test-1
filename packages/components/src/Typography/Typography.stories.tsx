import type { Meta, StoryObj } from '@storybook/react';
import { textStyles } from '@puttshack/tokens/typography';

/**
 * Visual reference for every Figma Text Style, built directly from
 * tokens.typography.css / .kiosk.css / .mobile.css. Resize the viewport
 * (toolbar → Viewport) to see the Desktop → Kiosk (441–1024px) →
 * Mobile (≤440px) responsive overrides take effect live.
 */
function TypographyShowcase() {
  const groups: Array<{ title: string; keys: (keyof typeof textStyles)[] }> = [
    { title: 'Headline', keys: ['headlineXxLarge', 'headlineXLarge', 'headlineLarge', 'headlineMedium', 'headlineSmall'] },
    { title: 'Title', keys: ['titleLarge', 'titleLargeCapital', 'titleMedium', 'titleSmall', 'titleSmallCapital'] },
    { title: 'Body', keys: ['bodyLarge', 'bodyMedium', 'bodySmall'] },
    { title: 'Label', keys: ['labelLarge', 'labelMedium', 'labelSmall', 'labelXSmall'] },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32, maxWidth: 900 }}>
      {groups.map((group) => (
        <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              opacity: 0.5,
              margin: 0,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {group.title}
          </p>
          {group.keys.map((key) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 11,
                  color: 'var(--color-text-icon-tertiary)',
                  margin: 0,
                }}
              >
                .{textStyles[key]}
              </p>
              <p className={textStyles[key]} style={{ margin: 0, color: 'var(--color-text-icon-primary)' }}>
                Puttshack
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof TypographyShowcase> = {
  title: 'Foundations/Typography',
  component: TypographyShowcase,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component:
          'All 17 Figma Text Styles as CSS classes (text-headline-xx-large … text-label-x-small). Font size and line-height respond to viewport width: Desktop (default), Kiosk (441–1024px), Mobile (≤440px) — matching the same breakpoints as the spacing tokens.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypographyShowcase>;

export const AllStyles: Story = {};
