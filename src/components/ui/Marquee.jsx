import { m, useReducedMotion } from 'framer-motion'

export default function Marquee({ items, speed = 30, className = '' }) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-label={items.join(' · ')}
    >
      {/* Screen readers get the label above — hide the animated content from them */}
      <m.div
        aria-hidden="true"
        className="inline-flex gap-8"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 font-display font-medium">
            <span>{item}</span>
            <span className="text-brand-primary">·</span>
          </span>
        ))}
      </m.div>
    </div>
  )
}
