/**
 * Typography.stories.jsx
 *
 * Pure specimen stories — documentation lives in Typography.mdx.
 * Every specimen uses the real token classes from globals.css,
 * exactly as they appear in components.
 *
 * Tab 1 Overview    — full scale top-to-bottom
 * Tab 2 Typefaces   — family + weight specimens
 * Tab 3 Type Sets   — live specimen + spec card per token
 * Tab 4 Code        — JSX + CSS reference
 * Tab 5 Pairings    — Do / Don't usage examples
 */

// ─── Shared helpers ───────────────────────────────────────────────────────────

const Wrap = ({ children }) => (
  <div style={{ backgroundColor: 'var(--bg)', padding: '48px 56px', maxWidth: '860px' }}>
    {children}
  </div>
)

const Rule = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

// Documentation label — neutral Arial, not part of the design system
const DocLabel = ({ children }) => (
  <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, margin: '6px 0 0', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1.6 }}>
    {children}
  </p>
)

const Tag = ({ children }) => (
  <span style={{
    fontFamily: 'monospace', fontSize: '11px', padding: '2px 7px',
    background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))',
    border: '1px solid color-mix(in srgb, var(--accent) 18%, transparent)',
    borderRadius: '4px', color: 'var(--accent)', letterSpacing: '0.02em',
  }}>
    {children}
  </span>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

export default {
  title: 'Elements/Typography',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
}

// ─── Tab 1: Overview ─────────────────────────────────────────────────────────

export const Overview = {
  tags: ['!dev'],
  name: 'Overview',
  render: () => (
    <Wrap>
      {/* Display — fluid */}
      <div className="font-display font-bold text-display-2xl text-fg">The quick brown fox</div>
      <DocLabel>Cabinet 96 · .text-display-2xl · clamp(3rem, 8vw, 6rem) · h1</DocLabel>

      <div style={{ marginTop: '28px' }} className="font-display font-bold text-display-xl text-fg">The quick brown fox</div>
      <DocLabel>Cabinet 80 · .text-display-xl · clamp(2.5rem, 6vw, 5rem) · h2</DocLabel>

      <div style={{ marginTop: '28px' }} className="font-display font-bold text-display-lg text-fg">The quick brown fox jumps over the lazy dog</div>
      <DocLabel>Cabinet 60 · .text-display-lg · clamp(2rem, 5vw, 3.75rem) · h2</DocLabel>

      <div style={{ marginTop: '28px' }} className="font-display font-bold text-display-md text-fg">The quick brown fox jumps over the lazy dog</div>
      <DocLabel>Cabinet 36 · .text-display-md · clamp(1.5rem, 3vw, 2.25rem) · h3</DocLabel>

      <Rule />

      {/* Body — fixed */}
      <p className="font-body text-body-lg text-fg">The quick brown fox jumps over the lazy dog</p>
      <DocLabel>Areal 18 · .text-body-lg · 18px · Regular 400</DocLabel>

      <p className="font-body text-body text-fg" style={{ marginTop: '20px' }}>The quick brown fox jumps over the lazy dog</p>
      <DocLabel>Areal 16 · .text-body · 16px · Regular 400</DocLabel>

      <p className="font-body text-body-sm text-fg" style={{ marginTop: '20px' }}>The quick brown fox jumps over the lazy dog</p>
      <DocLabel>Areal 14 · .text-body-sm · 14px · Regular 400</DocLabel>

      <p className="font-body text-caption text-fg" style={{ marginTop: '20px' }}>The quick brown fox jumps over the lazy dog</p>
      <DocLabel>Areal 12 · .text-caption · 12px · Regular 400</DocLabel>

      <Rule />

      {/* Editorial */}
      <p className="font-editorial text-editorial text-fg">The quick brown fox jumps over the lazy dog</p>
      <DocLabel>Ogg Regular 400 · .text-editorial · 32px</DocLabel>

      <p className="font-editorial text-editorial text-fg" style={{ marginTop: '16px', fontStyle: 'italic' }}>The quick brown fox jumps over the lazy dog</p>
      <DocLabel>Ogg Regular Italic 400 · .text-editorial · 32px</DocLabel>

      <Rule />

      {/* Labels */}
      <p className="font-body font-bold text-label text-brand-primary">Accent Label — eyebrow / section marker</p>
      <DocLabel>.text-label · font-body · 11px · text-brand-primary</DocLabel>

      <p className="font-body font-bold text-meta text-fg-secondary" style={{ marginTop: '16px' }}>Metadata Label — column header</p>
      <DocLabel>.text-meta · font-body · 12px · text-fg-secondary</DocLabel>

      <p className="font-body text-caption text-fg-secondary" style={{ marginTop: '16px' }}>Caption — supporting copy, timestamps</p>
      <DocLabel>.text-caption · font-body · 12px · text-fg-secondary</DocLabel>
    </Wrap>
  ),
}

