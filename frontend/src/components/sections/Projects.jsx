import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiTag } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
import { projectsData } from '../../data/portfolioData'
import SectionHeader from '../ui/SectionHeader'
import { useTheme } from '../../context/ThemeContext'

const STATUS_COLORS = {
  Live: { bg: 'rgba(255,107,91,0.1)', border: 'rgba(255,107,91,0.25)', text: '#FF6B5B' },
  Active: { bg: 'rgba(249,123,123,0.1)', border: 'rgba(249,123,123,0.25)', text: '#F97B7B' },
  'In Progress': { bg: 'rgba(255,176,163,0.1)', border: 'rgba(255,176,163,0.2)', text: '#FFB0A3' },
  Planned: { bg: 'rgba(255,107,91,0.1)', border: 'rgba(255,107,91,0.25)', text: '#FF6B5B' },
}

const CATEGORIES = ['All', 'Full Stack', 'Automation', 'AI / ML']

// View More Card Component
function ViewMoreCard({ onViewMore, index }) {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
      onClick={onViewMore}
      className="group relative p-6 rounded-2xl flex flex-col h-full overflow-hidden cursor-pointer"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
        boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.4)'
        e.currentTarget.style.boxShadow = isDark
          ? '0 16px 48px rgba(0,0,0,0.5), 0 0 30px rgba(0,212,255,0.08)'
          : '0 10px 36px rgba(0,0,0,0.12), 0 0 24px rgba(0,212,255,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'
        e.currentTarget.style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)'
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="text-4xl font-bold opacity-50">•••</div>
        <div className="text-center">
          <p className="text-base font-semibold mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.85)' }}>
            View More
          </p>
          <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
            Click to see all projects
          </p>
        </div>
      </div>

      {/* Gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)' }}
      />
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const status = STATUS_COLORS[project.status] || STATUS_COLORS['Active']
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
      className="group relative p-6 rounded-2xl flex flex-col h-full overflow-hidden"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.10)',
        boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,107,91,0.2)' : 'rgba(255,107,91,0.4)'
        e.currentTarget.style.boxShadow = isDark
          ? '0 16px 48px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,91,0.08)'
          : '0 10px 36px rgba(0,0,0,0.12), 0 0 24px rgba(255,107,91,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'
        e.currentTarget.style.boxShadow = isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.08)'
      }}
    >
      {/* Featured star */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <HiSparkles className="w-4 h-4 text-[#fbbf24] opacity-70" />
        </div>
      )}

      {/* Gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${project.gradient.replace('from-', '').replace('to-', ', ')})` }}
      />

      {/* Image section */}
      <div className="w-full h-36 rounded-xl mb-5 relative overflow-hidden group">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-36 flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${project.gradient.replace('from-', '').replace('to-', ', ')} 15%)`,
              opacity: 0.15,
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(2,8,23,0.6)' }}
            />
            <span className="relative z-10 text-4xl">
              {project.category === 'Automation' ? '🤖' :
               project.category === 'AI / ML' ? '🧠' : '💻'}
            </span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-base transition-colors duration-300" style={{
          color: isDark ? 'rgb(255,255,255)' : 'rgba(0,0,0,0.85)',
          background: isDark ? 'transparent' : 'rgba(59,130,246,0.08)',
          padding: isDark ? '0' : '2px 6px',
          borderRadius: isDark ? '0' : '4px',
        }}>
          {project.title}
        </h3>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-mono flex-shrink-0 ml-2"
          style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.text }}
        >
          {project.status}
        </span>
      </div>

      {/* Category */}
      <div className="flex items-center gap-1.5 mb-3">
        <FiTag className="w-3 h-3 text-white/30" />
        <span className="text-white/30 text-xs">{project.category}</span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{
        color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.65)',
        background: isDark ? 'transparent' : 'rgba(100,116,139,0.05)',
        padding: isDark ? '0' : '8px 12px',
        borderRadius: isDark ? '0' : '6px',
      }}>{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-all duration-200 flex-1 justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <FiGithub className="w-3.5 h-3.5" />
            GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#00d4ff] hover:text-white transition-all duration-200 flex-1 justify-center"
            style={{
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        )}
        {!project.github && !project.demo && (
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/25 flex-1 justify-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            Coming Soon
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [showAllProjects, setShowAllProjects] = useState(false)

  // For Featured view: show only 5 featured projects
  const featuredProjects = projectsData.filter(p => p.featured)

  // For filtered view: show all projects matching the filter
  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter)

  // Display logic: 
  // - If not showing all and activeFilter is 'All': show 5 featured + view more card
  // - If showing all or activeFilter is not 'All': show all filtered projects
  const displayProjects = (showAllProjects || activeFilter !== 'All') 
    ? filtered
    : featuredProjects

  const shouldShowViewMore = !showAllProjects && activeFilter === 'All' && featuredProjects.length >= 5

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-[#00d4ff] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Portfolio"
          title={showAllProjects ? 'All' : 'Featured'}
          highlight="Projects"
          description={showAllProjects 
            ? 'Explore all my projects across different categories and technologies.'
            : 'A collection of featured projects that demonstrate my skills across automation, full stack, and AI.'}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => {
                setActiveFilter(cat)
                if (cat !== 'All') {
                  setShowAllProjects(true)
                }
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: activeFilter === cat ? 'linear-gradient(135deg, #00d4ff, #8b5cf6)' : 'rgba(255,255,255,0.04)',
                border: activeFilter === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                color: activeFilter === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                boxShadow: activeFilter === cat ? '0 0 20px rgba(0,212,255,0.25)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${showAllProjects}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
            
            {/* View More Card - Only show on featured view when there are more than 5 projects */}
            {shouldShowViewMore && (
              <ViewMoreCard 
                onViewMore={() => setShowAllProjects(true)} 
                index={displayProjects.length}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
