import Resume from './Resume'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Pages/Resume',
  component: Resume,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Light = {
  render: () => (
    <div style={{ backgroundColor: '#fffbf5' }}>
      <Resume />
    </div>
  ),
}

export const Dark = {
  render: () => (
    <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
      <Resume />
    </div>
  ),
}
