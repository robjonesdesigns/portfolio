/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,astro}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Semantic — adaptive, use in components ──────────────────────────
        'brand-primary': 'var(--accent)',    // #813746 light / #e36f86 dark — primary brand
        'on-accent':     'var(--on-accent)', // #fffbf5 light / #1c1a16 dark — text on brand-primary bg
        fg:              'var(--fg)',        // #1c1a16 light / #fffbf5 dark — all text (headings + body)
        'fg-secondary':  'var(--fg-secondary)', // #6e6562 light / #c2bab0 dark — labels, metadata
        surface:         'var(--surface)',   // #f5f0e8 light / #28251f dark — cards, panels
        border:          'var(--border)',    // rgba(92,82,80,0.1) light / rgba(176,168,158,0.1) dark
        'brand-hover':   'var(--accent-hover)', // #5c2232 light / #ba5a6e dark — button hover
        // ── Static — for story wrappers and explicit overrides only ─────────
        cream:           '#fffbf5',
        'cream-surface': '#f5f0e8',
        'dark-bg':       '#1c1a16',
        'dark-surface':  '#28251f',
      },
      fontFamily: {
        display:    ['"Cabinet Grotesk"', 'sans-serif'],
        editorial:  ['"Ogg"', 'Georgia', 'serif'],
        body:       ['Areal', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // ── Display — fluid clamp, Cabinet Grotesk ───────────────────────
        'display-2xl': ['clamp(3rem, 8vw, 6rem)',         { lineHeight: '1',    letterSpacing: '-0.04em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 5rem)',       { lineHeight: '1',    letterSpacing: '-0.03em' }],
        'display-lg':  ['clamp(2rem, 5vw, 3.75rem)',      { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.25rem)',    { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'display-sm':  ['clamp(1.25rem, 1.75vw, 1.5rem)', { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        // ── Body scale — Areal ───────────────────────────────────────────
        'body-lg': ['20px', { lineHeight: '1.7' }],
        'body':    ['16px', { lineHeight: '1.7' }],
        'body-sm': ['14px', { lineHeight: '1.7' }],
      },
      letterSpacing: {
        // ── Label tracking tokens ────────────────────────────────────────
        'label': '0.12em',
        'meta':  '0.08em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  safelist: [
    'bg-brand-primary',
    'text-on-accent',
  ],
  plugins: [],
}
