import { useState, useEffect } from 'react'
import { motion as m } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle'
import RJLogo from '../ui/RJLogo'

const navLinks = [
  { label: 'Resume', href: '/resume' },
]

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function Navbar({ theme, toggleTheme }) {
  const [entered, setEntered] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    setCurrentPath(window.location.pathname)
    return () => clearTimeout(t)
  }, [])

  const headerStyle = {
    position:       'fixed',
    zIndex:         50,
    left:           0,
    right:          0,
    top:            0,
    height:         64,
    opacity:        entered ? 1 : 0,
    transform:      entered ? 'translateY(0)' : 'translateY(-72px)',
    transition:     `opacity 0.7s ease, transform 0.8s ${EASE}, background-color 0.4s ease`,
    backdropFilter:       'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor:      'color-mix(in srgb, var(--surface) 65%, transparent)',
    borderBottom:         '1px solid var(--border)',
  }

  const linkClass = "type-nav-link relative group transition-opacity duration-300"

  return (
    <header style={headerStyle}>
      <div className="w-full h-full max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex-shrink-0" aria-label="Home" tabIndex={currentPath === '/' ? -1 : undefined}>
          <m.div
            tabIndex={-1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 180, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{ display: 'block' }}
          >
            <RJLogo size={28} />
          </m.div>
        </a>

        {/* Nav links + toggle */}
        <nav className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = currentPath === href
            return (
              <a key={label} href={href} className={linkClass}>
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-brand-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            )
          })}
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </nav>

      </div>
    </header>
  )
}
