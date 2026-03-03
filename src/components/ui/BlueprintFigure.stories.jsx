import BlueprintFigure from './BlueprintFigure'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/BlueprintFigure',
  component: BlueprintFigure,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Wrappers ──────────────────────────────────────────────────────────────────

const Shell = ({ dark, children }) => (
  <div
    className={dark ? 'dark' : ''}
    style={{
      backgroundColor: dark ? '#1c1a16' : '#fffbf5',
      color: dark ? '#fffbf5' : '#222222',
      padding: '64px 48px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
)

// ─── Stories ──────────────────────────────────────────────────────────────────

export const OnLight = {
  name: 'Light',
  render: () => (
    <Shell>
      <div style={{ width: 200, height: 240 }}>
        <BlueprintFigure />
      </div>
    </Shell>
  ),
}

export const OnDark = {
  name: 'Dark',
  render: () => (
    <Shell dark>
      <div style={{ width: 200, height: 240 }}>
        <BlueprintFigure />
      </div>
    </Shell>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Light — currentColor: #222222 · accent: #813746</p>
      </div>
      <Shell>
        <div style={{ width: 200, height: 240 }}><BlueprintFigure /></div>
      </Shell>
      <div style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Dark — currentColor: #fffbf5 · accent: #e36f86</p>
      </div>
      <Shell dark>
        <div style={{ width: 200, height: 240 }}><BlueprintFigure /></div>
      </Shell>
    </div>
  ),
}

export const Sizes = {
  name: 'Sizes',
  render: () => (
    <Shell>
      {[120, 180, 240, 360].map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, margin: '0 24px' }}>
          <div style={{ width: s, height: s * 1.2 }}>
            <BlueprintFigure />
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(34,34,34,0.5)' }}>{s}px</span>
        </div>
      ))}
    </Shell>
  ),
}
