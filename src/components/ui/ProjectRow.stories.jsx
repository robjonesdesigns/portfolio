import { MemoryRouter } from 'react-router-dom'
import ProjectRow from './ProjectRow'

// ─── Wrappers ──────────────────────────────────────────────────────────────────

const Shell = ({ dark, children }) => (
  <div className={dark ? 'dark' : ''} style={{ backgroundColor: dark ? '#1c1a16' : '#fffbf5', padding: '0 40px' }}>
    <MemoryRouter>{children}</MemoryRouter>
  </div>
)

// ─── Data ──────────────────────────────────────────────────────────────────────

const projects = [
  { slug: 'honeywell-apm',   title: 'Asset Performance Management', year: '2022–2025', tags: ['Enterprise SaaS', 'UX Research', 'Data Visualization', 'Agile'] },
  { slug: 'aysa-mvp',        title: 'Corporate Transparency App',   year: '2025',      tags: ['0→1 Product Design', 'Brand', 'UI Systems', 'Social Impact'] },
  { slug: 'keytrn-proptech', title: 'PropTech Property Data Platform', year: '2025',   tags: ['0→1 Product Design', 'Primary Research', 'B2G + B2C', 'Data-Heavy UI'] },
  { slug: 'sinta-hr',        title: 'Next-Gen Interview Platform',  year: '2022',      tags: ['0→1 Product Design', 'HR Tech', 'Startup', 'Figma'] },
]

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/ProjectRow',
  component: ProjectRow,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default = {
  name: 'Single Row',
  render: () => (
    <Shell>
      <ProjectRow project={projects[0]} index={0} />
    </Shell>
  ),
}

export const FullList = {
  name: 'Full List',
  render: () => (
    <Shell>
      {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
      <div style={{ borderTop: '1px solid var(--border)' }} />
    </Shell>
  ),
}

export const BothThemes = {
  name: 'Light & Dark',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#f7f3f5', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(34,34,34,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Light</p>
      </div>
      <Shell>
        {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </Shell>
      <div style={{ backgroundColor: '#252220', padding: '12px 24px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: '10px', color: 'rgba(255,251,245,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Dark</p>
      </div>
      <Shell dark>
        {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </Shell>
    </div>
  ),
}
