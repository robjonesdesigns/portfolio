import { m } from 'framer-motion'

export default function ThemeToggle({ theme, toggle }) {
  const isDark = theme === 'dark'

  return (
    <m.button
      onClick={toggle}
      className="relative w-16 h-8 rounded-full flex items-center px-1.5 border"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      suppressHydrationWarning
    >
      {/* Sun — filled burst, reads clearly at larger size */}
      <svg className="absolute left-2 w-4 h-4" style={{ color: 'var(--fg)', opacity: 0.9 }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm10-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm15.07-7.07a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zM6.34 17.66a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zm12.73 1.41a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41zM6.34 6.34a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7z"/>
      </svg>

      {/* Moon */}
      <svg className="absolute right-2 w-4 h-4" style={{ color: 'var(--fg)', opacity: 0.9 }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
      </svg>

      {/* Thumb */}
      <m.span
        className="w-5 h-5 rounded-full z-10"
        style={{ backgroundColor: 'var(--accent)', display: 'block' }}
        animate={{ x: isDark ? 30 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </m.button>
  )
}
