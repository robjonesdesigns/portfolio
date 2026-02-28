import CircleLetters from './CircleLetters'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/CircleLetters',
  component: CircleLetters,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: 'Hero name animation — "Rob Jones" rendered as an SVG where the letterforms are filled with inscribed circles of varying sizes. Uses a canvas-based pixel sampling algorithm to place circles that fit within each letter\'s ink boundary. Circles reveal with a staggered animation and pulse continuously. Requires the Ogg font to be loaded.',
      },
    },
  },
}

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default = {
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <CircleLetters />
    </div>
  ),
}

// ─── On dark ─────────────────────────────────────────────────────────────────

export const OnDark = {
  name: 'On Dark',
  render: () => (
    <div className="dark" style={{ backgroundColor: '#1c1a16', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <CircleLetters />
    </div>
  ),
}
