import { m } from 'framer-motion'
import Badge from '../ui/Badge'
import Container from '../layout/Container'

const EASE = [0.16, 1, 0.3, 1]

const skills = [
  'UX Research', 'Product Strategy', 'Interaction Design',
  'Design Systems', 'Prototyping', 'User Testing',
  'Figma', 'Framer', 'React', 'Accessibility',
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Headshot */}
          <m.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="/images/headshot.jpg"
                alt="Rob Jones, Product Designer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 bg-brand-primary opacity-15" />
          </m.div>

          {/* Text + skills */}
          <m.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-display-lg text-fg">
              Designing with intention. Building with care.
            </h2>

            <p className="font-body text-body md:text-body-lg text-fg-secondary">
              I'm a Product Designer with a passion for creating digital experiences
              that put people first. I bridge the gap between business goals and user
              needs, turning complex problems into elegant, intuitive solutions.
            </p>

            <p className="font-body text-body md:text-body-lg text-fg-secondary">
              With a background spanning UX research, interaction design, and design
              systems, I work best at the intersection of strategy and craft, where
              thoughtful process meets pixel-perfect execution.
            </p>

            {/* Skills */}
            <div>
              <p className="font-body font-bold text-body md:text-body-lg mb-4 text-fg-secondary uppercase tracking-wide">
                Skills &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>

          </m.div>

        </div>
      </Container>
    </section>
  )
}
