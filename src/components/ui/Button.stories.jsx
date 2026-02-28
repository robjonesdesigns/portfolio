import { Fragment } from 'react'
import Button from './Button'

// ─── Wrappers ──────────────────────────────────────────────────────────────────

// Adaptive — background follows the theme toolbar via var(--bg)
const Wrapper = ({ children }) => (
  <div className="px-6 md:px-10 lg:px-14 py-12" style={{ backgroundColor: 'var(--bg)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    {children}
  </div>
)

// Hardcoded light + dark pair — used only in comparison stories
const Light = ({ children }) => (
  <div className="px-6 md:px-10 lg:px-14 py-12" style={{ backgroundColor: '#fffbf5', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    {children}
  </div>
)
const Dark = ({ children }) => (
  <div className="dark px-6 md:px-10 lg:px-14 py-12" style={{ backgroundColor: '#1c1a16', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    {children}
  </div>
)
const Section = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{label} — Light</p>
    </div>
    <Light>{children}</Light>
    <div className="dark" style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{label} — Dark</p>
    </div>
    <Dark>{children}</Dark>
  </div>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    children:  { control: 'text',   description: 'Button label' },
    variant:   { control: 'select', options: ['primary', 'secondary', 'tertiary', 'link'], description: 'Visual style' },
    size:      { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size — ignored for link variant' },
    disabled:  { control: 'boolean' },
    as:        { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
  },
}

// ─── Default — interactive, use the Controls panel to explore ─────────────────

export const Default = {
  decorators: [(Story) => <Wrapper><Story /></Wrapper>],
  args: { children: 'View Work', variant: 'primary', size: 'md' },
}

// ─── Individual variants — adaptive (theme toolbar switches light/dark) ────────

export const Primary = {
  name: 'Primary',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Default</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </Wrapper>
  ),
}

export const Secondary = {
  name: 'Secondary',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      <Button variant="secondary" size="sm">Small</Button>
      <Button variant="secondary" size="md">Default</Button>
      <Button variant="secondary" size="lg">Large</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </Wrapper>
  ),
}

export const Tertiary = {
  name: 'Tertiary',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      <Button variant="tertiary" size="sm">Small</Button>
      <Button variant="tertiary" size="md">Default</Button>
      <Button variant="tertiary" size="lg">Large</Button>
      <Button variant="tertiary" disabled>Disabled</Button>
    </Wrapper>
  ),
}

export const LinkVariant = {
  name: 'Link',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      <Button variant="link">View Case Study →</Button>
      <Button variant="link">Download Resume ↓</Button>
      <Button variant="link">hello@robjones.design →</Button>
      <Button variant="link" disabled>Disabled</Button>
    </Wrapper>
  ),
}

export const CTAPair = {
  name: 'CTA Pair (Hero)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      <Button variant="primary">View Work ↓</Button>
      <Button variant="secondary">Get in Touch →</Button>
    </Wrapper>
  ),
}

export const AsAnchor = {
  name: 'As Anchor',
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrapper>
      <Button as="a" href="#" variant="primary">Primary Link</Button>
      <Button as="a" href="#" variant="secondary">Secondary Link</Button>
      <Button as="a" href="#" variant="link">Text Link →</Button>
    </Wrapper>
  ),
}

// ─── All variants — both themes, comparison reference ─────────────────────────

export const AllVariants = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Section label="Primary">
        <Button variant="primary">View Work</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Section>
      <Section label="Secondary">
        <Button variant="secondary">Get in Touch</Button>
        <Button variant="secondary" size="sm">Small</Button>
        <Button variant="secondary" size="lg">Large</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </Section>
      <Section label="Tertiary">
        <Button variant="tertiary">Learn More</Button>
        <Button variant="tertiary" size="sm">Small</Button>
        <Button variant="tertiary" size="lg">Large</Button>
        <Button variant="tertiary" disabled>Disabled</Button>
      </Section>
      <Section label="Link">
        <Button variant="link">View Case Study →</Button>
        <Button variant="link">Download Resume ↓</Button>
        <Button variant="link" disabled>Disabled</Button>
      </Section>
    </div>
  ),
}

// ─── Hover & Focus States — both themes, comparison reference ─────────────────

const ROWS = [
  { variant: 'primary',   label: 'Primary',   hoverProps: { style: { backgroundColor: 'var(--accent-hover)' } } },
  { variant: 'secondary', label: 'Secondary', hoverProps: { style: { backgroundColor: 'var(--accent-bg-10)' } } },
  { variant: 'tertiary',  label: 'Tertiary',  hoverProps: { style: { backgroundColor: 'rgba(0,0,0,0.05)' } } },
  { variant: 'link',      label: 'Link',      hoverProps: { style: { opacity: 0.75 } } },
]
const COLS = ['Default', 'Hover', 'Focus', 'Disabled']

function StatesGrid({ dark }) {
  const muted = dark ? 'rgba(255,251,245,0.4)' : 'rgba(34,34,34,0.4)'
  const rule  = dark ? 'rgba(255,251,245,0.08)' : 'rgba(34,34,34,0.08)'
  return (
    <div className={dark ? 'dark px-6 md:px-10 lg:px-14 py-10' : 'px-6 md:px-10 lg:px-14 py-10'} style={{ backgroundColor: dark ? '#1c1a16' : '#fffbf5' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(4, max-content)', gap: '12px 24px', alignItems: 'center' }}>
        <div />
        {COLS.map(col => (
          <div key={col} style={{ fontFamily: 'monospace', fontSize: '10px', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '8px', borderBottom: `1px solid ${rule}` }}>{col}</div>
        ))}
        {ROWS.map(({ variant, label, hoverProps }) => (
          <Fragment key={variant}>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: muted }}>{label}</div>
            <Button variant={variant} size="sm">Label</Button>
            <Button variant={variant} size="sm" {...hoverProps}>Label</Button>
            <Button variant={variant} size="sm" className="ring-4 ring-[var(--accent-ring)] ring-offset-0 outline-none">Label</Button>
            <Button variant={variant} size="sm" disabled>Label</Button>
          </Fragment>
        ))}
      </div>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: muted, marginTop: '20px' }}>
        Live: hover or tab through the Default column to see real interactions.
      </p>
    </div>
  )
}

export const HoverFocusStates = {
  name: 'Hover & Focus States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <StatesGrid dark={false} />
      <StatesGrid dark={true} />
    </div>
  ),
}
