import { m } from 'framer-motion'
import Container from '../layout/Container'

const EASE = [0.76, 0, 0.24, 1]

const LINES = [
  "I'm Rob.",
  "3 years designing enterprise SaaS.",
  "0→1 products for startups.",
]

let _i = 0
const WORDS = LINES.map(line => line.split(' ').map(word => ({ word, index: _i++ })))
const TOTAL_WORDS = _i

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

{/* ── Text content ── */}
        <div className="relative z-10">

        {/* ── Headline — word by word, forced line breaks ── */}
        <h1
          className="type-display-2xl leading-[0.95] tracking-tight mb-7"
          aria-label={LINES.join(' ')}
        >
          {WORDS.map((lineWords, li) => (
            <span key={li} className="inline">
              {lineWords.map(({ word, index }) => (
                <m.span
                  key={index}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 1, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: EASE }}
                >
                  {word === 'Rob.' ? (
                    <><span className="font-editorial italic text-brand-primary" style={{ fontSize: '0.85em', letterSpacing: '-0.04em' }}>Rob</span>.</>
                  ) : word}
                </m.span>
              ))}
            </span>
          ))}
        </h1>

        {/* ── Subtext ── */}
        <m.p
          className="type-body max-w-2xl mb-6 text-pretty"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: TOTAL_WORDS * 0.1, ease: EASE }}
        >
          3 years at Honeywell designing for industrial engineers. Shipped 0→1 products for early-stage founders in parallel. Currently available.
        </m.p>

        {/* ── Arrow — offset right to sit above center of "Work" heading ── */}
        <m.div
          aria-hidden="true"
          className="text-brand-primary inline-block ml-[15px] md:ml-[30px] lg:ml-[60px]"
          style={{ lineHeight: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.4 + TOTAL_WORDS * 0.1 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.6 + TOTAL_WORDS * 0.1 },
          }}
        >
          <svg
            className="w-[58px] h-[75px] md:w-[78px] md:h-[100px]"
            viewBox="-1 -1 22 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 0 L10 21 M5 15 L10 21 L15 15" />
          </svg>
        </m.div>

        </div>{/* end text content */}

      </Container>
    </section>
  )
}
