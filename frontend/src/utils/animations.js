// Framer Motion animation variants — reusable across all components

// ── Fade animations ────────────────────────────────────────
export const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.23, 1, 0.32, 1],
    },
  },
})

// ── Stagger container ─────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// ── Scale animations ──────────────────────────────────────
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] },
  },
})

// ── Text reveal ───────────────────────────────────────────
export const textReveal = {
  hidden: { opacity: 0, y: 20, clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
}

// ── Card hover ────────────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
}

// ── Slide from side ───────────────────────────────────────
export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] },
  },
})

export const slideInRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] },
  },
})

// ── Page transition ───────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

// ── Loading bar ───────────────────────────────────────────
export const loadingBar = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 2.2, ease: [0.23, 1, 0.32, 1] },
  },
}

// ── Orbit ─────────────────────────────────────────────────
export const orbitRotate = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
}

// ── Bounce subtle ─────────────────────────────────────────
export const bounceSoft = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ── Glow pulse ────────────────────────────────────────────
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0,212,255,0.2)',
      '0 0 50px rgba(0,212,255,0.4)',
      '0 0 20px rgba(0,212,255,0.2)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ── Number counter ────────────────────────────────────────
export const counterVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] },
  }),
}
