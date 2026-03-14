import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation, AnimatePresence, MotionConfig } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Cursor from './components/ui/Cursor'
import SEO from './components/ui/SEO'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import CaseStudy from './components/case-study/CaseStudy'
import Resume from './pages/Resume'
import PageTransition from './components/ui/PageTransition'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rob Jones',
  jobTitle: 'Product Designer',
  url: 'https://www.designedbyrob.com',
  email: 'robjonesdesigns@gmail.com',
  sameAs: [
    'https://linkedin.com/in/robjonesdesigner',
  ],
}

function HomePage() {
  return (
    <>
      <SEO
        canonical="/"
        description="Rob Jones is a UX & Product Designer with 5+ years across enterprise SaaS and 0→1 startups. View case studies for Honeywell, Aysa, and Keytrn."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <Projects />
      <About />
    </>
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
  return <Cursor />
}

function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main" tabIndex="-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/keytrn" element={null} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <HelmetProvider>
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="noise">
          <a href="#projects" className="skip-link">Skip to main content</a>
          <ConditionalCursor />
          <AnimatedRoutes theme={theme} toggleTheme={toggle} />
        </div>
      </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
    </HelmetProvider>
  )
}
