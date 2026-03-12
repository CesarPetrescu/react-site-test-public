import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/challenges', label: 'Challenges' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/topics', label: 'Topics' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

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
