import PageTransition from './PageTransition'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/PageTransition',
  component: PageTransition,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default = {
  name: 'Default — fade + slide up on mount',
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', padding: '64px 48px', minHeight: '100vh' }}>
      <PageTransition>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--fg)', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
            Content wrapped in PageTransition — fades in from y+20 on mount
          </p>
          <h1 className="font-display font-bold text-fg" style={{ fontSize: 48, lineHeight: 1, marginBottom: 16 }}>
            Page Title
          </h1>
          <p className="font-body text-fg" style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.7 }}>
            This paragraph and everything sibling to it animate as one unit.
            PageTransition wraps full page content — it does not stagger children.
          </p>
        </div>
      </PageTransition>
    </div>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#fffbf5', padding: '64px 48px' }}>
        <PageTransition>
          <p className="font-body text-fg" style={{ fontSize: 16, lineHeight: 1.7 }}>
            Light — content fades in with y offset on mount.
          </p>
        </PageTransition>
      </div>
      <div className="dark" style={{ backgroundColor: '#1c1a16', padding: '64px 48px' }}>
        <PageTransition>
          <p className="font-body text-fg" style={{ fontSize: 16, lineHeight: 1.7 }}>
            Dark — same animation, different theme context.
          </p>
        </PageTransition>
      </div>
    </div>
  ),
}
