/**
 * Layout.stories.jsx
 *
 * Documents the responsive layout system for this portfolio.
 * All stories respond to the viewport toolbar — use it to test any breakpoint.
 *
 * Viewport toolbar: screen icon, top toolbar. Select a preset or drag the
 * canvas edge to resize freely. Every component in Storybook works this way.
 */

import { useState, useEffect } from 'react'

// Reads window.innerWidth from the Storybook iframe and updates on resize.
// More reliable than CSS media queries for Storybook viewport switching.
function useBreakpoint() {
  const get = () => {
    if (typeof window === 'undefined') return 'base'
    const w = window.innerWidth
    return w >= 1024 ? 'lg' : w >= 768 ? 'md' : 'base'
  }
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const update = () => setBp(get())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return bp
}

// ─── Colors — grid zones ──────────────────────────────────────────────────────

const C_COLUMN = 'rgba(129,55,70,0.20)'   // pink tint  — column fill
const C_GUTTER = 'rgba(34,34,34,0.13)'    // grey tint  — gutter (shows through CSS gap)
const C_MARGIN = 'rgba(240,170,0,0.42)'   // amber tint — margin (for legend swatch)

// ─── Shared primitives ────────────────────────────────────────────────────────

// Single column band — pink fill, numbered
const Band = ({ n }) => (
  <div style={{
    height: '52px',
    backgroundColor: C_COLUMN,
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(129,55,70,0.85)' }}>
      {n}
    </span>
  </div>
)

// Grid wrapper — the grey background shows through the CSS gap = visible gutters
const GutterGrid = ({ cols, gap, label, children, style = {} }) => (
  <div style={{ marginBottom: '28px' }}>
    {label && (
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(34,34,34,0.5)', margin: '0 0 8px' }}>
        {label}
      </p>
    )}
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      backgroundColor: C_GUTTER,
      borderRadius: '5px',
      ...style,
    }}>
      {children}
    </div>
  </div>
)

// Margin px values per breakpoint
const MARGINS = { base: '24px', md: '40px', lg: '56px' }

// JS-driven margin shell — amber shows through padding zones.
// Used by ColumnGrid so it responds to useBreakpoint() instead of CSS classes.
const GridShell = ({ bp, children }) => {
  const m = MARGINS[bp]
  return (
    <div style={{ backgroundColor: 'rgba(240,170,0,0.18)', minHeight: '100vh' }}>
      <div style={{
        paddingLeft: m, paddingRight: m,
        backgroundColor: '#fffbf5', backgroundClip: 'content-box', minHeight: '100vh',
      }}>
        <div style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// CSS-class driven shell — used by layout pattern stories (TwoColumn, ProjectGrid)
// so those stories still test real Tailwind responsive classes.
const MarginShell = ({ children, paddingClass = 'px-6 md:px-10 lg:px-14' }) => (
  <div style={{ backgroundColor: 'rgba(240,170,0,0.18)', minHeight: '100vh' }}>
    <div
      className={paddingClass}
      style={{ backgroundColor: '#fffbf5', backgroundClip: 'content-box', minHeight: '100vh' }}
    >
      <div className="max-w-6xl mx-auto py-12">
        {children}
      </div>
    </div>
  </div>
)

// Three-zone legend
const Legend = ({ marginLabel, gutterLabel }) => (
  <div style={{
    display: 'flex', gap: '24px', flexWrap: 'wrap',
    paddingTop: '20px', marginTop: '8px',
    borderTop: '1px solid rgba(34,34,34,0.08)',
  }}>
    {[
      { color: C_MARGIN, label: 'Margin', desc: marginLabel },
      { color: C_COLUMN, label: 'Column', desc: '1fr — equal width' },
      { color: C_GUTTER, label: 'Gutter', desc: gutterLabel },
    ].map(({ color, label, desc }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '14px', height: '14px', backgroundColor: color, borderRadius: '3px', flexShrink: 0 }} />
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34,34,34,0.85)', fontWeight: 'bold' }}>{label}</span>
        <span style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.5)' }}>{desc}</span>
      </div>
    ))}
  </div>
)

