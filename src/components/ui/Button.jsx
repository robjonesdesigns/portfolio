import { forwardRef } from 'react'

/**
 * Button — polymorphic button / link component
 *
 * variant:  primary | secondary | tertiary | link
 * size:     sm | md | lg
 * as:       any element or component (default: 'button')
 *           Pass as="a" for anchor links, as={Link} for react-router
 *
 * Primary   — filled brand accent, primary CTA
 * Secondary — bordered, no fill, secondary CTA
 * Tertiary  — surface fill, lower-emphasis action
 * Link      — text only, inline links and icon CTAs
 */

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

const variants = {
  primary:   'bg-brand-primary text-on-accent shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] hover:bg-[var(--accent-hover)]',
  secondary: 'border border-brand-primary text-brand-primary bg-transparent hover:bg-[var(--accent-bg-10)]',
  tertiary:  'bg-surface text-fg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]',
  link:      'text-brand-primary hover:opacity-75',
}

const sizes = {
  sm: 'px-4 py-2 text-body',
  md: 'px-7 py-3.5 text-body md:text-body-lg',
  lg: 'px-9 py-5 text-body md:text-body-lg',
}

// Link variant: vertical padding only (no horizontal padding, no pill shape)
const linkSizes = {
  sm: 'py-2 text-body',
  md: 'py-3.5 text-body md:text-body-lg',
  lg: 'py-5 text-body md:text-body-lg',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    as: Tag = 'button',
    className = '',
    ...props
  },
  ref
) {
  const isLink = variant === 'link'

  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-0',
    'disabled:opacity-40 disabled:pointer-events-none',
    isLink ? linkSizes[size] : cn('rounded-full active:scale-[0.97]', sizes[size]),
    variants[variant],
    className
  )

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  )
})

export default Button
