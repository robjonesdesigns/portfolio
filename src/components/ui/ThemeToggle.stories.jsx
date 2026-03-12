import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

// ─── Wrapper ──────────────────────────────────────────────────────────────────

const Swatch = ({ dark = false, label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    <div
      className={dark ? 'dark' : ''}
      style={{ backgroundColor: 'var(--bg)', padding: '32px 40px', borderRadius: '12px', border: '1px solid var(--border)', display: 'inline-flex' }}
    >
      {children}
    </div>
    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34,34,34,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
  </div>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: { layout: 'centered' },
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Current theme — controls which side the thumb sits on',
    },
    toggle: {
      action: 'toggled',
      description: 'Callback fired when the button is clicked',
      table: { type: { summary: '() => void' } },
    },
  },
}

// ─── Default — interactive, use the Controls panel to explore ─────────────────

export const Default = {
  decorators: [(Story) => (
    <div style={{ backgroundColor: 'var(--bg)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <Story />
    </div>
  )],
  args: { theme: 'light', toggle: () => {} },
}

// ─── Live — self-contained with real animated state ───────────────────────────

export const Live = {
  name: 'Live (animated)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [theme, setTheme] = useState('light')
    return (
      <Swatch dark={theme === 'dark'} label={`Current: ${theme}`}>
        <ThemeToggle
          theme={theme}
          toggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        />
      </Swatch>
    )
  },
}

// ─── Both states — comparison reference ───────────────────────────────────────

export const BothStates = {
  name: 'Both States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      <Swatch label="Light — thumb left">
        <ThemeToggle theme="light" toggle={() => {}} />
      </Swatch>
      <Swatch dark label="Dark — thumb right">
        <ThemeToggle theme="dark" toggle={() => {}} />
      </Swatch>
    </div>
  ),
}
