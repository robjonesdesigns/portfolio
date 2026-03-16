import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Cursor from './ui/Cursor'

export default function AppShell({ children }) {
  const { theme, toggle } = useTheme()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="noise">
          <a href="#main" className="skip-link">Skip to main content</a>
          <Cursor />
          <Navbar theme={theme} toggleTheme={toggle} />
          <main id="main" tabIndex="-1">
            {children}
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
