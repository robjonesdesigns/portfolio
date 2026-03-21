import { useState } from 'react'
import { motion as m } from 'framer-motion'
import Container from './Container'

const EMAIL = 'robjonesdesigns@gmail.com'
const EASE = [0.16, 1, 0.3, 1]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  async function handleEmailCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <footer className="border-t border-token text-fg">
      <div className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block w-7 h-px flex-shrink-0 bg-brand-primary" />
                <span className="font-body text-label text-brand-primary">
                  Available for work
                </span>
              </div>
              <h2 className="type-display-lg">
                Let's build something<br className="hidden md:block" /> great together.
              </h2>
            </div>

            <div className="self-start md:self-end relative">
              <m.button
                onClick={handleEmailCopy}
                aria-label={copied ? 'Email address copied' : `${EMAIL}: copy email address`}
                className="flex items-center rounded border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-on-accent transition-colors duration-200 whitespace-nowrap"
                animate={copied ? { scale: [1, 0.96, 1] } : {}}
                transition={{ duration: 0.18, ease: EASE }}
              >
                <span className="font-body text-body md:text-body-lg px-5 py-3">{EMAIL}</span>
                <span className="self-stretch w-px bg-current opacity-30" />
                <span className="px-4 py-3 flex items-center justify-center">
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <rect x="5" y="1" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M9 9v2.5A1.5 1.5 0 0 1 7.5 13h-6A1.5 1.5 0 0 1 0 11.5v-6A1.5 1.5 0 0 1 1.5 4H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className="sr-only">{copied ? 'Email address copied' : 'Copy email address'}</span>
                </span>
              </m.button>

              {copied && (
                <m.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-7 left-0 font-body text-body-sm text-fg-secondary"
                >
                  Copied to clipboard
                </m.span>
              )}
            </div>

          </div>
          <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <a href="/sitemap" className="type-link inline-block py-2 -mx-2 px-2">
              Sitemap
            </a>
          </div>
        </Container>
      </div>
    </footer>
  )
}
