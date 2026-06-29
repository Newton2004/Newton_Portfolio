import { motion } from 'framer-motion'
import { journeyData } from '../../data/portfolioData'
import SectionHeader from '../ui/SectionHeader'
import { useTheme } from '../../context/ThemeContext'

function TimelineItem({ item, index, total }) {
  const isLeft = index % 2 === 0
  const { isDark } = useTheme()

  return (
    <div className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} md:justify-center`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.02 }}
        className={`relative w-full md:w-[calc(50%-40px)] p-5 rounded-2xl ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
        style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
          border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)',
          transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = isDark ? `${item.color}30` : `${item.color}60`
          e.currentTarget.style.boxShadow = isDark
            ? `0 8px 35px rgba(0,0,0,0.4), 0 0 20px ${item.color}12`
            : `0 8px 32px rgba(0,0,0,0.12), 0 0 18px ${item.color}20`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'
          e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)'
        }}
      >
        {/* Year badge */}
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono mb-3"
          style={{
            background: `${item.color}12`,
            border: `1px solid ${item.color}30`,
            color: item.color,
          }}
        >
          {item.year}
        </div>

        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{item.icon}</span>
          <h3 className="font-semibold text-sm" style={{
            color: isDark ? '#FFFFFF' : '#000000',
            background: isDark ? 'transparent' : `${item.color}15`,
            padding: isDark ? '0' : '2px 6px',
            borderRadius: isDark ? '0' : '4px',
          }}>{item.title}</h3>
        </div>

        <p className="text-xs leading-relaxed" style={{
          color: isDark ? 'rgba(255,255,255,0.45)' : '#000000',
          background: isDark ? 'transparent' : 'rgba(100,116,139,0.05)',
          padding: isDark ? '0' : '6px 10px',
          borderRadius: isDark ? '0' : '4px',
        }}>{item.description}</p>
      </motion.div>

      {/* Center dot (desktop) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
        className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full z-10"
        style={{
          background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
          border: `2px solid ${item.color}`,
          boxShadow: `0 0 15px ${item.color}40`,
        }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
      </motion.div>
    </div>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute right-1/4 top-1/2 w-96 h-96 rounded-full bg-[#f472b6] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Career Timeline"
          title="My"
          highlight="Journey"
          description="The path that shaped me into the engineer I am today."
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,107,91,0.3), rgba(249,123,123,0.3), rgba(255,176,163,0.2), transparent)' }}
          />

          <div className="space-y-8">
            {journeyData.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} total={journeyData.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
