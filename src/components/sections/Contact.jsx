import { useState } from 'react'
import { m } from 'framer-motion'
import Container from '../layout/Container'

const EMAIL = 'robjonesdesigns@gmail.com'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export default function Contact() {
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
    <section id="contact" className="py-24 md:py-36">
      <Container>
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {/* Label */}
          <m.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-px bg-brand-primary" />
            <span className="font-body text-label text-brand-primary">
              Contact
            </span>
          </m.div>

          {/* Heading */}
          <m.h2
            variants={fadeUp}
            className="font-display font-bold text-display-lg mb-6 text-fg"
          >
            Let's work<br />together.
          </m.h2>

          <m.p
            variants={fadeUp}
            className="font-body text-body md:text-body-lg leading-relaxed mb-12 max-w-lg text-fg opacity-60"
          >
            Have a project in mind? I'm open to new opportunities, collaborations,
            and conversations. Reach out and let's create something great.
          </m.p>

          {/* Email CTA */}
          <m.div variants={fadeUp}>
            <m.button
              onClick={handleEmailCopy}
              className="flex items-center gap-3 px-6 py-3.5 border border-brand-primary
                         text-brand-primary font-body text-body-sm tracking-wide rounded
                         hover:bg-brand-primary hover:text-on-accent transition-colors duration-200"
              animate={copied ? { scale: [1, 0.96, 1] } : {}}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {copied ? '✓  Copied!' : EMAIL}
            </m.button>
          </m.div>

          {/* Social links */}
          <m.div
            variants={fadeUp}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-token"
          >
            <a
              href="https://linkedin.com/in/robjonesux"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-brand-primary opacity-70 hover:opacity-100 transition-opacity duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </m.div>

        </m.div>
      </Container>
    </section>
  )
}