// ─── Tab 2: Typefaces ─────────────────────────────────────────────────────────

const FamilyHeading = ({ children }) => (
  <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 24px' }}>
    {children}
  </p>
)

export const Typefaces = {
  tags: ['!dev'],
  name: 'Typefaces',
  render: () => (
    <Wrap>
      <FamilyHeading>Cabinet Grotesk — font-display · Headings & Display</FamilyHeading>

      {[
        { weight: 400, label: 'Regular 400 — available, not assigned' },
        { weight: 500, label: 'Medium 500 — available, not assigned' },
        { weight: 700, label: 'Bold 700 — all display headings (font-bold)' },
        { weight: 800, label: 'ExtraBold 800 — available, not assigned' },
      ].map(({ weight, label }) => (
        <div key={weight} style={{ marginBottom: '20px' }}>
          <p className="font-display text-fg" style={{ fontSize: '28px', fontWeight: weight, lineHeight: 1.3, margin: 0 }}>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp
          </p>
          <DocLabel>{label}</DocLabel>
        </div>
      ))}

      <Rule />

      <FamilyHeading>Areal — font-body · Body, Labels & UI copy</FamilyHeading>

      {[
        { weight: 400, style: 'normal', label: 'Regular 400 — all body copy' },
        { weight: 400, style: 'italic', label: 'Regular Italic 400 — emphasis within body' },
        { weight: 700, style: 'normal', label: 'Bold 700 — labels, utility text' },
        { weight: 700, style: 'italic', label: 'Bold Italic 700 — available' },
      ].map(({ weight, style, label }) => (
        <div key={label} style={{ marginBottom: '20px' }}>
          <p className="font-body text-fg" style={{ fontSize: '22px', fontWeight: weight, fontStyle: style, lineHeight: 1.4, margin: 0 }}>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp
          </p>
          <DocLabel>{label}</DocLabel>
        </div>
      ))}

      <Rule />

      <FamilyHeading>Ogg — font-editorial · Pull quotes & Editorial accents</FamilyHeading>

      {[
        { weight: 300, style: 'normal',  label: 'Light 300 — available' },
        { weight: 300, style: 'italic',  label: 'Light Italic 300 — available' },
        { weight: 400, style: 'normal',  label: 'Regular 400 — primary editorial weight' },
        { weight: 400, style: 'italic',  label: 'Regular Italic 400 — pull quotes, accents' },
        { weight: 500, style: 'normal',  label: 'Medium 500 — available' },
        { weight: 700, style: 'normal',  label: 'Bold 700 — avoid; competes with display' },
      ].map(({ weight, style, label }) => (
        <div key={label} style={{ marginBottom: '20px' }}>
          <p className="font-editorial text-fg" style={{ fontSize: '24px', fontWeight: weight, fontStyle: style, lineHeight: 1.3, margin: 0 }}>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp
          </p>
          <DocLabel>{label}</DocLabel>
        </div>
      ))}
    </Wrap>
  ),
}

// ─── Tab 3: Type Sets ─────────────────────────────────────────────────────────

