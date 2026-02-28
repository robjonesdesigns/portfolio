import Badge from './Badge'

const tags = ['Product Design', 'UX Research', 'Design Systems', 'B2B SaaS', 'Mobile-First']

// Adaptive — background follows the theme toolbar via var(--bg)
const Wrapper = ({ children }) => (
  <div className="px-6 md:px-10 lg:px-14 py-8" style={{ backgroundColor: 'var(--surface)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {children}
  </div>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    children:  { control: 'text',   description: 'Badge label' },
    variant:   { control: 'select', options: ['default', 'accent'], description: 'Visual style' },
    className: { control: false, table: { disable: true } },
  },
}

// ─── Default — interactive, use the Controls panel to explore ─────────────────

export const Default = {
  decorators: [(Story) => <Wrapper><Story /></Wrapper>],
  args: { children: 'Product Design', variant: 'default' },
}

// ─── Individual variants — adaptive (theme toolbar switches light/dark) ────────

export const DefaultVariant = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      {tags.map(t => <Badge key={t}>{t}</Badge>)}
    </Wrapper>
  ),
}

export const Accent = {
  name: 'Accent',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      {tags.map(t => <Badge key={t} variant="accent">{t}</Badge>)}
    </Wrapper>
  ),
}

// ─── All variants — both themes, comparison reference ─────────────────────────

export const BothVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="px-6 md:px-10 lg:px-14 py-8" style={{ backgroundColor: '#f7f3f5' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.8)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Light</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {tags.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.map(t => <Badge key={`a-${t}`} variant="accent">{t}</Badge>)}
        </div>
      </div>
      <div className="dark px-6 md:px-10 lg:px-14 py-8" style={{ backgroundColor: '#252220' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(255,251,245,0.8)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dark</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {tags.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.map(t => <Badge key={`a-${t}`} variant="accent">{t}</Badge>)}
        </div>
      </div>
    </div>
  ),
}
