import Container from './Container'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Shared horizontal rhythm wrapper. Provides `max-width` and `px-6 md:px-10` padding consistently across every page and section. The outer `<section>` or `<main>` owns vertical padding; `Container` handles everything else.\n\n' +
          '| `size` | max-width | used by |\n' +
          '|--------|-----------|--------|\n' +
          '| `lg` | 72rem (1152px) | Homepage sections — default |\n' +
          '| `md` | 56rem (896px) | Resume, Case Study hero |\n' +
          '| `sm` | 48rem (768px) | Case Study long-form content |',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'Sets the `max-width` tier.',
      table: { defaultValue: { summary: 'lg' } },
    },
    as:        { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
    children:  { control: false, table: { disable: true } },
  },
}

// ─── Swatch helper ────────────────────────────────────────────────────────────

const labels = {
  lg: 'size="lg" — max-w-6xl (72rem) — homepage sections',
  md: 'size="md" — max-w-4xl (56rem) — resume, case study hero',
  sm: 'size="sm" — max-w-3xl (48rem) — case study content',
}

function Swatch({ size }) {
  return (
    <div style={{ backgroundColor: 'var(--bg)', padding: '32px 0' }}>
      <Container size={size}>
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px dashed var(--border)',
            borderRadius: 8,
            padding: '16px 24px',
            fontFamily: 'monospace',
            fontSize: 13,
            color: 'var(--fg)',
          }}
        >
          {labels[size]}
        </div>
      </Container>
    </div>
  )
}

// ─── Default (controls) ───────────────────────────────────────────────────────

export const Default = {
  args: { size: 'lg' },
  render: ({ size }) => <Swatch size={size} />,
}

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes = {
  name: 'All Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Swatch size="lg" />
      <Swatch size="md" />
      <Swatch size="sm" />
    </div>
  ),
}
