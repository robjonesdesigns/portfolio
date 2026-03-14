import { useEffect, useRef, useState } from 'react'

export default function LazyVideo({ src, style, className }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '600px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      autoPlay={visible}
      muted
      loop
      playsInline
      preload="none"
      style={style}
      className={className}
    />
  )
}
