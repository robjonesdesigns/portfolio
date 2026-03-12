import { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: 'Floating navigation bar that docks to the top of the viewport when the user scrolls past 80px. On mobile it collapses to a hamburger menu. Requires `theme` and `toggleTheme` props — wired to the parent page\'s theme state.',
      },
    },
  },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

// ─── Floating — initial state ─────────────────────────────────────────────────

export const Floating = {
  render: () => {
    const [theme, setTheme] = useState('light')
    return (
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '200px' }}>
        <Navbar theme={theme} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
        <div style={{ padding: '120px 48px 48px', fontFamily: 'Arial', fontSize: '13px', color: 'rgba(34,34,34,0.4)' }}>
          Initial state — nav floats with rounded corners and margin. Scroll down on the actual site to see it dock.
        </div>
      </div>
    )
  },
}

// ─── Dark ─────────────────────────────────────────────────────────────────────

export const OnDark = {
  name: 'On Dark',
  render: () => {
    const [theme, setTheme] = useState('dark')
    return (
      <div className="dark" style={{ backgroundColor: '#1c1a16', minHeight: '200px' }}>
        <Navbar theme={theme} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
        <div style={{ padding: '120px 48px 48px', fontFamily: 'Arial', fontSize: '13px', color: 'rgba(255,251,245,0.3)' }}>
          Dark theme — all tokens adapt. The theme toggle inside the nav is live.
        </div>
      </div>
    )
  },
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
// Use the viewport toolbar to test: set to Mobile 375px to see the hamburger.

export const Mobile = {
  name: 'Mobile — resize with toolbar',
  parameters: { viewport: { defaultViewport: 'mobile' } },
  render: () => {
    const [theme, setTheme] = useState('light')
    return (
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar theme={theme} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
        <div style={{ padding: '120px 24px 48px', fontFamily: 'Arial', fontSize: '13px', color: 'rgba(34,34,34,0.4)' }}>
          Tap the hamburger to open the full-screen mobile menu.
        </div>
      </div>
    )
  },
}
