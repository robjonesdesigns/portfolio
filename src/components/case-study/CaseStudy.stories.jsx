import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CaseStudy from './CaseStudy'

// Wrap with MemoryRouter + Routes so useParams() resolves correctly
function withSlug(slug) {
  return {
    decorators: [
      (Story) => (
        <MemoryRouter initialEntries={[`/projects/${slug}`]}>
          <Routes>
            <Route path="/projects/:slug" element={<Story />} />
          </Routes>
        </MemoryRouter>
      ),
    ],
  }
}

export default {
  title: 'Case Study/CaseStudy',
  component: CaseStudy,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Full case study page. Uses useParams() to resolve the project by slug.' } },
  },
}

// --- Adaptive stories (respond to Storybook theme toolbar) ---

export const Honeywell = {
  name: 'Honeywell APM',
  ...withSlug('honeywell-apm'),
}

export const Aysa = {
  name: 'Aysa MVP',
  ...withSlug('aysa-mvp'),
}

export const Keytrn = {
  name: 'Keytrn PropTech',
  ...withSlug('keytrn-proptech'),
}

export const Sinta = {
  name: 'Sinta HR Platform',
  ...withSlug('sinta-hr-platform'),
}

export const NotFound = {
  name: 'Not Found State',
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/projects/nonexistent']}>
        <Routes>
          <Route path="/projects/:slug" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
}

// --- Light / Dark comparison ---

const Shell = ({ slug, theme }) => (
  <div data-theme={theme} style={{ background: theme === 'dark' ? '#1a1714' : '#faf8f8' }}>
    <MemoryRouter initialEntries={[`/projects/${slug}`]}>
      <Routes>
        <Route path="/projects/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>
  </div>
)

export const BothThemes = {
  name: 'Light + Dark (Honeywell)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Shell slug="honeywell-apm" theme="light" />
      <Shell slug="honeywell-apm" theme="dark" />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}
