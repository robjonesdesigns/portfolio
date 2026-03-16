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
          <a
            href="#first-project"
            className="skip-link"
            onClick={e => {
              e.preventDefault()
              const article = document.getElementById('first-project')
              const link = article?.querySelector('a[href^="/projects/"]')
              article?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              setTimeout(() => link?.focus({ preventScroll: true }), 400)
            }}
          >Skip to work</a>
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
