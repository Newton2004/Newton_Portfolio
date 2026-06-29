import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { personalInfo, navLinks } from '../../data/portfolioData'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socials = [
    { icon: FiGithub, href: personalInfo.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
    { icon: FiMail, href: personalInfo.socials.email, label: 'Email' },
  ]

  return (
    <footer className="relative pt-16 pb-8 border-t border-white/[0.06]">
      {/* Glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(139,92,246,0.3), transparent)' }}
      />

      <div className="section-container">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              >
                <span className="gradient-text">NR</span>
              </div>
              <span className="font-semibold text-white/90">Newton Raja K</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Automation Test Engineer transitioning into Full Stack Development.
              Building quality software, one line at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white/80 font-semibold text-sm mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    smooth
                    offset={-80}
                    className="text-white/40 text-sm hover:text-[#00d4ff] cursor-pointer transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & socials */}
          <div>
            <h3 className="text-white/80 font-semibold text-sm mb-4 tracking-wide">Get In Touch</h3>
            <p className="text-white/40 text-sm mb-4">{personalInfo.email}</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                    e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  <Icon className="w-4 h-4 text-white/60" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} Newton Raja K. Crafted with ❤️ and{' '}
            <span className="text-[#00d4ff]">React</span> +{' '}
            <span className="text-[#8b5cf6]">FastAPI</span>
          </p>
          <p className="text-white/20 text-xs font-mono">
            v1.0.0 · Open to Opportunities
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-8 w-10 h-10 rounded-xl flex items-center justify-center z-40 hidden md:flex"
        style={{
          background: 'rgba(10,15,30,0.8)',
          border: '1px solid rgba(0,212,255,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 20px rgba(0,212,255,0.1)',
        }}
        aria-label="Back to top"
      >
        <FiArrowUp className="w-4 h-4 text-[#00d4ff]" />
      </motion.button>
    </footer>
  )
}
