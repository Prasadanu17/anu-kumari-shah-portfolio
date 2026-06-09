
import { useEffect, useState } from 'react'

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null // Don't show on touch devices
  }

  return (
    <div
      className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-400/10 dark:to-secondary-400/10 blur-3xl transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 0.6 : 0,
      }}
    />
  )
}

export default CursorGlow

