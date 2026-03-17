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
    <m.div variants={fadeUp} className="flex flex-col gap-3">
      <h3 className="type-display-sm">
        {item.label}
      </h3>
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
          <div style={{ aspectRatio: '16/9', lineHeight: 1.6, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <p className="font-body text-body md:text-body-lg leading-relaxed text-center" style={{ color: 'var(--fg)', opacity: 0.4 }}>
              {item.note || '[ asset coming soon ]'}
            </p>
          </div>
        )}
      </div>
      {item.caption && (
        <p className="type-body leading-relaxed max-w-3xl mt-3">
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
              className="flex flex-col gap-6 max-w-3xl"
            >
              <m.h1
                variants={fadeUp}
                className="type-display-md"
              >
                {project.headline}
              </m.h1>

              {/* Meta */}
              <m.div variants={fadeUp} className="grid grid-cols-2 gap-x-8 gap-y-6">

                {/* Left col — Company + Problem */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="type-badge font-bold uppercase tracking-wide">Company</span>
                    <span className="type-body font-medium">{project.company}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="type-badge font-bold uppercase tracking-wide">Problem</span>
                    <p className="type-body">{project.metaProblem}</p>
                  </div>
                </div>

                {/* Right col — Role + Outcome */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="type-badge font-bold uppercase tracking-wide">Role</span>
                    <span className="type-body font-medium">{project.role}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="type-badge font-bold uppercase tracking-wide">Outcome</span>
                    <p className="type-body">{project.outcomes?.[0]}</p>
                  </div>
                </div>

              </m.div>
            </m.div>
          </Container>
        </div>

        {/* Content */}
        <div className="py-20">
          <Container>
            <m.div
              className="flex flex-col gap-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0 }}
              variants={stagger}
            >

              {/* Overview */}
              {project.intro && (
                <m.div variants={fadeUp} className="flex flex-col gap-4 max-w-3xl">
                  <h2 className="type-display-md">Overview</h2>
                  <p className="type-body leading-relaxed">{project.intro}</p>
                </m.div>
              )}

              {/* Process media — with optional section labels and key insight */}
              {project.processMedia?.map(item => (
                <Fragment key={item.id}>
                  {item.sectionLabel && (
                    <m.div variants={fadeUp} className="max-w-3xl">
                      <h2 className="type-display-md">{item.sectionLabel}</h2>
                    </m.div>
                  )}
                  <ProcessMediaCard item={item} />
                  {item.followedByInsight && project.keyInsight && (
                    <m.div
                      variants={fadeUp}
                      className="max-w-3xl flex flex-col gap-3"
                      style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem' }}
                    >
                      <span className="type-label">Key insight</span>
                      <p className="type-body leading-relaxed">{project.keyInsight}</p>
                    </m.div>
                  )}
                </Fragment>
              ))}

              {/* Design Decisions */}
              {project.designDecisions?.length > 0 && (
                <m.div variants={fadeUp} className="flex flex-col gap-10 max-w-3xl">
                  <h2 className="type-display-md">Design decisions</h2>
                  {project.designDecisions.map((d, i) => (
                    <div key={i} className="flex flex-col gap-6 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
                      <h3 className="type-display-sm">{d.title}</h3>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                          <span className="type-badge font-bold uppercase tracking-wide">Problem</span>
                          <p className="type-body leading-relaxed">{d.problem}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="type-badge font-bold uppercase tracking-wide">Decision</span>
                          <p className="type-body leading-relaxed">{d.decision}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="type-badge font-bold uppercase tracking-wide">Why</span>
                          <p className="type-body leading-relaxed">{d.why}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </m.div>
              )}

              {/* Reflection */}
              {project.reflection && (
                <m.div variants={fadeUp} className="flex flex-col gap-4 max-w-3xl">
                  <h2 className="type-display-md">Reflection</h2>
                  <p className="type-body leading-relaxed">{project.reflection}</p>
                </m.div>
              )}

              {/* UGA Business Law Clinic */}
              {project.ugaContent !== undefined && (
                <m.div variants={fadeUp} className="max-w-3xl">
                  {project.ugaContent ? (
                    <p className="type-body leading-relaxed">{project.ugaContent}</p>
                  ) : (
                    <p className="type-body leading-relaxed" style={{ opacity: 0.35, fontStyle: 'italic' }}>
                      Worked with the UGA Business Law Clinic on entity structure, IP ownership, and equity agreements. Content coming soon.
                    </p>
                  )}
                </m.div>
              )}

              {/* Navigation */}
              <m.div
                variants={fadeUp}
                className="flex justify-between items-center pt-8 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <a href="/" className="type-link">
                  ← All Projects
                </a>
                {(() => {
                  const idx = projects.findIndex((p) => p.slug === project.slug)
                  const next = projects[(idx + 1) % projects.length]
                  return (
                    <a href={`/projects/${next.slug}`} className="type-link">
                      Next: {next.title} →
                    </a>
                  )
                })()}
              </m.div>

            </m.div>
          </Container>
        </div>
      </div>
    </PageTransition>
  )
}
