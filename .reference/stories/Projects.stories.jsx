import { MemoryRouter } from 'react-router-dom'
import Projects from './Projects'

// ─── Meta ──────────────────────────────────────────────────────────────────────
// WorkEntry uses react-router-dom Link, so MemoryRouter is required here.

export default {
  title: 'Patterns/Projects',
  component: Projects,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Light = {
  render: () => (
    <div style={{ backgroundColor: '#fffbf5' }}>
      <Projects />
    </div>
  ),
}

export const Dark = {
  render: () => (
    <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
      <Projects />
    </div>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <Projects />
      <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
        <Projects />
      </div>
    </div>
  ),
}
