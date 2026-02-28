import Cursor from './Cursor'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/Cursor',
  component: Cursor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: 'Global custom cursor overlay — a dot and trailing ring that replace the default browser cursor. The ring expands over interactive elements and stretches over text. Move the mouse over the demo areas below to see each state.',
      },
    },
  },
}

// ─── States reference ─────────────────────────────────────────────────────────

const StateCard = ({ label, description, children }) => (
  <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--surface)' }}>
    <div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold', color: 'var(--fg)' }}>{label}</div>
      <div style={{ fontFamily: 'Arial', fontSize: '12px', color: 'var(--fg)', opacity: 0.5, marginTop: '4px' }}>{description}</div>
    </div>
    {children}
  </div>
)

const DotRing = ({ dotSize, ringSize, ringOpacity = 0.5 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: dotSize, height: dotSize, borderRadius: '50%', backgroundColor: 'white', mixBlendMode: 'difference', outline: '1px solid rgba(0,0,0,0.15)' }} />
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)' }}>dot {dotSize}px</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: ringSize, height: ringSize, borderRadius: '50%', border: '1px solid var(--accent)', opacity: ringOpacity }} />
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)' }}>ring {ringSize}px</span>
    </div>
  </div>
)

export const StatesReference = {
  name: 'States Reference',
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', padding: '48px 32px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 32px' }}>
        Cursor states — dot (white, mix-blend-difference) + ring (brand accent)
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StateCard label="Default" description="Over non-interactive content">
          <DotRing dotSize={6} ringSize={34} ringOpacity={0.5} />
        </StateCard>
        <StateCard label="Pointer" description="Over buttons and links">
          <DotRing dotSize={10} ringSize={48} ringOpacity={0.9} />
        </StateCard>
        <StateCard label="Text" description="Over data-cursor='text' elements">
          <DotRing dotSize={6} ringSize={72} ringOpacity={0.4} />
        </StateCard>
      </div>
    </div>
  ),
}

// ─── Live demo ────────────────────────────────────────────────────────────────
// The Cursor component tracks real mouse position in the story canvas.
// Note: Storybook restores cursor:auto so the browser cursor remains visible
// alongside the custom one — this is expected in the preview environment.

export const LiveDemo = {
  name: 'Live Demo',
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', padding: '48px 32px' }}>
      {/* Cursor renders as a fixed overlay — it tracks your mouse in this canvas */}
      <Cursor />

      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 40px' }}>
        Move your mouse over each element type
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Default — plain text</span>
          <p style={{ fontFamily: 'Arial', fontSize: '16px', color: 'var(--fg)', margin: 0 }}>
            Plain body text. The ring stays at 34px with 50% opacity.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pointer — buttons and links</span>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button style={{ padding: '10px 20px', backgroundColor: 'var(--accent)', color: 'var(--on-accent)', border: 'none', borderRadius: '9999px', fontFamily: 'Arial', fontSize: '14px', cursor: 'none' }}>
              Button
            </button>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ padding: '10px 20px', color: 'var(--accent)', fontFamily: 'Arial', fontSize: '14px', cursor: 'none' }}>
              Anchor link
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Text state — data-cursor="text"</span>
          <p data-cursor="text" style={{ fontFamily: 'Arial', fontSize: '16px', color: 'var(--fg)', margin: 0, padding: '16px', border: '1px dashed var(--border)', borderRadius: '8px' }}>
            This paragraph has data-cursor="text". The ring expands to 72px to indicate selectable text.
          </p>
        </div>

      </div>
    </div>
  ),
}
