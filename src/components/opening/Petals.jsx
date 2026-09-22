import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import styles from './Petals.module.css'

/**
 * Petals — Box Burst ("Bunga Muncul dari Box dan Berhamburan").
 * 85 flowers, petals, hearts, and sparkles burst radially out of the gift box center
 * and scatter across the entire viewport, floating and drifting gracefully.
 */

const FLOWERS  = ['🌸', '🌺', '🌼', '🌷', '🌸', '💐', '🌸', '🌹', '🌻', '🌸', '🪷', '🏵️']
const HEARTS   = ['💖', '💕', '🤍', '💗', '❤️', '💝']
const SPARKLES = ['✨', '⭐', '✦', '✨', '🌟']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function generateBoxBurst() {
  const particles = []
  const total = 85

  const screenW = typeof window !== 'undefined' && window.innerWidth ? window.innerWidth : 1200
  const screenH = typeof window !== 'undefined' && window.innerHeight ? window.innerHeight : 900

  for (let i = 0; i < total; i++) {
    const angle = (i / total) * 360 + randomBetween(-12, 12)
    const dist = randomBetween(160, Math.max(screenW, screenH) * 0.65)
    const rad = (angle * Math.PI) / 180
    const targetX = Math.cos(rad) * dist
    const targetY = Math.sin(rad) * dist - randomBetween(30, 120) // Pop upward out of box
    const size = randomBetween(2.2, 4.2)
    const delay = randomBetween(0, 0.42) // Fast punchy burst
    const duration = randomBetween(3.4, 4.8)
    const rotate = randomBetween(-540, 540)

    let emoji = FLOWERS[i % FLOWERS.length]
    let type = 'flower'
    if (i % 4 === 1) {
      emoji = HEARTS[i % HEARTS.length]
      type = 'heart'
    } else if (i % 5 === 0) {
      emoji = SPARKLES[i % SPARKLES.length]
      type = 'sparkle'
    }

    particles.push({
      id: `burst-${i}`,
      emoji,
      targetX,
      targetY,
      size,
      delay,
      duration,
      rotate,
      type,
    })
  }

  return particles
}

export default function Petals() {
  const particles = useMemo(() => generateBoxBurst(), [])

  return createPortal(
    <div
      className={styles.root}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Central radial shockwave glow from gift box */}
      <motion.div
        className={styles.shockwave}
        initial={{ scale: 0, opacity: 0.95 }}
        animate={{ scale: [0, 2, 4.5], opacity: [0.95, 0.6, 0] }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />

      {/* 85 Bursting Flowers & Hearts */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`${styles.particle} ${styles[p.type]}`}
          style={{
            position: 'absolute',
            fontSize: `${p.size}rem`,
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.1 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            x: [0, p.targetX * 0.4, p.targetX * 0.8, p.targetX * 1.05, p.targetX * 1.15],
            y: [0, p.targetY * 0.5, p.targetY, p.targetY + 100, p.targetY + 240],
            rotate: [0, p.rotate * 0.25, p.rotate * 0.5, p.rotate * 0.75, p.rotate],
            scale: [0.1, 1.5, 1.2, 0.9, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>,
    document.body
  )
}
