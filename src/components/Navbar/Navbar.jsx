import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const navLinks = [
  { to: '/',        label: 'Home',    end: true  },
  { to: '/letter',  label: 'Letter'              },
  { to: '/moments', label: 'Moments'             },
]

export default function Navbar() {
  const location = useLocation()
  const [visible, setVisible]     = useState(true)
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Scroll-aware hide/show + glassmorphism trigger
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y < 10) {
        setVisible(true)
      } else {
        setVisible(y < lastScrollY.current)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: visible ? 0 : -90 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        aria-label="Site navigation"
      >
        <div className={styles.inner}>
          {/* Brand */}
          <NavLink to="/" className={styles.brand} aria-label="Home">
            <motion.span
              className={styles.brandIcon}
              aria-hidden="true"
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >🌸</motion.span>
            <span className={styles.brandText}>For You</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList} role="list">
              {navLinks.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                  >
                    {label}
                    {location.pathname === (to === '/' ? '/' : `/${to.replace('/', '')}`) && (
                      <motion.span
                        className={styles.activeIndicator}
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Decorative + Mobile Hamburger */}
          <div className={styles.navRight}>
            <span className={styles.navDecor} aria-hidden="true">✦</span>
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav aria-label="Mobile navigation">
              <ul className={styles.mobileList} role="list">
                {navLinks.map(({ to, label, end }, i) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <NavLink
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileDecor} aria-hidden="true">🌸 ♡ 🌸</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



