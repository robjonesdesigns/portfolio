/**
 * Color Contrast Test Suite
 *
 * Validates every documented token pair against WCAG standards.
 * Each story targets a specific fg/bg combination with text at all
 * relevant sizes so axe-core can check both normal-text (< 18pt) and
 * large-text (≥ 18pt / ≥ 14pt bold) thresholds.
 *
 * AAA stories  — enable `color-contrast-enhanced` (7:1 normal, 4.5:1 large)
 * AA  stories  — standard `color-contrast` only   (4.5:1 normal, 3:1 large)
 *                These pairs are intentionally below the AAA threshold and
 *                are documented as AA in DesignTokens.mdx.
 *
 * All stories set `a11y.test: 'error'` to override the global 'todo' default
 * so violations fail the vitest run in CI.
 */

// ─── axe-core rule configs ────────────────────────────────────────────────────

// Enables WCAG AAA colour contrast check. Disable AA rule to avoid duplicate
// reporting — AAA is a superset of AA so a passing AAA result implies AA.
const AAA_CONFIG = {
  rules: [
    { id: 'color-contrast-enhanced', enabled: true  },
    { id: 'color-contrast',          enabled: false },
  ],
}

// Standard WCAG AA only. Disables the AAA rule so intentionally-AA pairs
// don't fail — their AA compliance is still enforced.
const AA_CONFIG = {
  rules: [
    { id: 'color-contrast-enhanced', enabled: false },
    { id: 'color-contrast',          enabled: true  },
  ],
}

// ─── Shared render component ──────────────────────────────────────────────────

/**
 * Renders text at every size used in the portfolio so axe checks both
 * the normal-text threshold (< 18pt / < 14pt bold) and the large-text
 * threshold (≥ 18pt / ≥ 14pt bold = 18.67px bold).
 */
function PairSamples({ bg, fg, token, ratio, level }) {
  return (
    <div style={{ backgroundColor: bg, padding: '40px 48px' }}>

      {/* Label */}
      <p style={{
        color: fg, opacity: 0.55,
        fontFamily: 'monospace', fontSize: '10px',
        textTransform: 'uppercase', letterSpacing: '0.1em',
        margin: '0 0 24px',
      }}>
        {token} · {ratio} · {level}
      </p>

      {/* 11px — smallest used in the portfolio (eyebrow labels) */}
      <p style={{ color: fg, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px' }}>
        11px Bold Label — Eyebrow / section tag
      </p>

      {/* 14px — body small, captions */}
      <p style={{ color: fg, fontSize: '14px', margin: '0 0 12px' }}>
        14px Body Small — captions, metadata, supporting copy
      </p>

      {/* 16px — default body */}
      <p style={{ color: fg, fontSize: '16px', margin: '0 0 12px' }}>
        16px Body — the default reading size for case study content and UI copy
      </p>

      {/* 18px — body large (still normal-text for WCAG) */}
      <p style={{ color: fg, fontSize: '18px', margin: '0 0 20px' }}>
        18px Body Large — intro paragraphs and lead copy
      </p>

      {/* 19px bold — crosses 14pt bold large-text threshold (14pt = 18.67px) */}
      <p style={{ color: fg, fontSize: '20px', fontWeight: 700, margin: '0 0 12px' }}>
        20px Bold H4 — large-text threshold begins here
      </p>

      {/* 32px — editorial / H3 */}
      <p style={{ color: fg, fontSize: '32px', fontWeight: 700, margin: '0 0 12px' }}>
        32px Bold H3
      </p>

      {/* 48px — H2 */}
      <p style={{ color: fg, fontSize: '48px', fontWeight: 700, margin: 0 }}>
        48px Bold H2
      </p>

    </div>
  )
}

// ─── Story meta ───────────────────────────────────────────────────────────────

export default {
  title: 'Design System/Color Contrast',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: `
Automated WCAG colour-contrast test suite for every documented token pair.

| Level | Normal text | Large text (≥ 18pt or ≥ 14pt bold) |
|---|---|---|
| **AA**  | 4.5 : 1 | 3.0 : 1 |
| **AAA** | 7.0 : 1 | 4.5 : 1 |

Stories prefixed **AAA** run the \`color-contrast-enhanced\` axe rule.
Stories prefixed **AA** run standard \`color-contrast\` only — these pairs are
intentionally below the AAA threshold as documented in the Tokens page.
        `.trim(),
      },
    },
  },
}

// ─── WCAG AAA — Light theme ───────────────────────────────────────────────────

