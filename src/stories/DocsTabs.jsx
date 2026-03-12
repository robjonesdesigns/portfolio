import { useState, createContext, useContext } from 'react'

// ─── Context ───────────────────────────────────────────────────────────────────

const Ctx = createContext({ active: 0, set: () => {} })

// ─── DocsTabs ──────────────────────────────────────────────────────────────────

export function DocsTabs({ children, defaultTab = 0 }) {
  const [active, set] = useState(defaultTab)
  return (
    <Ctx.Provider value={{ active, set }}>
      {children}
    </Ctx.Provider>
  )
}

// ─── TabList ───────────────────────────────────────────────────────────────────

export function TabList({ children }) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid var(--border)',
      marginBottom: '40px',
      marginTop: '8px',
      gap: '4px',
    }}>
      {children}
    </div>
  )
}

// ─── Tab ───────────────────────────────────────────────────────────────────────

export function Tab({ index, children }) {
  const { active, set } = useContext(Ctx)
  const on = active === index

  return (
    <button
      onClick={() => set(index)}
      style={{
        padding: '10px 20px',
        background: 'none',
        border: 'none',
        borderBottom: `2px solid ${on ? 'var(--accent)' : 'transparent'}`,
        color: on ? 'var(--accent)' : 'var(--fg)',
        opacity: on ? 1 : 0.5,
        fontFamily: 'monospace',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        marginBottom: '-1px',
        transition: 'color 0.15s, opacity 0.15s, border-color 0.15s',
        fontWeight: on ? 500 : 400,
      }}
    >
      {children}
    </button>
  )
}

// ─── TabPanel ──────────────────────────────────────────────────────────────────

export function TabPanel({ index, children }) {
  const { active } = useContext(Ctx)
  return active === index ? <div>{children}</div> : null
}
