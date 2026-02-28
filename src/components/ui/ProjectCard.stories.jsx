import { MemoryRouter } from 'react-router-dom'
import ProjectCard from './ProjectCard'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    project: { control: 'object', description: 'Project data object' },
  },
}

// ─── Wrappers ──────────────────────────────────────────────────────────────────

// Adaptive — no dark prop → uses var(--bg), responds to theme toolbar
// Forced — pass dark={true|false} for comparison stories only
const CardShell = ({ dark, children }) => {
  const forced = dark !== undefined
  return (
    <div className={forced && dark ? 'dark' : ''}>
      <div
        className="px-6 md:px-10 lg:px-14"
        style={{ backgroundColor: forced ? (dark ? '#1c1a16' : '#fffbf5') : 'var(--bg)', paddingTop: '32px', paddingBottom: '32px' }}
      >
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </div>
  )
}

const cardDecorator = [(Story) => <CardShell><Story /></CardShell>]

// ─── Data ──────────────────────────────────────────────────────────────────────

const baseProject = {
  slug: 'honeywell',
  title: 'Honeywell',
  year: '2022–2025',
  description: 'Led UX for multiple data-heavy B2B SaaS dashboards used by reliability engineers to monitor industrial asset health.',
  tags: ['B2B SaaS', 'Data Dashboards', 'Research', 'Design System'],
  image: null,
}

// ─── Default — interactive, use the Controls panel to explore ─────────────────

export const Default = {
  decorators: cardDecorator,
  args: { project: baseProject },
}

// ─── Individual stories — adaptive (theme toolbar switches light/dark) ─────────

export const WithImage = {
  name: 'With Image',
  decorators: cardDecorator,
  parameters: { controls: { disable: true } },
  args: {
    project: {
      ...baseProject,
      slug: 'aysa',
      title: 'Aysa',
      year: '2025',
      description: 'Shipped a complete MVP from zero to live in 2 weeks. 15,000+ views in early rollout.',
      tags: ['0-to-1 Product', 'Mobile-First', 'Consumer UX'],
      image: '/images/aysa-cover.png',
    },
  },
}

export const ManyTags = {
  name: 'Many Tags',
  decorators: cardDecorator,
  parameters: { controls: { disable: true } },
  args: {
    project: {
      ...baseProject,
      tags: ['Information Architecture', 'System Design', 'Dual-Sided Platform', 'Design System', 'Web & Mobile', 'Research'],
    },
  },
}

// ─── Both themes — comparison reference ────────────────────────────────────────

export const BothThemes = {
  name: 'Light & Dark',
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Light</p>
      </div>
      <CardShell dark={false}>
        <ProjectCard project={baseProject} />
      </CardShell>
      <div style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Dark</p>
      </div>
      <CardShell dark={true}>
        <ProjectCard project={baseProject} />
      </CardShell>
    </div>
  ),
}

// ─── Responsive grid — resize with viewport toolbar ────────────────────────────

const projects = [
  { ...baseProject },
  {
    ...baseProject,
    slug: 'aysa',
    title: 'Aysa',
    year: '2025',
    description: 'Shipped a complete MVP from zero to live in 2 weeks. 15,000+ views in early rollout.',
    tags: ['0-to-1 Product', 'Mobile-First', 'Consumer UX'],
    image: '/images/aysa-cover.png',
  },
  {
    ...baseProject,
    slug: 'design-system',
    title: 'Design System',
    year: '2023',
    description: 'Built a shared component library and token system used across three product teams.',
    tags: ['Design System', 'Tokens', 'Component Library'],
  },
  {
    ...baseProject,
    slug: 'research',
    title: 'Research Sprint',
    year: '2024',
    description: 'Ran 12 user interviews and synthesised findings into a prioritised opportunity map.',
    tags: ['UX Research', 'Jobs to Be Done', 'Synthesis'],
  },
]

export const ResponsiveGrid = {
  name: 'Responsive Grid ↔ resize with toolbar',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="px-6 md:px-16" style={{ backgroundColor: 'var(--bg)', paddingTop: '48px', paddingBottom: '48px' }}>
      <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(34,34,34,0.55)', margin: '0 0 20px' }}>
        grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 · stacks below md (768px)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  ),
}