export const AAALightFgOnBg = {
  name: 'AAA · Light  —  --fg on --bg  (16.8 : 1)',
  parameters: {
    a11y: { test: 'error', config: AAA_CONFIG },
    docs: { description: { story: '`#222222` on `#fffbf5` — 16.8 : 1. All text, both themes.' } },
  },
  render: () => (
    <PairSamples
      bg="#fffbf5" fg="#222222"
      token="--fg on --bg"
      ratio="16.8 : 1"
      level="AAA"
    />
  ),
}

export const AAALightFgOnSurface = {
  name: 'AAA · Light  —  --fg on --surface  (15.4 : 1)',
  parameters: {
    a11y: { test: 'error', config: AAA_CONFIG },
    docs: { description: { story: '`#222222` on `#f7f3f5` — 15.4 : 1. Used in cards, panels.' } },
  },
  render: () => (
    <PairSamples
      bg="#f7f3f5" fg="#222222"
      token="--fg on --surface"
      ratio="15.4 : 1"
      level="AAA"
    />
  ),
}

export const AAALightOnAccent = {
  name: 'AAA · Light  —  --on-accent on --accent  (7.78 : 1)',
  parameters: {
    a11y: { test: 'error', config: AAA_CONFIG },
    docs: { description: { story: '`#fffbf5` on `#813746` — 7.78 : 1. Text on primary buttons / filled badges.' } },
  },
  render: () => (
    <PairSamples
      bg="#813746" fg="#fffbf5"
      token="--on-accent on --accent"
      ratio="7.78 : 1"
      level="AAA"
    />
  ),
}

export const AAALightAccentOnBg = {
  name: 'AAA · Light  —  --accent on --bg  (7.1 : 1)',
  parameters: {
    a11y: { test: 'error', config: AAA_CONFIG },
    docs: { description: { story: '`#813746` on `#fffbf5` — 7.1 : 1. Brand links, eyebrow labels, secondary button text.' } },
  },
  render: () => (
    <PairSamples
      bg="#fffbf5" fg="#813746"
      token="--accent on --bg"
      ratio="7.1 : 1"
      level="AAA"
    />
  ),
}

// ─── WCAG AAA — Dark theme ────────────────────────────────────────────────────

export const AAADarkFgOnBg = {
  name: 'AAA · Dark  —  --fg on --bg  (12.5 : 1)',
  parameters: {
    a11y: { test: 'error', config: AAA_CONFIG },
    docs: { description: { story: '`#fffbf5` on `#1c1a16` — 12.5 : 1. All text in dark mode.' } },
  },
  render: () => (
    <PairSamples
      bg="#1c1a16" fg="#fffbf5"
      token="--fg on --bg (dark)"
      ratio="12.5 : 1"
      level="AAA"
    />
  ),
}

export const AAADarkFgOnSurface = {
  name: 'AAA · Dark  —  --fg on --surface  (11.4 : 1)',
  parameters: {
    a11y: { test: 'error', config: AAA_CONFIG },
    docs: { description: { story: '`#fffbf5` on `#252220` — 11.4 : 1. Used in dark-mode cards and panels.' } },
  },
  render: () => (
    <PairSamples
      bg="#252220" fg="#fffbf5"
      token="--fg on --surface (dark)"
      ratio="11.4 : 1"
      level="AAA"
    />
  ),
}

// ─── WCAG AA only — intentionally below AAA threshold ────────────────────────
// These pairs are documented as AA in DesignTokens.mdx.
// The color-contrast-enhanced rule is disabled so only the AA bar is enforced.

export const AALightAccentOnSurface = {
  name: 'AA · Light  —  --accent on --surface  (6.7 : 1)',
  parameters: {
    a11y: { test: 'error', config: AA_CONFIG },
    docs: {
      description: {
        story: `
\`#813746\` on \`#f7f3f5\` — **6.7 : 1 — AA only.**
Fails AAA for normal text (needs 7 : 1) but passes for large text (needs 4.5 : 1).
Used in badge borders and secondary UI on surface backgrounds.
        `.trim(),
      },
    },
  },
  render: () => (
    <PairSamples
      bg="#f7f3f5" fg="#813746"
      token="--accent on --surface"
      ratio="6.7 : 1"
      level="AA only"
    />
  ),
}

