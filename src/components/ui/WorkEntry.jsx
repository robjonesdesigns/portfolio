import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// ── Image placeholder ─────────────────────────────────────────────────────────
function Placeholder({ color }) {
  return (
    <div
      className="w-full h-full rounded-sm flex items-center justify-center"
      style={{
        backgroundColor: color ? `${color}28` : 'var(--border)',
        border:          `1px solid ${color ? `${color}45` : 'var(--border)'}`,
      }}
    >
      <span className="text-xs font-mono text-fg" style={{ opacity: 0.25 }}>[ image ]</span>
    </div>
  )
}

// ── Image grid — 1, 2, or 3 images ───────────────────────────────────────────
function ImageGrid({ images, color }) {
  if (!images || images.length === 0) return null

  const renderSlot = (src, i) => (
    src
      ? <img key={i} src={src} alt="" className="w-full h-full object-cover rounded-sm" />
      : <Placeholder key={i} color={color} />
  )

  if (images.length === 1) {
    return (
      <div className="w-full" style={{ aspectRatio: '16/9' }}>
        {renderSlot(images[0], 0)}
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {images.map((src, i) => (
          <div key={i} style={{ aspectRatio: '4/3' }}>{renderSlot(src, i)}</div>
        ))}
      </div>
    )
  }

  // 3+ images: first spans full width, rest in a row beneath
  const [first, ...rest] = images
  return (
    <div className="flex flex-col gap-3">
      <div style={{ aspectRatio: '16/9' }}>{renderSlot(first, 0)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rest.map((src, i) => (
          <div key={i} style={{ aspectRatio: '4/3' }}>{renderSlot(src, i + 1)}</div>
        ))}
      </div>
    </div>
  )
}

// ── WorkEntry ─────────────────────────────────────────────────────────────────
export default function WorkEntry({ project }) {
  const { slug, headline, company, role, description, outcomes, images, color } = project

  return (
    <m.article
      className="py-12 md:py-16 border-t"
      style={{ borderColor: 'var(--border)' }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      {/* Headline */}
      <h3
        className="font-display font-bold tracking-tighter leading-tight text-fg mb-8 md:mb-10"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
      >
        {headline}
      </h3>

      {/* Images */}
      <div className="mb-5">
        <ImageGrid images={images} color={color} />
      </div>

      {/* See more */}
      <div className="mb-10 md:mb-12">
        <Link
          to={`/projects/${slug}`}
          className="text-sm font-mono tracking-wide text-brand-primary hover:opacity-60 transition-opacity"
        >
          See more →
        </Link>
      </div>

      {/* Metadata row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

        <div>
          <p className="text-xs font-mono tracking-widest uppercase mb-2 text-fg" style={{ opacity: 0.4 }}>
            Company
          </p>
          <p className="text-sm text-fg">{company}</p>
        </div>

        <div>
          <p className="text-xs font-mono tracking-widest uppercase mb-2 text-fg" style={{ opacity: 0.4 }}>
            Role
          </p>
          <p className="text-sm text-fg">{role}</p>
        </div>

        <div>
          <p className="text-xs font-mono tracking-widest uppercase mb-2 text-fg" style={{ opacity: 0.4 }}>
            Problem
          </p>
          <p className="text-sm text-fg leading-relaxed" style={{ opacity: 0.75 }}>{description}</p>
        </div>

        <div>
          <p className="text-xs font-mono tracking-widest uppercase mb-2 text-fg" style={{ opacity: 0.4 }}>
            Outcome
          </p>
          <ul className="flex flex-col gap-2">
            {(outcomes || []).map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-fg leading-relaxed">
                <span className="text-brand-primary shrink-0 leading-relaxed">○</span>
                <span style={{ opacity: 0.75 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </m.article>
  )
}
