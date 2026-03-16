/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,astro}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Semantic — adaptive, use in components ──────────────────────────
        'brand-primary': 'var(--accent)',    // #813746 light / #e36f86 dark — primary brand
        'on-accent':     'var(--on-accent)', // #fffbf5 light / #1c1a16 dark — text on brand-primary bg
        fg:              'var(--fg)',        // #222222 light / #fffbf5 dark — all text (headings + body)
        'fg-secondary':  'var(--fg-secondary)', // #6e6562 light / #c2bab0 dark — labels, metadata
        surface:         'var(--surface)',   // #f7f3f5 light / #252220 dark — cards, panels
        border:          'var(--border)',    // rgba(34,34,34,0.10) light / rgba(255,251,245,0.10) dark
        'brand-hover':   'var(--accent-hover)', // #5c2232 light / #ba5a6e dark — button hover
        // ── Static — for story wrappers and explicit overrides only ─────────
        cream:           '#fffbf5',
        'cream-surface': '#f7f3f5',
        'dark-bg':       '#1c1a16',
        'dark-surface':  '#252220',
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
        'caption': ['12px', { lineHeight: '1.5' }],
      },
      letterSpacing: {
        // ── Label tracking tokens ────────────────────────────────────────
        'label': '0.12em',
        'meta':  '0.08em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // ── Spacing system — 4px/8px grid ──────────────────────────────────
      spacing: {
        'space-xs':  '0.25rem',   //   4px
        'space-sm':  '0.5rem',    //   8px
        'space-md':  '1rem',      //  16px
        'space-lg':  '1.5rem',    //  24px
        'space-xl':  '2rem',      //  32px
        'space-2xl': '3rem',      //  48px
        'space-3xl': '4rem',      //  64px
        'space-4xl': '6rem',      //  96px
        'space-5xl': '8rem',      // 128px
      },
    },
  },
  safelist: [
    'bg-brand-primary',
    'text-on-accent',
  ],
  plugins: [],
}
