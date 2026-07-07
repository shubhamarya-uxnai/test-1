import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { Calendar, Search } from '../icons';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Input Field with two presentations mirroring the Figma Kiosk / Not-Kiosk toggles: a filled box on Desktop (>1024px) and Mobile (≤440px), and a fieldset-style outline on Kiosk viewports (441–1024px). States: Default (empty), Typing (focus, magenta), Typed (filled), Error, Disabled, Inverse. Resize the viewport to watch it switch automatically — or force a presentation with the `mode` prop.',
      },
    },
  },
  argTypes: {
    mode: { control: 'radio', options: ['auto', 'boxed', 'kiosk'] },
    error: { control: 'boolean' },
    inverse: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    helperText: 'Helper Text',
    placeholder: 'Input Text',
    required: true,
    mode: 'boxed',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

/* ─── Playground ────────────────────────────────────────────────────────── */

export const Playground: Story = {
  parameters: { backgrounds: { default: 'light' } },
  args: {
    leadingIcon: <Calendar />,
  },
  render: (args) => (
    <div style={{ maxWidth: 374 }}>
      <InputField {...args} />
    </div>
  ),
};

/* ─── All states — boxed (Desktop / Mobile) ─────────────────────────────── */

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 374 }}>
      <InputField label="Default" helperText="Helper Text" placeholder="Input Text" required leadingIcon={<Calendar />} mode="boxed" />
      <InputField label="Typed" helperText="Helper Text" defaultValue="Input Text" required leadingIcon={<Calendar />} mode="boxed" />
      <InputField label="Error" helperText="Helper Text" placeholder="Input Text" required error leadingIcon={<Calendar />} mode="boxed" />
      <InputField label="Disabled" helperText="Helper Text" placeholder="Input Text" required disabled leadingIcon={<Calendar />} mode="boxed" />
    </div>
  ),
};

/* ─── Inverse — on a dark surface ───────────────────────────────────────── */

export const Inverse: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 374, padding: 32, background: '#0E0115' }}>
      <InputField label="Inverse" helperText="Helper Text" placeholder="Input Text" required inverse leadingIcon={<Calendar />} mode="boxed" />
      <InputField label="Inverse Typed" helperText="Helper Text" defaultValue="Input Text" required inverse leadingIcon={<Calendar />} mode="boxed" />
    </div>
  ),
};

/* ─── Kiosk presentation — fieldset outline on dark ─────────────────────── */

export const Kiosk: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, maxWidth: 500, padding: 48, background: '#0E0115' }}>
      <InputField label="Default" helperText="Helper Text" placeholder="Input Text" required leadingIcon={<Calendar />} mode="kiosk" />
      <InputField label="Typed" helperText="Helper Text" defaultValue="Input Text" required leadingIcon={<Calendar />} mode="kiosk" />
      <InputField label="Error" helperText="Helper Text" defaultValue="Input Text" required error leadingIcon={<Calendar />} mode="kiosk" />
      <InputField label="Disabled" helperText="Helper Text" placeholder="Input Text" required disabled leadingIcon={<Calendar />} mode="kiosk" />
    </div>
  ),
};

/* ─── Kiosk × Inverse — dark-on-light kiosk surfaces ────────────────────── */

export const KioskInverse: Story = {
  render: () => (
    <div style={{ maxWidth: 500, padding: 48 }}>
      <InputField label="Inverse" helperText="Helper Text" defaultValue="Input Text" required inverse leadingIcon={<Calendar />} mode="kiosk" />
    </div>
  ),
};

/* ─── Responsive (auto) — resize the viewport to switch presentation ────── */

export const ResponsiveAuto: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'mode="auto": boxed on Desktop/Mobile, kiosk outline between 441–1024px. Use the Storybook viewport toolbar to test.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <InputField label="Label" helperText="Helper Text" placeholder="Input Text" required leadingIcon={<Search />} mode="auto" />
    </div>
  ),
};
