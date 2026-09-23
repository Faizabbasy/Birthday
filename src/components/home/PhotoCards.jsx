import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PhotoCards.module.css'

// ── SVG Stickers & Doodles matching the sample image ── //

const PurpleFlowerSticker = ({ showLeaves = false, className = '' }) => (
  <svg viewBox="0 0 100 100" className={`${styles.flowerSvg} ${className}`}>
    <defs>
      <filter id="stickerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#4c1d95" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#stickerShadow)">
      {showLeaves && (
        <>
          {/* Leaf 1 (Left bottom) */}
          <path d="M 25 65 C 10 70 5 85 20 90 C 35 90 40 75 35 65 Z" fill="#a7f3d0" stroke="#ffffff" strokeWidth="3" />
          <path d="M 23 68 C 16 76 13 83 20 88" stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Leaf 2 (Right bottom) */}
          <path d="M 65 70 C 75 82 90 85 88 70 C 85 58 70 60 62 68 Z" fill="#a7f3d0" stroke="#ffffff" strokeWidth="3" />
        </>
      )}
      {/* Outer White Sticker Border */}
      <path
        d="M 50 12 C 57 12 62 20 67 22 C 75 20 83 26 83 34 C 85 41 80 48 83 55 C 83 65 75 72 67 70 C 60 74 53 82 47 82 C 38 81 33 73 27 71 C 19 71 13 62 14 54 C 12 47 18 39 19 33 C 22 24 30 20 37 23 C 42 18 46 12 50 12 Z"
        fill="#ffffff"
      />
      {/* 5 Purple Petals */}
      <circle cx="50" cy="27" r="16" fill="#c084fc" />
      <circle cx="70" cy="40" r="16" fill="#a855f7" />
      <circle cx="62" cy="63" r="16" fill="#c084fc" />
      <circle cx="38" cy="63" r="16" fill="#b164ff" />
      <circle cx="30" cy="40" r="16" fill="#a855f7" />
      {/* Inner Petal Highlights */}
      <circle cx="50" cy="27" r="11" fill="#d8b4fe" />
      <circle cx="70" cy="40" r="11" fill="#c084fc" />
      <circle cx="62" cy="63" r="11" fill="#d8b4fe" />
      <circle cx="38" cy="63" r="11" fill="#c084fc" />
      <circle cx="30" cy="40" r="11" fill="#c084fc" />
      {/* Flower Center */}
      <circle cx="50" cy="46" r="11" fill="#6b21a8" />
      <circle cx="50" cy="46" r="7" fill="#ffffff" opacity="0.9" />
      <circle cx="52" cy="44" r="3" fill="#6b21a8" />
    </g>
  </svg>
)

const RibbonBowSticker = ({ className = '' }) => (
  <svg viewBox="0 0 100 80" className={`${styles.ribbonSvg} ${className}`}>
    <g filter="drop-shadow(0px 3px 5px rgba(107, 33, 168, 0.3))">
      {/* White Sticker Outline Backdrop */}
      <path
        d="M 50 35 C 30 15 5 25 15 45 C 25 55 45 42 50 40 C 55 42 75 55 85 45 C 95 25 70 15 50 35 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M 45 42 L 30 75 L 42 72 L 50 45 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="4" />
      <path d="M 55 42 L 70 75 L 58 72 L 50 45 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="4" />

      {/* Ribbon Left Loop */}
      <path d="M 48 38 C 30 18 10 28 20 44 C 30 52 44 42 48 38 Z" fill="#c084fc" stroke="#a855f7" strokeWidth="2" />
      <path d="M 38 32 C 25 22 16 30 24 40" fill="none" stroke="#e9d5ff" strokeWidth="2" />

      {/* Ribbon Right Loop */}
      <path d="M 52 38 C 70 18 90 28 80 44 C 70 52 56 42 52 38 Z" fill="#c084fc" stroke="#a855f7" strokeWidth="2" />
      <path d="M 62 32 C 75 22 84 30 76 40" fill="none" stroke="#e9d5ff" strokeWidth="2" />

      {/* Hanging Ribbon Tails */}
      <path d="M 46 41 L 28 72 L 39 69 L 49 43 Z" fill="#a855f7" stroke="#7e22ce" strokeWidth="1" />
      <path d="M 54 41 L 72 72 L 61 69 L 51 43 Z" fill="#a855f7" stroke="#7e22ce" strokeWidth="1" />

      {/* Center Knot */}
      <ellipse cx="50" cy="40" rx="7" ry="6" fill="#7e22ce" stroke="#ffffff" strokeWidth="2" />
    </g>
  </svg>
)

