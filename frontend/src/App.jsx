import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import LoadingScreen from './components/ui/LoadingScreen'
import SnowfallCursor from './components/ui/SnowfallCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ParticleBackground from './components/ui/ParticleBackground'

// Lazy load sections for performance
const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Journey = lazy(() => import('./components/sections/Journey'))
const GitHubStats = lazy(() => import('./components/sections/GitHubStats'))
const Contact = lazy(() => import('./components/sections/Contact'))

// Section loader fallback
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin" />
  </div>
)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate cinematic loading
    const timer = setTimeout(() => setIsLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="app" className="relative min-h-screen bg-white dark:bg-black overflow-x-hidden">
            {/* Noise overlay for texture */}
            <div className="noise-overlay" />

            {/* Animated grid background */}
            <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" />

            {/* Particle background */}
            <ParticleBackground />

            {/* Floating gradient blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div
                className="blob w-96 h-96 bg-[#00d4ff] -top-20 -left-20"
                style={{ animationDelay: '0s' }}
              />
              <div
                className="blob w-80 h-80 bg-[#8b5cf6] top-1/2 -right-20"
                style={{ animationDelay: '2s' }}
              />
              <div
                className="blob w-64 h-64 bg-[#a855f7] bottom-20 left-1/3"
                style={{ animationDelay: '4s' }}
              />
            </div>

            {/* Snowfall cursor trail (desktop only) */}
            <SnowfallCursor />

            {/* Scroll progress bar */}
            <ScrollProgress />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>
              <Suspense fallback={<SectionLoader />}>
                <Hero />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Experience />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Certifications />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Journey />
              </Suspense>
              {/* Will Add Later after build the GitHubStats section */}
              {/* <Suspense fallback={<SectionLoader />}>
                <GitHubStats />
              </Suspense> */}

              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />

            {/* Toast notifications */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'rgba(10, 15, 30, 0.95)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  color: '#f8fafc',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: { primary: '#00d4ff', secondary: '#020817' },
                },
                error: {
                  iconTheme: { primary: '#f87171', secondary: '#020817' },
                },
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
