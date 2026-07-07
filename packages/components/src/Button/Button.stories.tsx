import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import {
  Plus,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Info,
  Calendar,
  ChevronRight,
} from '../icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pill-shaped button with 8 variants, 2 sizes, and full interactive states. Icons come from the design system icon set (Lucide — same set as the Figma library); the icon slot is sized by spacing tokens, so icons scale responsively across Desktop / Kiosk / Mobile.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'radio',
      options: ['default', 'large'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ─── Single interactive story ─────────────────────────────────────────── */

export const Playground: Story = {
  args: {
    leadingIcon: <Plus />,
    trailingIcon: <Plus />,
  },
};

/* ─── Size comparison ───────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Button size="default" leadingIcon={<Plus />} trailingIcon={<Plus />}>
        Default
      </Button>
      <Button size="large" leadingIcon={<Plus />} trailingIcon={<Plus />}>
        Large
      </Button>
    </div>
  ),
};

/* ─── All variants ──────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Default size */}
      <div>
        <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>
          Default Size
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['primary', 'secondary', 'tertiary', 'ghost', 'success', 'error', 'warning', 'info'] as const).map(
            (v) => (
              <Button key={v} variant={v} leadingIcon={<Plus />} trailingIcon={<Plus />}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Large size */}
      <div>
        <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>
          Large Size
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map((v) => (
            <Button key={v} variant={v} size="large" leadingIcon={<Plus />} trailingIcon={<Plus />}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>
          Disabled State
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map((v) => (
            <Button key={v} variant={v} disabled leadingIcon={<Plus />} trailingIcon={<Plus />}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ─── Icon gallery — different icons from the design system set ─────────── */

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Button variant="primary" trailingIcon={<ArrowRight />}>Book a game</Button>
      <Button variant="secondary" leadingIcon={<Calendar />}>Pick a date</Button>
      <Button variant="tertiary" trailingIcon={<ChevronRight />}>View menu</Button>
      <Button variant="ghost" trailingIcon={<ArrowRight />}>Learn more</Button>
    </div>
  ),
};

/* ─── Icon-only ─────────────────────────────────────────────────────────── */

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" aria-label="Add" leadingIcon={<Plus />} />
      <Button variant="secondary" aria-label="Confirm" leadingIcon={<Check />} />
      <Button variant="tertiary" aria-label="Close" leadingIcon={<X />} />
      <Button variant="ghost" aria-label="Next" leadingIcon={<ChevronRight />} />
    </div>
  ),
};

/* ─── Feedback variants ─────────────────────────────────────────────────── */

export const Feedback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="success" leadingIcon={<Check />}>Success</Button>
      <Button variant="error" leadingIcon={<X />}>Error</Button>
      <Button variant="warning" leadingIcon={<AlertTriangle />}>Warning</Button>
      <Button variant="info" leadingIcon={<Info />}>Info</Button>
    </div>
  ),
};
