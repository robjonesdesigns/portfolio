import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Marquee from '../ui/Marquee'
import HeroName from '../ui/HeroName'
import BlueprintFigure from '../ui/BlueprintFigure'

const EASE     = [0.76, 0, 0.24, 1]
const EASE_OUT = [0.16, 1, 0.3, 1]

const marqueeItems = [
  'UX Design', 'Product Design', 'Design Systems',
  'User Research', 'Interaction Design', 'Prototyping', 'Design Strategy',
]

// Navbar floating bottom edge (top:40 + height:52 = 92) + 48px breathing room
const EYEBROW_TOP = 140

export default function Hero() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const nameY       = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-[100svh] flex flex-col overflow-hidden"
    >
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

      {/* ── Eyebrow label + Badge ── */}
      <div
        className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 md:px-10"
        style={{ paddingTop: EYEBROW_TOP }}
      >
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        >
          <span className="inline-block w-7 h-px flex-shrink-0 bg-brand-primary" />
          <span className="text-xs font-mono tracking-[0.22em] uppercase text-brand-primary">
            UX & Product Designer
          </span>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-token
                     text-[11px] font-mono tracking-widest uppercase select-none text-fg bg-bg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: EASE_OUT }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
          Available for work
        </motion.div>
      </div>

      {/* ── Name — fills remaining space ── */}
      <div className="relative z-10 flex-1 min-h-0 px-6 md:px-10 pt-6 pb-2">
        {/* Blueprint figure — sits behind the name */}
        <BlueprintFigure className="absolute bottom-0 left-6 right-6 h-48 md:left-auto md:right-10 md:top-0 md:h-full md:w-[38%] pointer-events-none text-fg opacity-[0.07]" />

        <motion.div
          style={{ y: nameY, opacity: nameOpacity }}
          className="h-full relative"
        >
          <HeroName className="w-full h-full" />
        </motion.div>
      </div>

      {/* ── Marquee ── */}
      <motion.div
        className="relative z-10 flex-shrink-0 py-4 border-t border-b border-token overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
      >
        <Marquee
          items={marqueeItems}
          speed={42}
          className="text-sm md:text-base text-fg"
        />
      </motion.div>

      {/* pulse-dot keyframe */}
      <style>{`
        .pulse-dot {
          animation: pulse-ring 2.4s ease-out infinite;
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
          70%  { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
      `}</style>
    </section>
  )
}
