import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import { Copy, Check, User, Mail } from '../icons';

/**
 * Example screen composing design system components:
 * two Input Fields + a Button with a copy icon.
 *
 * Layout spacing uses container/gap tokens, so the screen
 * adapts across Desktop / Kiosk / Mobile automatically.
 */
function ShareBookingScreen() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const inviteLink = `https://puttshack.com/invite?by=${encodeURIComponent(name || 'guest')}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — still show feedback */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-level-3-gap)',
        paddingTop: 'var(--spacing-container-top-vertical)',
        paddingBottom: 'var(--spacing-container-bottom-vertical)',
        paddingLeft: 'var(--spacing-container-horizontal)',
        paddingRight: 'var(--spacing-container-horizontal)',
      }}
    >
      <h1
        style={{
          fontFamily: "'Ringside Regular', system-ui, sans-serif",
          fontSize: 24,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--color-text-icon-primary)',
          margin: 0,
        }}
      >
        Share your booking
      </h1>

      <InputField
        label="Name"
        placeholder="Your name"
        required
        leadingIcon={<User />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onClear={() => setName('')}
        helperText="Shown to the friends you invite"
      />

      <InputField
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        leadingIcon={<Mail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onClear={() => setEmail('')}
        helperText="We'll send you a copy of the invite"
      />

      <div>
        <Button
          variant={copied ? 'success' : 'primary'}
          leadingIcon={copied ? <Check /> : <Copy />}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy invite link'}
        </Button>
      </div>
    </div>
  );
}

const meta: Meta<typeof ShareBookingScreen> = {
  title: 'Screens/Share Booking',
  component: ShareBookingScreen,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component:
          'Composition example: two Input Fields and a Button with a copy icon. The button copies an invite link and flips to the success variant for 2 seconds. All spacing comes from container/gap tokens, so the layout adapts across breakpoints.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShareBookingScreen>;

export const Default: Story = {};
