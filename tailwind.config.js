/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Semantic — adaptive, use in components ──────────────────────────
        'brand-primary': 'var(--accent)',    // #813746 light / #e36f86 dark — primary brand
        'on-accent':     'var(--on-accent)', // #fffbf5 light / #1c1a16 dark — text on brand-primary bg
        fg:              'var(--fg)',        // #222222 light / #fffbf5 dark — all text (headings + body)
        'fg-secondary':  'var(--fg-secondary)', // #555555 light / #a8a5a0 dark — labels, metadata
        surface:         'var(--surface)',   // #f7f3f5 light / #252220 dark — cards, panels
        border:          'var(--border)',    // rgba(34,34,34,0.10) light / rgba(255,251,245,0.10) dark — dividers, card outlines
        'brand-hover':   'var(--accent-hover)', // #612935 light / #c15e72 dark — button hover (darker primary)
        // ── Static — for story wrappers and explicit overrides only ─────────
        cream:           '#fffbf5',          // light page bg (static)
        'cream-surface': '#f7f3f5',          // light surface (static)
        'dark-bg':       '#1c1a16',          // dark page bg (static)
        'dark-surface':  '#252220',          // dark surface (static)
      },
      fontFamily: {
        display:    ['"Cabinet Grotesk"', 'sans-serif'],
        editorial:  ['"Ogg"', 'Georgia', 'serif'],
        body:       ['Areal', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
      },
      // ── Fluid display type scale ────────────────────────────────────────
      // Defined in globals.css @layer utilities (avoids Tailwind JIT hyphenation issues).
      // CSS variables: --text-display-2xl/xl/lg/md in :root
      // Utility classes: .text-display-2xl/xl/lg/md in @layer utilities
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // ── Spacing system — 4px/8px grid ──────────────────────────────────
      // Matches CSS custom properties (--space-xs etc.)
      // Usage: p-space-xs, gap-space-md, mt-space-2xl, etc.
      spacing: {
        'space-xs':  '0.25rem',   //   4px — micro: icon gaps, optical tweaks
        'space-sm':  '0.5rem',    //   8px — component internal padding
        'space-md':  '1rem',      //  16px — default element spacing
        'space-lg':  '1.5rem',    //  24px — card padding, sub-gaps
        'space-xl':  '2rem',      //  32px — between related components
        'space-2xl': '3rem',      //  48px — section breathing room
        'space-3xl': '4rem',      //  64px — large layout gaps
        'space-4xl': '6rem',      //  96px — section padding (desktop)
        'space-5xl': '8rem',      // 128px — hero / full-bleed gaps
      },
    },
  },
  safelist: [
    'bg-brand-primary',
    'text-on-accent',
  ],
  plugins: [],
}
