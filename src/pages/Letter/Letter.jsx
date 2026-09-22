import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { birthdayData } from '../../data/birthdayData'
import styles from './Letter.module.css'

/**
 * Letter page — Cinematic envelope opening → handwritten letter reveal.
 *
 * Phases (auto-advancing):
 *  1. 'intro'    → Envelope floats in, sealed
 *  2. 'opening'  → Lid rotates open (1s)
 *  3. 'rising'   → Paper slides up out of envelope (0.8s)
 *  4. 'reading'  → Full letter expands, photos appear
 */

/* ──────────────────────────────────────────────────────────────────
   Framer Motion variants
   ────────────────────────────────────────────────────────────────── */

const letterStagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.22, delayChildren: 0.2 } },
}

const paraVariant = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

/* ──────────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────────── */

/** Polaroid-style photo decoration */
function PolaroidPhoto({ src, alt, rotate, label, delay, position }) {
  return (
    <motion.div
      className={`${styles.polaroid} ${styles[position]}`}
      style={{ '--rotate': `${rotate}deg` }}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate * 2 }}
      animate={{ opacity: 1, scale: 1, rotate: rotate }}
      transition={{ duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.06, rotate: rotate * 0.5, transition: { duration: 0.25 } }}
    >
      <div className={styles.polaroidImg}>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className={styles.polaroidPlaceholder}>
            <span>🌸</span>
          </div>
        )}
      </div>
      <div className={styles.polaroidLabel}>{label}</div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Main Letter component
   ────────────────────────────────────────────────────────────────── */
