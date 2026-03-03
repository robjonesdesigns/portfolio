import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle'
import RJLogo from '../ui/RJLogo'

const navLinks = [
  { label: 'Work',   href: '/#projects' },
  { label: 'About',  href: '/#about'    },
  { label: 'Resume', href: '/resume'    },
]

// Responsive floating margin — narrows on smaller screens
function getMargin() {
  if (typeof window === 'undefined') return 300
  if (window.innerWidth >= 1280) return 300
  if (window.innerWidth >= 768)  return 60
  return 16
}

export default function Navbar({ theme, toggleTheme }) {
  const [docked,   setDocked]   = useState(false)
  const [margin,   setMargin]   = useState(getMargin)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > 80)
    const onResize = () => setMargin(getMargin())
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const handleAnchor = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: id } })
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/*
        The header is always position:fixed. Framer Motion animates:
          floating → left/right = margin, top = 60, borderRadius = 50, height = 52
          docked   → left/right = 0,      top = 0,  borderRadius = 0,  height = 64
        Entry animation fires once (y: -80 → 0) then never changes.
      */}
      <m.header
        className="fixed z-50 flex items-center justify-between"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y:            0,
          opacity:      1,
          left:         docked ? 0 : margin,
          right:        docked ? 0 : margin,
          top:          docked ? 0 : 40,
          borderRadius: docked ? 0 : 50,
          height:       docked ? 64 : 52,
          paddingLeft:  docked ? 40 : 24,
          paddingRight: docked ? 40 : 24,
        }}
        transition={{
          // Entry animation — delayed, relaxed settle
          y:       { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.7, delay: 0.3 },
          // Scroll morph — snappy spring
          default: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: docked
            ? 'color-mix(in srgb, var(--surface) 92%, transparent)'
            : 'color-mix(in srgb, var(--surface) 74%, transparent)',
          border: '1px solid var(--border)',
          transition: 'background-color 0.4s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" aria-label="Home">
          <m.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 180, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{ display: 'block' }}
          >
            <RJLogo size={28} />
          </m.div>
        </Link>

        {/* Desktop nav links + toggle */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isPage = !href.startsWith('/#')
            const linkClass = "text-sm font-medium relative group text-fg opacity-70 hover:opacity-100 transition-opacity duration-300"
            const inner = (
              <>
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-brand-primary"
                />
              </>
            )
            return isPage ? (
              <Link key={label} to={href} className={linkClass}>
                {inner}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className={linkClass}
              >
                {inner}
              </a>
            )
          })}
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col gap-1.5 w-6"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <m.span
              className="h-0.5 w-full block bg-fg"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <m.span
              className="h-0.5 w-full block bg-fg"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className="h-0.5 w-full block bg-fg"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </m.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 md:hidden bg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(({ label, href }, i) => {
              const isPage = !href.startsWith('/#')
              const motionProps = {
                key: label,
                className: "font-display font-bold text-4xl tracking-tighter text-fg",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit:    { opacity: 0, y: 10 },
                transition: { delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }
              return isPage ? (
                <m.div key={label} {...motionProps}>
                  <Link to={href} onClick={() => setMenuOpen(false)} className="text-fg">
                    {label}
                  </Link>
                </m.div>
              ) : (
                <m.a
                  {...motionProps}
                  href={href}
                  onClick={(e) => { handleAnchor(e, href); setMenuOpen(false) }}
                />
              )
            })}
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
