import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { FiCode, FiCpu, FiZap, FiTrendingUp } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'

const traits = [
  {
    icon: FiCpu,
    title: 'Automation Engineer',
    description: 'Expert in building scalable test automation frameworks with Selenium, Robot Framework, and Playwright.',
    color: '#FF6B5B',
  },
  {
    icon: FiCode,
    title: 'Full Stack Developer',
    description: 'Transitioning into full stack development with React, FastAPI, and PostgreSQL. Building real-world projects.',
    color: '#F97B7B',
  },
  {
    icon: FiZap,
    title: 'AI Enthusiast',
    description: 'Exploring AI integration in software testing and development — from ML-powered test generation to intelligent automation.',
    color: '#FFB0A3',
  },
  {
    icon: FiTrendingUp,
    title: 'Entrepreneur at Heart',
    description: 'Driven by the vision of building impactful products. Always learning, always building, always growing.',
    color: '#FF6B5B',
  },
]

const highlights = [
  { label: 'Location', value: 'India' },
  { label: 'Focus', value: 'Full Stack + AI' },
  { label: 'Experience', value: '2+ Years' },
  { label: 'Status', value: 'Open to Work' },
]

export default function About() {
  const { isDark } = useTheme()
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F97B7B] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="About Me"
          title="Who I"
          highlight="Am"
          description="A passionate engineer who believes in building software that makes a difference."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Bio ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                Hi! I'm <span className="text-white font-semibold">Newton Raja K</span>, an
                Automation Test Engineer with 2+ years of experience designing and implementing
                robust test frameworks that ensure software quality at scale.
              </p>
              <p>
                My journey began with a curiosity for{' '}
                <span className="text-[#FF6B5B]">how software breaks</span>, which evolved into
                a passion for{' '}
                <span className="text-[#F97B7B]">how it's built</span>. I'm now actively
                transitioning into Full Stack Development, mastering React, FastAPI, and
                cloud-native architectures.
              </p>
              <p>
                Beyond coding, I'm deeply fascinated by{' '}
                <span className="text-[#FFB0A3]">Artificial Intelligence</span> and how it can
                transform the way we build and test software. My dream is to create an
                AI-powered automation platform that redefines software quality.
              </p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                    border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1.5px solid rgba(0,0,0,0.10)',
                    boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.07)',
                  }}
                >
                  <div className="text-white/30 text-xs font-mono mb-1">{item.label}</div>
                  <div className="text-white/80 text-sm font-semibold">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Tech stack quick badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Python', 'Selenium', 'React', 'FastAPI', 'PostgreSQL', 'Git'].map((tech) => (
                <span key={tech} className="skill-badge">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Trait cards ─────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-5 rounded-2xl cursor-default group"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
                  boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isDark ? `${trait.color}30` : `${trait.color}60`
                  e.currentTarget.style.boxShadow = isDark
                    ? `0 8px 40px rgba(0,0,0,0.4), 0 0 20px ${trait.color}15`
                    : `0 8px 32px rgba(0,0,0,0.12), 0 0 18px ${trait.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'
                  e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${trait.color}15`, border: `1px solid ${trait.color}25` }}
                >
                  <trait.icon className="w-5 h-5" style={{ color: trait.color }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{trait.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{trait.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
