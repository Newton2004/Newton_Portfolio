import { useEffect, useRef } from 'react'

/**
 * Lightweight canvas-based particle background.
 * Uses requestAnimationFrame for 60fps performance.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = window.innerWidth
    let height = window.innerHeight
    let animId

    canvas.width = width
    canvas.height = height

    // Particle config
    const PARTICLE_COUNT = Math.min(60, Math.floor(width / 25))
    const particles = []

    const random = (min, max) => Math.random() * (max - min) + min

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = random(0, width)
        this.y = random(0, height)
        this.radius = random(0.5, 2.5)
        this.speedX = random(-0.3, 0.3)
        this.speedY = random(-0.5, -0.1)
        this.opacity = random(0.1, 0.6)
        this.fadeSpeed = random(0.001, 0.003)
        this.color = Math.random() > 0.5 ? '0,212,255' : '139,92,246'
        this.pulse = 0
        this.pulseSpeed = random(0.02, 0.05)
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += this.pulseSpeed
        this.opacity = 0.15 + Math.sin(this.pulse) * 0.2

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset()
          this.y = height + 10
        }
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`
        ctx.fill()
      }
    }

    // Init particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle())
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.12
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        p.update()
        p.draw()
      })

      drawConnections()
      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
