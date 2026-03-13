import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/challenges', label: 'Challenges' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/models', label: 'Models' },
  { path: '/results', label: 'Results' },
  { path: '/topics', label: 'Topics' },
  { path: '/games', label: 'Games' },
  { path: '/about', label: 'About' },
]

const THEME_ICONS = {
  dark: '🌙',
  light: '☀️',
  'high-contrast': '💚',
  black: '⬛',
  rgb: '🌈',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const location = useLocation()
  const { theme, setTheme, THEMES, THEME_LABELS } = useTheme()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setThemeOpen(false)
  }, [location])

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-text">UNO</span>
          <span className="navbar-logo-accent">SHOT</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link ${location.pathname === path || (path !== '/' && location.pathname.startsWith(path)) ? 'active' : ''}`}
            >
              {label}
              {(location.pathname === path || (path !== '/' && location.pathname.startsWith(path))) && (
                <motion.div
                  className="navbar-link-indicator"
                  layoutId="nav-indicator"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="theme-switcher" ref={dropdownRef}>
          <button
            className="theme-toggle-btn"
            onClick={() => setThemeOpen(!themeOpen)}
            aria-label="Switch theme"
          >
            <span className="theme-toggle-icon">{THEME_ICONS[theme]}</span>
            <span>{THEME_LABELS[theme]}</span>
          </button>
          <AnimatePresence>
            {themeOpen && (
              <motion.div
                className="theme-dropdown"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`theme-option ${theme === t ? 'active' : ''}`}
                    onClick={() => { setTheme(t); setThemeOpen(false) }}
                  >
                    <span className="theme-option-icon">{THEME_ICONS[t]}</span>
                    {THEME_LABELS[t]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
        </button>
      </div>
    </motion.nav>
  )
}
