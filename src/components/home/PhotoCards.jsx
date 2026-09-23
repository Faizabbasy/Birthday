import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PhotoCards.module.css'

const PHOTO_CARDS = [
  {
    id: 1,
    src: '/assets/moment1.png',
    alt: 'Foto Momen 1',
    rotate: -4.2,
    tapeStyle: 'tapeLeft',
    sticker: '📌',
  },
  {
    id: 2,
    src: '/assets/moment2.png',
    alt: 'Foto Momen 2',
    rotate: 3.5,
    tapeStyle: 'tapeCenter',
    sticker: '🌸',
  },
  {
    id: 3,
    src: '/assets/moment3.png',
    alt: 'Foto Momen 3',
    rotate: -3.0,
    tapeStyle: 'tapeRight',
    sticker: '💖',
  },
]

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 35, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.26, 0.64, 1] },
  },
}

export default function PhotoCards() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <section className={styles.section} aria-label="Galeri Foto Momen">
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.badge}>
          ✨ Special Moments
        </span>
        <h2 className={styles.heading}>Beautiful Moment with you</h2>
      </motion.div>

      {/* 3 Photo Cards Grid - Photos & Paper Frames Only */}
      <motion.div
        className={styles.cardsGrid}
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {PHOTO_CARDS.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariant}
            className={styles.cardOuter}
            style={{ transform: `rotate(${card.rotate}deg)` }}
            whileHover={{
              rotate: 0,
              y: -12,
              scale: 1.04,
              transition: { duration: 0.35, ease: 'easeOut' },
            }}
            onClick={() => setSelectedPhoto(card)}
          >
            <div className={styles.paperFrameCard}>
              {/* Corner Pin / Sticker Accent */}
              <span className={styles.sticker} aria-hidden="true">
                {card.sticker}
              </span>

              {/* Aesthetic Washi Tape */}
              <span className={`${styles.washiTape} ${styles[card.tapeStyle]}`} aria-hidden="true" />

              {/* Pure Photo Frame Box */}
              <div className={styles.imageBox}>
                <img src={card.src} alt={card.alt} className={styles.photoImg} loading="lazy" />
                <div className={styles.overlay}>
                  <span className={styles.zoomIcon}>🔍</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal for Photo Preview */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Tutup foto"
              >
                ✕
              </button>
              <div className={styles.modalPhotoFrame}>
                <img src={selectedPhoto.src} alt={selectedPhoto.alt} className={styles.modalImg} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
