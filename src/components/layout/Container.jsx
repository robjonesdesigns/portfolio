/**
 * Container — shared horizontal rhythm
 *
 * Wraps page content with consistent max-width and horizontal padding.
 * The outer section/main/div owns vertical padding; Container handles the rest.
 *
 * @param {'lg'|'md'|'sm'} size - Max-width tier. lg=1152px (default), md=896px, sm=768px
 * @param {string} as - HTML element or component to render as. Defaults to 'div'
 * @param {string} className - Additional Tailwind classes to merge
 * @param {React.ReactNode} children - Page content
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
