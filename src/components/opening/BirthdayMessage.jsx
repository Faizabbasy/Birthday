import { motion } from 'framer-motion'
import Button from '../ui/Button'
import DigitalBouquet from '../home/DigitalBouquet'
import PhotoCards from '../home/PhotoCards'
import MusicPlayer from '../music/MusicPlayer'
import InteractiveCards from '../home/InteractiveCards'
import OnlyUsCard from '../home/OnlyUsCard'
import styles from './BirthdayMessage.module.css'

/**
 * BirthdayMessage — revealed after gift opens.
 * Shows "Today is all about you." + romantic message + navigation CTAs,
 * followed by Digital Bouquet, Photo Cards (Momen Indah), Song player, and interactive cards.
 */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

export default function BirthdayMessage({ data }) {
  const {
    recipientNickname,
    heroMessage,
    ctaPrimary,
    ctaSecondary,
    age,
    date,
    decorations,
    song,
  } = data

  return (
    <div className={styles.root}>
      {/* Soft ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Floating decoration petals */}
      <div className={styles.bgDecor} aria-hidden="true">
        {['🌸', '🌷', '🌸'].map((f, i) => (
          <span key={i} className={`${styles.bgPetal} ${styles[`petal${i + 1}`]}`}>{f}</span>
        ))}
        {['✦', '✧', '✦'].map((s, i) => (
          <span key={`s${i}`} className={`${styles.bgStar} ${styles[`star${i + 1}`]}`}>{s}</span>
        ))}
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <motion.div
          className={styles.inner}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Date tag */}
          <motion.div variants={fadeUp} className={styles.tagRow}>
            <span className={styles.tag}>{date}</span>
          </motion.div>

          {/* Tiny flower */}
          <motion.span
            variants={fadeUp}
            className={styles.flowerIcon}
            aria-hidden="true"
          >
            {decorations.flowers[0]}
          </motion.span>

          {/* Main headline */}
          <motion.h1 variants={fadeUp} className={styles.headline}>
            Today is all about you.
          </motion.h1>
          <motion.p variants={fadeUp} className={styles.subheadline}>
            Happy Birthday Love
          </motion.p>

          {/* Ornament divider */}
          <motion.div variants={fadeUp} className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerHeart} aria-hidden="true">♡</span>
            <span className={styles.dividerLine} />
          </motion.div>

          {/* To name */}
          <motion.p variants={fadeUp} className={styles.toName}>
            For my <em>{recipientNickname}</em>
          </motion.p>

          {/* Romantic message */}
          <motion.p variants={fadeUp} className={styles.message}>
            {heroMessage}
          </motion.p>

          {/* Scroll hint dots */}
          <motion.div
            variants={fadeUp}
            className={styles.scrollHint}
            aria-hidden="true"
          >
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Digital Bouquet Section (Placed right above Momen Indah Bersamamu) ── */}
      <DigitalBouquet />

      {/* ── 3 Photo Cards Section (Momen Indah Bersamamu) ── */}
      <PhotoCards />

      {/* ── PROMPT 3 Section 1: Song For You ── */}
      <MusicPlayer song={song} />

      {/* ── PROMPT 3 Section 2: A little something for you ── */}
      <InteractiveCards />

      {/* ── Only Us: Vinyl + Polaroid Poster Card ── */}
      <OnlyUsCard />
    </div>
  )
}

