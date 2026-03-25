import { m } from 'framer-motion'
import Container from '../layout/Container'
import Badge from '../ui/Badge'
import PageTransition from '../ui/PageTransition'

const EASE = [0.16, 1, 0.3, 1]

const skills = [
  'UX Research', 'Product Strategy', 'Interaction Design',
  'Design Systems', 'Prototyping', 'User Testing',
  'Figma', 'React', 'Astro', 'Accessibility', 'Front-End Development',
]

const siteDecisions = [
  {
    title: 'Cream, not white',
    body: 'I researched drunk-tank pink, found out the calming claims were debunked, and landed on a warm cream that pairs with burgundy without being too stark. The palette matches my photo: pink hat, cream sweater, leather jacket.',
  },
  {
    title: 'The font with the human signature',
    body: 'The body font is Areal, discovered through 99% Invisible. It includes an am dash: a character that looks like an em dash but with serifs. A small statement about human touch in an era where AI writes everything with em dashes.',
  },
  {
    title: 'Dark mode as a design artifact',
    body: 'The portfolio respects your system preference and lets you toggle. It is not a feature. It is a demonstration that the token system works across both themes.',
  },
  {
    title: 'Video loops, not screenshots',
    body: "A static screenshot shows one moment. A loop shows how the product actually behaves. Inspired by a coworker's portfolio. The homepage should tell the full story without requiring a single click.",
  },
  {
    title: 'Burgundy and rose',
    body: 'Pink is my favorite color but it carries weight I did not want. Burgundy for light mode, rose for dark. Same family, no baggage. 7.78:1 contrast ratio on light, 4.81:1 on dark.',
  },
  {
    title: 'Built from scratch',
    body: 'Astro for the HTML and accessibility. React for interactions. Framer Motion for subtle scroll animations that never hide content from screen readers. No Webflow. No template. Full control.',
  },
  {
    title: 'Process over polish',
    body: 'The homepage shows craft. The case studies show thinking. A recruiter sees the product in the first scroll. A hiring manager sees the decisions in the case study. Two audiences, two surfaces, one portfolio.',
  },
  {
    title: 'Fluid type, not snapping breakpoints',
    body: 'Headlines use CSS clamp() so they scale smoothly across every viewport. Body text steps at one breakpoint for readability. The headers should feel natural to every screen, not just the ones they were designed for.',
  },
]

export default function AboutContent() {
  return (
    <PageTransition>
      <div className="min-h-screen">

        {/* Hero */}
        <div className="pt-28 md:pt-36 pb-20 bg-subtle">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

              {/* Headshot: y-only on outer so the image is always in the DOM */}
              <m.div
                className="relative"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src="/images/headshot.jpg"
                      alt="Rob Jones, Product Designer"
                      width="533"
                      height="800"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 bg-brand-primary opacity-15" />
                </m.div>
              </m.div>

              {/* Bio: h1 uses y-only on outer, opacity on inner to stay VoiceOver-findable */}
              <m.div
                className="flex flex-col gap-8"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              >
                <h1 className="type-display-lg">
                  Behavioral tech. Painter. Product designer who codes.
                </h1>

                <m.div
                  className="flex flex-col gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                >
                  <p className="type-body leading-relaxed">
                    Before design, I worked as a behavioral technician with kids who had severe autism. That work taught me to show up, adapt in real time, and focus on what actually helps. I went to art school at 30, then moved into product design. The through line is the same: understand the person in front of you, then build something that works for them.
                  </p>

                  <p className="type-body leading-relaxed">
                    I am research-first because I have seen what happens when you skip it. For Keytrn, I built a spreadsheet of every county in Pennsylvania and cold-called 20+ offices before opening Figma. At Honeywell, I pushed back on accessibility shortcuts over calls and emails with the Head of Product Design until the fixes stuck. I have worked with early-stage founders at Aysa and Sinta where there was no team, no system, and no existing screens. I built this portfolio myself in Astro and React for the same reason I do everything: full control, and to speak the same language as the engineers I work with.
                  </p>

                  {/* Skills */}
                  <div>
                    <p className="type-badge font-bold mb-4 uppercase tracking-wide">
                      Skills &amp; Tools
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </m.div>
              </m.div>

            </div>
          </Container>
        </div>

        {/* Why this site exists */}
        <div className="py-20">
          <Container>
            <div className="flex flex-col gap-20">

              <m.div
                className="flex flex-col gap-5 max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h2 className="type-display-md">Why this site looks the way it does</h2>
                <p className="type-intro leading-relaxed">
                  I built this portfolio from scratch in Astro and React. Not because I needed to prove I could code, but because I wanted complete control over how the work is presented. Every decision on this site, from the color palette to the font choice to the animation timing, was deliberate. Here is why.
                </p>
              </m.div>

              {/* Decision cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteDecisions.map((d, i) => (
                  <m.div
                    key={d.title}
                    className="flex flex-col gap-3 p-6 rounded-2xl bg-surface border"
                    style={{ borderColor: 'var(--border)' }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: (i % 2) * 0.08 }}
                  >
                    <h3 className="type-display-sm">{d.title}</h3>
                    <p className="type-body leading-relaxed">{d.body}</p>
                  </m.div>
                ))}
              </div>

              {/* Closing */}
              <m.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="type-body leading-relaxed">
                  If you want to talk about any of this, or about the work itself, <a href="/contact" className="type-link">get in touch</a>.
                </p>
              </m.div>

              {/* Navigation */}
              <div
                className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center pt-8 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <a href="/" className="type-link inline-block py-2 -mx-2 px-2">
                  &larr; All Projects
                </a>
                <a href="/resume" className="type-link inline-block py-2 -mx-2 px-2 sm:text-right">
                  Resume &rarr;
                </a>
              </div>

            </div>
          </Container>
        </div>

      </div>
    </PageTransition>
  )
}
