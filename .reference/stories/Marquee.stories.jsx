import Marquee from './Marquee'

const skills  = ['Product Design', 'UX Research', 'Design Systems', 'Prototyping', 'Developer Handoff']
const extended = [...skills, 'Interaction Design', 'Accessibility', 'Design Tokens', 'Figma', 'React']

// Adaptive — background follows the theme toolbar via var(--bg)
const Wrapper = ({ children }) => (
  <div style={{ backgroundColor: 'var(--bg)', padding: '48px 0', color: 'var(--fg)' }}>
    {children}
  </div>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of strings to scroll. The list is duplicated internally for a seamless loop.',
    },
    speed: {
      control: { type: 'range', min: 10, max: 120, step: 5 },
      description: 'Duration in seconds for one full loop cycle. Higher number = slower scroll.',
    },
    className: { control: false, table: { disable: true } },
  },
}

// ─── Default — interactive, use the Controls panel to explore ─────────────────

export const Default = {
  decorators: [(Story) => <Wrapper><Story /></Wrapper>],
  args: { items: skills, speed: 30 },
}

// ─── Speed comparison ─────────────────────────────────────────────────────────

export const SpeedComparison = {
  name: 'Speed Comparison',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      {[{ speed: 15, label: 'Fast — 15s' }, { speed: 30, label: 'Default — 30s' }, { speed: 60, label: 'Slow — 60s' }].map(({ speed, label }) => (
        <div key={speed} style={{ borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.4)', margin: '0', padding: '12px 24px 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {label}
          </p>
          <div style={{ paddingBottom: '12px' }}>
            <Marquee items={skills} speed={speed} />
          </div>
        </div>
      ))}
    </Wrapper>
  ),
}

// ─── Extended list ────────────────────────────────────────────────────────────

export const ExtendedList = {
  name: 'Extended List (10 items)',
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <Wrapper><Story /></Wrapper>],
  args: { items: extended, speed: 45 },
  render: (args) => <Marquee {...args} />,
}
