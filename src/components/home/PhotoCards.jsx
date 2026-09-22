import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PhotoCards.module.css'

const PHOTO_CARDS = [
  {
    id: 1,
    src: '/assets/moment1.png',
    title: 'Obrolan Warm Corner',
    date: '14 Jan 2026',
    desc: 'Secangkir kopi hangat dan tawa manis di sudut kafe favorit kita.',
    rotate: -3.5,
    sticker: '📌',
  },
  {
    id: 2,
    src: '/assets/moment2.png',
    title: 'Senja di Sunset Beach',
    date: '28 Mar 2026',
    desc: 'Menikmati indahnya langit sore pink keemasan bersama desiran ombak.',
    rotate: 2,
    sticker: '🌸',
  },
  {
    id: 3,
    src: '/assets/moment3.png',
    title: 'Cahaya Lilin & Harapan',
    date: '26 Okt 2026',
    desc: 'Momen manis saat lilin dinyalakan dengan doa terbaik untukmu.',
    rotate: -2,
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
        <h2 className={styles.heading}>Momen Indah Bersamamu</h2>
        <p className={styles.subtitle}>Beberapa potret kenangan manis yang selalu membuat tersenyum.</p>
      </motion.div>

      {/* 3 Photo Cards Grid */}
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
              y: -10,
              scale: 1.03,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            onClick={() => setSelectedPhoto(card)}
          >
            <div className={styles.frameCard}>
              {/* Sticker / Pin accent on top */}
              <span className={styles.sticker} aria-hidden="true">
                {card.sticker}
              </span>
              <span className={styles.tapeSticker} aria-hidden="true" />

              {/* Photo Box */}
              <div className={styles.imageBox}>
                <img src={card.src} alt={card.title} className={styles.photoImg} loading="lazy" />
                <span className={styles.dateBadge}>{card.date}</span>
                <div className={styles.overlay}>
                  <span className={styles.zoomIcon}>🔍</span>
                </div>
              </div>

              {/* Caption */}
              <div className={styles.captionBox}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal for Enlarging Photo */}
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
              <img src={selectedPhoto.src} alt={selectedPhoto.title} className={styles.modalImg} />
              <div className={styles.modalBody}>
                <span className={styles.modalDate}>{selectedPhoto.date}</span>
                <h3 className={styles.modalTitle}>{selectedPhoto.title}</h3>
                <p className={styles.modalDesc}>{selectedPhoto.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
