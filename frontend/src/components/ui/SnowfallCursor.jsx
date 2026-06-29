import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Snowfall particle trail cursor.
 * Generates snowflake particles that fall and fade at the cursor position.
 * Color adapts to theme: white in dark mode, black in light mode.
 * Optimized for desktop browsers with smooth performance using requestAnimationFrame.
 */
export default function SnowfallCursor() {
  const { isDark } = useTheme()
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const lastTimeRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

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

    // Create container for particles
    const container = document.createElement('div')
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99998;
      overflow: hidden;
    `
    document.body.appendChild(container)
    containerRef.current = container

    const particles = []
    let mouseX = 0
    let mouseY = 0
    let animFrame

    // Particle class
    class Particle {
      constructor(x, y, isDarkMode) {
        this.x = x
        this.y = y
        this.isDarkMode = isDarkMode
        this.vx = (Math.random() - 0.5) * 2 // Horizontal drift
        this.vy = Math.random() * 2 + 1 // Downward velocity
        this.life = 1 // 0 to 1
        this.lifeDecay = Math.random() * 0.01 + 0.008
        this.size = Math.random() * 4 + 2
        this.element = this.createElement()
      }

      createElement() {
        const el = document.createElement('div')
        el.innerHTML = '❄'
        
        // Color depends on theme
        const textColor = this.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
        const shadowColor = this.isDarkMode ? 'rgba(0, 212, 255, 0.4)' : 'rgba(100, 150, 255, 0.3)'
        
        el.style.cssText = `
          position: fixed;
          pointer-events: none;
          font-size: ${this.size}px;
          color: ${textColor};
          font-weight: bold;
          text-shadow: 0 0 4px ${shadowColor};
          user-select: none;
          transform: translate(${this.x}px, ${this.y}px) scale(1);
          will-change: transform, opacity;
          line-height: 1;
        `
        container.appendChild(el)
        return el
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.lifeDecay

        // Update position and opacity
        if (this.element) {
          this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.life})`
          this.element.style.opacity = Math.max(0, this.life)
        }

        return this.life > 0
      }

      destroy() {
        if (this.element) {
          this.element.remove()
          this.element = null
        }
      }
    }

    // Animation loop
    const animate = () => {
      // Update all particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        if (!particle.update()) {
          particle.destroy()
          particles.splice(i, 1)
        }
      }

      animFrame = requestAnimationFrame(animate)
    }

    // Mouse move handler - create particles at throttled intervals
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Throttle particle creation for better performance
      const now = Date.now()
      if (now - lastTimeRef.current > 30) {
        // Create 1-3 particles per throttle interval
        const particleCount = Math.random() < 0.3 ? 2 : 1
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(mouseX, mouseY, isDark))
        }
        lastTimeRef.current = now
      }
    }

    // Mouse drag handler - create more particles while dragging
    const handleMouseDown = () => {
      lastTimeRef.current = 0 // Reset throttle to create particles immediately
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })

    // Start animation loop
    animFrame = requestAnimationFrame(animate)

    return () => {
      // Clean up
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      cancelAnimationFrame(animFrame)

      // Destroy all particles
      particles.forEach(p => p.destroy())
      particles.length = 0

      // Remove container
      if (container && container.parentNode) {
        container.remove()
      }
    }
  }, [isMobile, isDark])

  return null
}
