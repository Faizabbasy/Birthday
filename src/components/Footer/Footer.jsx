import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { birthdayData } from '../../data/birthdayData'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Flower / Sparkle Header Icon */}
        <motion.div
          className={styles.icon}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          🌸
        </motion.div>

        {/* Wish Quote */}
        <p className={styles.quote}>
          "Made with love & endless smiles for {birthdayData.recipientNickname || 'you'}."
        </p>

        {/* Quick Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/" className={styles.link}>Home</Link>
          <span className={styles.dot} aria-hidden="true">•</span>
          <Link to="/letter" className={styles.link}>Letter</Link>
          <span className={styles.dot} aria-hidden="true">•</span>
          <Link to="/moments" className={styles.link}>Moments</Link>
        </nav>

        {/* Copyright / Credit line */}
        <div className={styles.copyright}>
          <span>{birthdayData.date}</span>
          <span className={styles.separator}>—</span>
          <span>Crafted for {birthdayData.recipientName}</span>
        </div>
      </div>
    </footer>
  )
}
