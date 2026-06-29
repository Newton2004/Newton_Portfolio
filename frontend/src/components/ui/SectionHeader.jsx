import { motion } from 'framer-motion'

/**
 * Reusable section header with animated gradient title and underline.
 */
export default function SectionHeader({ badge, title, highlight, description, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {/* Badge */}
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-4 ${center ? '' : ''}`}
          style={{
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.2)',
            color: '#10B981',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="section-title text-white mb-4">
        {title}{' '}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>

      {/* Divider line */}
      <div className={`flex gap-1 ${center ? 'justify-center' : ''} mb-6`}>
        <div className="w-12 h-[2px] rounded" style={{ background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)' }} />
        <div className="w-3 h-[2px] rounded bg-white/20" />
        <div className="w-1.5 h-[2px] rounded bg-white/10" />
      </div>

      {/* Description */}
      {description && (
        <p className={`text-white/50 text-base md:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
