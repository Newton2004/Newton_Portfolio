import { motion } from 'framer-motion'
import { FiGithub, FiStar, FiGitPullRequest, FiAlertCircle, FiDatabase } from 'react-icons/fi'
import { githubStats } from '../../data/portfolioData'
import SectionHeader from '../ui/SectionHeader'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

function StatBox({ icon: Icon, label, value, color, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4 }}
      className="p-5 rounded-2xl text-center"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}30`
        e.currentTarget.style.boxShadow = `0 0 25px ${color}12`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-2xl font-black text-white mb-1">
        {inView ? <CountUp end={value} duration={2} separator="," /> : '0'}
      </div>
      <div className="text-white/40 text-xs">{label}</div>
    </motion.div>
  )
}

export default function GitHubStats() {
  const stats = [
    { icon: FiGithub, label: 'Contributions', value: githubStats.contributions, color: '#00d4ff', delay: 0.1 },
    { icon: FiDatabase, label: 'Repositories', value: githubStats.repositories, color: '#8b5cf6', delay: 0.2 },
    { icon: FiGitPullRequest, label: 'Pull Requests', value: githubStats.pullRequests, color: '#34d399', delay: 0.3 },
    { icon: FiStar, label: 'Stars Earned', value: githubStats.stars, color: '#fbbf24', delay: 0.4 },
    { icon: FiAlertCircle, label: 'Issues Resolved', value: githubStats.issues, color: '#f472b6', delay: 0.5 },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-96 h-96 rounded-full bg-[#00d4ff] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Open Source"
          title="GitHub"
          highlight="Statistics"
          description="A snapshot of my open source activity and contributions."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {stats.map(s => <StatBox key={s.label} {...s} />)}
        </div>

        {/* Languages chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="p-8 rounded-2xl max-w-2xl mx-auto"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <h3 className="text-white font-semibold text-sm mb-6 text-center">Most Used Languages</h3>

          {/* Multi-bar */}
          <div className="flex rounded-full overflow-hidden h-3 mb-6">
            {githubStats.languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ background: lang.color }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4">
            {githubStats.languages.map(lang => (
              <div key={lang.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: lang.color }} />
                <span className="text-white/50 text-xs">{lang.name}</span>
                <span className="text-white/30 text-xs font-mono">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${githubStats.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white/70"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <FiGithub className="w-4 h-4" />
              View Full GitHub Profile
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
