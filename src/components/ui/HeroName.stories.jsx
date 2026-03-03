import HeroName from './HeroName'

// ─── Wrappers ──────────────────────────────────────────────────────────────────

const Shell = ({ dark, children }) => (
  <div className={dark ? 'dark' : ''} style={{ backgroundColor: dark ? '#1c1a16' : '#fffbf5', padding: '64px 48px' }}>
    {children}
  </div>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/HeroName',
  component: HeroName,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const OnLight = {
  name: 'Light',
  render: () => (
    <Shell>
      <div style={{ width: '65%', maxWidth: '760px', minWidth: '300px' }}>
        <HeroName />
      </div>
    </Shell>
  ),
}

export const OnDark = {
  name: 'Dark',
  render: () => (
    <Shell dark>
      <div style={{ width: '65%', maxWidth: '760px', minWidth: '300px' }}>
        <HeroName />
      </div>
    </Shell>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Light — gradient: var(--grad-from) → var(--grad-to)</p>
      </div>
      <Shell>
        <div style={{ width: '65%', maxWidth: '760px', minWidth: '300px' }}>
          <HeroName />
        </div>
      </Shell>
      <div style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Dark — gradient: var(--grad-from) → var(--grad-to)</p>
      </div>
      <Shell dark>
        <div style={{ width: '65%', maxWidth: '760px', minWidth: '300px' }}>
          <HeroName />
        </div>
      </Shell>
    </div>
  ),
}

export const Sizes = {
  name: 'Responsive Widths',
  render: () => (
    <Shell>
      {[280, 480, 640, 900].map(w => (
        <div key={w} style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.45)', marginBottom: '8px' }}>{w}px container</p>
          <div style={{ width: w, border: '1px dashed rgba(34,34,34,0.12)', padding: '8px' }}>
            <HeroName />
          </div>
        </div>
      ))}
    </Shell>
  ),
}
