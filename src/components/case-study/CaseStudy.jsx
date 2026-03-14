import { useParams, Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { projects } from '../../data/projects'
import PageTransition from '../ui/PageTransition'
import Container from '../layout/Container'
import Badge from '../ui/Badge'
import LazyVideo from '../ui/LazyVideo'

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
    <m.div variants={fadeUp} className="flex flex-col gap-4">
      <p className="font-body text-label text-brand-primary">
        {label}
      </p>
      <div className="font-body text-body md:text-body-lg leading-relaxed" style={{ color: 'var(--fg)', opacity: 0.8 }}>
        {children}
      </div>
    </m.div>
  )
}

function ProcessMediaCard({ item }) {
  return (
    <m.div variants={fadeUp} className="flex flex-col gap-3">
      <p className="font-body text-label text-brand-primary">
        {item.label}
      </p>
      <div style={{
        background: 'color-mix(in srgb, var(--fg) 6%, var(--surface))',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        lineHeight: 0,
      }}>
        <LazyVideo src={item.video} style={{ width: '100%', display: 'block' }} />
      </div>
      {item.caption && (
        <p className="font-body text-body-sm leading-relaxed" style={{ color: 'var(--fg)', opacity: 0.55 }}>
          {item.caption}
        </p>
      )}
    </m.div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <h1 className="font-display font-bold text-display-md text-fg">
            Project not found
          </h1>
          <Link to="/" className="font-body text-body-sm" style={{ color: 'var(--accent)' }}>
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
            <m.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <m.div variants={fadeUp}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-body text-body-sm mb-8"
                  style={{ color: 'var(--fg)', opacity: 0.5 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                >
                  ← Back to work
                </Link>
              </m.div>

              <m.div variants={fadeUp} className="flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-brand-primary" />
                <span className="font-body text-label text-brand-primary">
                  Case Study
                </span>
              </m.div>

              <m.h1
                variants={fadeUp}
                className="font-display font-bold text-display-xl text-fg"
              >
                {project.title}
              </m.h1>

              {/* Meta */}
              <m.div
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
                    <span className="font-body text-meta text-fg-secondary">
                      {label}
                    </span>
                    <span className="font-body text-body-sm font-medium text-fg">
                      {value}
                    </span>
                  </div>
                ))}
              </m.div>
            </m.div>
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
              <p className="font-body text-body-sm opacity-30" style={{ color: 'var(--fg)' }}>
                Add project hero image here
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="py-20">
          <Container size="sm">
            <div className="flex flex-col gap-16">
              <Section label="Overview">{project.overview}</Section>
              <Section label="The Problem">{project.problem}</Section>
              <Section label="Process &amp; Approach">{project.process}</Section>

              {/* Process media */}
              {project.processMedia?.length > 0
                ? project.processMedia.map(item => <ProcessMediaCard key={item.id} item={item} />)
                : (
                  <m.div variants={fadeUp} className="rounded-2xl w-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface)', height: '300px' }}>
                    <p className="font-body text-body-sm opacity-30" style={{ color: 'var(--fg)' }}>Process / wireframes image</p>
                  </m.div>
                )
              }

              <Section label="Solution">{project.solution}</Section>

              {/* Final media */}
              {project.finalMedia
                ? <ProcessMediaCard item={{ id: 'final', ...project.finalMedia }} />
                : (
                  <m.div variants={fadeUp} className="rounded-2xl w-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface)', height: '400px' }}>
                    <p className="font-body text-body-sm opacity-30" style={{ color: 'var(--fg)' }}>Final design image</p>
                  </m.div>
                )
              }

              {/* UGA Business Law Clinic — add ugaContent to project data when ready */}
              {project.ugaContent !== undefined && (
                <Section label="Business Foundation">
                  {project.ugaContent || (
                    <span style={{ opacity: 0.35, fontStyle: 'italic' }}>
                      Worked with the UGA Business Law Clinic on entity structure, IP ownership, and equity agreements. Content coming soon.
                    </span>
                  )}
                </Section>
              )}

              <Section label="Outcomes">{project.outcome}</Section>

              {/* Tags */}
              <m.div variants={fadeUp} className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </m.div>

              {/* Navigation between projects */}
              <m.div
                variants={fadeUp}
                className="flex justify-between items-center pt-8 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <Link
                  to="/#projects"
                  className="font-body text-body-sm font-medium text-brand-primary"
                >
                  ← All Projects
                </Link>
                {(() => {
                  const idx = projects.findIndex((p) => p.slug === slug)
                  const next = projects[(idx + 1) % projects.length]
                  return (
                    <Link
                      to={`/projects/${next.slug}`}
                      className="font-body text-body-sm font-medium text-brand-primary"
                    >
                      Next: {next.title} →
                    </Link>
                  )
                })()}
              </m.div>
            </div>
          </Container>
        </div>
      </div>
    </PageTransition>
  )
}
