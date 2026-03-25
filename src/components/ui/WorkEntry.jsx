import { m } from 'framer-motion'
import LazyVideo from './LazyVideo'

const EASE = [0.16, 1, 0.3, 1]

// Stable shell values — intentionally dark regardless of theme (simulates real hardware)
const SCREEN_SHELL = {
  background: 'var(--laptop-bezel)',
  border: '1px solid var(--laptop-border)',
  borderRadius: '10px',
  padding: '16px 16px 12px',
}
const SCREEN_SHADOW = {
  filter: 'drop-shadow(0 20px 40px var(--laptop-shadow))',
  transform: 'translateY(30px)',
}

// ── Laptop mockup ─────────────────────────────────────────────────────────────
function LaptopFrame({ src, color }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-token pt-8 px-[3%]"
      style={{ background: 'color-mix(in srgb, var(--fg) 6%, var(--surface))' }}
    >
      {/* Dynamic color glow — inline only because it's driven by project color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${color}22 0%, transparent 70%)` }}
      />

      {/* Screen */}
      <div className="relative" style={SCREEN_SHADOW}>
        <div className="relative" style={SCREEN_SHELL}>
          {/* Camera dot */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '7px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--laptop-camera)' }} />
          <div className="overflow-hidden rounded-sm bg-black" style={{ lineHeight: 0, aspectRatio: '16/9' }}>
            <LazyVideo src={src} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </div>
  )
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
      <span className="type-body" style={{ opacity: 0.25 }}>[ image ]</span>
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

// ── Video grid — 1, 2, or 3+ raw videos (no laptop frame) ───────────────────
// Videos scale naturally without cropping. Screen recordings keep their
// original aspect ratio at any viewport size.
function VideoGrid({ videos, color }) {
  if (!videos || videos.length === 0) return null

  const validVideos = videos.filter(Boolean)
  if (validVideos.length === 0) return null

  if (validVideos.length === 1) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-black">
        <LazyVideo src={validVideos[0]} style={{ width: '100%', display: 'block' }} />
      </div>
    )
  }

  const [first, ...rest] = validVideos
  // Detect portrait videos by URL (mobile recordings)
  const isMobileVideo = (src) => src && src.includes('mobile')

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg bg-black">
        <LazyVideo src={first} style={{ width: '100%', display: 'block' }} />
      </div>
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ minHeight: 0 }}>
          {rest.map((src, i) => (
            isMobileVideo(src) ? (
              <div key={i} className="flex items-center justify-center rounded-2xl border border-token bg-media p-6">
                <div className="overflow-hidden rounded-lg bg-black" style={{ maxWidth: '180px', width: '100%' }}>
                  <LazyVideo src={src} style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            ) : (
              <div key={i} className="overflow-hidden rounded-2xl bg-media">
                <LazyVideo src={src} style={{ width: '100%', display: 'block' }} />
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}

// ── WorkEntry ─────────────────────────────────────────────────────────────────
export default function WorkEntry({ project, index = 0 }) {
  const { slug, headline, company, role, description, metaProblem, outcomes, images, color, video, videoGrid } = project

  return (
    <m.article
      id={index === 0 ? 'first-project' : undefined}
      tabIndex={index === 0 ? -1 : undefined}
      className="py-8 border-t"
      style={{ borderColor: 'var(--border)' }}
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
    >
      {/* Headline — outside fade wrapper so VoiceOver quick nav always finds it */}
      <h3
        className="type-display-md mb-8 md:mb-10"
      >
        {headline}
      </h3>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
      >

      {/* Images / Video */}
      <div className="mb-5">
        {videoGrid ? <VideoGrid videos={videoGrid} color={color} /> : video ? <LaptopFrame src={video} color={color} /> : <ImageGrid images={images} color={color} />}
      </div>

      {/* See more */}
      <div className="mb-10 md:mb-12">
        <a
          href={`/projects/${slug}`}
          aria-label={`See more: ${headline}`}
          className="group inline-flex items-center gap-1.5 py-2 -mx-2 px-2 font-body font-medium text-body md:text-body-lg text-brand-primary transition-opacity hover:opacity-75"
        >
          <span>See more</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* Metadata row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

        <div>
          <p className="type-badge font-bold mb-2 uppercase tracking-wide">
            Company
          </p>
          <p className="type-body">{company}</p>
        </div>

        <div>
          <p className="type-badge font-bold mb-2 uppercase tracking-wide">
            Role
          </p>
          <p className="type-body">{role}</p>
        </div>

        <div>
          <p className="type-badge font-bold mb-2 uppercase tracking-wide">
            Problem
          </p>
          <p className="type-body">{metaProblem || description}</p>
        </div>

        <div>
          <p className="type-badge font-bold mb-2 uppercase tracking-wide">
            Outcome
          </p>
          <ul className="flex flex-col gap-2">
            {(outcomes || []).map((item, i) => (
              <li key={i} className="flex gap-2 type-body">
                <span className="text-brand-primary shrink-0 leading-relaxed">○</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
      </m.div>
    </m.article>
  )
}
