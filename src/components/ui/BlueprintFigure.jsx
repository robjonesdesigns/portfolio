import { motion } from 'framer-motion'

/**
 * BlueprintFigure — Da Vinci Vitruvian Man crossed with architectural drawing.
 * Human proportions inscribed in a circle, with construction lines, golden ratio
 * arc, and measurement annotations. Uses --accent for structural highlights.
 */
export default function BlueprintFigure({ className = '' }) {
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.0 }}
    >
      <svg
        viewBox="0 0 180 220"
        fill="none"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Dot grid */}
          <pattern id="bp-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="0.5" fill="currentColor" />
          </pattern>
        </defs>

        {/* Dot grid background */}
        <rect width="180" height="220" fill="url(#bp-dots)" opacity="0.45" />

        {/* ── Construction geometry ── */}

        {/* Outer Vitruvian circle — accent */}
        <circle cx="90" cy="108" r="80" stroke="var(--accent)" strokeWidth="0.55" opacity="0.55" />

        {/* Inner secondary ring */}
        <circle cx="90" cy="108" r="56" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" opacity="0.18" />

        {/* Inscribed square (80 / √2 ≈ 56.6 from centre) */}
        <rect
          x="33.4" y="51.4" width="113.2" height="113.2"
          stroke="currentColor" strokeWidth="0.35" strokeDasharray="3 3" opacity="0.22"
        />

        {/* Centre crosshairs */}
        <line x1="90" y1="18" x2="90" y2="198" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 5" opacity="0.16" />
        <line x1="5"  y1="108" x2="175" y2="108" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 5" opacity="0.16" />

        {/* Radius lines to figure extremities */}
        <line x1="90" y1="108" x2="14"  y2="78"  stroke="currentColor" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.18" />
        <line x1="90" y1="108" x2="166" y2="78"  stroke="currentColor" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.18" />
        <line x1="90" y1="108" x2="90"  y2="28"  stroke="currentColor" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.16" />

        {/* Golden ratio arc (top → right) — accent */}
        <path
          d="M 90 28 A 80 80 0 0 1 170 108"
          stroke="var(--accent)" strokeWidth="0.45" strokeDasharray="2 2.5" opacity="0.38"
        />

        {/* ── Human figure ── */}

        {/* Head */}
        <circle cx="90" cy="38" r="12" stroke="currentColor" strokeWidth="0.55" opacity="0.68" />

        {/* Neck + spine */}
        <line x1="90" y1="50"  x2="90" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.62" />

        {/* Shoulders */}
        <line x1="62" y1="68" x2="118" y2="68" stroke="currentColor" strokeWidth="0.5" opacity="0.65" />

        {/* Arms outstretched (angled slightly down, Da Vinci pose) */}
        <line x1="62"  y1="68" x2="14"  y2="78" stroke="currentColor" strokeWidth="0.45" opacity="0.58" />
        <line x1="118" y1="68" x2="166" y2="78" stroke="currentColor" strokeWidth="0.45" opacity="0.58" />

        {/* Navel — golden ratio emphasis, accent */}
        <circle cx="90" cy="103" r="3"   stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
        <circle cx="90" cy="103" r="1"   fill="var(--accent)" opacity="0.45" />

        {/* Hips */}
        <line x1="70" y1="122" x2="110" y2="122" stroke="currentColor" strokeWidth="0.45" opacity="0.6" />

        {/* Legs */}
        <line x1="82"  y1="150" x2="63"  y2="190" stroke="currentColor" strokeWidth="0.45" opacity="0.52" />
        <line x1="98"  y1="150" x2="117" y2="190" stroke="currentColor" strokeWidth="0.45" opacity="0.52" />

        {/* ── Measurement annotations ── */}

        {/* Cardinal tick marks on outer circle */}
        <line x1="87" y1="28"  x2="93" y2="28"  stroke="currentColor" strokeWidth="0.6" opacity="0.48" />
        <line x1="87" y1="188" x2="93" y2="188" stroke="currentColor" strokeWidth="0.6" opacity="0.48" />
        <line x1="10" y1="105" x2="10" y2="111" stroke="currentColor" strokeWidth="0.6" opacity="0.48" />
        <line x1="170" y1="105" x2="170" y2="111" stroke="currentColor" strokeWidth="0.6" opacity="0.48" />

        {/* Key point dots at hands and feet */}
        <circle cx="14"  cy="78"  r="1.5" fill="currentColor" opacity="0.52" />
        <circle cx="166" cy="78"  r="1.5" fill="currentColor" opacity="0.52" />
        <circle cx="63"  cy="190" r="1.5" fill="currentColor" opacity="0.42" />
        <circle cx="117" cy="190" r="1.5" fill="currentColor" opacity="0.42" />

        {/* Centre cross */}
        <line x1="87" y1="108" x2="93" y2="108" stroke="currentColor" strokeWidth="0.55" opacity="0.38" />
        <line x1="90" y1="105" x2="90" y2="111" stroke="currentColor" strokeWidth="0.55" opacity="0.38" />

        {/* Height dimension line (left side) */}
        <line x1="4"  y1="26"  x2="14" y2="26"  stroke="currentColor" strokeWidth="0.35" opacity="0.32" />
        <line x1="4"  y1="190" x2="14" y2="190" stroke="currentColor" strokeWidth="0.35" opacity="0.32" />
        <line x1="9"  y1="26"  x2="9"  y2="190" stroke="currentColor" strokeWidth="0.3"  opacity="0.26" />

        {/* Shoulder angle arc */}
        <path d="M 124 68 A 7 7 0 0 1 127 75" stroke="currentColor" strokeWidth="0.4" opacity="0.38" />

        {/* Labels */}
        <text x="172" y="82"  fill="currentColor"   fontSize="4"   opacity="0.38" fontFamily="monospace">r</text>
        <text x="3"   y="112" fill="var(--accent)"  fontSize="4.5" opacity="0.42" fontFamily="monospace">φ</text>
        <text x="70"  y="212" fill="currentColor"   fontSize="3.5" opacity="0.28" fontFamily="monospace">1 : 1.618</text>
      </svg>
    </motion.div>
  )
}
