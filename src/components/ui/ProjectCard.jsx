import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import Button from './Button'

export default function ProjectCard({ project }) {
  const { slug, title, tags, description, image, year } = project

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-surface border border-border"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-bg">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-full h-full flex items-center justify-center text-6xl font-display font-bold tracking-tightest opacity-10 text-fg"
          >
            {title[0]}
          </div>
        )}

        {/* Hover overlay — visual only, description exposed via sr-only below */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 flex items-end p-4 md:p-6"
          style={{ backgroundColor: 'var(--overlay)' }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-white text-sm leading-relaxed">{description}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col">

        {/* Title + year */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-xl tracking-tighter leading-tight text-fg">
            {title}
          </h3>
          <span className="text-sm shrink-0 mt-1 text-brand-primary">
            {year}
          </span>
        </div>

        {/* Description — screen reader accessible, visually hidden */}
        <p className="sr-only">{description}</p>

        {/* Tags — ul/li for correct semantics, no aria-label on plain div */}
        <ul className="mt-4 flex flex-wrap gap-2 list-none p-0 m-0">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button as={Link} to={`/projects/${slug}`} variant="link" className="mt-6">
          View Case Study
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Button>

      </div>
    </motion.div>
  )
}
