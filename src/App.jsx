import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Cursor from './components/ui/Cursor'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import CaseStudy from './components/case-study/CaseStudy'
import Resume from './pages/Resume'
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

function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation()

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <BrowserRouter>
      <div className="noise">
        <Cursor />
        <AnimatedRoutes theme={theme} toggleTheme={toggle} />
      </div>
    </BrowserRouter>
  )
}
