import Hero from './Hero'

// ─── Meta ──────────────────────────────────────────────────────────────────────
// Note: scroll-based parallax (nameY, nameOpacity) is frozen at 0% scroll in
// the Storybook iframe — this is expected. The component renders correctly.

export default {
  title: 'Patterns/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Light = {
  render: () => (
    <div style={{ backgroundColor: '#fffbf5' }}>
      <Hero />
    </div>
  ),
}

export const Dark = {
  render: () => (
    <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
      <Hero />
    </div>
  ),
}
