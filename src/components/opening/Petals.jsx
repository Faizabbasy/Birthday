import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import styles from './Petals.module.css'

/**
 * Petals — dynamic full-screen flower petals + hearts + sparkles burst animation.
 * Rendered directly into document.body via React Portal to prevent any CSS overflow clipping.
 */

const FLOWERS  = ['🌸', '🌺', '🌼', '🌷', '🌸', '💐', '🌸', '🌹', '🌻', '🌸', '🪷', '🏵️']
const HEARTS   = ['💖', '💕', '🤍', '💗', '❤️', '💝', '💓']
const SPARKLES = ['✨', '⭐', '✦', '✨', '🌟']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function generateParticles() {
  const particles = []
  const totalParticles = 70

  const screenW = typeof window !== 'undefined' ? window.innerWidth : 1000
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 800

  for (let i = 0; i < totalParticles; i++) {
    const angle = (i / totalParticles) * 360 + randomBetween(-15, 15)
    const dist = randomBetween(140, Math.max(screenW, screenH) * 0.75)
    const rad = (angle * Math.PI) / 180
    const x = Math.cos(rad) * dist
    const initialY = Math.sin(rad) * dist - randomBetween(40, 180)
    const fallY = initialY + randomBetween(160, 420) // Gravity drift
    const size = randomBetween(1.8, 3.8) // Large & clearly visible size
    const delay = randomBetween(0, 0.45)
    const rotate = randomBetween(-720, 720)

    let emoji = FLOWERS[i % FLOWERS.length]
    let type = 'flower'
    if (i % 3 === 1) {
      emoji = HEARTS[i % HEARTS.length]
      type = 'heart'
    } else if (i % 4 === 0) {
      emoji = SPARKLES[i % SPARKLES.length]
      type = 'sparkle'
    }

    particles.push({
      id: `petal-${i}`,
      emoji,
      x,
      y: initialY,
      endY: fallY,
      size,
      delay,
      rotate,
      duration: randomBetween(3.2, 4.5),
      type,
    })
  }

  return particles
}

export default function Petals() {
  const particles = useMemo(() => generateParticles(), [])

  return createPortal(
    <div className={styles.root} aria-hidden="true">
      {/* Central radial shockwave glow */}
      <motion.div
        className={styles.shockwave}
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />

      {/* 70 Bursting Flowers & Hearts */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`${styles.particle} ${styles[p.type]}`}
          style={{ fontSize: `${p.size}rem` }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.1, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, p.x * 0.7, p.x],
            y: [0, p.y, p.endY],
            scale: [0.1, 1.4, 1.1, 0.3],
            rotate: [0, p.rotate * 0.5, p.rotate],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
            opacity: { times: [0, 0.1, 0.8, 1] },
            scale:   { times: [0, 0.2, 0.75, 1] },
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>,
    document.body
  )
}
