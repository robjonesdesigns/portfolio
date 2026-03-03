import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Badge from './Badge'

const fillVariants = {
  rest:  { opacity: 0 },
  hover: { opacity: 0.06 },
}

const arrowVariants = {
  rest:  { x: 0 },
  hover: { x: 8 },
}

export default function ProjectRow({ project, index }) {
  const { slug, title, tags, year } = project
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link to={`/projects/${slug}`} className="block">
      <motion.div
        className="relative flex items-center gap-4 md:gap-8 py-6 md:py-8 border-t overflow-hidden cursor-pointer"
        style={{ borderColor: 'var(--border)' }}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        {/* Hover fill */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'var(--accent)', zIndex: 0 }}
          variants={fillVariants}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Number */}
        <span
          className="relative font-mono text-xs shrink-0 w-7 text-fg"
          style={{ opacity: 0.3, zIndex: 1 }}
        >
          {num}
        </span>

        {/* Title */}
        <h3
          className="relative font-display font-bold tracking-tighter leading-tight text-fg flex-1"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', zIndex: 1 }}
        >
          {title}
        </h3>

        {/* Tags — desktop only, first two */}
        <div className="relative hidden lg:flex items-center gap-2 shrink-0" style={{ zIndex: 1 }}>
          {tags.slice(0, 2).map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {/* Year */}
        <span
          className="relative hidden sm:block text-sm shrink-0 font-mono text-brand-primary"
          style={{ zIndex: 1 }}
        >
          {year}
        </span>

        {/* Arrow */}
        <motion.span
          aria-hidden="true"
          className="relative text-brand-primary shrink-0 text-lg leading-none"
          style={{ zIndex: 1 }}
          variants={arrowVariants}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          →
        </motion.span>
      </motion.div>
    </Link>
  )
}
