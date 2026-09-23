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

              {/* ── The actual letter paper / writing stationery pad ── */}
              <div className={styles.stationeryPad}>

                {/* Top-Left Floral Cluster (SVG) */}
                <div className={styles.floralCornerTL} aria-hidden="true">
                  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.95">
                      {/* Leaves & vines */}
                      <path d="M0 0 C60 20, 120 40, 170 15 C130 60, 90 90, 0 110 Z" fill="#7e22ce" opacity="0.15" />
                      <path d="M-20 40 C40 60, 90 120, 110 180 C70 140, 40 100, -20 40 Z" fill="#9333ea" opacity="0.2" />
                      <path d="M30 -10 C60 40, 140 60, 200 40 C140 80, 80 80, 30 -10 Z" fill="#a855f7" opacity="0.18" />
                      
                      {/* Detailed leaves */}
                      <path d="M70 20 C100 10, 130 25, 140 45 C120 50, 90 40, 70 20 Z" fill="#6b21a8" opacity="0.4" />
                      <path d="M20 70 C10 100, 25 130, 45 140 C50 120, 40 90, 20 70 Z" fill="#7e22ce" opacity="0.4" />
                      <path d="M110 40 C140 30, 170 50, 175 75 C150 75, 125 65, 110 40 Z" fill="#581c87" opacity="0.35" />
                      <path d="M40 110 C30 140, 50 170, 75 175 C75 150, 65 125, 40 110 Z" fill="#6b21a8" opacity="0.35" />

                      {/* Overlapping Floral Petals - Top Left Flower 1 */}
                      <circle cx="50" cy="45" r="32" fill="#f3e8ff" opacity="0.95" />
                      <circle cx="35" cy="30" r="22" fill="#e9d5ff" opacity="0.9" />
                      <circle cx="65" cy="30" r="22" fill="#e9d5ff" opacity="0.9" />
                      <circle cx="35" cy="60" r="22" fill="#d8b4fe" opacity="0.9" />
                      <circle cx="65" cy="60" r="22" fill="#d8b4fe" opacity="0.9" />
                      <circle cx="50" cy="45" r="14" fill="#c084fc" />
                      <circle cx="50" cy="45" r="7" fill="#fbbf24" />

                      {/* Flower 2 - Upper Right */}
                      <circle cx="125" cy="30" r="24" fill="#faf5ff" opacity="0.95" />
                      <circle cx="112" cy="20" r="16" fill="#f3e8ff" />
                      <circle cx="138" cy="20" r="16" fill="#e9d5ff" />
                      <circle cx="112" cy="40" r="16" fill="#e9d5ff" />
                      <circle cx="138" cy="40" r="16" fill="#d8b4fe" />
                      <circle cx="125" cy="30" r="10" fill="#a855f7" />
                      <circle cx="125" cy="30" r="5" fill="#fef08a" />

                      {/* Flower 3 - Lower Left */}
                      <circle cx="30" cy="125" r="24" fill="#faf5ff" opacity="0.95" />
                      <circle cx="20" cy="112" r="16" fill="#f3e8ff" />
                      <circle cx="40" cy="112" r="16" fill="#e9d5ff" />
                      <circle cx="20" cy="138" r="16" fill="#e9d5ff" />
                      <circle cx="40" cy="138" r="16" fill="#d8b4fe" />
                      <circle cx="30" cy="125" r="10" fill="#a855f7" />
                      <circle cx="30" cy="125" r="5" fill="#fef08a" />

                      {/* Small Accent Buds */}
                      <circle cx="170" cy="35" r="8" fill="#e9d5ff" />
                      <circle cx="170" cy="35" r="4" fill="#c084fc" />
                      <circle cx="35" cy="170" r="8" fill="#e9d5ff" />
                      <circle cx="35" cy="170" r="4" fill="#c084fc" />
                      <circle cx="90" cy="85" r="10" fill="#f3e8ff" />
                      <circle cx="90" cy="85" r="5" fill="#a855f7" />
                    </g>
                  </svg>
                </div>

                {/* Bottom-Right Floral Cluster (SVG) */}
                <div className={styles.floralCornerBR} aria-hidden="true">
                  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.95">
                      {/* Leaves & vines extending up and left */}
                      <path d="M240 240 C180 220, 120 200, 70 225 C110 180, 150 150, 240 130 Z" fill="#7e22ce" opacity="0.15" />
                      <path d="M260 200 C200 180, 150 120, 130 60 C170 100, 200 140, 260 200 Z" fill="#9333ea" opacity="0.2" />
                      <path d="M210 250 C180 200, 100 180, 40 200 C100 160, 160 160, 210 250 Z" fill="#a855f7" opacity="0.18" />

                      {/* Detailed leaves */}
                      <path d="M170 220 C140 230, 110 215, 100 195 C120 190, 150 200, 170 220 Z" fill="#6b21a8" opacity="0.4" />
                      <path d="M220 170 C230 140, 215 110, 195 100 C190 120, 200 150, 220 170 Z" fill="#7e22ce" opacity="0.4" />
                      <path d="M130 200 C100 210, 70 190, 65 165 C90 165, 115 175, 130 200 Z" fill="#581c87" opacity="0.35" />
                      <path d="M200 130 C210 100, 190 70, 165 65 C165 90, 175 115, 200 130 Z" fill="#6b21a8" opacity="0.35" />

                      {/* Overlapping Floral Petals - Main Blossom */}
                      <circle cx="190" cy="195" r="32" fill="#f3e8ff" opacity="0.95" />
                      <circle cx="175" cy="180" r="22" fill="#e9d5ff" opacity="0.9" />
                      <circle cx="205" cy="180" r="22" fill="#e9d5ff" opacity="0.9" />
                      <circle cx="175" cy="210" r="22" fill="#d8b4fe" opacity="0.9" />
                      <circle cx="205" cy="210" r="22" fill="#d8b4fe" opacity="0.9" />
                      <circle cx="190" cy="195" r="14" fill="#c084fc" />
                      <circle cx="190" cy="195" r="7" fill="#fbbf24" />

                      {/* Flower 2 - Upper Blossom */}
                      <circle cx="210" cy="115" r="24" fill="#faf5ff" opacity="0.95" />
                      <circle cx="197" cy="105" r="16" fill="#f3e8ff" />
                      <circle cx="223" cy="105" r="16" fill="#e9d5ff" />
                      <circle cx="197" cy="125" r="16" fill="#e9d5ff" />
                      <circle cx="223" cy="125" r="16" fill="#d8b4fe" />
                      <circle cx="210" cy="115" r="10" fill="#a855f7" />
                      <circle cx="210" cy="115" r="5" fill="#fef08a" />

                      {/* Flower 3 - Left Blossom */}
                      <circle cx="115" cy="210" r="24" fill="#faf5ff" opacity="0.95" />
                      <circle cx="105" cy="197" r="16" fill="#f3e8ff" />
                      <circle cx="125" cy="197" r="16" fill="#e9d5ff" />
                      <circle cx="105" cy="223" r="16" fill="#e9d5ff" />
                      <circle cx="125" cy="223" r="16" fill="#d8b4fe" />
                      <circle cx="115" cy="210" r="10" fill="#a855f7" />
                      <circle cx="115" cy="210" r="5" fill="#fef08a" />

                      {/* Small Accent Buds */}
                      <circle cx="70" cy="205" r="8" fill="#e9d5ff" />
                      <circle cx="70" cy="205" r="4" fill="#c084fc" />
                      <circle cx="205" cy="70" r="8" fill="#e9d5ff" />
                      <circle cx="205" cy="70" r="4" fill="#c084fc" />
                      <circle cx="150" cy="155" r="10" fill="#f3e8ff" />
                      <circle cx="150" cy="155" r="5" fill="#a855f7" />
                    </g>
                  </svg>
                </div>

                {/* Inner white paper sheet with horizontal lines */}
                <div className={styles.letterPaper}>
                  <div className={styles.ruledLinesOverlay} aria-hidden="true" />

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
              </div>
              {/* end stationeryPad */}

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