const PurpleHeartSticker = ({ className = '' }) => (
  <svg viewBox="0 0 60 60" className={`${styles.heartStickerSvg} ${className}`}>
    <g filter="drop-shadow(0px 2px 5px rgba(126, 34, 206, 0.35))">
      <path
        d="M 30 52 C 30 52 8 38 8 22 C 8 13 15 7 24 10 C 28 12 30 16 30 16 C 30 16 32 12 36 10 C 45 7 52 13 52 22 C 52 38 30 52 30 52 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M 30 50 C 30 50 10 37 10 22 C 10 14 16 9 24 11 C 28 13 30 17 30 17 C 30 17 32 13 36 11 C 44 9 50 14 50 22 C 50 37 30 50 30 50 Z"
        fill="#c084fc"
        stroke="#a855f7"
        strokeWidth="1.5"
      />
      <path
        d="M 18 16 C 14 19 14 24 14 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
  </svg>
)

const HandDoodleSparkles = ({ className = '' }) => (
  <svg viewBox="0 0 60 60" className={`${styles.doodleSvg} ${className}`}>
    <path
      d="M 12 28 C 20 25 24 15 26 8 C 28 15 32 25 40 28 C 32 31 28 41 26 48 C 24 41 20 31 12 28 Z"
      fill="#a855f7"
      opacity="0.85"
    />
    <path
      d="M 44 14 C 47 14 49 10 50 7 C 51 10 53 14 56 14 C 53 15 51 19 50 22 C 49 19 47 15 44 14 Z"
      fill="#c084fc"
    />
    <circle cx="15" cy="46" r="2.5" fill="#a855f7" />
    <circle cx="48" cy="42" r="2" fill="#c084fc" />
  </svg>
)