export const AADarkOnAccent = {
  name: 'AA · Dark  —  --on-accent on --accent  (4.81 : 1)',
  parameters: {
    a11y: { test: 'error', config: AA_CONFIG },
    docs: {
      description: {
        story: `
\`#1c1a16\` on \`#e36f86\` — **4.81 : 1 — AA only.**
Fails AAA for normal text (needs 7 : 1). Passes AAA for large text (needs 4.5 : 1).
Text on dark-mode primary buttons and filled badges.
        `.trim(),
      },
    },
  },
  render: () => (
    <PairSamples
      bg="#e36f86" fg="#1c1a16"
      token="--on-accent on --accent (dark)"
      ratio="4.81 : 1"
      level="AA only"
    />
  ),
}

export const AADarkAccentOnBg = {
  name: 'AA · Dark  —  --accent on --bg  (5.4 : 1)',
  parameters: {
    a11y: { test: 'error', config: AA_CONFIG },
    docs: {
      description: {
        story: `
\`#e36f86\` on \`#1c1a16\` — **5.4 : 1 — AA only.**
Fails AAA for normal text (needs 7 : 1). Passes AAA for large text (needs 4.5 : 1).
Brand links, eyebrow labels, secondary button text in dark mode.
        `.trim(),
      },
    },
  },
  render: () => (
    <PairSamples
      bg="#1c1a16" fg="#e36f86"
      token="--accent on --bg (dark)"
      ratio="5.4 : 1"
      level="AA only"
    />
  ),
}

export const AADarkAccentOnSurface = {
  name: 'AA · Dark  —  --accent on --surface  (5.1 : 1)',
  parameters: {
    a11y: { test: 'error', config: AA_CONFIG },
    docs: {
      description: {
        story: `
\`#e36f86\` on \`#252220\` — **5.1 : 1 — AA only.**
Fails AAA for normal text (needs 7 : 1). Passes AAA for large text (needs 4.5 : 1).
Brand text on dark-mode surface backgrounds (cards, panels).
        `.trim(),
      },
    },
  },
  render: () => (
    <PairSamples
      bg="#252220" fg="#e36f86"
      token="--accent on --surface (dark)"
      ratio="5.1 : 1"
      level="AA only"
    />
  ),
}

// ─── Overview — all pairs at a glance (no automated test) ────────────────────

export const Overview = {
  name: 'Overview — all pairs',
  parameters: {
    a11y: { test: 'off' },
    docs: { description: { story: 'All token pairs side by side for visual reference. Not used for automated testing — see individual stories above.' } },
  },
  render: () => {
    const pairs = [
      // AAA
      { bg: '#fffbf5', fg: '#222222', ratio: '16.8 : 1', level: 'AAA', token: '--fg on --bg' },
      { bg: '#f7f3f5', fg: '#222222', ratio: '15.4 : 1', level: 'AAA', token: '--fg on --surface' },
      { bg: '#813746', fg: '#fffbf5', ratio: '7.78 : 1', level: 'AAA', token: '--on-accent on --accent' },
      { bg: '#fffbf5', fg: '#813746', ratio: '7.1 : 1',  level: 'AAA', token: '--accent on --bg' },
      { bg: '#1c1a16', fg: '#fffbf5', ratio: '12.5 : 1', level: 'AAA', token: '--fg on --bg (dark)' },
      { bg: '#252220', fg: '#fffbf5', ratio: '11.4 : 1', level: 'AAA', token: '--fg on --surface (dark)' },
      // AA only
      { bg: '#f7f3f5', fg: '#813746', ratio: '6.7 : 1',  level: 'AA',  token: '--accent on --surface' },
      { bg: '#e36f86', fg: '#1c1a16', ratio: '4.81 : 1', level: 'AA',  token: '--on-accent on --accent (dark)' },
      { bg: '#1c1a16', fg: '#e36f86', ratio: '5.4 : 1',  level: 'AA',  token: '--accent on --bg (dark)' },
      { bg: '#252220', fg: '#e36f86', ratio: '5.1 : 1',  level: 'AA',  token: '--accent on --surface (dark)' },
    ]

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {pairs.map(({ bg, fg, ratio, level, token }) => (
          <div
            key={token}
            style={{
              backgroundColor: bg,
              padding: '24px 28px',
              borderBottom: '1px solid rgba(128,128,128,0.15)',
            }}
          >
            <p style={{ color: fg, opacity: 0.5, fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>
              {token}
            </p>
            <p style={{ color: fg, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px' }}>
              {ratio} — {level}
            </p>
            <p style={{ color: fg, fontSize: '16px', margin: 0 }}>
              The quick brown fox
            </p>
          </div>
        ))}
      </div>
    )
  },
}
