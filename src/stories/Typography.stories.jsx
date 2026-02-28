/**
 * Typography.stories.jsx
 *
 * Add a new style by creating a new named export at the bottom.
 * Each story is standalone — wrap in the Light or Dark shell as needed.
 */

// ─── Shared wrappers ──────────────────────────────────────────────────────────

const Light = ({ children }) => (
  <div style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)', padding: '48px', maxWidth: '720px' }}>
    {children}
  </div>
)

const Dark = ({ children }) => (
  <div className="dark" style={{ backgroundColor: '#1c1a16', color: '#fffbf5', padding: '48px', maxWidth: '720px' }}>
    {children}
  </div>
)

const Meta = ({ font, weight, size, contrast }) => (
  <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'var(--fg)', opacity: 0.8, marginTop: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
    {font} · {weight} · {size} · contrast {contrast}
  </p>
)

const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0' }} />
)

// ─── Stories ─────────────────────────────────────────────────────────────────

export default {
  title: 'Design System/Typography',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
}

// ── Full type scale — light ──────────────────────────────────────────────────

export const ScaleLight = {
  name: 'Scale — Light',
  render: () => (
    <Light>

      {/* H1 */}
      <h1 className="font-display font-bold tracking-tightest leading-none" style={{ fontSize: '72px', color: 'var(--fg)' }}>
        Heading 1
      </h1>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="72px" contrast="16.8:1 ✓" />

      <Divider />

      {/* H2 */}
      <h2 className="font-display font-bold tracking-tighter leading-tight" style={{ fontSize: '48px', color: 'var(--fg)' }}>
        Heading 2
      </h2>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="48px" contrast="16.8:1 ✓" />

      <Divider />

      {/* H3 */}
      <h3 className="font-display font-bold tracking-tighter leading-snug" style={{ fontSize: '32px', color: 'var(--fg)' }}>
        Heading 3
      </h3>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="32px" contrast="16.8:1 ✓" />

      <Divider />

      {/* H4 */}
      <h4 className="font-display font-bold leading-snug" style={{ fontSize: '20px', color: 'var(--fg)' }}>
        Heading 4
      </h4>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="20px" contrast="16.8:1 ✓" />

      <Divider />

      {/* Body large */}
      <p className="font-body leading-relaxed" style={{ fontSize: '18px', color: 'var(--fg)' }}>
        Body large — The quick brown fox jumps over the lazy dog. Used for intro paragraphs and lead copy where the reading experience needs a little more air.
      </p>
      <Meta font="Areal" weight="Regular 400" size="18px" contrast="16.8:1 ✓" />

      <Divider />

      {/* Body default */}
      <p className="font-body leading-relaxed" style={{ fontSize: '16px', color: 'var(--fg)' }}>
        Body — The quick brown fox jumps over the lazy dog. This is the default reading size for case study content, paragraphs, and general UI copy across the site.
      </p>
      <Meta font="Areal" weight="Regular 400" size="16px" contrast="16.8:1 ✓" />

      <Divider />

      {/* Body small */}
      <p className="font-body leading-relaxed" style={{ fontSize: '14px', color: 'var(--fg)' }}>
        Body small — Used for captions, metadata, and supporting copy. Stays readable at this size with Areal's clear letterforms.
      </p>
      <Meta font="Areal" weight="Regular 400" size="14px" contrast="16.8:1 ✓" />

      <Divider />

      {/* Label */}
      <p className="font-body font-bold leading-none" style={{ fontSize: '11px', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Label — Uppercase utility text
      </p>
      <Meta font="Areal" weight="Bold 700" size="11px / 0.12em tracking" contrast="16.8:1 ✓" />

      <Divider />

      {/* Accent label */}
      <p className="font-body font-bold leading-none" style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Accent Label — Brand color utility text
      </p>
      <Meta font="Areal" weight="Bold 700" size="11px" contrast="7.1:1 ✓" />

      <Divider />

      {/* Ogg regular */}
      <p className="font-editorial" style={{ fontSize: '32px', fontWeight: 400, color: 'var(--fg)' }}>
        Ogg Regular — editorial accent
      </p>
      <Meta font="Ogg" weight="Regular 400" size="32px" contrast="16.8:1 ✓" />

      <Divider />

      {/* Ogg italic */}
      <p className="font-editorial" style={{ fontSize: '32px', fontWeight: 400, fontStyle: 'italic', color: 'var(--fg)' }}>
        Ogg Italic — pull quotes, emphasis
      </p>
      <Meta font="Ogg" weight="Regular Italic 400" size="32px" contrast="16.8:1 ✓" />

      <Divider />

      {/* Link */}
      <a href="#" className="font-body font-medium" style={{ fontSize: '16px', color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        Link text — View case study
      </a>
      <Meta font="Areal" weight="Medium / accent color" size="16px" contrast="7.1:1 ✓" />

    </Light>
  ),
}

// ── Full type scale — dark ───────────────────────────────────────────────────

export const ScaleDark = {
  name: 'Scale — Dark',
  render: () => (
    <Dark>

      <h1 className="font-display font-bold tracking-tightest leading-none" style={{ fontSize: '72px', color: '#fffbf5' }}>
        Heading 1
      </h1>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="72px" contrast="12.5:1 ✓" />

      <Divider />

      <h2 className="font-display font-bold tracking-tighter leading-tight" style={{ fontSize: '48px', color: '#fffbf5' }}>
        Heading 2
      </h2>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="48px" contrast="12.5:1 ✓" />

      <Divider />

      <h3 className="font-display font-bold tracking-tighter leading-snug" style={{ fontSize: '32px', color: '#fffbf5' }}>
        Heading 3
      </h3>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="32px" contrast="12.5:1 ✓" />

      <Divider />

      <h4 className="font-display font-bold leading-snug" style={{ fontSize: '20px', color: '#fffbf5' }}>
        Heading 4
      </h4>
      <Meta font="Cabinet Grotesk" weight="Bold 700" size="20px" contrast="12.5:1 ✓" />

      <Divider />

      <p className="font-body leading-relaxed" style={{ fontSize: '18px', color: '#fffbf5' }}>
        Body large — The quick brown fox jumps over the lazy dog. Used for intro paragraphs and lead copy where the reading experience needs a little more air.
      </p>
      <Meta font="Areal" weight="Regular 400" size="18px" contrast="12.5:1 ✓" />

      <Divider />

      <p className="font-body leading-relaxed" style={{ fontSize: '16px', color: '#fffbf5' }}>
        Body — The quick brown fox jumps over the lazy dog. This is the default reading size for case study content, paragraphs, and general UI copy across the site.
      </p>
      <Meta font="Areal" weight="Regular 400" size="16px" contrast="12.5:1 ✓" />

      <Divider />

      <p className="font-body leading-relaxed" style={{ fontSize: '14px', color: '#fffbf5' }}>
        Body small — Used for captions, metadata, and supporting copy.
      </p>
      <Meta font="Areal" weight="Regular 400" size="14px" contrast="12.5:1 ✓" />

      <Divider />

      <p className="font-body font-bold leading-none" style={{ fontSize: '11px', color: '#fffbf5', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Label — Uppercase utility text
      </p>
      <Meta font="Areal" weight="Bold 700" size="11px" contrast="12.5:1 ✓" />

      <Divider />

      <p className="font-body font-bold leading-none" style={{ fontSize: '11px', color: '#e36f86', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Accent Label — Brand color utility text
      </p>
      <Meta font="Areal" weight="Bold 700" size="11px" contrast="5.4:1 ✓" />

      <Divider />

      <p className="font-editorial" style={{ fontSize: '32px', fontWeight: 400, color: '#fffbf5' }}>
        Ogg Regular — editorial accent
      </p>
      <Meta font="Ogg" weight="Regular 400" size="32px" contrast="12.5:1 ✓" />

      <Divider />

      <p className="font-editorial" style={{ fontSize: '32px', fontWeight: 400, fontStyle: 'italic', color: '#fffbf5' }}>
        Ogg Italic — pull quotes, emphasis
      </p>
      <Meta font="Ogg" weight="Regular Italic 400" size="32px" contrast="12.5:1 ✓" />

      <Divider />

      <a href="#" className="font-body font-medium" style={{ fontSize: '16px', color: '#e36f86', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        Link text — View case study
      </a>
      <Meta font="Areal" weight="Medium / accent color" size="16px" contrast="5.4:1 ✓" />

    </Dark>
  ),
}

// ── Individual styles — easy to reference when building ──────────────────────

export const DisplayHeadings = {
  name: 'Display Headings',
  render: () => (
    <Light>
      <h1 className="font-display font-bold tracking-tightest leading-none text-fg" style={{ fontSize: '72px' }}>H1 — 72px</h1>
      <h2 className="font-display font-bold tracking-tighter leading-tight text-fg" style={{ fontSize: '48px', marginTop: '24px' }}>H2 — 48px</h2>
      <h3 className="font-display font-bold tracking-tighter leading-snug text-fg" style={{ fontSize: '32px', marginTop: '24px' }}>H3 — 32px</h3>
      <h4 className="font-display font-bold leading-snug text-fg" style={{ fontSize: '20px', marginTop: '24px' }}>H4 — 20px</h4>
    </Light>
  ),
}

export const BodyText = {
  name: 'Body Text',
  render: () => (
    <Light>
      <p className="font-body leading-relaxed text-fg" style={{ fontSize: '18px' }}>Body large — 18px. The quick brown fox jumps over the lazy dog.</p>
      <p className="font-body leading-relaxed text-fg" style={{ fontSize: '16px', marginTop: '24px' }}>Body — 16px. The quick brown fox jumps over the lazy dog.</p>
      <p className="font-body leading-relaxed text-fg" style={{ fontSize: '14px', marginTop: '24px' }}>Body small — 14px. The quick brown fox jumps over the lazy dog.</p>
    </Light>
  ),
}

export const SerifAccent = {
  name: 'Serif Accent (Ogg)',
  render: () => (
    <Light>
      <p className="font-editorial text-fg" style={{ fontSize: '40px', fontWeight: 300 }}>Ogg Light — 40px</p>
      <p className="font-editorial text-fg" style={{ fontSize: '40px', fontWeight: 400, marginTop: '16px' }}>Ogg Regular — 40px</p>
      <p className="font-editorial text-fg" style={{ fontSize: '40px', fontWeight: 400, fontStyle: 'italic', marginTop: '16px' }}>Ogg Italic — 40px</p>
      <p className="font-editorial text-fg" style={{ fontSize: '40px', fontWeight: 300, fontStyle: 'italic', marginTop: '16px' }}>Ogg Light Italic — 40px</p>
    </Light>
  ),
}

export const Labels = {
  name: 'Labels & Utility',
  render: () => (
    <Light>
      <p className="font-body font-bold text-fg" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Default Label</p>
      <p className="font-body font-bold text-brand-primary" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '16px' }}>Accent Label</p>
      <p className="font-body" style={{ fontSize: '12px', color: 'var(--fg)', opacity: 0.5, marginTop: '16px' }}>Caption / meta — 12px muted</p>
    </Light>
  ),
}