const HeartLineDoodle = ({ className = '' }) => (
  <svg viewBox="0 0 50 40" className={`${styles.doodleSvg} ${className}`}>
    <path
      d="M 25 34 C 25 34 8 23 8 13 C 8 7 13 4 19 6 C 22 7 25 11 25 11 C 25 11 28 7 31 6 C 37 4 42 7 42 13 C 42 23 25 34 25 34 Z"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const WavyLineDoodle = ({ className = '' }) => (
  <svg viewBox="0 0 80 20" className={`${styles.doodleSvg} ${className}`}>
    <path
      d="M 5 10 Q 20 2 35 10 T 65 10 T 75 10"
      fill="none"
      stroke="#a855f7"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
)

const PHOTO_CARDS = [
  {
    id: 1,
    src: '/assets/moment1.png',
    alt: 'Secangkir Kopi & Surat',
    rotate: -4.5,
    tapeType: 'plaid',
    tapePosition: 'topLeft',
    hasTopHeart: true,
    hasTopRightFlower: true,
    hasBottomLeftBow: true,
    hasBottomRightHeartDoodle: true,
  },
  {
    id: 2,
    src: '/assets/moment2.png',
    alt: 'Senja di Pantai Bersamamu',
    rotate: -0.8,
    tapeType: 'plaid',
    tapePosition: 'topLeft',
    hasTopHeart: true,
    hasBottomRightFlowerLeaves: true,
    hasBottomLeftSquiggleDoodle: true,
    hasRightFloatingHeart: true,
  },
  {
    id: 3,
    src: '/assets/moment3.png',
    alt: 'Kue Ulang Tahun Manis',
    rotate: 4.8,
    tapeType: 'heartPattern',
    tapePosition: 'topRight',
    hasTopLeftHeartSticker: true,
    hasMiddleRightBow: true,
    hasBottomRightFlowerLeaves: true,
    hasOuterDoodles: true,
  },
]

export default function PhotoCards() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <section className={styles.section} aria-label="Beautiful Moment Showcase">
      {/* Background Ambient Decor Doodles */}
      <div className={styles.bgDoodles} aria-hidden="true">
        <span className={`${styles.bgDoodleItem} ${styles.bgd1}`}>✦</span>
        <span className={`${styles.bgDoodleItem} ${styles.bgd2}`}>♡</span>
        <span className={`${styles.bgDoodleItem} ${styles.bgd3}`}>✧</span>
        <span className={`${styles.bgDoodleItem} ${styles.bgd4}`}>🌸</span>
        <span className={`${styles.bgDoodleItem} ${styles.bgd5}`}>♡</span>
      </div>

      {/* Header Container matching sample image */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Pill Badge: 🌸 SPECIAL MOMENTS */}
        <div className={styles.badgePill}>
          <span className={styles.badgeIcon}>🌸</span>
          <span className={styles.badgeText}>SPECIAL MOMENTS</span>
        </div>

        {/* Headline with Side Doodles */}
        <div className={styles.titleWrapper}>
          <div className={styles.titleDoodleLeft}>
            <HeartLineDoodle className={styles.titleHeartDoodle} />
            <HandDoodleSparkles className={styles.titleSparkleDoodle} />
          </div>

          <h2 className={styles.heading}>Beautiful Moment with you</h2>

          <div className={styles.titleDoodleRight}>
            <HandDoodleSparkles className={styles.titleSparkleDoodle} />
            <HeartLineDoodle className={styles.titleHeartDoodle} />
          </div>
        </div>
      </motion.div>

      {/* 3 Polaroid Photo Cards Showcase */}
      <div className={styles.cardsGrid}>
        {PHOTO_CARDS.map((card) => (
          <motion.div
            key={card.id}
            className={styles.cardOuter}
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.34, 1.26, 0.64, 1] }}
            onClick={() => setSelectedPhoto(card)}
          >
            <motion.div
              className={styles.polaroidFrame}
              style={{ rotate: `${card.rotate}deg` }}
              whileHover={{
                rotate: 0,
                y: -10,
                scale: 1.04,
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
            >
              {/* ── Tape Accents ── */}
              {card.tapeType === 'plaid' && (
                <div className={`${styles.washiTapePlaid} ${styles[card.tapePosition]}`} aria-hidden="true" />
              )}
              {card.tapeType === 'heartPattern' && (
                <div className={`${styles.washiTapeHearts} ${styles[card.tapePosition]}`} aria-hidden="true">
                  <span>💜</span><span>💜</span><span>💜</span>
                </div>
              )}

              {/* ── Stickers ── */}
              {card.hasTopHeart && <PurpleHeartSticker className={styles.topHeartSticker} />}
              {card.hasTopLeftHeartSticker && <PurpleHeartSticker className={styles.topLeftHeartSticker} />}
              {card.hasTopRightFlower && <PurpleFlowerSticker className={styles.topRightFlower} />}
              {card.hasBottomLeftBow && <RibbonBowSticker className={styles.bottomLeftBow} />}
              {card.hasMiddleRightBow && <RibbonBowSticker className={styles.middleRightBow} />}
              {card.hasBottomRightFlowerLeaves && (
                <PurpleFlowerSticker showLeaves={true} className={styles.bottomRightFlowerLeaves} />
              )}

              {/* ── Photo Container ── */}
              <div className={styles.imageBox}>
                <img src={card.src} alt={card.alt} className={styles.photoImg} loading="lazy" />
                <div className={styles.imageOverlay}>
                  <span className={styles.zoomText}>🔎 Lihat Foto</span>
                </div>
              </div>

              {/* ── On-Frame Doodles ── */}
              {card.hasBottomRightHeartDoodle && <HeartLineDoodle className={styles.frameBottomRightHeart} />}
              {card.hasBottomLeftSquiggleDoodle && (
                <div className={styles.frameBottomLeftDoodles}>
                  <HeartLineDoodle className={styles.miniHeart} />
                  <WavyLineDoodle className={styles.miniSquiggle} />
                </div>
              )}
            </motion.div>

            {/* ── Outside Floating Doodles ── */}
            {card.hasRightFloatingHeart && (
              <HeartLineDoodle className={styles.floatingRightHeart} />
            )}
            {card.hasOuterDoodles && (
              <div className={styles.outerDoodlesGroup}>
                <HeartLineDoodle className={styles.outerHeart} />
                <HandDoodleSparkles className={styles.outerSparkle} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
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
                aria-label="Tutup"
              >
                ✕
              </button>
              <div className={styles.modalPolaroid}>
                <div className={styles.modalImgBox}>
                  <img src={selectedPhoto.src} alt={selectedPhoto.alt} className={styles.modalImg} />
                </div>
                <div className={styles.modalCaption}>
                  <h3>{selectedPhoto.alt}</h3>
                  <p>Momen spesial yang penuh dengan kehangatan dan kebahagiaan 🌸✨</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

