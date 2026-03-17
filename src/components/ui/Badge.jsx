export default function Badge({ children, className = '' }) {
  return (
    <span className={`type-badge inline-block px-3 py-1.5 rounded border border-token-strong bg-transparent ${className}`}>
      {children}
    </span>
  )
}
