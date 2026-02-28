/**
 * Container — shared horizontal rhythm
 *
 * Wraps page content with consistent max-width and horizontal padding.
 * The outer section/main/div owns vertical padding; Container handles the rest.
 *
 * size   max-width    used by
 * ─────────────────────────────────────────────────────
 * lg     72rem        homepage sections (default)
 * md     56rem        resume, case-study hero
 * sm     48rem        case-study long-form content
 *
 * as: override the rendered element (defaults to 'div')
 */
export default function Container({ as: Tag = 'div', size = 'lg', className = '', children }) {
  const widths = {
    lg: 'max-w-6xl',
    md: 'max-w-4xl',
    sm: 'max-w-3xl',
  }

  const classes = [widths[size], 'mx-auto px-6 md:px-10', className]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