// ─── Story meta ───────────────────────────────────────────────────────────────

export default {
  title: 'Design System/Layout',
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
}

// ─── Breakpoints reference ────────────────────────────────────────────────────

export const Breakpoints = {
  name: 'Breakpoints',
  render: () => (
    <div style={{ backgroundColor: '#fffbf5', padding: '48px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 32px' }}>
        Breakpoints — this portfolio
      </p>

      {[
        { bp: 'base', range: '0 – 767px',  cols: '4 col',  margin: 'px-6  · 24px', gutter: 'gap-3 · 12px', maxW: '—',                    note: 'Single column · stacked layouts'            },
        { bp: 'md',   range: '768px +',    cols: '8 col',  margin: 'px-10 · 40px', gutter: 'gap-6 · 24px', maxW: 'max-w-4xl / max-w-6xl', note: '2-col grids activate · form rows split'     },
        { bp: 'lg',   range: '1024px +',   cols: '12 col', margin: 'px-14 · 56px', gutter: 'gap-6 · 24px', maxW: 'max-w-6xl · 1152px',   note: 'Full 12-col available · max-width constrains' },
      ].map(({ bp, range, cols, margin, gutter, maxW, note }, i) => (
        <div key={bp} style={{
          display: 'flex', alignItems: 'stretch', marginBottom: '8px',
          borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(34,34,34,0.08)',
        }}>
          <div style={{ backgroundColor: '#813746', color: '#fffbf5', padding: '14px 20px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold', minWidth: '52px', display: 'flex', alignItems: 'center' }}>
            {bp}
          </div>
          {[range, cols, margin, gutter, maxW, note].map((val, j) => (
            <div key={j} style={{ padding: '14px 16px', backgroundColor: i % 2 === 0 ? 'rgba(129,55,70,0.04)' : 'transparent', fontFamily: j < 5 ? 'monospace' : 'Arial', fontSize: '11px', color: j === 5 ? 'rgba(34,34,34,0.45)' : 'rgba(34,34,34,0.8)', minWidth: j === 5 ? 'auto' : '120px', flex: j === 5 ? 1 : 'none', display: 'flex', alignItems: 'center' }}>
              {val}
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: '32px', padding: '16px 20px', backgroundColor: 'rgba(240,170,0,0.12)', borderRadius: '8px', border: '1px solid rgba(240,170,0,0.3)' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.7)', margin: 0 }}>
          <strong>Testing responsiveness:</strong> Select any story, then use the viewport toolbar (screen icon, top-right) to switch between breakpoints. Every component can be tested this way.
        </p>
      </div>
    </div>
  ),
}

// ─── 12 → 8 → 4 column grid ──────────────────────────────────────────────────

const GRID_CONFIG = {
  base: { cols: 4,  gap: '12px', colLabel: '4 columns',  gapLabel: 'gap-3 · 12px',  marginLabel: 'px-6 · 24px'  },
  md:   { cols: 8,  gap: '24px', colLabel: '8 columns',  gapLabel: 'gap-6 · 24px',  marginLabel: 'px-10 · 40px' },
  lg:   { cols: 12, gap: '24px', colLabel: '12 columns', gapLabel: 'gap-6 · 24px',  marginLabel: 'px-14 · 56px' },
}

export const ColumnGrid = {
  name: 'Column Grid ↔ resize with toolbar',
  render: () => {
    const bp = useBreakpoint()
    const { cols, gap, colLabel, gapLabel, marginLabel } = GRID_CONFIG[bp]
    const m = MARGINS[bp]

    return (
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: 'rgba(240,170,0,0.18)' }}>

        {/* Cream content area — amber bleeds into padding zones on each side */}
        <div style={{
          position: 'absolute', inset: 0,
          paddingLeft: m, paddingRight: m,
          backgroundColor: '#fffbf5', backgroundClip: 'content-box',
        }}>
          {/* Full-height column strips — grey background shows through gap = visible gutters */}
          <div style={{
            height: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap,
            backgroundColor: C_GUTTER,
          }}>
            {Array.from({ length: cols }, (_, i) => (
              <div key={i} style={{
                backgroundColor: C_COLUMN,
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '52px',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(129,55,70,0.8)' }}>
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top label — floats over the grid */}
        <div style={{ position: 'absolute', top: '20px', left: m, zIndex: 10 }}>
          <span style={{
            fontFamily: 'monospace', fontSize: '11px', color: '#813746',
            backgroundColor: 'rgba(255,251,245,0.92)', padding: '5px 12px',
            borderRadius: '20px', border: '1px solid rgba(129,55,70,0.2)',
          }}>
            {bp} — {colLabel} · {marginLabel} margins · {gapLabel} gutters
          </span>
        </div>

        {/* Bottom legend — pinned to the floor */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          padding: `14px ${m}`,
          backgroundColor: 'rgba(255,251,245,0.95)',
          borderTop: '1px solid rgba(34,34,34,0.08)',
        }}>
          <Legend
            marginLabel={`px-6 · px-10 · px-14 — currently ${marginLabel}`}
            gutterLabel="gap-3 · gap-6 · gap-8"
          />
        </div>
      </div>
    )
  },
}

// ─── 2-column layout ──────────────────────────────────────────────────────────

export const TwoColumn = {
  name: '2 Column — About',
  render: () => (
    <MarginShell>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34,34,34,0.55)', margin: '0 0 20px' }}>
        grid md:grid-cols-2 gap-12 md:gap-20 — stacks below md (768px)
      </p>
      <div className="grid md:grid-cols-2 gap-12 md:gap-20" style={{ backgroundColor: C_GUTTER, borderRadius: '8px' }}>
        {[1, 2].map(n => (
          <div key={n} style={{ backgroundColor: C_COLUMN, borderRadius: '8px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(129,55,70,0.8)' }}>col {n}</span>
          </div>
        ))}
      </div>
      <Legend marginLabel="px-6 md:px-10 lg:px-14" gutterLabel="gap-12 md:gap-20" />
    </MarginShell>
  ),
}

// ─── Project grid ─────────────────────────────────────────────────────────────

export const ProjectGrid = {
  name: 'Project Grid — 1 → 2 col',
  render: () => (
    <MarginShell paddingClass="px-6 md:px-16">
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34,34,34,0.55)', margin: '0 0 20px' }}>
        grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 · px-6 md:px-16 margins
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" style={{ backgroundColor: C_GUTTER, borderRadius: '8px' }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{ backgroundColor: C_COLUMN, borderRadius: '8px', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(129,55,70,0.8)' }}>card {n}</span>
          </div>
        ))}
      </div>
      <Legend marginLabel="px-6 md:px-16" gutterLabel="gap-6 md:gap-8" />
    </MarginShell>
  ),
}

// ─── Content widths ───────────────────────────────────────────────────────────

export const ContentWidths = {
  name: 'Content Widths',
  render: () => (
    <div className="px-6 md:px-10" style={{ backgroundColor: '#fffbf5', paddingTop: '48px', paddingBottom: '48px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 32px' }}>
        Container widths used in this portfolio
      </p>
      {[
        { cls: 'max-w-6xl', px: '1152px', note: 'Projects, About — wide layout sections'   },
        { cls: 'max-w-4xl', px: '896px',  note: 'Resume, case study hero'                  },
        { cls: 'max-w-3xl', px: '768px',  note: 'Case study body text'                     },
      ].map(({ cls, px, note }) => (
        <div key={cls} className={`${cls} mx-auto mb-3`}>
          <div style={{ backgroundColor: C_COLUMN, borderRadius: '8px', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(129,55,70,0.9)', fontWeight: 'bold', flexShrink: 0 }}>{cls}</span>
            <span style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.5)', flexShrink: 0 }}>{px} max</span>
            <span style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.45)' }}>{note}</span>
          </div>
        </div>
      ))}
    </div>
  ),
}
