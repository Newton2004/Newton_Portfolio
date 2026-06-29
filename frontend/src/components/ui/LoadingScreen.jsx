import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

/**
 * Cinematic premium loading screen — shown for ~2.8 seconds on first load.
 */
export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0 = intro, 1 = logo, 2 = bar, 3 = exit
  const [progress, setProgress] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const { isDark } = useTheme()
  const fullText = 'NEWTON RAJA'

  useEffect(() => {
    // Phase 0 → 1: initial flash
    const t0 = setTimeout(() => setPhase(1), 300)
    // Phase 1 → 2: start bar after logo appears
    const t1 = setTimeout(() => setPhase(2), 700)
    // Phase 2: animate progress
    const t2 = setTimeout(() => setPhase(3), 2400)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Animate progress bar 0 → 100 over ~1.7 s
  useEffect(() => {
    if (phase < 2) return
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 6 + 2
      if (p >= 100) { p = 100; clearInterval(id) }
      setProgress(Math.floor(p))
    }, 40)
    return () => clearInterval(id)
  }, [phase])

  // Typewriter effect for name
  useEffect(() => {
    if (phase < 1) return
    let i = 0
    const id = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(id)
    }, 80)
    return () => clearInterval(id)
  }, [phase])

  // Notify parent to exit
  useEffect(() => {
    if (phase === 3) {
      const t = setTimeout(onComplete, 500)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden"
          style={{
            border: isDark ? 'none' : '2px solid rgba(0,0,0,0.08)',
            boxShadow: isDark ? 'none' : '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
          }}
        >
          {/* Animated grid */}
          <div className="absolute inset-0 grid-bg opacity-60" />

          {/* Center blobs */}
          <div className="absolute w-96 h-96 rounded-full bg-[#00d4ff] opacity-10 blur-[100px] top-1/4 left-1/4 animate-pulse" />
          <div className="absolute w-80 h-80 rounded-full bg-[#8b5cf6] opacity-10 blur-[100px] bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Main content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Logo mark */}
            <motion.div
              className="relative"
              animate={phase >= 1 ? { scale: [0.8, 1.05, 1] } : {}}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(0,212,255,0.3)',
                  boxShadow: '0 0 40px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <span
                  className="bg-clip-text text-transparent font-black"
                  style={{ backgroundImage: 'linear-gradient(135deg, #00d4ff, #8b5cf6)' }}
                >
                  NR
                </span>
              </div>
              {/* Ring */}
              <motion.div
                className="absolute inset-[-8px] rounded-3xl border border-[#00d4ff]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Name typewriter */}
            <div className="font-mono tracking-[0.3em] text-sm text-white/50">
              {displayText}
              <span className="animate-[cursorBlink_1s_step-end_infinite] opacity-70">|</span>
            </div>

            {/* Role */}
            <motion.p
              className="text-xs tracking-widest uppercase text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Automation Engineer · Full Stack Developer
            </motion.p>

            {/* Progress bar */}
            <div className="w-64 space-y-2">
              <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #00d4ff, #8b5cf6, #a855f7)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/25">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom signature */}
          <motion.p
            className="absolute bottom-8 text-[10px] tracking-widest uppercase text-white/20 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ delay: 1.2 }}
          >
            Portfolio · 2025
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
