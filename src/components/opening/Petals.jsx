import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './Petals.module.css'

/**
 * Petals — Box Burst (optimised for mobile).
 * Uses pure CSS animations (no framer-motion per particle) for 60 fps on low-end devices.
 * Particle count adapts to screen size.
 */

const FLOWERS  = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹', '🌻', '🪷']
const HEARTS   = ['💖', '💕', '💗', '❤️', '💝']
const SPARKLES = ['✨', '⭐', '🌟']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function generateParticles() {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768

  // Fewer particles on mobile for smooth 60 fps
  const total = isMobile ? 30 : 55

  const screenW = typeof window !== 'undefined' ? window.innerWidth  : 1200
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 900
  const maxDist  = Math.max(screenW, screenH) * (isMobile ? 0.55 : 0.65)

  const particles = []

  for (let i = 0; i < total; i++) {
    const angle   = (i / total) * 360 + randomBetween(-15, 15)
    const dist    = randomBetween(120, maxDist)
    const rad     = (angle * Math.PI) / 180
    const targetX = Math.cos(rad) * dist
    const targetY = Math.sin(rad) * dist - randomBetween(20, 90)
    // Simpler size range; no huge particles on mobile
    const size    = isMobile
      ? randomBetween(1.6, 2.8)
      : randomBetween(2.2, 4.0)
    const delay    = randomBetween(0, 0.38)
    const duration = randomBetween(2.8, 4.2)
    const rotate   = randomBetween(-360, 360)

    let emoji = FLOWERS[i % FLOWERS.length]
    let type  = 'flower'
    if (i % 4 === 1) {
      emoji = HEARTS[i % HEARTS.length]
      type  = 'heart'
    } else if (i % 5 === 0) {
      emoji = SPARKLES[i % SPARKLES.length]
      type  = 'sparkle'
    }

    particles.push({
      id: `burst-${i}`,
      emoji,
      type,
      style: {
        // CSS custom props consumed by .burst keyframe
        '--tx':    `${targetX}px`,
        '--ty':    `${targetY}px`,
        '--rot':   `${rotate}deg`,
        '--dur':   `${duration}s`,
        '--delay': `${delay}s`,
        fontSize:  `${size}rem`,
      },
    })
  }

  return particles
}

export default function Petals() {
  const particles = useMemo(() => generateParticles(), [])

  return createPortal(
    <div className={styles.root} aria-hidden="true">
      {/* Shockwave — single CSS animation, very cheap */}
      <div className={styles.shockwave} />

      {particles.map((p) => (
        <span
          key={p.id}
          className={`${styles.particle} ${styles[p.type]} ${styles.burst}`}
          style={p.style}
        >
          {p.emoji}
        </span>
      ))}
    </div>,
    document.body
  )
}