export default function Letter() {
  const { letter, recipientNickname, senderName, decorations, letterPhotos } = birthdayData

  // Animation phases: 'intro' → 'opening' → 'rising' → 'reading'
  const [phase, setPhase] = useState('intro')

  useEffect(() => {
    // Phase timeline (auto-advancing)
    const t1 = setTimeout(() => setPhase('opening'), 1200)  // start opening lid
    const t2 = setTimeout(() => setPhase('rising'),  2400)  // paper rises
    const t3 = setTimeout(() => setPhase('reading'), 3400)  // show full letter
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const isReading = phase === 'reading'

  return (
    <div className={styles.page} aria-label="Letter page">

      {/* ── Ambient background ── */}
      <div className={styles.bgGlow}  aria-hidden="true" />
      <div className={styles.bgDecor} aria-hidden="true">
        {['🌸', '🌷', '🌼', '🌸', '🌺'].map((f, i) => (
          <span key={i} className={`${styles.bgPetal} ${styles[`bp${i + 1}`]}`}>{f}</span>
        ))}
        {['✦', '✧', '✦', '✩'].map((s, i) => (
          <span key={`s${i}`} className={`${styles.bgStar} ${styles[`bs${i + 1}`]}`}>{s}</span>
        ))}
      </div>

      {/* ── Envelope + Letter Scene ── */}
      <div className={styles.scene}>

        {/* ── Phase 1 & 2: Envelope (shown until letter is reading) ── */}
        <AnimatePresence>
          {phase !== 'reading' && (
            <motion.div
              key="envelope"
              className={styles.envelopeWrap}
              initial={{ opacity: 0, y: 40, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -20, transition: { duration: 0.5 } }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Envelope glow */}
              <div className={styles.envelopeGlow} aria-hidden="true" />

              {/* Pre-opening label */}
              <AnimatePresence>
                {phase === 'intro' && (
                  <motion.p
                    className={styles.envelopeLabel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    ada surat untukmu 💌
                  </motion.p>
                )}
              </AnimatePresence>

              {/* CSS Envelope */}
              <div className={`${styles.envelope} ${phase !== 'intro' ? styles.envelopeOpen : ''}`}>

                {/* Back body */}
                <div className={styles.envBack} />

                {/* Side flaps */}
                <div className={styles.envLeft}  aria-hidden="true" />
                <div className={styles.envRight} aria-hidden="true" />
                <div className={styles.envBottom} aria-hidden="true" />

                {/* ── Top lid (opens on phase 'opening') ── */}
                <motion.div
                  className={styles.envLid}
                  animate={
                    phase === 'intro'
                      ? { rotateX: 0 }
                      : { rotateX: -180 }
                  }
                  transition={{ duration: 0.9, ease: [0.6, 0.05, 0.01, 0.9] }}
                  style={{ transformOrigin: 'top center', transformPerspective: 800 }}
                  aria-hidden="true"
                />

                {/* Wax seal */}
                <motion.div
                  className={styles.waxSeal}
                  animate={phase !== 'intro' ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  aria-hidden="true"
                >
                  <span>🌸</span>
                </motion.div>

                {/* ── Paper rising out of envelope ── */}
                <AnimatePresence>
                  {(phase === 'rising') && (
                    <motion.div
                      className={styles.paperRise}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: -80, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, ease: [0.34, 1.26, 0.64, 1] }}
                      aria-hidden="true"
                    >
                      <div className={styles.paperSheet}>
                        <span className={styles.paperLine} />
                        <span className={styles.paperLine} />
                        <span className={styles.paperLineShort} />
                        <span className={styles.paperHeart}>♡</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
              {/* end .envelope */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Phase 4: Full Letter Reading View ── */}
        <AnimatePresence>
          {isReading && (
            <motion.div
              key="letter"
              className={styles.letterWrap}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.26, 0.64, 1] }}
            >

              {/* ── Polaroid photo decorations ── */}
              {(letterPhotos || []).map((photo, i) => (
                <PolaroidPhoto
                  key={i}
                  src={photo.src}
                  alt={photo.alt}
                  rotate={photo.rotate}
                  label={photo.label}
                  delay={0.3 + i * 0.2}
                  position={i === 0 ? 'polaroidLeft' : 'polaroidRight'}
                />
              ))}

              {/* ── Decorative small flowers around letter ── */}
              <div className={styles.letterDecor} aria-hidden="true">
                {decorations.flowers.map((f, i) => (
                  <span key={i} className={`${styles.letterFlower} ${styles[`lf${i + 1}`]}`}>{f}</span>
                ))}
                {decorations.hearts.slice(0, 3).map((h, i) => (
                  <span key={`h${i}`} className={`${styles.letterHeart} ${styles[`lh${i + 1}`]}`}>{h}</span>
                ))}
              </div>

              {/* ── The actual letter paper / parchment ── */}
              <div className={styles.letterPaper}>

                {/* Paper grain texture */}
                <div className={styles.paperGrain} aria-hidden="true" />
                <div className={styles.paperMargin} aria-hidden="true" />

                {/* Corner ornaments */}
                <span className={styles.cornerTL} aria-hidden="true">✦</span>
                <span className={styles.cornerTR} aria-hidden="true">✦</span>
                <span className={styles.cornerBL} aria-hidden="true">✧</span>
                <span className={styles.cornerBR} aria-hidden="true">🌸</span>

                {/* Top divider */}
                <div className={styles.paperTopRule} aria-hidden="true">
                  <span className={styles.ruleFlower}>🌸</span>
                </div>

                {/* Letter content with stagger */}
                <motion.div
                  variants={letterStagger}
                  initial="hidden"
                  animate="show"
                >
                  {/* Dear You */}
                  <motion.p variants={paraVariant} className={styles.salutation}>
                    Dear You,
                  </motion.p>

                  {/* Body paragraphs from birthdayData */}
                  <motion.div className={styles.letterBody} variants={letterStagger}>
                    {letter.paragraphs.map((text, i) => (
                      <motion.p key={i} variants={paraVariant} className={styles.paragraph}>
                        {text}
                      </motion.p>
                    ))}
                  </motion.div>

                  {/* Postscript */}
                  {letter.postscript && (
                    <motion.p variants={paraVariant} className={styles.ps}>
                      {letter.postscript}
                    </motion.p>
                  )}

                  {/* Closing */}
                  <motion.div variants={paraVariant} className={styles.closing}>
                    <div className={styles.closingFlowers} aria-hidden="true">
                      <span>🌸</span><span>♡</span><span>🌸</span>
                    </div>
                    <p className={styles.closingLine}>With love,</p>
                    <p className={styles.signature}>{senderName}</p>
                  </motion.div>

                </motion.div>
                {/* end stagger */}

              </div>
              {/* end letterPaper */}

              {/* ── Navigation ── */}
              <motion.div
                className={styles.nav}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Link to="/" className={styles.navBack}>
                  <span>←</span> Back to our little story
                </Link>
                <Link to="/moments" className={styles.navMoments}>
                  See our moments <span>→</span>
                </Link>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
      {/* end .scene */}

    </div>
  )
}
