// ─── DoDont ────────────────────────────────────────────────────────────────────
// Side-by-side Do / Don't comparison blocks.
// Children of <Do> and <Don't> can be any React content.
//
// Usage:
//   <DoDont>
//     <Do label="Use a verb + noun label">
//       <Button>View Work</Button>
//     </Do>
//     <Dont label="Use vague labels">
//       <Button>Click here</Button>
//     </Dont>
//   </DoDont>

const DO_COLOR   = '#42be65'
const DONT_COLOR = '#fa4d56'

function Tile({ color, marker, label, children }) {
  return (
    <div style={{ border: `1px solid ${color}`, borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{
        padding: '24px 20px',
        backgroundColor: 'var(--surface)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        minHeight: '80px',
      }}>
        {children}
      </div>
      <div style={{
        padding: '8px 16px',
        backgroundColor: `${color}18`,
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        <span style={{
          color,
          fontFamily: 'monospace',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          {marker} {label}
        </span>
      </div>
    </div>
  )
}

export function DoDont({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      margin: '24px 0',
    }}>
      {children}
    </div>
  )
}

export function Do({ children, label = 'Do' }) {
  return <Tile color={DO_COLOR} marker="✓" label={label}>{children}</Tile>
}

export function Dont({ children, label = "Don't" }) {
  return <Tile color={DONT_COLOR} marker="✗" label={label}>{children}</Tile>
}
