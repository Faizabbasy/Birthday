import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { birthdayData } from '../../data/birthdayData'
import styles from './Moments.module.css'

/* ── Animation Variants ── */
const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.93 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.34, 1.26, 0.64, 1] } },
}

/* ── Lightbox Modal ── */
function LightboxModal({ photo, onClose }) {
  const [liked, setLiked] = useState(false)
  const [hearts, setHearts] = useState([])

  const handleKey = useCallback((e) => { if (e.key === 'Escape') onClose() }, [onClose])
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked((v) => !v)
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 70,
      y: -(Math.random() * 80 + 40),
      scale: Math.random() * 0.6 + 0.7,
    }))
    setHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id))), 1400)
  }

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1,    y: 0 }}
        exit={{ opacity: 0, scale: 0.9,   y: 20 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Tutup">✕</button>

        {/* Image */}
        <div className={styles.modalImgWrap}>
          {photo.src
            ? <img src={photo.src} alt={photo.alt} className={styles.modalImg} />
            : <div className={styles.modalPlaceholder}><span>🌸</span></div>
          }
          {photo.category && <span className={styles.modalBadge}>{photo.category}</span>}
        </div>

        {/* Info */}
        <div className={styles.modalBody}>
          <div className={styles.modalTopRow}>
            <div>
              <h3 className={styles.modalTitle}>{photo.alt}</h3>
              <p className={styles.modalMeta}>
                {photo.date}{photo.location ? ` · 📍 ${photo.location}` : ''}
              </p>
            </div>

            {/* Like button with floating hearts */}
            <div className={styles.likeWrap}>
              <motion.button
                className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
                onClick={handleLike}
                whileTap={{ scale: 0.8 }}
                aria-label="Sukai"
              >
                {liked ? '❤️' : '♡'}
              </motion.button>
              <AnimatePresence>
                {hearts.map((h) => (
                  <motion.span
                    key={h.id}
                    className={styles.floatHeart}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                    animate={{ opacity: 0, x: h.x, y: h.y, scale: h.scale }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >💕</motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <p className={styles.modalCaption}>{photo.caption}</p>

          {photo.story && (
            <div className={styles.storyBox}>
              <span className={styles.storyQuote}>"</span>
              <p className={styles.storyText}>{photo.story}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main Component ── */
export default function Moments() {
  const { photos, decorations, recipientNickname } = birthdayData
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const categories = ['Semua', ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))]
  const filtered = activeCategory === 'Semua' ? photos : photos.filter((p) => p.category === activeCategory)

  return (
    <section className={styles.page} aria-label="Momen Berharga">

      {/* Ambient BG */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgDecor} aria-hidden="true">
        {['🌸','🌷','🌼','🌺'].map((f, i) => (
          <span key={i} className={`${styles.bgPetal} ${styles[`bp${i+1}`]}`}>{f}</span>
        ))}
      </div>

      <div className={`container ${styles.inner}`}>

        {/* Header */}
        <motion.div
          className={styles.pageHeader}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.headerDecor} aria-hidden="true">{decorations.flowers[3]}</span>
          <p className={styles.headerEyebrow}>Kenangan Kita</p>
          <h1 className={styles.headerTitle}>Momen Berharga</h1>
          <p className={styles.headerSubtitle}>
            Setiap gambar menyimpan cerita yang tak terlupakan, <em>{recipientNickname}</em>.
          </p>
          <div className="divider" style={{ marginTop: 'var(--space-5)' }} />
        </motion.div>

        {/* Category Tabs */}
        {categories.length > 1 && (
          <motion.div
            className={styles.tabs}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.tabBtn} ${activeCategory === cat ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {activeCategory === cat && (
                  <motion.span className={styles.tabPill} layoutId="tabPill" />
                )}
                <span className={styles.tabLabel}>{cat}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          className={styles.grid}
          variants={gridContainer}
          initial="hidden"
          animate="show"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo) => (
              <motion.div
                key={photo.id}
                variants={cardVariant}
                layout
                className={styles.cardOuter}
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className={styles.polaroid}>
                  <div className={styles.imageWrap}>
                    {photo.src
                      ? <img src={photo.src} alt={photo.alt} className={styles.image} loading="lazy" />
                      : <div className={styles.placeholder}><span>🌸</span></div>
                    }
                    {photo.category && <span className={styles.cardBadge}>{photo.category}</span>}
                    <div className={styles.hoverOverlay}>
                      <span className={styles.viewIcon}>🔍</span>
                    </div>
                  </div>
                  <div className={styles.caption}>
                    <p className={styles.captionTitle}>{photo.alt}</p>
                    <p className={styles.captionText}>{photo.caption}</p>
                    <span className={styles.captionDate}>{photo.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Nav */}
        <motion.div
          className={styles.nav}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link to="/letter" className={styles.navLink}>← Baca Surat</Link>
          <Link to="/"       className={styles.navLinkPrimary}>Kembali ke Awal →</Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
