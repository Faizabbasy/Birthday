import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Petals from './Petals'
import styles from './GiftBox.module.css'

/**
 * GiftBox — Interactive gift box that opens on click and triggers Flower Rain.
 * Sequence: idle → opening (lid flies up) → burst (flower rain cascades down screen)
 * onOpen callback fires after showing flower rain.
 */
export default function GiftBox({ onOpen }) {
  // 'idle' | 'opening' | 'burst'
  const [state, setState] = useState('idle')

  const handleClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (state !== 'idle') return

    setState('opening')

    // Trigger flower rain immediately as lid opens up
    setTimeout(() => {
      setState('burst')
    }, 100)

    // Notify Home page to transition after showing full flower rain shower
    setTimeout(() => {
      if (onOpen) onOpen()
    }, 4500)
  }

  return (
    <div
      className={styles.root}
      onClick={handleClick}
      style={{ cursor: state === 'idle' ? 'pointer' : 'default' }}
    >
      {/* Ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Text above gift */}
      <motion.div
        className={styles.aboveText}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onClick={handleClick}
      >
        <p className={styles.headline}>Something special for you</p>
        <p className={styles.subline}>Open your little surprise</p>
      </motion.div>

      {/* Gift Box Container (Entire box area is clickable) */}
      <motion.div
        className={styles.giftWrap}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: 'backOut' }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Open your surprise gift"
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {/* Floating wrapper */}
        <motion.div
          className={styles.floatWrapper}
          animate={state === 'idle' ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          onClick={handleClick}
        >
          {/* ── Lid ── */}
          <motion.div
            className={styles.lid}
            animate={
              state === 'idle'
                ? { rotateX: 0, y: 0, opacity: 1 }
                : state === 'opening'
                ? { rotateX: -80, y: -60, opacity: 1 }
                : { rotateX: -80, y: -120, opacity: 0 }
            }
            transition={{
              duration: state === 'idle' ? 0 : 0.65,
              ease: [0.34, 1.26, 0.64, 1],
            }}
            style={{ transformOrigin: 'top center', transformPerspective: 600 }}
            aria-hidden="true"
            onClick={handleClick}
          >
            {/* Lid body */}
            <div className={styles.lidBody}>
              <div className={styles.lidRibbon} />
            </div>
            {/* Bow on top */}
            <div className={styles.bow}>
              <div className={styles.bowLeft} />
              <div className={styles.bowRight} />
              <div className={styles.bowKnot} />
            </div>
          </motion.div>

          {/* ── Box body ── */}
          <div
            className={`${styles.box} ${state !== 'idle' ? styles.boxOpen : ''}`}
            onClick={handleClick}
          >
            {/* Ribbon vertical */}
            <div className={styles.ribbonV} aria-hidden="true" />
            {/* Shine overlay */}
            <div className={styles.shine} aria-hidden="true" />

            {/* Inner glow when open */}
            <AnimatePresence>
              {state !== 'idle' && (
                <motion.div
                  className={styles.innerGlow}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Click hint */}
          <AnimatePresence>
            {state === 'idle' && (
              <motion.p
                className={styles.hint}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: 1.5 }}
                exit={{ opacity: 0 }}
                aria-hidden="true"
                onClick={handleClick}
              >
                tap to open ✦
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ── Full Screen Flower Rain ── */}
      {state !== 'idle' && <Petals />}
    </div>
  )
}
