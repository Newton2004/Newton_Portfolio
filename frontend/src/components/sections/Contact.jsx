import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiUser, FiMail, FiMessageSquare, FiTag, FiCheckCircle } from 'react-icons/fi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import toast from 'react-hot-toast'
import axios from 'axios'
import SectionHeader from '../ui/SectionHeader'
import { useTheme } from '@/context/ThemeContext'
import { personalInfo } from '../../data/portfolioData'

const API_URL = import.meta.env.VITE_API_URL || 'https://newton-portfolio-api.onrender.com'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { isDark } = useTheme()

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 10) newErrors.message = 'Message too short'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      })
      setSent(true)
      setForm(initialForm)
      toast.success('Message sent successfully! I\'ll reply soon.')
    } catch (err) {
      console.error('Contact form error:', err)
      toast.error('Failed to send. Please try email directly.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Your Name', placeholder: 'Newton Raja', icon: FiUser, type: 'text' },
    { name: 'email', label: 'Email Address', placeholder: 'you@example.com', icon: FiMail, type: 'email' },
    { name: 'subject', label: 'Subject', placeholder: 'Opportunity / Collaboration', icon: FiTag, type: 'text' },
  ]

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-64 rounded-full bg-[#F97B7B] opacity-[0.06] blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          badge="Let's Talk"
          title="Get In"
          highlight="Touch"
          description="Whether it's a job opportunity, collaboration, or just a chat — I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ── Left: Info ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-3">Let's Build Something Great</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                I'm actively looking for new opportunities — full-time roles, freelance projects,
                or open source collaborations. If you have an exciting project in mind or a role
                that fits, let's connect!
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: FiMail },
                { label: 'GitHub', value: '@Newton2004', href: personalInfo.socials.github, icon: FiGithub },
                { label: 'LinkedIn', value: 'Newton Raja K', href: personalInfo.socials.linkedin, icon: FiLinkedin },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,91,0.2)'
                    e.currentTarget.style.background = 'rgba(255,107,91,0.04)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,107,91,0.08)', border: '1px solid rgba(255,107,91,0.15)' }}
                  >
                    <item.icon className="w-4 h-4 text-[#FF6B5B]" />
                  </div>
                  <div>
                    <div className="text-white/30 text-xs font-mono mb-0.5">{item.label}</div>
                    <div className="text-white/70 text-sm group-hover:text-[#FF6B5B] transition-colors duration-200">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Response time note */}
            <div
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                background: 'rgba(255,107,91,0.06)',
                border: '1px solid rgba(255,107,91,0.15)',
              }}
            >
              <span className="text-lg mt-0.5">⚡</span>
              <p className="text-white/50 text-xs leading-relaxed">
                I typically respond within <span className="text-[#FF6B5B]">24 hours</span>.
                For urgent matters, reach out via LinkedIn or email directly.
              </p>
            </div>
          </motion.div>

          {/* ── Right: Form ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                // Success state
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px] p-8 rounded-2xl"
                  style={{
                    background: 'rgba(255,107,91,0.05)',
                    border: '1px solid rgba(255,107,91,0.15)',
                  }}
                >
                  <motion.div
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(255,107,91,0.15)', border: '1px solid rgba(255,107,91,0.3)' }}
                  >
                    <FiCheckCircle className="w-8 h-8 text-[#FF6B5B]" />
                  </motion.div>
                  <h3 className="text-white font-bold text-xl mb-3">Message Sent!</h3>
                  <p className="text-white/50 text-sm mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible!
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-[#FF6B5B] text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                // Form
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5 p-8 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  noValidate
                >
                  {/* Text fields */}
                  {fields.map(field => (
                    <div key={field.name}>
                      <label className="block text-white/60 text-xs font-medium mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-300"
                          style={{
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                            backdropFilter: isDark ? 'blur(10px)' : 'blur(20px)',
                            border: `1px solid ${errors[field.name] ? 'rgba(248,113,113,0.4)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'}`,
                            boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
                            color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                          }}
                          onFocus={e => { e.target.style.borderColor = 'rgba(255,107,91,0.35)' }}
                          onBlur={e => { e.target.style.borderColor = errors[field.name] ? 'rgba(248,113,113,0.4)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)' }}
                        />
                      </div>
                      {errors[field.name] && (
                        <p className="text-red-400/80 text-xs mt-1">{errors[field.name]}</p>
                      )}
                    </div>
                  ))}

                  {/* Message */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">Message</label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/25 pointer-events-none" />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 outline-none resize-none transition-all duration-300"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                          backdropFilter: isDark ? 'blur(10px)' : 'blur(20px)',
                          border: `1px solid ${errors.message ? 'rgba(248,113,113,0.4)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'}`,
                          boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
                          color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(255,107,91,0.35)' }}
                        onBlur={e => { e.target.style.borderColor = errors.message ? 'rgba(248,113,113,0.4)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)' }}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-400/80 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B5B, #F97B7B)',
                      boxShadow: '0 0 25px rgba(255,107,91,0.25)',
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
