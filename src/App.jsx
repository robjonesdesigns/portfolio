import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Cursor from './components/ui/Cursor'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import CaseStudy from './components/case-study/CaseStudy'
import Resume from './pages/Resume'
import KeytrnPrototype from './pages/KeytrnPrototype'
import PageTransition from './components/ui/PageTransition'

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Projects />
      <About />
    </PageTransition>
  )
}

function ScrollToTop() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ConditionalCursor() {
  const { pathname } = useLocation()
  const isKeytrn = pathname === '/keytrn'

  useEffect(() => {
    if (!isKeytrn) return
    const style = document.createElement('style')
    style.textContent = 'html { cursor: auto !important; } a, button, [role="button"] { cursor: pointer !important; }'
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [isKeytrn])

  if (isKeytrn) return null
  return <Cursor />
}

function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation()

  if (location.pathname === '/keytrn') {
    return <KeytrnPrototype />
  }

  return (
    <>
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/keytrn" element={null} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <div className="noise">
          <ConditionalCursor />
          <AnimatedRoutes theme={theme} toggleTheme={toggle} />
        </div>
      </BrowserRouter>
    </LazyMotion>
  )
}
