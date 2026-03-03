import { motion } from 'framer-motion'
import ProjectRow from '../ui/ProjectRow'
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
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
              <span className="inline-block w-8 h-px bg-brand-primary" />
              <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                Selected Work
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display font-bold tracking-tighter leading-none text-fg"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Projects
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-xs text-sm leading-relaxed md:text-right text-fg opacity-60"
          >
            A selection of recent work across product design, design systems, and UX research.
          </motion.p>
        </motion.div>

        {/* Rows */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {projects.map((project, i) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <ProjectRow project={project} index={i} />
            </motion.div>
          ))}
          {/* Bottom border after last row */}
          <div className="border-t" style={{ borderColor: 'var(--border)' }} />
        </motion.div>
      </Container>
    </section>
  )
}
