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
                width="533"
                height="800"
                loading="lazy"
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
            <h2 className="type-display-lg">
              Painter. Behavioral tech. Product designer.
            </h2>

            <p className="type-body">
              Before design, I worked as a behavioral technician with kids who had severe autism. You show up even when it's hard, because the work matters. That drive carried into art school at 30 and eventually into product design. The through line is making things that help people.
            </p>

            <p className="type-body">
              I'm research-first because I've seen what happens when you skip it. For Keytrn, I built a spreadsheet of every county in Pennsylvania and cold-called them before I opened Figma. At Honeywell, I pushed back on accessibility shortcuts over calls and emails with the Head of Product Design and senior engineers until it stuck. I built this site myself for the same reason: full control, and to speak the same language as the engineers I work with.
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

        </div>
      </Container>
    </section>
  )
}
