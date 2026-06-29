import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi'
import { experienceData } from '../../data/portfolioData'
import SectionHeader from '../ui/SectionHeader'
import { useTheme } from '../../context/ThemeContext'

export default function Experience() {
  const { isDark } = useTheme()
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/4 bottom-1/4 w-96 h-96 rounded-full bg-[#8b5cf6] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Work Experience"
          title="Professional"
          highlight="Journey"
          description="Where I've applied my skills to deliver real-world impact."
        />

        <div className="space-y-8 max-w-4xl mx-auto">
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="relative p-8 rounded-2xl overflow-hidden group"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
                  boxShadow: isDark ? '0 4px 30px rgba(0,0,0,0.3)' : '0 2px 20px rgba(0,0,0,0.09)',
                }}
              >
                {/* Gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, #FF6B5B, #F97B7B)` }}
                />

                {/* Current badge */}
                {exp.current && (
                  <div
                    className="absolute top-5 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono"
                    style={{
                      background: 'rgba(52,211,153,0.1)',
                      border: '1px solid rgba(52,211,153,0.2)',
                      color: '#34d399',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                    Current
                  </div>
                )}

                {/* Company & role header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(139,92,246,0.15))',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    <FiBriefcase className="w-5 h-5 text-[#FF6B5B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg" style={{
                      color: isDark ? '#FFFFFF' : 'rgba(0,0,0,0.85)',
                      background: isDark ? 'transparent' : 'rgba(59,130,246,0.08)',
                      padding: isDark ? '0' : '2px 6px',
                      borderRadius: isDark ? '0' : '4px',
                    }}>{exp.role}</h3>
                    <p className="font-medium text-sm" style={{
                      color: isDark ? '#FF6B5B' : '#DC2626',
                      background: isDark ? 'transparent' : 'rgba(220,38,38,0.08)',
                      padding: isDark ? '0' : '2px 6px',
                      borderRadius: isDark ? '0' : '4px',
                      marginTop: '4px',
                    }}>{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <FiCalendar className="w-3 h-3" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <FiMapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6" style={{
                  color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.65)',
                  background: isDark ? 'transparent' : 'rgba(100,116,139,0.05)',
                  padding: isDark ? '0' : '8px 12px',
                  borderRadius: isDark ? '0' : '6px',
                }}>{exp.description}</p>

                {/* Responsibilities */}
                <div className="space-y-2.5 mb-6">
                  {exp.responsibilities.map((resp, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + j * 0.06, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <FiCheckCircle className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                      <span className="text-sm" style={{
                        color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(55, 49, 49, 0.55)',
                      }}>{resp}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: 'rgba(0,212,255,0.06)',
                        border: '1px solid rgba(0,212,255,0.15)',
                        color: '#00d4ff',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
