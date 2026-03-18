import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

export default function SitemapPage() {
  const { theme, toggle } = useTheme()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
    <div className="noise">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar theme={theme} toggleTheme={toggle} />
      <main id="main" tabIndex="-1">
        <div className="min-h-screen pt-28 md:pt-36 pb-24" style={{ backgroundColor: 'var(--bg)' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 2rem' }}>

            <h1 className="type-display-md mb-8">Sitemap</h1>

            <nav aria-label="Site map">
              <h2 className="type-label mb-3">Pages</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
                <li className="mb-2"><a href="/" className="type-link">Home</a></li>
                <li className="mb-2"><a href="/resume" className="type-link">Resume</a></li>
              </ul>

              <h2 className="type-label mb-3">Case Studies</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li className="mb-2"><a href="/projects/keytrn-proptech" className="type-link">Keytrn - PropTech Platform</a></li>
                <li className="mb-2"><a href="/projects/honeywell-apm" className="type-link">Honeywell - Asset Performance Management</a></li>
                <li className="mb-2"><a href="/projects/honeywell-warehouse" className="type-link">Honeywell - Warehouse Operations</a></li>
                <li className="mb-2"><a href="/projects/aysa-mvp" className="type-link">Aysa - MVP Launch</a></li>
                <li className="mb-2"><a href="/projects/sinta-hr-platform" className="type-link">Sinta - HR Interview Platform</a></li>
              </ul>
            </nav>

          </div>
        </div>
      </main>
      <Footer />
    </div>
      </MotionConfig>
    </LazyMotion>
  )
}
