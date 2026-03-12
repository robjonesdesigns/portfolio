import { m } from 'framer-motion'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Container from '../layout/Container'

const skills = [
  'UX Research', 'Product Strategy', 'Interaction Design',
  'Design Systems', 'Prototyping', 'User Testing',
  'Figma', 'Framer', 'React', 'Accessibility',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Headshot */}
          <m.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="/images/headshot.jpg"
                alt="Rob Jones, Product Designer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Decorative accent block */}
            <m.div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 bg-brand-primary opacity-15"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </m.div>

          {/* Text + skills */}
          <m.div
            className="flex flex-col gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <m.h2
              variants={fadeUp}
              className="font-display font-bold text-display-lg text-fg"
            >
              Designing with intention. Building with care.
            </m.h2>

            <m.p
              variants={fadeUp}
              className="font-body text-body md:text-body-lg leading-relaxed text-fg opacity-70"
            >
              I'm a Product Designer with a passion for creating digital experiences
              that put people first. I bridge the gap between business goals and user
              needs, turning complex problems into elegant, intuitive solutions.
            </m.p>

            <m.p
              variants={fadeUp}
              className="font-body text-body leading-relaxed text-fg opacity-60"
            >
              With a background spanning UX research, interaction design, and design
              systems, I work best at the intersection of strategy and craft, where
              thoughtful process meets pixel-perfect execution.
            </m.p>

            {/* Skills */}
            <m.div variants={fadeUp}>
              <p className="font-body text-label mb-4 text-brand-primary">
                Skills &amp; Tools
              </p>
              <m.div
                className="flex flex-wrap gap-2"
                variants={staggerContainer}
              >
                {skills.map((skill) => (
                  <m.div key={skill} variants={fadeUp} className="inline-block">
                    <Badge>{skill}</Badge>
                  </m.div>
                ))}
              </m.div>
            </m.div>

            {/* Download CV */}
            <m.div variants={fadeUp}>
              <Button as="a" href="/RobJonesResume.pdf" target="_blank" rel="noopener noreferrer" variant="link">
                Download Resume ↓
              </Button>
            </m.div>
          </m.div>
        </div>
      </Container>
    </section>
  )
}
