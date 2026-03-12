import { m } from 'framer-motion'
import WorkEntry from '../ui/WorkEntry'
import { projects } from '../../data/projects'
import Container from '../layout/Container'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-12 md:py-24 bg-projects">
      {/* Dot grid — same 24px pitch as the hero grid, dots instead of lines */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--fg) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <Container>
        {/* Header */}
        <m.div
          className="mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <m.h2
            variants={fadeUp}
            className="font-display font-bold text-display-xl text-fg"
          >
            Work
          </m.h2>
        </m.div>

        {/* Work entries */}
        <div>
          {projects.map((project) => (
            <WorkEntry key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}
