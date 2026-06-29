import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiEye } from 'react-icons/fi'
import { HiChevronDown } from 'react-icons/hi'
import { personalInfo, statsData } from '../../data/portfolioData'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '@/context/ThemeContext'

// Animated stat card
function StatCard({ label, value, suffix, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="text-center"
    >
      <div className="text-2xl md:text-3xl font-black gradient-text">
        {inView && <CountUp end={value} duration={2.5} separator="," />}
        {suffix}
      </div>
      <div className="text-white/40 text-xs mt-1 tracking-wide">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const { isDark } = useTheme()
  const socials = [
    { icon: FiGithub, href: personalInfo.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
    { icon: FiMail, href: personalInfo.socials.email, label: 'Email' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Deep radial background */}
      <div className="absolute inset-0 dark:bg-gradient-radial dark:from-[#0a1628] dark:via-[#000000] dark:to-[#000000] pointer-events-none" />

      {/* Glow spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B5B] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#F97B7B] opacity-[0.06] blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* ── Left: Text content ──────────────────────── */}
          <div className="order-2 lg:order-1">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#10B981',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Available for Opportunities
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-white/50 font-mono text-sm mb-3 tracking-widest uppercase"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4"
            >
              Newton{' '}
              <span className="gradient-text-animated">Raja</span>
            </motion.h1>

            {/* Animated typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-xl md:text-2xl font-semibold mb-6 h-9 flex items-center"
            >
              <span className="text-white/40 mr-2">{''}</span>
              <TypeAnimation
                sequence={[
                  'Automation Test Engineer', 2000,
                  'Future Full Stack Developer', 2000,
                  'Python Developer', 1500,
                  'AI Enthusiast', 1500,
                  'Open Source Contributor', 1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-[#FF6B5B]"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-white/50 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href={personalInfo.resumeUrl} download>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B5B, #F97B7B)',
                    boxShadow: '0 0 25px rgba(255,107,91,0.3), 0 4px 15px rgba(0,0,0,0.3)',
                  }}
                >
                  <FiDownload className="w-4 h-4" />
                  Download Resume
                </motion.button>
              </a>

              <Link to="projects" smooth offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/80 border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <FiEye className="w-4 h-4" />
                  View Projects
                </motion.button>
              </Link>

              <Link to="contact" smooth offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#FF6B5B] border border-[#FF6B5B]/25"
                  style={{ background: 'rgba(255,107,91,0.04)' }}
                >
                  <FiArrowRight className="w-4 h-4" />
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-4"
            >
              <span className="text-white/30 text-xs font-mono tracking-wider">CONNECT</span>
              <div className="w-8 h-px bg-white/20" />
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,91,0.3)'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255,107,91,0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon className="w-4 h-4 text-white/60" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile visual ────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              {/* Outer orbit ring */}
              <motion.div
                className="absolute inset-[-40px] rounded-full border border-[#FF6B5B]/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF6B5B] shadow-[0_0_12px_rgba(255,107,91,0.8)]" />
              </motion.div>

              {/* Inner orbit ring */}
              <motion.div
                className="absolute inset-[-20px] rounded-full border border-[#F97B7B]/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#F97B7B] shadow-[0_0_10px_rgba(249,123,123,0.8)]" />
              </motion.div>

              {/* Avatar container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,91,0.08), rgba(249,123,123,0.12))',
                  border: '1px solid rgba(255,107,91,0.2)',
                  boxShadow: '0 0 60px rgba(255,107,91,0.12), 0 0 120px rgba(249,123,123,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Gradient avatar placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.2))',
                      border: '1px solid rgba(0,212,255,0.25)',
                    }}
                  >
                    <span className="gradient-text">NR</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 font-semibold text-sm">Newton Raja K</p>
                    <p className="text-white/30 text-xs font-mono">@Newton2004</p>
                  </div>
                </div>

                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)',
                  }}
                />
              </motion.div>

              {/* Floating badge cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -left-16 top-8 px-3 py-2 rounded-xl text-xs font-mono"
                style={{
                  background: isDark ? 'rgba(10,15,30,0.85)' : 'rgba(0,212,255,0.08)',
                  border: isDark ? '1px solid rgba(0,212,255,0.2)' : '1px solid rgba(0,212,255,0.35)',
                  backdropFilter: isDark ? 'blur(20px)' : 'blur(10px)',
                  boxShadow: isDark ? '0 0 20px rgba(0,212,255,0.1)' : '0 2px 12px rgba(0,212,255,0.15)',
                }}
              >
                <span style={{ color: isDark ? '#00d4ff' : '#0891b2' }}>2+</span>
                <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(6,78,59,0.7)' }}> yrs exp</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -right-14 bottom-12 px-3 py-2 rounded-xl text-xs font-mono"
                style={{
                  background: isDark ? 'rgba(10,15,30,0.85)' : 'rgba(139,92,246,0.08)',
                  border: isDark ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(139,92,246,0.35)',
                  backdropFilter: isDark ? 'blur(20px)' : 'blur(10px)',
                  boxShadow: isDark ? '0 0 20px rgba(139,92,246,0.1)' : '0 2px 12px rgba(139,92,246,0.15)',
                }}
              >
                <span style={{ color: isDark ? '#8b5cf6' : '#7c3aed' }}>300+</span>
                <span style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(88,28,135,0.7)' }}> tests</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats row ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 pt-10 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={1.1 + i * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
