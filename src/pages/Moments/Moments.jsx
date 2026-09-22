import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { birthdayData } from '../../data/birthdayData'
import videoSrc from '../../assets/WhatsApp Video 2026-09-22 at 19.38.26.mp4'
import styles from './Moments.module.css'

export default function Moments() {
  const { recipientNickname, date, decorations } = birthdayData
  const videoRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [hearts, setHearts] = useState([])

  const handleStartPlay = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleLike = () => {
    setLiked((v) => !v)
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 80,
      y: -(Math.random() * 90 + 50),
      scale: Math.random() * 0.5 + 0.8,
    }))
    setHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)))
    }, 1400)
  }

  return (
    <section className={styles.page} aria-label="Momen Spesial Video">
      {/* Ambient BG Glow */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgDecor} aria-hidden="true">
        {['🌸', '🌷', '🌼', '🌺'].map((f, i) => (
          <span key={i} className={`${styles.bgPetal} ${styles[`bp${i + 1}`]}`}>{f}</span>
        ))}
      </div>

      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.pageHeader}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className={styles.headerBadge}>
            🎬 Video Special Moment
          </span>
          <h1 className={styles.headerTitle}>Momen Indah Kita</h1>
          <p className={styles.headerSubtitle}>
            Sebuah video manis yang merekam tawa dan kenangan berharga bersamamu, <em>{recipientNickname}</em>.
          </p>
        </motion.div>

        {/* Video Card Showcase */}
        <motion.div
          className={styles.videoCard}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.34, 1.26, 0.64, 1] }}
        >
          {/* Video Screen Container */}
          <div className={styles.videoScreen}>
            <video
              ref={videoRef}
              src={videoSrc}
              className={styles.videoElement}
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              preload="metadata"
              playsInline
            />

            {/* Poster Overlay before playing */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  className={styles.posterOverlay}
                  onClick={handleStartPlay}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                >
                  <div className={styles.playBtnWrap}>
                    <div className={styles.playRipple} aria-hidden="true" />
                    <motion.button
                      className={styles.playBtnBig}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Putar Video Momen"
                    >
                      ▶
                    </motion.button>
                  </div>
                  <div className={styles.posterTextGroup}>
                    <h2 className={styles.posterTitle}>Momen Spesial</h2>
                    <p className={styles.posterSubtitle}>Sentuh untuk memutar video 🌸</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Info Body */}
          <div className={styles.videoBody}>
            <div className={styles.videoTopRow}>
              <div>
                <h2 className={styles.videoTitle}>Our Special Memory</h2>
                <p className={styles.videoMeta}>
                  {date} &nbsp;·&nbsp; 📍 Momen Indah Bersama {recipientNickname}
                </p>
              </div>

              {/* Like Button */}
              <div className={styles.likeWrap}>
                <motion.button
                  className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                  onClick={handleLike}
                  whileTap={{ scale: 0.82 }}
                  aria-label="Berikan Love"
                  title="Sukai Momen Ini"
                >
                  {liked ? '❤️' : '♡'}
                </motion.button>

                {/* Floating animated hearts */}
                <AnimatePresence>
                  {hearts.map((h) => (
                    <motion.span
                      key={h.id}
                      className={styles.floatHeart}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                      animate={{ opacity: 0, x: h.x, y: h.y, scale: h.scale }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.3, ease: 'easeOut' }}
                    >
                      💖
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <p className={styles.videoCaption}>
              "Setiap detik dalam video ini menyimpan senyuman, tawa, dan rasa bahagia yang tak akan pernah pudar."
            </p>

            {/* Romantic Quote Box */}
            <div className={styles.quoteBox}>
              <span className={styles.quoteIcon} aria-hidden="true">“</span>
              <p className={styles.storyText}>
                Terima kasih telah menjadi bagian paling indah dari setiap hari-hariku. Semoga senyuman di video ini selalu menghiasi wajahmu selamanya. {decorations?.flowers?.[0] || '🌸'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className={styles.nav}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/" className={styles.navLink}>← Kembali ke Awal</Link>
          <Link to="/letter" className={styles.navLinkPrimary}>Baca Surat →</Link>
        </motion.div>
      </div>
    </section>
  )
}
