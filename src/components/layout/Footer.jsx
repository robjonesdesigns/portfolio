import { useState } from 'react'
import { m } from 'framer-motion'
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
              <h2 className="font-display font-bold text-display-lg text-fg">
                Let's build something<br className="hidden md:block" /> great together.
              </h2>
            </div>

            <m.button
              onClick={handleEmailCopy}
              aria-label={copied ? 'Email address copied' : `Copy ${EMAIL}`}
              className="self-start md:self-end flex items-center gap-3 px-6 py-3.5
                         border border-brand-primary text-brand-primary font-body text-body md:text-body-lg
                         tracking-wide rounded hover:bg-brand-primary hover:text-on-accent
                         transition-colors duration-200 whitespace-nowrap"
              animate={copied ? { scale: [1, 0.96, 1] } : {}}
              transition={{ duration: 0.18, ease: EASE }}
            >
              {copied ? '✓  Copied!' : EMAIL}
            </m.button>

          </div>
          <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <a href="/sitemap" className="font-body text-body text-fg-secondary hover:text-brand-primary transition-colors">
              Sitemap
            </a>
          </div>
        </Container>
      </div>
    </footer>
  )
}
