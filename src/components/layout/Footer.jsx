import { useState } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import RJLogo from '../ui/RJLogo'
import Container from './Container'

const EMAIL = 'robjonesdesigns@gmail.com'

const navLinks = [
  { label: 'Work',   href: '/#projects' },
  { label: 'About',  href: '/#about'    },
  { label: 'Resume', href: '/resume'    },
]

const EASE = [0.16, 1, 0.3, 1]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  async function handleEmailCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback for environments without clipboard API (e.g. mobile Safari)
      window.location.href = `mailto:${EMAIL}`
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-token text-fg">

      {/* ── CTA ── */}
      <div className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            {/* Heading */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block w-7 h-px flex-shrink-0 bg-brand-primary" />
                <span className="font-body text-label text-brand-primary">
                  Available for work
                </span>
              </div>
              <h2
                className="font-display font-bold text-display-lg text-fg"
              >
                Let's build something<br className="hidden md:block" /> great together.
              </h2>
            </div>

            {/* Email CTA — copies to clipboard, falls back to mailto on unsupported browsers */}
            <m.button
              onClick={handleEmailCopy}
              className="self-start md:self-end flex items-center gap-3 px-6 py-3.5
                         border border-brand-primary text-brand-primary font-body text-body-sm
                         tracking-wide rounded hover:bg-brand-primary hover:text-on-accent
                         transition-colors duration-200 whitespace-nowrap"
              animate={copied ? { scale: [1, 0.96, 1] } : {}}
              transition={{ duration: 0.18, ease: EASE }}
            >
              {copied ? '✓  Copied!' : EMAIL}
            </m.button>

          </div>
        </Container>
      </div>

      {/* ── Nav row ── */}
      <div className="py-8 border-t border-token">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Logo + identity */}
            <div className="flex items-center gap-3">
              <RJLogo size={28} />
              <div className="flex flex-col leading-tight">
                <span className="font-body text-body-sm font-medium">Rob Jones</span>
                <span className="font-body text-caption opacity-50">UX &amp; Product Designer</span>
              </div>
            </div>

            {/* Page nav */}
            <nav className="flex flex-wrap items-center gap-6" aria-label="Footer navigation">
              {navLinks.map(({ label, href }) =>
                href.startsWith('/#') ? (
                  <a
                    key={label}
                    href={href}
                    className="font-body text-body-sm opacity-70 hover:opacity-100 hover:text-brand-primary transition-all duration-200"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    className="font-body text-body-sm opacity-70 hover:opacity-100 hover:text-brand-primary transition-all duration-200"
                  >
                    {label}
                  </Link>
                )
              )}
            </nav>

            {/* Social + back to top */}
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/robjonesux"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-brand-primary opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <button
                onClick={handleEmailCopy}
                className="font-body text-body-sm opacity-70 hover:opacity-100 hover:text-brand-primary transition-all duration-200"
              >
                {copied ? '✓ Copied!' : 'Email'}
              </button>
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="font-body text-body-sm opacity-70 hover:opacity-100 hover:text-brand-primary transition-all duration-200"
              >
                ↑ Top
              </button>
            </div>

          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-token flex flex-col md:flex-row justify-between gap-1">
            <p className="font-body text-caption opacity-40">© {new Date().getFullYear()} Rob Jones. All rights reserved.</p>
            <p className="font-body text-caption opacity-40">Designed &amp; built by Rob Jones</p>
          </div>

        </Container>
      </div>

    </footer>
  )
}
