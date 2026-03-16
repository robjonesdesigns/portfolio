import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setVisible(true)
  }, [])

  if (!visible) return null

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX  = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.4 })
  const dotY  = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.4 })
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 160, mass: 0.7 })
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 160, mass: 0.7 })

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e) => {
      const el = e.target
      const interactive = el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') || el.dataset.cursor === 'pointer'
      setIsPointer(!!interactive)
      setIsText(!!(el.dataset.cursor === 'text' || el.closest('[data-cursor="text"]')))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Dot */}
      <m.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full mix-blend-difference bg-white"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: isPointer ? 10 : 6, height: isPointer ? 10 : 6 }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <m.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'var(--accent)',
        }}
        animate={{
          width:   isPointer ? 48 : isText ? 72 : 34,
          height:  isPointer ? 48 : isText ? 72 : 34,
          opacity: isPointer ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
      />
    </>
  )
}
