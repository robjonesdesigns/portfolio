import { m, LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import PageTransition from '../ui/PageTransition'
import Container from '../layout/Container'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const slideUp = {
  hidden: { y: 24 },
  show:   { y: 0, transition: { duration: 0.65, ease: EASE } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

/* ─── Resume data ──────────────────────────────────────────────── */
const experience = [
  {
    company:  'Honeywell',
    role:     'UX Designer',
    period:   '2022 – 2025',
    bullets: [
      'Led UX design for 3+ Asset Performance Management Dashboards, from discovery to high-fidelity UI and dev handoff.',
      'Planned and ran user research: wrote screeners and interview guides, recruited participants, and conducted moderated interviews to validate workflows.',
      'Partnered with PM and engineering to iterate quickly and ship improvements across a data-heavy enterprise platform.',
      'Increased usability through research-driven iteration, contributing to SUS scores in the 80s.',
    ],
  },
  {
    company:  'Freelance',
    role:     'Product Designer',
    period:   '2020 – Present',
    bullets: [
      'Shipped a corporate transparency app (Aysa) from concept to live in 2 weeks, earning 15,000+ views in its first social rollout. Rebuilt the investor pitch deck from scratch in support of a $2.1M seed round.',
      'Designed Sinta\'s full HR interview platform from scratch — interview builder, live session screen with competency timestamping, post-interview review, and candidate scorecard. Product shipped, raised significant funding, and was acquired.',
      'Led primary research across 20+ Pennsylvania county offices for Keytrn (PropTech platform) and designed both the government upload portal and consumer property browser as the sole designer.',
      'Led the mentee side of Alonesy (mentorship app) — moderated interviews with 11 participants, 3 rounds of iteration, shipped with developers. App still live.',
      'Designed and built agency and client websites in Webflow for Coffee & Bananaz. Designed and maintained campaign websites for Justice Democrats across senate and congressional races.',
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
      <h2 className="type-display-sm">{children}</h2>
    </div>
  )
}

function ExperienceBlock({ company, role, period, bullets }) {
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
      <div>
        <h3 className="type-body font-bold">{company}</h3>
        <p className="type-body mt-1">{role}</p>
        <p className="type-body mt-1">{period}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {bullets.map((b, i) => (
          <li key={i} className="type-body pl-4 relative">
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
  const { theme, toggle } = useTheme()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
      <div className="noise">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Navbar theme={theme} toggleTheme={toggle} />
        <main id="main" tabIndex="-1">
        <PageTransition>
      <div className="min-h-screen pt-28 md:pt-36 pb-24" style={{ backgroundColor: 'var(--bg)' }}>
        <Container>

          {/* Header — animates in on mount only */}
          <m.div
            className="mb-16"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <m.h1 variants={slideUp} className="type-display-2xl mb-3">
              Rob Jones
            </m.h1>

            <m.p variants={slideUp} className="type-display-md tracking-tight mb-6">
              UX &amp; Product Designer with 4+ years across startups &amp; SaaS enterprise
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4 type-body">
              <a href="mailto:robjonesdesigns@gmail.com" target="_blank" rel="noopener noreferrer"
                className="text-brand-primary hover:opacity-70 transition-opacity duration-200">
                robjonesdesigns@gmail.com
              </a>
              <span style={{ opacity: 0.3 }}>·</span>
              <span>470-382-0603</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <a href="https://linkedin.com/in/robjonesdesigner" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="text-brand-primary hover:opacity-70 transition-opacity duration-200">
                LinkedIn
              </a>
            </m.div>

            <m.div variants={fadeUp} className="mt-8">
              <Button as="a" href="/RobJonesResume.pdf" download="RobJonesResume.pdf" aria-label="Download Rob Jones resume as PDF">
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
          <div className="mb-16">
            <SectionLabel>Experience</SectionLabel>
            {experience.map((job) => (
              <ExperienceBlock key={job.company} {...job} />
            ))}
          </div>

          {/* Education */}
          <div className="mb-16">
            <SectionLabel>Education</SectionLabel>
            <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="type-body font-bold">Stony Brook University</p>
                <p className="type-body mt-1">BA in Studio Arts</p>
              </div>
              <div>
                <p className="type-body font-bold">CareerFoundry</p>
                <p className="type-body mt-1">UX Design Certified Program</p>
                <p className="type-body mt-1">600+ hours</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <SectionLabel>Skills</SectionLabel>
            <div className="grid md:grid-cols-2 gap-10 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="type-badge font-bold mb-4 uppercase tracking-wide">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>
              <div>
                <p className="type-badge font-bold mb-4 uppercase tracking-wide">Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map(f => <Badge key={f}>{f}</Badge>)}
                </div>
              </div>
            </div>
          </div>


        </Container>
      </div>
    </PageTransition>
        </main>
        <Footer />
      </div>
      </MotionConfig>
    </LazyMotion>
  )
}
