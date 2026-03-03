import About from './About'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Sections/About',
  component: About,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Light = {
  render: () => (
    <div style={{ backgroundColor: '#fffbf5' }}>
      <About />
    </div>
  ),
}

export const Dark = {
  render: () => (
    <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
      <About />
    </div>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <About />
      <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
        <About />
      </div>
    </div>
  ),
}
