import { useState, useEffect } from 'react'

export function useCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const move = (e) => setPosition({ x: e.clientX, y: e.clientY })

    const handleOver = (e) => {
      const el = e.target
      const isInteractive =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.dataset.cursor === 'pointer'
      setIsPointer(!!isInteractive)

      const isText =
        el.dataset.cursor === 'text' ||
        el.closest('[data-cursor="text"]')
      setIsHovering(!!isText)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [])

  return { position, isHovering, isPointer }
}
