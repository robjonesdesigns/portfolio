import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import Container from '../components/layout/Container'
import Badge from '../components/ui/Badge'

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

/* ─── Resume data ──────────────────────────────────────────────── */
const experience = [
  {
    company:  'Aysa',
    role:     'Product Designer',
    period:   'November 2025 – Present',
    bullets: [
      'Shipped a complete MVP from zero to live in 2 weeks, helping the product earn 15,000+ views in early rollout.',
      'Established a scalable UI kit / component library to keep screens consistent and reduce redesign churn.',
      'Partnered directly with engineering and founders to iterate quickly and keep design/implementation aligned.',
    ],
  },
  {
    company:  'Keytrn Technologies',
    role:     'Product Designer',
    period:   'May 2025 – September 2025',
    bullets: [
      'Created the brand + design system (tokens & components) to keep the product consistent as it grows.',
      'Interviewed 20+ municipalities to understand foreclosure / tax-delinquent workflows and data access.',
      'Worked closely with the founding team to define MVP scope and ship designs that are build-ready.',
    ],
  },
  {
    company:  'Honeywell',
    role:     'UX Designer',
    period:   'April 2022 – June 2025',
    bullets: [
      'Led UX design for 3+ Asset Performance Management Dashboards, from discovery to high-fidelity UI and dev handoff.',
      'Planned and ran user research: wrote screeners and interview guides, recruited participants, and conducted moderated interviews to validate workflows.',
      'Partnered with PM and engineering to iterate quickly and ship improvements across a data-heavy enterprise platform.',
      'Increased usability through research-driven iteration, contributing to SUS scores in the 80s.',
    ],
  },
]

const additionalExperience = [
  {
    company: 'Sinta',
    role:    'UX Designer',
    period:  'December 2021 – April 2022',
    bullets: [
      'Owned the full UX lifecycle for a next-generation HR interview platform, working directly with the founders to shape product strategy and design core workflows.',
    ],
  },
  {
    company: 'Coffee & Bananaz',
    role:    'UX Designer & Webflow Developer',
    period:  'September 2021 – March 2022',
    bullets: [
      'Redesigned the agency\'s website, transforming it from a static portfolio into a dynamic platform that showcased client work and the studio\'s creative energy.',
    ],
  },
  {
    company: 'National Political Advocacy Group',
    role:    'UX Design Consultant & WordPress Developer',
    period:  'July 2021 – January 2022',
    bullets: [
      'Collaborated with the design team to ensure political campaign websites followed best design practices.',
      'Designed and maintained 3 political leaders\' campaign websites.',
    ],
  },
]

const tools = ['Figma', 'Balsamiq', 'Framer', 'Webflow', 'WordPress', 'Miro', 'Jira', 'Confluence', 'UserTesting']

const frameworks = [
  'Human-Centered Design',
  'User Interviews + Screener Design',
  'Usability Testing',
  'Affinity Mapping',
  'Information Architecture',
  'Design Systems',
  'Agile / Iterative Design',
]

/* ─── Sub-components ───────────────────────────────────────────── */

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="inline-block w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
        {children}
      </span>
    </div>
  )
}

function ExperienceBlock({ company, role, period, bullets }) {
  return (
    <motion.div variants={fadeUp} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
      {/* Left — company meta */}
      <div>
        <p className="font-display font-bold text-base tracking-tight" style={{ color: 'var(--fg)' }}>
          {company}
        </p>
        <p className="text-sm mt-1" style={{ color: 'var(--accent)' }}>{role}</p>
        <p className="text-xs mt-1 font-mono" style={{ color: 'var(--fg)', opacity: 0.45 }}>{period}</p>
      </div>
      {/* Right — bullets */}
      <ul className="flex flex-col gap-3">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm leading-relaxed pl-4 relative" style={{ color: 'var(--fg)', opacity: 0.75 }}>
            <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}


/* ─── Page ─────────────────────────────────────────────────────── */

export default function Resume() {
  return (
    <PageTransition>
      <main className="min-h-screen pb-24" style={{ backgroundColor: 'var(--bg)', paddingTop: 140 }}>
        <Container size="md">

          {/* Header */}
          <motion.div
            className="mb-16"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold tracking-tighter leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--fg)' }}
            >
              Rob Jones
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={fadeUp}
              className="font-display text-lg md:text-xl tracking-tight mb-6"
              style={{ color: 'var(--accent)' }}
            >
              UX &amp; Product Designer with 5+ years across startups &amp; SaaS enterprise
            </motion.p>

            {/* Contact row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--fg)', opacity: 0.6 }}>
              <a href="mailto:robjonesdesigns@gmail.com" className="hover:opacity-100 transition-opacity"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}>
                robjonesdesigns@gmail.com
              </a>
              <span style={{ opacity: 0.3 }}>·</span>
              <a href="tel:4703820603" className="hover:opacity-100 transition-opacity">
                470-382-0603
              </a>
              <span style={{ opacity: 0.3 }}>·</span>
              <a href="https://www.designedbyrob.com" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}>
                designedbyrob.com
              </a>
            </motion.div>

            {/* Download button */}
            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="/RobJonesResume.pdf"
                download="RobJonesResume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v8M3.5 6l3.5 3.5L10.5 6M1 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download PDF
              </a>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="h-px mb-16" style={{ backgroundColor: 'var(--border)' }} />

          {/* Experience */}
          <motion.section
            className="mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Experience</SectionLabel>
            </motion.div>
            {experience.map((job) => (
              <ExperienceBlock key={job.company} {...job} />
            ))}
          </motion.section>

          {/* Education */}
          <motion.section
            className="mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Education</SectionLabel>
            </motion.div>

            <motion.div variants={fadeUp} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="font-display font-bold text-base tracking-tight" style={{ color: 'var(--fg)' }}>
                  Stony Brook University
                </p>
                <p className="text-xs mt-1 font-mono" style={{ color: 'var(--fg)', opacity: 0.45 }}>BA in Studio Arts</p>
              </div>
              <div>
                <p className="font-display font-bold text-base tracking-tight" style={{ color: 'var(--fg)' }}>
                  CareerFoundry
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--accent)' }}>UX Design Certified Program</p>
                <p className="text-xs mt-1 font-mono" style={{ color: 'var(--fg)', opacity: 0.45 }}>600+ hours</p>
              </div>
            </motion.div>
          </motion.section>

          {/* Skills */}
          <motion.section
            className="mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Skills</SectionLabel>
            </motion.div>

            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-10 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--fg)', opacity: 0.45 }}>
                  Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {tools.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--fg)', opacity: 0.45 }}>
                  Frameworks
                </p>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(f => <Badge key={f}>{f}</Badge>)}
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Additional Experience */}
          <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Additional Experience</SectionLabel>
            </motion.div>
            {additionalExperience.map((job) => (
              <ExperienceBlock key={job.company} {...job} />
            ))}
          </motion.section>

        </Container>
      </main>
    </PageTransition>
  )
}
