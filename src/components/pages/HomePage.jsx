import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import About from '../sections/About'

export default function HomePage() {
  const { theme, toggle } = useTheme()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="noise">
          <a href="#main" className="skip-link">Skip to main content</a>
          <Navbar theme={theme} toggleTheme={toggle} />
          <main id="main" tabIndex="-1">
            <Hero />
            <Projects />
            <About />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
