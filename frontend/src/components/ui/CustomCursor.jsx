import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
/**
 * Premium cinematic custom cursor with glow and interactive hover effects.
 * Automatically hides on mobile/touch devices.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    // Detect touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let animFrame

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px)`
      }
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`
      }
      animFrame = requestAnimationFrame(animateFollower)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer')
      setIsHovering(!!isInteractive)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    animFrame = requestAnimationFrame(animateFollower)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animFrame)
    }
  }, [isMobile, isVisible])

  if (isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Core dot */}
          <motion.div
            ref={cursorRef}
            className="custom-cursor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isClicking ? 0.6 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            style={{ willChange: 'transform' }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: isHovering
                  ? isDark
                    ? 'linear-gradient(135deg, #00d4ff, #8b5cf6)'
                    : 'linear-gradient(135deg, #00d4ff, #8b5cf6)'
                  : isDark
                  ? '#35393a'
                  : '#000000',
                boxShadow: isHovering
                  ? isDark
                    ? '0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(0,212,255,0.4)'
                    : '0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(0,212,255,0.4)'
                  : isDark
                  ? '0 0 15px rgba(0,212,255,0.8)'
                  : '0 0 12px rgba(0,0,0,0.6)',
                transition: 'all 0.2s ease',
              }}
            />
          </motion.div>

          {/* Soft glow follower */}
          <motion.div
            ref={followerRef}
            className="custom-cursor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isHovering ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'transform' }}
          >
            <div
              className="w-10 h-10 rounded-full border"
              style={{
                borderColor: isHovering ? isDark ? 'rgba(139,92,246,0.5)' : 'rgba(0,0,0,0.4)' : isDark ? 'rgba(0,212,255,0.3)' : 'rgba(0,0,0,0.25)',
                background: isHovering ? isDark ? 'rgba(139,92,246,0.06)' : 'rgba(0,0,0,0.08)' : isDark ? 'rgba(0,212,255,0.04)' : 'rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
