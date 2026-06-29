import { useEffect, useState } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'

/**
 * Smooth scroll progress indicator at the top of the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setScrollPercent(Math.round(v * 100))
    })
  }, [scrollYProgress])

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* Percentage badge — shows when scrolled past hero */}
      {scrollPercent > 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center w-11 h-11 rounded-full text-xs font-mono font-bold text-white"
          style={{
            background: 'rgba(10,15,30,0.8)',
            border: '1px solid rgba(255,107,91,0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 20px rgba(255,107,91,0.15)',
          }}
        >
          {scrollPercent}%
        </motion.div>
      )}
    </>
  )
}
