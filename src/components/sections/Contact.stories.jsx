import Contact from './Contact'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Patterns/Contact',
  component: Contact,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Light = {
  render: () => (
    <div style={{ backgroundColor: '#fffbf5' }}>
      <Contact />
    </div>
  ),
}

export const Dark = {
  render: () => (
    <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
      <Contact />
    </div>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <Contact />
      <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
        <Contact />
      </div>
    </div>
  ),
}
