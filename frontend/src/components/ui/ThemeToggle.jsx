import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { HiSun, HiMoon } from 'react-icons/hi'

/**
 * Animated dark/light mode toggle button.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${className}`}
      style={{
        background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        backdropFilter: 'blur(20px)',
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {theme === 'dark' ? (
          <HiSun className="w-5 h-5 text-yellow-400" />
        ) : (
          <HiMoon className="w-5 h-5 text-[#00d4ff]" />
        )}
      </motion.div>
    </motion.button>
  )
}
