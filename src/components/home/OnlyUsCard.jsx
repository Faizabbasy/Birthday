import { motion } from 'framer-motion'
import styles from './OnlyUsCard.module.css'

/**
 * OnlyUsCard — Purple-themed vinyl record + overlapping polaroids card
 * Inspired by the "Only Us" reference image.
 * Placed below the Letter and Moments (InteractiveCards) section.
 */

const photos = [
  { src: '/assets/moment1.png', alt: 'Momen kita', posClass: 'polaroid1' },
  { src: '/assets/moment2.png', alt: 'Waktu bersama', posClass: 'polaroid2' },
  { src: '/assets/moment3.png', alt: 'Kenangan indah', posClass: 'polaroid3' },
]

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function OnlyUsCard() {
  return (
    <motion.div
      className={styles.wrapper}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className={styles.cardContainer}>
        {/* Ambient glow blobs */}
        <div className={styles.glowBg} aria-hidden="true" />
        <div className={styles.glowBgBottom} aria-hidden="true" />

        {/* ── Top-right Title: "Only Us" ── */}
        <header className={styles.topHeader}>
          <div className={styles.titleBox}>
            <span className={styles.titleOnly}>Only</span>
            <span className={styles.titleUs}>Us</span>
          </div>
        </header>

        {/* ── Vinyl Record (left side, partially clipped) ── */}
        <div className={styles.vinylWrapper} aria-hidden="true">
          <div className={styles.vinylDisc}>
            <div className={styles.vinylLabel}>
              <span className={styles.vinylLabelTextTop}>Side A · 2026</span>
              <span className={styles.vinylLabelTitle}>Only Us</span>
              <span className={styles.vinylLabelTextBottom}>♪ Our Story ♪</span>
              <div className={styles.vinylHole} />
            </div>
          </div>
        </div>

        {/* ── Overlapping Polaroid Photos ── */}
        <div className={styles.polaroidCluster} aria-label="Foto kenangan kita">
          {photos.map(({ src, alt, posClass }, i) => (
            <div
              key={i}
              className={`${styles.polaroidCard} ${styles[posClass]}`}
            >
              {/* Tape accent on top */}
              <div className={styles.polaroidTape} aria-hidden="true" />
              <div className={styles.photoFrame}>
                <img
                  src={src}
                  alt={alt}
                  className={styles.photoImg}
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom-right Quote ── */}
        <footer className={styles.bottomQuote}>
          <p className={styles.quoteText}>
            Every moment feels a little{' '}
            <span className={styles.highlightText}>brighter</span> when it&apos;s{' '}
            <span className={styles.highlightAccent}>just us</span>
          </p>
        </footer>
      </div>
    </motion.div>
  )
}
