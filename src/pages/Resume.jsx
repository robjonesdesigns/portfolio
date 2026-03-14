import { m } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import Container from '../components/layout/Container'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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
    <div className="mb-8">
      <span className="font-display font-bold text-display-sm text-fg">{children}</span>
    </div>
  )
}

function ExperienceBlock({ company, role, period, bullets }) {
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <div>
        <p className="font-body font-bold text-body md:text-body-lg text-fg">{company}</p>
        <p className="font-body text-body md:text-body-lg mt-1 text-brand-primary">{role}</p>
        <p className="font-body text-body md:text-body-lg mt-1 text-fg-secondary">{period}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {bullets.map((b, i) => (
          <li key={i} className="font-body text-body md:text-body-lg pl-4 relative text-fg-secondary">
            <span className="absolute left-0 top-[0.55em] w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function Resume() {
  return (
    <PageTransition>
      <main className="min-h-screen pb-24" style={{ backgroundColor: 'var(--bg)', paddingTop: 140 }}>
        <Container>

          {/* Header — animates in on mount only */}
          <m.div
            className="mb-16"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <m.h1 variants={fadeUp} className="font-display font-bold text-display-2xl text-fg mb-3">
              Rob Jones
            </m.h1>

            <m.p variants={fadeUp} className="font-display font-bold text-display-md text-brand-primary tracking-tight mb-6">
              UX &amp; Product Designer with 5+ years across startups &amp; SaaS enterprise
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4 font-body text-body md:text-body-lg text-fg-secondary">
              <a href="mailto:robjonesdesigns@gmail.com" target="_blank" rel="noopener noreferrer"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}>
                robjonesdesigns@gmail.com
              </a>
              <span style={{ opacity: 0.3 }}>·</span>
              <span>470-382-0603</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <a href="https://linkedin.com/in/robjonesdesigner" target="_blank" rel="noopener noreferrer"
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}>
                LinkedIn
              </a>
            </m.div>

            <m.div variants={fadeUp} className="mt-8">
              <Button as="a" href="/RobJonesResume.pdf" download="RobJonesResume.pdf">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v8M3.5 6l3.5 3.5L10.5 6M1 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download PDF
              </Button>
            </m.div>
          </m.div>

          {/* Divider */}
          <div className="h-px mb-16" style={{ backgroundColor: 'var(--border)' }} />

          {/* Experience */}
          <section className="mb-16">
            <SectionLabel>Experience</SectionLabel>
            {experience.map((job) => (
              <ExperienceBlock key={job.company} {...job} />
            ))}
          </section>

          {/* Education */}
          <section className="mb-16">
            <SectionLabel>Education</SectionLabel>
            <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="font-body font-bold text-body md:text-body-lg text-fg">Stony Brook University</p>
                <p className="font-body text-body md:text-body-lg mt-1 text-fg-secondary">BA in Studio Arts</p>
              </div>
              <div>
                <p className="font-body font-bold text-body md:text-body-lg text-fg">CareerFoundry</p>
                <p className="font-body text-body md:text-body-lg mt-1 text-brand-primary">UX Design Certified Program</p>
                <p className="font-body text-body md:text-body-lg mt-1 text-fg-secondary">600+ hours</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16">
            <SectionLabel>Skills</SectionLabel>
            <div className="grid md:grid-cols-2 gap-10 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="font-body font-bold text-body md:text-body-lg mb-4 text-fg-secondary uppercase tracking-wide">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>
              <div>
                <p className="font-body font-bold text-body md:text-body-lg mb-4 text-fg-secondary uppercase tracking-wide">Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(f => <Badge key={f}>{f}</Badge>)}
                </div>
              </div>
            </div>
          </section>

          {/* Additional Experience */}
          <section>
            <SectionLabel>Additional Experience</SectionLabel>
            {additionalExperience.map((job) => (
              <ExperienceBlock key={job.company} {...job} />
            ))}
          </section>

        </Container>
      </main>
    </PageTransition>
  )
}
