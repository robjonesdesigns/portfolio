import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { projects } from '../../data/projects'

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
                <li className="mb-2"><a href="/" className="type-link inline-block py-2 -mx-2 px-2">Home</a></li>
                <li className="mb-2"><a href="/about" className="type-link inline-block py-2 -mx-2 px-2">About</a></li>
                <li className="mb-2"><a href="/resume" className="type-link inline-block py-2 -mx-2 px-2">Resume</a></li>
              </ul>

              <h2 className="type-label mb-3">Case Studies</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {projects.map(p => (
                  <li key={p.slug} className="mb-2">
                    <a href={`/projects/${p.slug}`} className="type-link inline-block py-2 -mx-2 px-2">
                      {p.company}: {p.title}
                    </a>
                  </li>
                ))}
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
