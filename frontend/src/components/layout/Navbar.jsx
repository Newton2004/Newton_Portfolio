import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { navLinks } from '../../data/portfolioData'
import ThemeToggle from '../ui/ThemeToggle'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
        style={scrolled ? {
          background: isDark ? 'rgba(0,0,0,0.88)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.08)',
        } : {}}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link to="home" smooth offset={-80} className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(0,212,255,0.25)',
                }}
              >
                <span className="gradient-text">NR</span>
              </div>
              <span className="font-semibold text-white/90 hidden sm:block tracking-wide text-sm">
                Newton Raja
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  smooth
                  offset={-80}
                  spy
                  onSetActive={() => setActiveSection(link.href)}
                  className="relative px-3 py-2 text-sm rounded-lg cursor-pointer transition-all duration-300 group"
                  style={{
                    color: activeSection === link.href ? '#FF6B5B' : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.7)'),
                  }}
                >
                  {link.label}
                  {/* Active indicator */}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(0,212,255,0.08)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover dot */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* CTA */}
            <Link to="contact" smooth offset={-80} className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.25)',
                }}
              >
                Hire Me
              </motion.button>
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <HiX className="w-5 h-5 text-white/80" />
              ) : (
                <HiMenu className="w-5 h-5 text-white/80" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 top-[64px] z-40 md:hidden"
            style={{
              background: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <ul className="px-6 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    smooth
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
                    style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.7)' }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
