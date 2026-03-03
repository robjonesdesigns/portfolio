import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import PageTransition from '../ui/PageTransition'
import Container from '../layout/Container'
import Badge from '../ui/Badge'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Section({ label, children }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-4">
      <p className="text-xs font-mono tracking-widest uppercase text-brand-primary">
        {label}
      </p>
      <div className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--fg)', opacity: 0.8 }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <h1 className="font-display font-bold text-4xl" style={{ color: 'var(--fg)' }}>
            Project not found
          </h1>
          <Link to="/" className="text-sm" style={{ color: 'var(--accent)' }}>
            ← Back to home
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <div className="pb-20 bg-surface" style={{ paddingTop: 140 }}>
          <Container size="md">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm mb-8"
                  style={{ color: 'var(--fg)', opacity: 0.5 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                >
                  ← Back to work
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-brand-primary" />
                <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                  Case Study
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-bold tracking-tighter leading-none"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--fg)' }}
              >
                {project.title}
              </motion.h1>

              {/* Meta */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-8 pt-4 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Duration', value: project.duration },
                  { label: 'Team', value: project.team },
                  { label: 'Year', value: project.year },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--fg)', opacity: 0.4 }}>
                      {label}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </div>

        {/* Hero image */}
        <div className="w-full overflow-hidden" style={{ height: '480px' }}>
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} interface`}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center">
              <p className="font-mono text-sm opacity-30" style={{ color: 'var(--fg)' }}>
                Add project hero image here
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="py-20">
          <Container size="sm">
            <motion.div
              className="flex flex-col gap-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <Section label="Overview">{project.overview}</Section>
              <Section label="The Problem">{project.problem}</Section>
              <Section label="Process &amp; Approach">{project.process}</Section>

              {/* Process image placeholder */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl w-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--surface)', height: '300px' }}
              >
                <p className="font-mono text-sm opacity-30" style={{ color: 'var(--fg)' }}>
                  Process / wireframes image
                </p>
              </motion.div>

              <Section label="Solution">{project.solution}</Section>

              {/* Solution image placeholder */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl w-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--surface)', height: '400px' }}
              >
                <p className="font-mono text-sm opacity-30" style={{ color: 'var(--fg)' }}>
                  Final design image
                </p>
              </motion.div>

              <Section label="Outcomes">{project.outcome}</Section>

              {/* Tags */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </motion.div>

              {/* Navigation between projects */}
              <motion.div
                variants={fadeUp}
                className="flex justify-between items-center pt-8 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <Link
                  to="/#projects"
                  className="text-sm font-medium text-brand-primary"
                >
                  ← All Projects
                </Link>
                {(() => {
                  const idx = projects.findIndex((p) => p.slug === slug)
                  const next = projects[(idx + 1) % projects.length]
                  return (
                    <Link
                      to={`/projects/${next.slug}`}
                      className="text-sm font-medium text-brand-primary"
                    >
                      Next: {next.title} →
                    </Link>
                  )
                })()}
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </div>
    </PageTransition>
  )
}
