import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

// ─── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Site footer. Two sections: a closing CTA with a copy-to-clipboard email button (falls back to mailto on unsupported browsers), and a nav row with the RJ logo, page links (Work / About / Resume), LinkedIn icon, and a back-to-top control. Stacks vertically on mobile.',
      },
    },
  },
  // Footer uses Link from react-router-dom — MemoryRouter provides the required context.
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default = {
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Footer />
    </div>
  ),
}

// ─── Both themes ──────────────────────────────────────────────────────────────

export const BothThemes = {
  name: 'Both Themes',
  render: () => (
    <div>
      <div style={{ backgroundColor: '#fffbf5' }}>
        <Footer />
      </div>
      <div className="dark" style={{ backgroundColor: '#1c1a16' }}>
        <Footer />
      </div>
    </div>
  ),
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

export const Mobile = {
  name: 'Mobile — stacked layout',
  parameters: { viewport: { defaultViewport: 'mobile' } },
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Footer />
    </div>
  ),
}
