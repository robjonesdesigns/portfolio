/**
 * Badge — accessible tag/label component
 *
 * variant="default"  Muted text, border only
 * variant="accent"   Brand accent color with subtle tint background
 */
export default function Badge({ children, variant = 'default', className = '' }) {
  const classes = {
    default: 'text-[var(--badge-text)] bg-transparent border-token',
    accent:  'text-brand-primary bg-[var(--badge-accent-bg)] border-[var(--badge-accent-border)]',
  }

  return (
    <span className={`inline-block text-caption px-2 py-1 rounded border font-body leading-none ${classes[variant]} ${className}`}>
      {children}
    </span>
  )
}
