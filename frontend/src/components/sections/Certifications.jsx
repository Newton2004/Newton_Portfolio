import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiCalendar, FiExternalLink } from 'react-icons/fi'
import { certificationsData } from '../../data/portfolioData'
import SectionHeader from '../ui/SectionHeader'
import { useTheme } from '../../context/ThemeContext'

function CertCard({ cert, index }) {
  const { isDark } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="p-6 rounded-2xl relative overflow-hidden group"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
        boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,107,91,0.2)' : 'rgba(255,107,91,0.4)'
        e.currentTarget.style.boxShadow = isDark
          ? '0 12px 40px rgba(0,0,0,0.5), 0 0 25px rgba(255,107,91,0.08)'
          : '0 8px 32px rgba(0,0,0,0.12), 0 0 20px rgba(255,107,91,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'
        e.currentTarget.style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)'
      }}
    >
      {/* Gradient shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,91,0.03), rgba(249,123,123,0.03))' }}
      />

      {/* Icon */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {cert.icon}
        </div>
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono"
          style={{
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <FiCalendar className="w-3 h-3" />
          {cert.date}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm mb-1 leading-snug group-hover:text-[#FF6B5B] transition-colors duration-300">
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className="text-white/40 text-xs mb-4 font-mono">{cert.issuer}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {cert.skills.map(skill => (
          <span
            key={skill}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(255,107,91,0.06)',
              border: '1px solid rgba(255,107,91,0.15)',
              color: 'rgba(255,107,91,0.8)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Credential ID */}
      <div className="flex items-center justify-between">
        <span className="text-white/20 text-[10px] font-mono truncate">{cert.credentialId}</span>
        <FiAward className="w-4 h-4 text-white/20 flex-shrink-0" />
      </div>
    </motion.div>
  )
}

// View More Card Component
function ViewMoreCard({ onViewMore, index }) {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onViewMore}
      className="p-6 rounded-2xl relative overflow-hidden group cursor-pointer"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
        boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.4)'
        e.currentTarget.style.boxShadow = isDark
          ? '0 12px 40px rgba(0,0,0,0.5), 0 0 25px rgba(0,212,255,0.08)'
          : '0 8px 32px rgba(0,0,0,0.12), 0 0 20px rgba(0,212,255,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'
        e.currentTarget.style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)'
      }}
    >
      {/* Gradient shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.03), rgba(139,92,246,0.03))' }}
      />

      <div className="h-full flex flex-col items-center justify-center gap-3">
        <div className="text-4xl font-bold opacity-50">•••</div>
        <div className="text-center">
          <p className="text-white font-semibold text-sm">View More</p>
          <p className="text-white/40 text-xs mt-1">Click to see all certifications</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const [showAllCerts, setShowAllCerts] = useState(false)

  // For featured view: show only 5 featured certifications
  const featuredCerts = certificationsData.slice(0, 5)
  
  // Display logic: 
  // - If not showing all: show 5 featured + view more card
  // - If showing all: show all certifications
  const displayCerts = showAllCerts ? certificationsData : featuredCerts

  const shouldShowViewMore = !showAllCerts && certificationsData.length > 5

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full bg-[#fbbf24] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Credentials"
          title={showAllCerts ? 'All' : 'My'}
          highlight={showAllCerts ? 'Certifications' : 'Certifications'}
          description={showAllCerts
            ? 'Explore all my professional certifications and continuous learning achievements.'
            : 'Continuous learning through industry-recognized certifications and courses.'}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={showAllCerts}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {displayCerts.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}

            {/* View More Card - Only show on featured view when there are more than 5 certifications */}
            {shouldShowViewMore && (
              <ViewMoreCard 
                onViewMore={() => setShowAllCerts(true)} 
                index={displayCerts.length}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-6 rounded-2xl"
          style={{
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.1)',
          }}
        >
          <p className="text-white/40 text-sm">
            🎯 Continuously learning — always working towards the next certification
          </p>
        </motion.div>
      </div>
    </section>
  )
}
