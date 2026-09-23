import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './InteractiveCards.module.css'

/**
 * InteractiveCards — Two navigation cards for LETTER and MOMENTS.
 * Includes visual icons (envelope for letter, camera for moments),
 * desktop 2-column layout, mobile vertical stack, and subtle hover animations.
 */

const cardVariants = {
  initial: { opacity: 0, y: 24 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
}

export default function InteractiveCards() {
  return (
    <section className={styles.section} aria-label="Explore more sections">
      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.badge}>✦ Explore</span>
        <h2 className={styles.heading}>A little something for you</h2>
        <div className={styles.divider} aria-hidden="true">
          <span className={styles.line} />
          <span className={styles.heart}>♡</span>
          <span className={styles.line} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className={styles.grid}>
        {/* ── Card 1: LETTER ── */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          <Link to="/letter" className={`${styles.card} ${styles.letterCard}`}>
            <div className={styles.cardBgGlow} aria-hidden="true" />

            {/* Visual Envelope */}
            <div className={styles.iconWrapper}>
              <div className={styles.envelopeGraphic} aria-hidden="true">
                <div className={styles.envelopeBack} />
                <div className={styles.envelopePaper}>
                  <span className={styles.paperLine} />
                  <span className={styles.paperLineShort} />
                </div>
                <div className={styles.envelopeFront} />
                <div className={styles.envelopeFlap} />
                <span className={styles.waxSeal}>💜</span>
              </div>
            </div>

            {/* Card Information */}
            <div className={styles.cardMeta}>
              <span className={styles.cardCategory}>SURAT SPESIAL</span>
              <h3 className={styles.cardTitle}>LETTER</h3>
              <p className={styles.cardSubtitle}>“Open the letter”</p>
            </div>

            {/* Action Arrow */}
            <div className={styles.actionRow}>
              <span className={styles.actionText}>Baca Surat</span>
              <span className={styles.arrowIcon}>→</span>
            </div>
          </Link>
        </motion.div>

        {/* ── Card 2: MOMENTS ── */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          <Link to="/moments" className={`${styles.card} ${styles.momentsCard}`}>
            <div className={styles.cardBgGlow} aria-hidden="true" />

            {/* Visual Camera */}
            <div className={styles.iconWrapper}>
              <div className={styles.cameraGraphic} aria-hidden="true">
                <div className={styles.cameraBody}>
                  <div className={styles.cameraTopBump} />
                  <div className={styles.cameraFlash} />
                  <div className={styles.cameraLensOuter}>
                    <div className={styles.cameraLensInner}>
                      <span className={styles.lensReflect} />
                    </div>
                  </div>
                  <span className={styles.cameraHeart}>💜</span>
                </div>
              </div>
            </div>

            {/* Card Information */}
            <div className={styles.cardMeta}>
              <span className={styles.cardCategory}>GALERI KENANGAN</span>
              <h3 className={styles.cardTitle}>MOMENTS</h3>
              <p className={styles.cardSubtitle}>“See our moments”</p>
            </div>

            {/* Action Arrow */}
            <div className={styles.actionRow}>
              <span className={styles.actionText}>Lihat Galeri</span>
              <span className={styles.arrowIcon}>→</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
