import RJLogo3D from './RJLogo3D'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/RJLogo3D',
  component: RJLogo3D,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Wrappers ──────────────────────────────────────────────────────────────────

// RJLogo3D fills its container via className. A fixed-size shell provides that.
const Shell = ({ dark, size = 360, children }) => (
  <div
    className={dark ? 'dark' : ''}
    style={{
      backgroundColor: dark ? '#1c1a16' : '#fffbf5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 48,
    }}
  >
    <div style={{ width: size, height: size }}>
      {children}
    </div>
  </div>
)

// ─── Stories ──────────────────────────────────────────────────────────────────

export const OnLight = {
  name: 'Light',
  render: () => (
    <Shell>
      <RJLogo3D className="w-full h-full" />
    </Shell>
  ),
}

export const OnDark = {
  name: 'Dark',
  render: () => (
    <Shell dark>
      <RJLogo3D className="w-full h-full" />
    </Shell>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          Light — reads CSS vars (--accent, --fg) on mount; updates on theme change
        </p>
      </div>
      <Shell>
        <RJLogo3D className="w-full h-full" />
      </Shell>
      <div style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          Dark — accent switches to #e36f86 via MutationObserver on &lt;html&gt; class change
        </p>
      </div>
      <Shell dark>
        <RJLogo3D className="w-full h-full" />
      </Shell>
    </div>
  ),
}

export const Sizes = {
  name: 'Sizes',
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', padding: '48px', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {[200, 300, 400].map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: s, height: s }}>
            <RJLogo3D className="w-full h-full" />
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--fg)', opacity: 0.45 }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
}
