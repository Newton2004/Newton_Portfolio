import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsData } from '../../data/portfolioData'
import SectionHeader from '../ui/SectionHeader'
import { useTheme } from '../../context/ThemeContext'

// Animated skill bar
function SkillBar({ name, level, status, color, index }) {
  const isComingSoon = status === 'coming-soon'
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm font-medium">{name}</span>
          {isComingSoon && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-mono"
              style={{
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.2)',
                color: '#fbbf24',
              }}
            >
              soon
            </span>
          )}
        </div>
        <span className="text-white/30 text-xs font-mono">{isComingSoon ? '—' : `${level}%`}</span>
      </div>

      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: isComingSoon ? 'rgba(251,191,36,0.3)' : `linear-gradient(90deg, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: isComingSoon ? '20%' : `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </motion.div>
  )
}

// Skill category card
function SkillCard({ category, icon, color, skills, isActive, onClick }) {
  const { isDark } = useTheme()
  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="p-5 rounded-2xl cursor-pointer select-none"
      style={{
        background: isDark
          ? (isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)')
          : (isActive ? '#FFFFFF' : '#FAFAFA'),
        border: isDark
          ? `1px solid ${isActive ? 'rgba(255,107,91,0.25)' : 'rgba(255,255,255,0.07)'}`
          : `1.5px solid ${isActive ? 'rgba(255,107,91,0.4)' : 'rgba(0,0,0,0.10)'}`,
        boxShadow: isDark
          ? (isActive ? '0 0 25px rgba(255,107,91,0.08)' : 'none')
          : (isActive ? '0 4px 20px rgba(0,0,0,0.10), 0 0 16px rgba(255,107,91,0.10)' : '0 2px 12px rgba(0,0,0,0.07)'),
        transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{
            background: `linear-gradient(135deg, ${color.replace('from-', '').replace('to-', '')})`,
            opacity: 0.9,
          }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{category}</h3>
          <p className="text-white/30 text-xs">{skills.length} skills</p>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-3 overflow-hidden"
          >
            {skills.map((skill, i) => {
              // Extract color stop from tailwind gradient class
              const colorMap = {
                'from-[#FF6B5B] to-[#E85549]': '#FF6B5B, #E85549',
                'from-[#F97B7B] to-[#E85549]': '#F97B7B, #E85549',
                'from-[#FFB0A3] to-[#FF8B7F]': '#FFB0A3, #FF8B7F',
                'from-[#FF6B5B] to-[#FF4D3D]': '#FF6B5B, #FF4D3D',
                'from-[#F97B7B] to-[#E85549]': '#F97B7B, #E85549',
                'from-[#FFB0A3] to-[#FF7F6F]': '#FFB0A3, #FF7F6F',
              }
              return (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  color={colorMap[color] || '#FF6B5B, #F97B7B'}
                  index={i}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {!isActive && (
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 3).map(s => (
            <span
              key={s.name}
              className="text-[10px] px-2 py-0.5 rounded-full text-white/40"
              style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
            >
              {s.name}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[10px] text-white/30">+{skills.length - 3}</span>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Automation')

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-[#FF6B5B] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Technical Skills"
          title="My"
          highlight="Expertise"
          description="A snapshot of the technologies I work with daily, and the ones I'm actively mastering."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <SkillCard
                {...cat}
                isActive={activeCategory === cat.category}
                onClick={() =>
                  setActiveCategory(prev =>
                    prev === cat.category ? null : cat.category
                  )
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-xs font-mono mt-10"
        >
          Click a category to expand skill details · Always learning new technologies
        </motion.p>
      </div>
    </section>
  )
}
