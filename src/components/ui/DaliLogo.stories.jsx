import DaliLogo from './DaliLogo'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/DaliLogo',
  component: DaliLogo,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Wrappers ──────────────────────────────────────────────────────────────────

const Shell = ({ dark, children }) => (
  <div
    className={dark ? 'dark' : ''}
    style={{
      backgroundColor: dark ? '#1c1a16' : '#fffbf5',
      padding: '64px 48px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      <div style={{ width: 300, height: 252 }}>
        <DaliLogo />
      </div>
    </Shell>
  ),
}

export const OnDark = {
  name: 'Dark',
  render: () => (
    <Shell dark>
      <div style={{ width: 300, height: 252 }}>
        <DaliLogo />
      </div>
    </Shell>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Light — accent: #813746</p>
      </div>
      <Shell>
        <div style={{ width: 300, height: 252 }}><DaliLogo /></div>
      </Shell>
      <div style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Dark — accent: #e36f86</p>
      </div>
      <Shell dark>
        <div style={{ width: 300, height: 252 }}><DaliLogo /></div>
      </Shell>
    </div>
  ),
}
