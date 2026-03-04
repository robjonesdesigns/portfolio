import { MemoryRouter } from 'react-router-dom'
import WorkEntry from './WorkEntry'
import { projects } from '../../data/projects'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/WorkEntry',
  component: WorkEntry,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="px-6 md:px-16 py-12" style={{ backgroundColor: 'var(--bg)', maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Honeywell = {
  args: { project: projects[0] },
}

export const Aysa = {
  args: { project: projects[1] },
}

export const AllProjects = {
  name: 'All Projects (stacked)',
  render: () => (
    <MemoryRouter>
      <div className="px-6 md:px-16 py-12" style={{ backgroundColor: 'var(--bg)', maxWidth: '1200px', margin: '0 auto' }}>
        {projects.map((p) => (
          <WorkEntry key={p.slug} project={p} />
        ))}
        <div className="border-t" style={{ borderColor: 'var(--border)' }} />
      </div>
    </MemoryRouter>
  ),
}
