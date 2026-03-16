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

// Headings: slide only — never opacity:0 so crawlers always see the text
const slideUp = {
  hidden: { y: 24 },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Section({ label, children }) {
  return (
    <m.div variants={fadeUp} className="flex flex-col gap-4 max-w-3xl">
      <h2 className="font-display font-bold text-display-md text-fg">
        {label}
      </h2>
      <div className="font-body text-body md:text-body-lg leading-relaxed text-fg-secondary">
        {children}
      </div>
    </m.div>
  )
}

function ProcessMediaCard({ item }) {
  return (
    <m.div variants={fadeUp} className="flex flex-col gap-3">
      <h2 className="font-display font-bold text-display-sm text-fg">
        {item.label}
      </h2>
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
        <p className="font-body text-body md:text-body-lg leading-relaxed max-w-3xl text-fg-secondary mt-3">
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
          <Container >
            <m.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex flex-col gap-6 max-w-3xl"
            >
              <m.h1
                variants={slideUp}
                className="font-display font-bold text-display-md text-fg"
              >
                {project.headline}
              </m.h1>

              {/* Meta */}
              <m.div variants={fadeUp} className="grid grid-cols-2 gap-x-8 gap-y-6">

                {/* Left col — Company + Problem */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-body font-bold text-body md:text-body-lg text-fg-secondary uppercase tracking-wide">Company</span>
                    <span className="font-body text-body md:text-body-lg font-medium text-fg">{project.company}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-body font-bold text-body md:text-body-lg text-fg-secondary uppercase tracking-wide">Problem</span>
                    <p className="font-body text-body md:text-body-lg text-fg">{project.metaProblem}</p>
                  </div>
                </div>

                {/* Right col — Role + Outcome */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-body font-bold text-body md:text-body-lg text-fg-secondary uppercase tracking-wide">Role</span>
                    <span className="font-body text-body md:text-body-lg font-medium text-fg">{project.role}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-body font-bold text-body md:text-body-lg text-fg-secondary uppercase tracking-wide">Outcome</span>
                    <p className="font-body text-body md:text-body-lg text-fg">{project.outcomes?.[0]}</p>
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

              {/* Intro */}
              {project.intro && (
                <m.p variants={fadeUp} className="font-body text-body md:text-body-lg leading-relaxed text-fg-secondary max-w-3xl">
                  {project.intro}
                </m.p>
              )}

              {/* Process media */}
              {project.processMedia?.map(item => <ProcessMediaCard key={item.id} item={item} />)}

              {/* UGA Business Law Clinic */}
              {project.ugaContent !== undefined && (
                <m.div variants={fadeUp} className="max-w-3xl">
                  {project.ugaContent ? (
                    <p className="font-body text-body md:text-body-lg leading-relaxed text-fg-secondary">{project.ugaContent}</p>
                  ) : (
                    <p className="font-body text-body md:text-body-lg leading-relaxed text-fg-secondary" style={{ opacity: 0.35, fontStyle: 'italic' }}>
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
                <a href="/" className="font-body text-body-sm font-medium text-brand-primary">
                  ← All Projects
                </a>
                {(() => {
                  const idx = projects.findIndex((p) => p.slug === project.slug)
                  const next = projects[(idx + 1) % projects.length]
                  return (
                    <a href={`/projects/${next.slug}`} className="font-body text-body-sm font-medium text-brand-primary">
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