const SpecCard = ({ rows }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    {rows.map(([key, val]) => (
      <div key={key} style={{ display: 'flex', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--fg)', opacity: 0.4, minWidth: '108px' }}>{key}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--fg)', opacity: 0.75 }}>{val}</span>
      </div>
    ))}
  </div>
)

const SetLabel = ({ children }) => (
  <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>
    {children}
  </p>
)

export const TypeSets = {
  tags: ['!dev'],
  name: 'Type Sets',
  render: () => (
    <Wrap>
      <SetLabel>Display — fluid · Cabinet Grotesk Bold 700</SetLabel>

      {[
        { token: 'text-display-2xl', range: '48–96px', size: 'clamp(3rem, 8vw, 6rem)',   lh: '1',    ls: '-0.04em', el: 'h1',      usage: 'Hero headline, Resume name' },
        { token: 'text-display-xl',  range: '40–80px', size: 'clamp(2.5rem, 6vw, 5rem)', lh: '1',    ls: '-0.03em', el: 'h2 / h1', usage: 'Section heading (Work), Case Study title' },
        { token: 'text-display-lg',  range: '32–60px', size: 'clamp(2rem, 5vw, 3.75rem)',lh: '1.1',  ls: '-0.03em', el: 'h2',      usage: 'CTA heading — About, Footer, Contact' },
        { token: 'text-display-md',  range: '24–36px', size: 'clamp(1.5rem, 3vw, 2.25rem)',lh: '1.25',ls: '-0.02em', el: 'h3',     usage: 'Card heading — WorkEntry' },
      ].map(t => (
        <div key={t.token} style={{ borderTop: '1px solid var(--border)', padding: '24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div>
            <p className={`font-display font-bold ${t.token} text-fg`} style={{ margin: '0 0 10px' }}>The quick brown fox</p>
            <Tag>{t.token}</Tag>
          </div>
          <SpecCard rows={[
            ['font-size',      `${t.size} (${t.range})`],
            ['font-family',    'Cabinet Grotesk'],
            ['font-weight',    '700 (Bold)'],
            ['line-height',    t.lh],
            ['letter-spacing', t.ls],
            ['type',           'fluid · clamp()'],
            ['element',        t.el],
            ['usage',          t.usage],
          ]} />
        </div>
      ))}

      <div style={{ marginTop: '40px' }}>
        <SetLabel>Body — fixed · Areal Regular 400</SetLabel>
      </div>

      {[
        { token: 'text-body-lg', size: '18px', usage: 'Intro paragraphs, lead copy' },
        { token: 'text-body',    size: '16px', usage: 'Default body, case study content, UI copy' },
        { token: 'text-body-sm', size: '14px', usage: 'Captions, metadata, supporting copy' },
        { token: 'text-caption', size: '12px', usage: 'Minimum size, timestamps' },
      ].map(t => (
        <div key={t.token} style={{ borderTop: '1px solid var(--border)', padding: '24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div>
            <p className={`font-body ${t.token} text-fg`} style={{ margin: '0 0 10px' }}>
              The quick brown fox jumps over the lazy dog. Used for {t.usage.toLowerCase()}.
            </p>
            <Tag>{t.token}</Tag>
          </div>
          <SpecCard rows={[
            ['font-size',   t.size],
            ['font-family', 'Areal'],
            ['font-weight', '400 (Regular)'],
            ['line-height', t.token === 'text-caption' ? '1.5' : '1.6'],
            ['type',        'fixed'],
            ['element',     'p'],
            ['usage',       t.usage],
          ]} />
        </div>
      ))}

      <div style={{ marginTop: '40px' }}>
        <SetLabel>Editorial — contextual · Ogg</SetLabel>
      </div>

      {[
        { style: 'normal', label: 'Regular 400',        italicStyle: 'normal', usage: 'Section accent, pull quotes' },
        { style: 'italic', label: 'Regular Italic 400', italicStyle: 'italic', usage: 'Pull quote emphasis, inline accent' },
      ].map(t => (
        <div key={t.label} style={{ borderTop: '1px solid var(--border)', padding: '24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div>
            <p className="font-editorial text-editorial text-fg" style={{ fontWeight: 400, fontStyle: t.italicStyle, margin: '0 0 10px' }}>
              The quick brown fox jumps over the lazy dog
            </p>
            <Tag>font-editorial · text-editorial</Tag>
          </div>
          <SpecCard rows={[
            ['font-size',   '32px (contextual)'],
            ['font-family', 'Ogg'],
            ['font-weight', '400 (Regular)'],
            ['font-style',  t.italicStyle],
            ['line-height', '1.3'],
            ['type',        'fixed · contextual'],
            ['element',     'p / blockquote'],
            ['usage',       t.usage],
          ]} />
        </div>
      ))}

      <div style={{ marginTop: '40px' }}>
        <SetLabel>Labels & Utility — Areal + Areal Mono</SetLabel>
      </div>

      {[
        { className: 'font-body font-bold text-label text-brand-primary', token: 'text-label', label: 'Accent Label',   contrast: '8.3:1 ✓', usage: 'Eyebrow / section marker' },
        { className: 'font-body font-bold text-meta text-fg-secondary',   token: 'text-meta',  label: 'Metadata Label', contrast: '6.9:1 ✓', usage: 'WorkEntry columns, field headers' },
        { className: 'font-body text-caption text-fg-secondary',          token: 'text-caption',label: 'Caption',       contrast: '6.9:1 ✓', usage: 'Supporting copy, timestamps' },
      ].map(t => (
        <div key={t.token} style={{ borderTop: '1px solid var(--border)', padding: '24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div>
            <p className={t.className} style={{ margin: '0 0 10px' }}>{t.label}</p>
            <Tag>{t.token}</Tag>
          </div>
          <SpecCard rows={[
            ['token',    t.token],
            ['contrast', t.contrast],
            ['usage',    t.usage],
          ]} />
        </div>
      ))}
    </Wrap>
  ),
}

// ─── Tab 4: Code ─────────────────────────────────────────────────────────────

const CodeBlock = ({ children }) => (
  <pre style={{
    fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.6,
    background: 'color-mix(in srgb, var(--fg) 4%, var(--surface))',
    border: '1px solid var(--border)',
    borderRadius: '8px', padding: '16px 20px', margin: '12px 0 0',
    color: 'var(--fg)', opacity: 0.85, overflowX: 'auto', whiteSpace: 'pre',
  }}>
    {children}
  </pre>
)

const CodeSection = ({ label, preview, code, note }) => (
  <div style={{ borderTop: '1px solid var(--border)', padding: '24px 0' }}>
    <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>{label}</p>
    <div style={{ marginBottom: '4px' }}>{preview}</div>
    <CodeBlock>{code}</CodeBlock>
    {note && <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, marginTop: '8px', lineHeight: 1.6 }}>{note}</p>}
  </div>
)

export const Code = {
  tags: ['!dev'],
  name: 'Code',
  render: () => (
    <Wrap>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
        Display — fluid · Cabinet Grotesk · defined in globals.css @layer utilities
      </p>

      <CodeSection
        label="display-2xl · h1 · Hero headline, Resume name"
        preview={<h1 className="font-display font-bold text-display-2xl text-fg" style={{ margin: 0 }}>Heading</h1>}
        code={`<h1 className="font-display font-bold text-display-2xl text-fg">
  Heading text
</h1>

/* globals.css — @layer utilities */
.text-display-2xl {
  font-size: clamp(3rem, 8vw, 6rem); /* 48–96px */
  line-height: 1;
  letter-spacing: -0.04em;
}`}
        note="Note: .text-display-* classes live in globals.css @layer utilities — not generated by Tailwind JIT. They will not appear in IntelliSense autocomplete."
      />

      <CodeSection
        label="display-xl · h2 · Section heading, Case Study title"
        preview={<h2 className="font-display font-bold text-display-xl text-fg" style={{ margin: 0 }}>Heading</h2>}
        code={`<h2 className="font-display font-bold text-display-xl text-fg">
  Heading text
</h2>

.text-display-xl {
  font-size: clamp(2.5rem, 6vw, 5rem); /* 40–80px */
  line-height: 1;
  letter-spacing: -0.03em;
}`}
      />

      <CodeSection
        label="display-lg · h2 · CTA heading — About, Footer, Contact"
        preview={<h2 className="font-display font-bold text-display-lg text-fg" style={{ margin: 0 }}>Heading</h2>}
        code={`<h2 className="font-display font-bold text-display-lg text-fg">
  Heading text
</h2>

.text-display-lg {
  font-size: clamp(2rem, 5vw, 3.75rem); /* 32–60px */
  line-height: 1.1;
  letter-spacing: -0.03em;
}`}
      />

      <CodeSection
        label="display-md · h3 · Card heading — WorkEntry"
        preview={<h3 className="font-display font-bold text-display-md text-fg" style={{ margin: 0 }}>Heading</h3>}
        code={`<h3 className="font-display font-bold text-display-md text-fg">
  Heading text
</h3>

.text-display-md {
  font-size: clamp(1.5rem, 3vw, 2.25rem); /* 24–36px */
  line-height: 1.25;
  letter-spacing: -0.02em;
}`}
      />

      <div style={{ marginTop: '16px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Body — fixed · Areal · defined in globals.css @layer utilities
        </p>
      </div>

      {[
        { token: 'text-body-lg', size: '18px', desc: 'intro paragraphs, lead copy' },
        { token: 'text-body',    size: '16px', desc: 'default body, case study content' },
        { token: 'text-body-sm', size: '14px', desc: 'captions, metadata' },
        { token: 'text-caption', size: '12px', desc: 'minimum, supporting text' },
      ].map(({ token, size, desc }) => (
        <CodeSection
          key={token}
          label={`${token} · ${size} · ${desc}`}
          preview={<p className={`font-body ${token} text-fg`} style={{ margin: 0 }}>The quick brown fox jumps over the lazy dog.</p>}
          code={`<p className="font-body ${token} text-fg">
  Body copy here
</p>

.${token} { font-size: ${size}; line-height: ${token === 'text-caption' ? '1.5' : '1.6'}; }`}
        />
      ))}

      <div style={{ marginTop: '16px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Editorial · Ogg · size applied contextually
        </p>
      </div>

      <CodeSection
        label="font-editorial · Regular + Italic · pull quotes, accents"
        preview={
          <div>
            <p className="font-editorial text-editorial text-fg" style={{ fontWeight: 400, margin: '0 0 8px' }}>Editorial accent text</p>
            <p className="font-editorial text-editorial text-fg" style={{ fontWeight: 400, fontStyle: 'italic', margin: 0 }}>Italic editorial accent</p>
          </div>
        }
        code={`<p className="font-editorial text-editorial text-fg" style={{ fontWeight: 400 }}>
  Pull quote or accent text
</p>

<p className="font-editorial text-editorial text-fg"
   style={{ fontWeight: 400, fontStyle: 'italic' }}>
  Italic pull quote
</p>

/* font-size is contextual — use text-editorial (32px),
   text-editorial-lg (40px), or text-editorial-sm (24px) */`}
      />

      <div style={{ marginTop: '16px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Labels & Utility
        </p>
      </div>

      <CodeSection
        label="text-label · eyebrow / section marker"
        preview={<p className="font-body font-bold text-label text-brand-primary" style={{ margin: 0 }}>Section Label</p>}
        code={`<p className="font-body font-bold text-label text-brand-primary">
  Section Label
</p>

.text-label {
  font-size: 11px; line-height: 1.4;
  letter-spacing: 0.12em; text-transform: uppercase;
}
/* text-brand-primary → var(--accent) */`}
      />

      <CodeSection
        label="text-meta · WorkEntry columns, field headers"
        preview={<p className="font-body font-bold text-meta text-fg-secondary" style={{ margin: 0 }}>Column Header</p>}
        code={`<p className="font-body font-bold text-meta text-fg-secondary">
  Column Header
</p>

.text-meta {
  font-size: 12px; line-height: 1.4;
  letter-spacing: 0.08em; text-transform: uppercase;
}
/* text-fg-secondary → var(--fg-secondary) */`}
      />
    </Wrap>
  ),
}

// ─── Tab 5: Pairings ──────────────────────────────────────────────────────────

const DoCard = ({ label = 'Do', color = 'var(--accent)', children }) => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ border: `2px solid ${color}`, borderRadius: '12px', padding: '28px', minHeight: '140px', display: 'flex', alignItems: 'center' }}>
      {children}
    </div>
    <p style={{ fontFamily: 'monospace', fontSize: '11px', color, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '10px' }}>{label}</p>
  </div>
)

const DontCard = ({ children }) => (
  <DoCard label="Don't" color="rgba(200,60,60,0.7)">{children}</DoCard>
)

export const Pairings = {
  tags: ['!dev'],
  name: 'Pairings',
  render: () => (
    <Wrap>

      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Display + Body — standard pairing
      </p>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <DoCard>
          <div>
            <h2 className="font-display font-bold text-display-lg text-fg" style={{ margin: '0 0 12px' }}>Let's build something great</h2>
            <p className="font-body text-body text-fg" style={{ opacity: 0.75, margin: 0 }}>display-lg + text-body (16px). Comfortable visual gap.</p>
          </div>
        </DoCard>
        <DontCard>
          <div>
            <h2 className="font-display font-bold text-display-lg text-fg" style={{ margin: '0 0 12px' }}>Let's build something great</h2>
            <p className="font-body text-caption text-fg" style={{ opacity: 0.75, margin: 0 }}>display-lg + text-caption (12px). Too large a jump — feels disconnected.</p>
          </div>
        </DontCard>
      </div>

      <Rule />

      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Adjacent display sizes — skip at least one step
      </p>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <DoCard>
          <div>
            <h2 className="font-display font-bold text-display-xl text-fg" style={{ margin: '0 0 8px' }}>Work</h2>
            <h3 className="font-display font-bold text-display-md text-fg" style={{ margin: 0, opacity: 0.6 }}>Redesigning property tax foreclosure</h3>
          </div>
        </DoCard>
        <DontCard>
          <div>
            <h2 className="font-display font-bold text-display-xl text-fg" style={{ margin: '0 0 8px' }}>Work</h2>
            <h3 className="font-display font-bold text-display-lg text-fg" style={{ margin: 0, opacity: 0.85 }}>Redesigning property tax foreclosure</h3>
          </div>
        </DontCard>
      </div>

      <Rule />

      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Ogg — Regular or Italic only; never Bold
      </p>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <DoCard>
          <p className="font-editorial text-editorial text-fg" style={{ fontWeight: 400, fontStyle: 'italic', margin: 0 }}>"Design is problem solving."</p>
        </DoCard>
        <DontCard>
          <p className="font-editorial text-editorial text-fg" style={{ fontWeight: 700, margin: 0 }}>"Design is problem solving."</p>
        </DontCard>
      </div>

      <Rule />

      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Labels — color signals intent
      </p>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <DoCard>
          <div>
            <p className="font-body font-bold text-meta text-fg-secondary" style={{ margin: '0 0 4px' }}>Company</p>
            <p className="font-body text-body-sm text-fg">Keytrn Technologies</p>
          </div>
        </DoCard>
        <DontCard>
          <div>
            <p className="font-body font-bold text-meta text-brand-primary" style={{ margin: '0 0 4px' }}>Company</p>
            <p className="font-body text-body-sm text-fg">Keytrn Technologies</p>
          </div>
        </DontCard>
      </div>

    </Wrap>
  ),
}
