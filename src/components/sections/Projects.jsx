import { m } from 'framer-motion'
import WorkEntry from '../ui/WorkEntry'
import { projects } from '../../data/projects'
import Container from '../layout/Container'

const EASE = [0.16, 1, 0.3, 1]

export default function Projects() {
  return (
    <section id="projects" tabIndex="-1" className="relative py-12 md:py-24 bg-subtle">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--fg) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <Container>
        {/* Header */}
        <div className="mb-8">
          <m.h2
            className="font-display font-bold text-display-xl text-fg"
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Work
          </m.h2>
        </div>

        {/* Work entries */}
        <div>
          {projects.map((project, i) => (
            <WorkEntry key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
