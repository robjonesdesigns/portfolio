import { Fragment } from 'react'
import { m } from 'framer-motion'
import { projects } from '../../data/projects'
import PageTransition from '../ui/PageTransition'
import Container from '../layout/Container'
import Badge from '../ui/Badge'
import LazyVideo from '../ui/LazyVideo'

const fadeUp = {
  hidden: { y: 24 },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function ProcessMediaCard({ item }) {
  return (
    <m.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {!item.sectionLabel && (
        <h3 className="type-display-sm mb-5">
          {item.label}
        </h3>
      )}
      <div style={{
        background: 'color-mix(in srgb, var(--fg) 6%, var(--surface))',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        lineHeight: 0,
      }}>
        {item.video ? (
          <LazyVideo src={item.video} style={{ width: '100%', display: 'block' }} />
        ) : (
          <div style={{ aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '0.75rem' }}>
            <span className="type-label" style={{ opacity: 0.35 }}>Asset coming soon</span>
            <p className="font-body text-body leading-relaxed text-center max-w-md" style={{ color: 'var(--fg)', opacity: 0.4 }}>
              {item.note || '[ screenshot or recording ]'}
            </p>
          </div>
        )}
      </div>
      {item.caption && (
        <p className="type-body leading-relaxed max-w-3xl mt-2">
          {item.caption}
        </p>
      )}
    </m.div>
  )
}

export default function CaseStudy({ project }) {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <div className="pt-28 md:pt-36 pb-20 bg-subtle">
          <Container>
            <m.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col gap-10 md:gap-14"
            >
              <m.h1
                variants={fadeUp}
                className="type-display-xl"
              >
                {project.headline}
              </m.h1>

              {/* Meta strip */}
              <m.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="type-badge font-bold uppercase tracking-wide">Company</span>
                  <span className="type-body font-medium">{project.company}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="type-badge font-bold uppercase tracking-wide">Role</span>
                  <span className="type-body font-medium">{project.role}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="type-badge font-bold uppercase tracking-wide">Problem</span>
                  <p className="type-body">{project.metaProblem}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="type-badge font-bold uppercase tracking-wide">Outcome</span>
                  <p className="type-body">{project.outcomes?.[0]}</p>
                </div>
              </m.div>
            </m.div>
          </Container>
        </div>

        {/* Content */}
        <div className="py-20">
          <Container>
            <div className="flex flex-col gap-20">

              {/* Overview — opens directly, no section label */}
              {project.intro && (
                <m.div
                  className="flex flex-col gap-5 max-w-2xl"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="type-intro leading-relaxed">{project.intro}</p>
                  {project.orientationNote && (
                    <p className="type-body leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>{project.orientationNote}</p>
                  )}
                </m.div>
              )}

              {/* Problem */}
              {project.problem && (
                <m.div
                  className="flex flex-col gap-4 max-w-3xl"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="type-display-md">The problem</h2>
                  <p className="type-body leading-relaxed">{project.problem}</p>
                </m.div>
              )}

              {/* Process */}
              {project.process && (
                <m.div
                  className="flex flex-col gap-4 max-w-3xl"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="type-display-md">The work</h2>
                  <p className="type-body leading-relaxed">{project.process}</p>
                </m.div>
              )}

              {/* Outcome — shown when no reflection */}
              {!project.reflection && project.outcome && (
                <m.div
                  className="flex flex-col gap-4 max-w-3xl"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="type-display-md">Outcome</h2>
                  <p className="type-body leading-relaxed">{project.outcome}</p>
                </m.div>
              )}

              {/* Process media — with optional section labels and key insight */}
              {project.processMedia?.map(item => (
                <Fragment key={item.id}>
                  {item.sectionLabel ? (
                    <div className="flex flex-col gap-3">
                      <m.h2
                        className="type-display-md"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.sectionLabel}
                      </m.h2>
                      <ProcessMediaCard item={item} />
                    </div>
                  ) : (
                    <ProcessMediaCard item={item} />
                  )}
                  {item.followedByInsight && project.keyInsight && (
                    <m.div
                      className="flex flex-col gap-5 py-4 mt-8"
                      style={{ borderLeft: '4px solid var(--accent)', paddingLeft: '2rem' }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="type-label">Key insight</span>
                      <p className="type-intro leading-relaxed max-w-2xl">{project.keyInsight}</p>
                    </m.div>
                  )}
                </Fragment>
              ))}

              {/* Design Decisions */}
              {project.designDecisions?.length > 0 && (
                <m.div
                  className="flex flex-col gap-10 max-w-3xl mt-12"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="type-display-md">Key design decisions</h2>
                  {project.designDecisions.map((d, i) => (
                    <div key={i} className={`flex flex-col gap-10 border-t ${i === 0 ? 'pt-16' : 'pt-14'}`} style={{ borderColor: 'var(--border)' }}>
                      <h3 className={i === 0 ? 'type-display-md' : 'type-display-sm'}>{d.title}</h3>
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                          <span className="type-label">Problem</span>
                          <p className="type-body leading-relaxed">{d.problem}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="type-label">Decision</span>
                          <p className="type-body leading-relaxed">{d.decision}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="type-label">Why</span>
                          <p className="type-body leading-relaxed">{d.why}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </m.div>
              )}

              {/* UGA Business Law Clinic */}
              {project.ugaContent !== undefined && (
                <m.div
                  className="flex flex-col gap-4 max-w-2xl mt-8"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="type-display-md">UGA Business Law Clinic</h2>
                  {project.ugaContent ? (
                    <p className="type-body leading-relaxed">{project.ugaContent}</p>
                  ) : (
                    <p className="type-body leading-relaxed" style={{ opacity: 0.35, fontStyle: 'italic' }}>
                      Content coming soon.
                    </p>
                  )}
                </m.div>
              )}

              {/* Reflection */}
              {project.reflection && (
                <m.div
                  className="flex flex-col gap-4 max-w-2xl mt-16"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="type-display-md">Reflection</h2>
                  <p className="type-body leading-relaxed">{project.reflection}</p>
                </m.div>
              )}

              {/* Navigation */}
              <div
                className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center pt-8 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <a href="/" className="type-link inline-block py-2 -mx-2 px-2">
                  ← All Projects
                </a>
                {(() => {
                  const idx = projects.findIndex((p) => p.slug === project.slug)
                  const next = projects[(idx + 1) % projects.length]
                  return (
                    <a href={`/projects/${next.slug}`} className="type-link inline-block py-2 -mx-2 px-2 sm:text-right">
                      Next: {next.title} →
                    </a>
                  )
                })()}
              </div>

            </div>
          </Container>
        </div>
      </div>
    </PageTransition>
  )
}
