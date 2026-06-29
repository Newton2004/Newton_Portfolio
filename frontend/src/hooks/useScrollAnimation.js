import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

/**
 * Hook to trigger Framer Motion animations when element enters viewport.
 * @param {number} threshold - 0..1, how much of element must be visible
 * @param {boolean} triggerOnce - animate only once
 */
export function useScrollAnimation(threshold = 0.1, triggerOnce = true) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [controls, inView, triggerOnce])

  return { ref, controls, inView }
}

/**
 * Hook to get scroll position and direction.
 */
export function useScrollPosition() {
  const scrollY = useRef(0)
  const scrollDirection = useRef('up')

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY
      scrollDirection.current = current > scrollY.current ? 'down' : 'up'
      scrollY.current = current
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return { scrollY, scrollDirection }
}

/**
 * Hook for parallax effect based on scroll.
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = window.scrollY
      const offset = (scrolled - rect.top - scrolled) * speed
      el.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}
