export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block text-body md:text-body-lg px-3 py-1.5 rounded border font-body text-fg-secondary border-token-strong bg-transparent ${className}`}>
      {children}
    </span>
  )
}
