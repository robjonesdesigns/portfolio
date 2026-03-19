import { m } from 'framer-motion'
import Container from '../layout/Container'

const EASE = [0.76, 0, 0.24, 1]

const LINES = [
  "I'm Rob.",
  "3 years designing enterprise SaaS.",
  "0→1 products for startups.",
]

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">

      {/* ── Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-[0.028]"
        style={{
          backgroundImage: `
            linear-gradient(var(--fg) 1px, transparent 1px),
            linear-gradient(90deg, var(--fg) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative z-10 pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="relative z-10">

          {/* ── Headline — line by line ── */}
          <h1
            className="type-display-2xl leading-[0.95] tracking-tight mb-7"
            aria-label={LINES.join(' ')}
          >
            {LINES.map((line, li) => (
              <m.span
                key={li}
                className="block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + li * 0.12, ease: EASE }}
              >
                {line === "I'm Rob." ? (
                  <>I'm <span className="font-editorial italic text-brand-primary" style={{ fontSize: '0.85em', letterSpacing: '-0.04em' }}>Rob</span>.</>
                ) : line}
              </m.span>
            ))}
          </h1>

          {/* ── Subtext ── */}
          <m.p
            className="type-body max-w-2xl mb-6 text-pretty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46, ease: EASE }}
          >
            3 years at Honeywell designing for industrial engineers. Shipped 0→1 products for early-stage founders in parallel. Currently available.
          </m.p>


        </div>
      </Container>
    </section>
  )
}
