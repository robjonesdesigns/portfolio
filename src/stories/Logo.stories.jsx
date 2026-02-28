import { motion } from 'framer-motion'
import RJLogoComponent from '../components/ui/RJLogo'

// Local inline version used by colour-documentation stories below.
// Uses explicit hex props so colours are visible regardless of CSS context.
const RJLogo = ({ size = 40, color = '#813746', dotColor = '#813746' }) => (
  <svg width={size} height={size * (38 / 36)} viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 33.5V3.5C0.5 1.56701 2.067 0 4 0C5.933 0 7.5 1.56701 7.5 3.5V33.5C7.5 35.433 5.933 37 4 37C2.067 37 0.5 35.433 0.5 33.5Z" fill={color}/>
    <path d="M29.7754 2.56878C25.5125 -0.215006 18.8015 -0.177577 14.8076 0.15553C12.8815 0.316169 11.5 1.96593 11.5 3.89868V4.46865C11.5 6.68091 13.2957 8.47306 15.508 8.46864L21.6104 8.45645C23.7893 8.4521 25.558 10.2172 25.558 12.3962C25.558 14.572 23.7941 16.3359 21.6183 16.3359H15.5C13.2909 16.3359 11.5 18.1267 11.5 20.3359V20.9626C11.5 22.8609 12.834 24.4924 14.7203 24.7057C19.1322 25.2045 26.9855 25.4831 31.1812 21.9732C37.92 16.3359 36.2508 6.79733 29.7754 2.56878Z" fill={color}/>
    <path d="M35.5 32C35.5 34.7614 33.2614 37 30.5 37C27.7386 37 25.5 34.7614 25.5 32C25.5 29.2386 27.7386 27 30.5 27C33.2614 27 35.5 29.2386 35.5 32Z" fill={dotColor}/>
  </svg>
)

export default {
  title: 'Design System/Logo',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
}

export const OnLight = {
  render: () => (
    <div style={{ backgroundColor: '#fffbf5', padding: '48px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(34,34,34,0.8)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Light theme — RJ mark: #813746 · Dot: #222222
      </p>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end' }}>
        {[16, 24, 40, 56, 80].map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <RJLogo size={size} color="#813746" dotColor="#222222" />
            <span style={{ fontSize: '10px', color: 'rgba(34,34,34,0.8)' }}>{size}px</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const OnDark = {
  render: () => (
    <div style={{ backgroundColor: '#1c1a16', padding: '48px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', color: 'rgba(255,251,245,0.8)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Dark theme — RJ mark: #e36f86 · Dot: #fffbf5
      </p>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end' }}>
        {[16, 24, 40, 56, 80].map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <RJLogo size={size} color="#e36f86" dotColor="#fffbf5" />
            <span style={{ fontSize: '10px', color: 'rgba(255,251,245,0.8)' }}>{size}px</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Sizes = {
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {[
        { size: 16, label: '16px — Favicon' },
        { size: 24, label: '24px — Mobile nav / tight inline' },
        { size: 40, label: '40px — Default nav (compact header)' },
        { size: 56, label: '56px — Standard desktop nav' },
        { size: 80, label: '80px — Featured / splash' },
      ].map(({ size, label }) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <RJLogo size={size} color="#813746" dotColor="#222222" />
          <span style={{ fontFamily: 'Arial', fontSize: '12px', color: 'var(--fg)', opacity: 0.5 }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
}

// ─── Interactions ─────────────────────────────────────────────────────────────
// Uses the real RJLogoComponent so CSS token colours (light/dark) apply correctly.
// Hover → scale 1.1 · Click/tap → rotate 180° + scale 0.5, springs back on release.

const SPRING = { type: 'spring', stiffness: 400, damping: 17 }

export const Interactions = {
  name: 'Interactions — hover & click',
  render: () => (
    <div style={{
      backgroundColor: 'var(--bg)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
    }}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ rotate: 180, scale: 0.5 }}
        transition={SPRING}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        <RJLogoComponent size={56} />
      </motion.div>
      <p style={{
        fontFamily: 'monospace',
        fontSize: '11px',
        color: 'var(--fg)',
        opacity: 0.4,
        textAlign: 'center',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        Hover to scale · Click to spin
      </p>
    </div>
  ),
}

// ─── Minimum size ─────────────────────────────────────────────────────────────

export const MinimumSize = {
  render: () => (
    <div style={{ backgroundColor: 'var(--bg)', padding: '48px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '12px', color: 'var(--fg)', opacity: 0.5, marginBottom: '24px' }}>
        Minimum usable size — do not use below 24px
      </p>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <RJLogo size={24} color="#813746" dotColor="#222222" />
          <div style={{ fontSize: '10px', color: '#813746', marginTop: '8px' }}>24px ✓</div>
        </div>
        <div style={{ textAlign: 'center', opacity: 0.35 }}>
          <RJLogo size={16} color="#813746" dotColor="#222222" />
          <div style={{ fontSize: '10px', color: 'rgba(34,34,34,0.8)', marginTop: '8px' }}>16px — favicon only</div>
        </div>
      </div>
    </div>
  ),
}
