import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './DigitalBouquet.module.css'

const BOUQUET_FLOWERS = [
  {
    id: 1,
    name: 'Mawar Velvet Purple',
    title: 'Kasih Sayang Tulus',
    message: 'Setiap detik bersamamu selalu mengisi hatiku dengan kehangatan dan rasa bahagia yang tak terhingga.',
    color: '#8b5cf6',
    scallopColor: '#8b5cf6',
    cx: 200,
    cy: 88,
    type: 'top_purple',
  },
  {
    id: 2,
    name: 'Tulip Lavender',
    title: 'Senyuman Favorit',
    message: 'Senyummu adalah pemandangan terindah dan alasan utama hariku selalu terasa lebih cerah.',
    color: '#a855f7',
    scallopColor: '#a855f7',
    cx: 135,
    cy: 152,
    type: 'mid_left',
  },
  {
    id: 3,
    name: 'Cherry Blossom Lilac',
    title: 'Keindahan Sederhana',
    message: 'Terima kasih sudah hadir dan melengkapi tiap sudut kehidupanku dengan kebaikan dirimu.',
    color: '#9333ea',
    scallopColor: '#9333ea',
    cx: 265,
    cy: 152,
    type: 'mid_right',
  },
  {
    id: 4,
    name: 'Bunga Matahari Gold',
    title: 'Semangat & Keceriaan',
    message: 'Kecerianmu selalu berhasil menghapus segala kelelahan dan memberikan energi positif.',
    color: '#eab308',
    scallopColor: '#f59e0b',
    cx: 145,
    cy: 240,
    type: 'sunflower',
  },
  {
    id: 5,
    name: 'Sweet Lily Pink',
    title: 'Doa Terbaik',
    message: 'Semoga setiap impian indah dan cita-citamu tahun ini perlahan tapi pasti menjadi kenyataan.',
    color: '#d946ef',
    scallopColor: '#ec4899',
    cx: 255,
    cy: 240,
    type: 'pink_cosmos',
  },
  {
    id: 6,
    name: 'Lavender Royal',
    title: 'Rumah Bagi Hati',
    message: 'Berada di sisimu terasa seperti menemukan tempat paling aman dan nyaman untuk selalu pulang.',
    color: '#7c3aed',
    scallopColor: '#8b5cf6',
    cx: 200,
    cy: 275,
    type: 'lavender_stalk',
  },
]

const FILM_PHOTOS = [
  { src: '/assets/moment1.png', alt: 'Momen 1' },
  { src: '/assets/moment2.png', alt: 'Momen 2' },
  { src: '/assets/moment3.png', alt: 'Momen 3' },
  { src: '/assets/moment4.png', alt: 'Momen 4' },
  { src: '/assets/photo1.png', alt: 'Momen 5' },
  { src: '/assets/photo2.png', alt: 'Momen 6' },
]

export default function DigitalBouquet() {
  const [selectedFlower, setSelectedFlower] = useState(null)
  const [openedFlowers, setOpenedFlowers] = useState(new Set())
  const [hoveredFlower, setHoveredFlower] = useState(null)
  const [isWatered, setIsWatered] = useState(false)
  const [burstParticles, setBurstParticles] = useState([])

  const handleFlowerClick = (flower) => {
    setSelectedFlower(flower)
    setOpenedFlowers((prev) => new Set([...prev, flower.id]))

    const newParticles = Array.from({ length: 14 }, (_, i) => ({
      id: `${flower.id}-${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 180,
      y: (Math.random() - 0.5) * 160 - 30,
      emoji: ['✨', '🪻', '💜', '⭐', '🔮', '💕', '✦'][Math.floor(Math.random() * 7)],
    }))
    setBurstParticles(newParticles)
    setTimeout(() => setBurstParticles([]), 1300)
  }

  const handleWaterBouquet = () => {
    setIsWatered(true)
    const rain = Array.from({ length: 22 }, (_, i) => ({
      id: `water-${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 320,
      y: -(Math.random() * 160 + 60),
      scale: Math.random() * 0.5 + 0.8,
      emoji: ['💧', '✨', '🪻', '💜', '🔮', '🌸'][Math.floor(Math.random() * 6)],
    }))
    setBurstParticles(rain)
    setTimeout(() => {
      setIsWatered(false)
      setBurstParticles([])
    }, 1800)
  }

  const currentHoveredObj = BOUQUET_FLOWERS.find((f) => f.id === hoveredFlower)

  return (
    <section className={styles.container} aria-label="Digital Bouquet Section">
      {/* Header Badge */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.badge}>💐 Digital Purple Bouquet</span>

        {/* Film Strip Photostrip Roll (Purple Theme) */}
        <motion.div
          className={styles.filmStripContainer}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.34, 1.26, 0.64, 1] }}
        >
          {/* Top Sprocket Perforations */}
          <div className={styles.sprocketViewport} aria-hidden="true">
            <div className={styles.sprocketTrack}>
              {Array.from({ length: 48 }).map((_, i) => (
                <span key={i} className={styles.sprocketHole} />
              ))}
            </div>
          </div>

          {/* Film Photo Frames Track with wave & scroll animation */}
          <div className={styles.filmViewport}>
            <div className={styles.filmTrack}>
              {[...FILM_PHOTOS, ...FILM_PHOTOS].map((img, index) => (
                <div
                  key={index}
                  className={styles.filmFrame}
                  style={{ animationDelay: `${(index % FILM_PHOTOS.length) * 0.45}s` }}
                >
                  <img src={img.src} alt={img.alt} className={styles.filmImg} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Sprocket Perforations */}
          <div className={styles.sprocketViewport} aria-hidden="true">
            <div className={styles.sprocketTrack}>
              {Array.from({ length: 48 }).map((_, i) => (
                <span key={i} className={styles.sprocketHole} />
              ))}
            </div>
          </div>
        </motion.div>

        <h2 className={styles.title}>A bouquet for you</h2>
      </motion.div>

      {/* Main Interactive Bouquet Canvas */}
      <motion.div
        className={styles.bouquetWrapper}
        initial={{ opacity: 0, scale: 0.96, y: 25 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.34, 1.26, 0.64, 1] }}
      >
        {/* Glow & Aura Background */}
        <div className={`${styles.glowAura} ${isWatered ? styles.bloomingGlow : ''}`} />

        {/* Top Controls Row */}
        <div className={styles.topControlRow}>
          <div className={styles.counterBadge}>
            <span>💌 Pesan Terbuka: {openedFlowers.size}/{BOUQUET_FLOWERS.length}</span>
          </div>

          <motion.button
            type="button"
            className={styles.waterBtn}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWaterBouquet}
          >
            ✨ Siram Bouquet Bloom
          </motion.button>
        </div>

        {/* Active Hover Banner Hint */}
        <div className={styles.hoverHintBanner}>
          {currentHoveredObj ? (
            <span className={styles.hoverText} style={{ color: currentHoveredObj.color }}>
              <strong>{currentHoveredObj.name}</strong> — Klik untuk melihat pesan rahasia ✨
            </span>
          ) : (
            <span className={styles.hoverTextMuted}>
              Sentuh atau klik salah satu bunga di bawah ini 🪻
            </span>
          )}
        </div>

        {/* Floating Particles effect */}
        <AnimatePresence>
          {burstParticles.map((p) => (
            <motion.span
              key={p.id}
              className={styles.burstParticle}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale || 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Scalable Vector SVG Bouquet Graphic (Exact replica of reference image) */}
        <div className={styles.svgBouquetContainer}>
          <svg
            className={styles.bouquetSvg}
            viewBox="0 0 400 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="leafGradDark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e7d32" />
                <stop offset="100%" stopColor="#1b4d1e" />
              </linearGradient>

              <linearGradient id="leafGradLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4cae4f" />
                <stop offset="100%" stopColor="#2e7d32" />
              </linearGradient>

              <linearGradient id="paperGradOuter" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f8f3ff" />
                <stop offset="50%" stopColor="#eedeff" />
                <stop offset="100%" stopColor="#e3cbff" />
              </linearGradient>

              <linearGradient id="paperGradInner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f5ebff" />
              </linearGradient>

              <linearGradient id="ribbonGradMain" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>

              <linearGradient id="ribbonGradDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6d28d9" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>

              {/* Soft Drop Shadow Filter */}
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#581c87" floodOpacity="0.16" />
              </filter>
            </defs>

            {/* ── 0. Floating Sparkles & Hearts (Ambient backdrop) ── */}
            <g opacity="0.85">
              {/* Top-Left Sparkle */}
              <path d="M 68 135 L 71 143 L 79 146 L 71 149 L 68 157 L 65 149 L 57 146 L 65 143 Z" fill="#9333ea" />
              {/* Mid-Left Sparkle */}
              <path d="M 52 268 L 54 274 L 60 276 L 54 278 L 52 284 L 50 278 L 44 276 L 50 274 Z" fill="#a855f7" />
              {/* Top-Right Sparkle */}
              <path d="M 332 135 L 335 143 L 343 146 L 335 149 L 332 157 L 329 149 L 321 146 L 329 143 Z" fill="#9333ea" />
              {/* Lower-Right Sparkle */}
              <path d="M 345 285 L 347 291 L 353 293 L 347 295 L 345 301 L 343 295 L 337 293 L 343 291 Z" fill="#a855f7" />

              {/* Ambient Floating Hearts */}
              <path d="M 322 108 C 322 104, 327 101, 330 105 C 333 101, 338 104, 338 108 C 338 113, 330 118, 330 118 C 330 118, 322 113, 322 108 Z" fill="#a855f7" />
              {/* Lower-Right Heart */}
              <path d="M 360 240 C 360 236, 365 233, 368 237 C 371 233, 376 236, 376 240 C 376 245, 368 250, 368 250 C 368 250, 360 245, 360 240 Z" fill="#9333ea" />
              {/* Lower-Left Heart */}
              <path d="M 102 272 C 102 268, 107 265, 110 269 C 113 265, 118 268, 118 272 C 118 277, 110 282, 110 282 C 110 282, 102 277, 102 272 Z" fill="#a855f7" />
            </g>

            {/* ── 1. Backing Origami Paper Wrapping ── */}
            <g filter="url(#softShadow)">
              {/* Left paper wing */}
              <path d="M 120 170 C 80 230, 85 280, 140 330 L 200 370 L 170 280 Z" fill="url(#paperGradOuter)" stroke="#d8b4fe" strokeWidth="1.5" />
              {/* Right paper wing */}
              <path d="M 280 170 C 320 230, 315 280, 260 330 L 200 370 L 230 280 Z" fill="url(#paperGradOuter)" stroke="#d8b4fe" strokeWidth="1.5" />
              {/* Back central paper collar */}
              <path d="M 110 180 Q 200 130 290 180 L 270 330 Q 200 360 130 330 Z" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.5" />
            </g>

            {/* ── 2. Deep Green Leaves & Baby's Breath (Gypsophila) Backdrop ── */}
            <g>
              {/* Broad Green Leaves */}
              <path d="M 140 180 Q 95 150 90 195 Q 130 205 155 185 Z" fill="url(#leafGradDark)" />
              <path d="M 260 180 Q 305 150 310 195 Q 270 205 245 185 Z" fill="url(#leafGradDark)" />

              <path d="M 180 130 Q 140 80 120 115 Q 150 145 185 135 Z" fill="url(#leafGradLight)" />
              <path d="M 220 130 Q 260 80 280 115 Q 250 145 215 135 Z" fill="url(#leafGradLight)" />

              <path d="M 160 280 Q 110 270 100 295 Q 140 310 170 290 Z" fill="url(#leafGradDark)" />
              <path d="M 240 280 Q 290 270 300 295 Q 260 310 230 290 Z" fill="url(#leafGradDark)" />

              {/* ── White Baby's Breath Clusters (Gypsophila) ── */}
              <g fill="#ffffff" stroke="#e9d5ff" strokeWidth="0.5">
                {/* Cluster Top Left */}
                <path d="M 150 125 L 160 100 M 160 100 L 152 90 M 160 100 L 168 88 M 160 100 L 172 98" stroke="#388e3c" strokeWidth="1.5" fill="none" />
                <circle cx="152" cy="90" r="3.5" /><circle cx="168" cy="88" r="3" /><circle cx="172" cy="98" r="3.5" /><circle cx="160" cy="94" r="2.5" />

                {/* Cluster Top Right */}
                <path d="M 250 125 L 240 100 M 240 100 L 248 90 M 240 100 L 232 88 M 240 100 L 228 98" stroke="#388e3c" strokeWidth="1.5" fill="none" />
                <circle cx="248" cy="90" r="3.5" /><circle cx="232" cy="88" r="3" /><circle cx="228" cy="98" r="3.5" /><circle cx="240" cy="94" r="2.5" />

                {/* Cluster Outer Left */}
                <path d="M 120 190 L 100 175 M 100 175 L 92 168 M 100 175 L 94 182 M 100 175 L 106 166" stroke="#388e3c" strokeWidth="1.5" fill="none" />
                <circle cx="92" cy="168" r="3" /><circle cx="94" cy="182" r="3" /><circle cx="106" cy="166" r="3.5" />

                {/* Cluster Outer Right */}
                <path d="M 280 190 L 300 175 M 300 175 L 308 168 M 300 175 L 306 182 M 300 175 L 294 166" stroke="#388e3c" strokeWidth="1.5" fill="none" />
                <circle cx="308" cy="168" r="3" /><circle cx="306" cy="182" r="3" /><circle cx="294" cy="166" r="3.5" />

                {/* Cluster Center Fill */}
                <path d="M 200 200 L 195 180 M 195 180 L 188 172 M 195 180 L 202 172" stroke="#388e3c" strokeWidth="1.2" fill="none" />
                <circle cx="188" cy="172" r="3" /><circle cx="202" cy="172" r="3" /><circle cx="195" cy="176" r="2.5" />

                {/* Cluster Lower Left */}
                <path d="M 140 270 L 125 285 M 125 285 L 118 280 M 125 285 L 120 294" stroke="#388e3c" strokeWidth="1.2" fill="none" />
                <circle cx="118" cy="280" r="3" /><circle cx="120" cy="294" r="3" />

                {/* Cluster Lower Right */}
                <path d="M 260 270 L 275 285 M 275 285 L 282 280 M 275 285 L 280 294" stroke="#388e3c" strokeWidth="1.2" fill="none" />
                <circle cx="282" cy="280" r="3" /><circle cx="280" cy="294" r="3" />
              </g>
            </g>

            {/* ── 3. Front Origami Paper Folding & Handle Pleats ── */}
            <g filter="url(#softShadow)">
              {/* Front left lapel fold */}
              <path d="M 105 210 L 200 320 L 145 330 L 105 240 Z" fill="url(#paperGradInner)" stroke="#c084fc" strokeWidth="1.2" />
              {/* Front right lapel fold */}
              <path d="M 295 210 L 200 320 L 255 330 L 295 240 Z" fill="url(#paperGradInner)" stroke="#c084fc" strokeWidth="1.2" />

              {/* Lower fan pleats (Bouquet handle wrapping) */}
              <path d="M 160 350 L 140 410 L 260 410 L 240 350 Z" fill="url(#paperGradOuter)" stroke="#d8b4fe" strokeWidth="1.5" />
              <path d="M 175 350 L 165 410 M 200 350 L 200 410 M 225 350 L 235 410" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
            </g>

            {/* ── 4. Ribbon Bow & Heart Knot in Royal Purple ── */}
            <g transform="translate(200, 345)" filter="url(#softShadow)">
              {/* 4 Ribbon Tails hanging down */}
              <path d="M -12 12 L -42 68 L -24 64 L -5 12 Z" fill="url(#ribbonGradDark)" />
              <path d="M -4 12 L -20 72 L -5 66 L 2 12 Z" fill="url(#ribbonGradMain)" />
              <path d="M 12 12 L 42 68 L 24 64 L 5 12 Z" fill="url(#ribbonGradDark)" />
              <path d="M 4 12 L 20 72 L 5 66 L -2 12 Z" fill="url(#ribbonGradMain)" />

              {/* Bow Loops Left & Right */}
              <path d="M 0 -2 C -35 -30, -55 5, -8 4 Z" fill="url(#ribbonGradMain)" stroke="#6d28d9" strokeWidth="1.5" />
              <path d="M 0 -2 C -28 -20, -42 2, -6 3 Z" fill="#a855f7" opacity="0.5" />

              <path d="M 0 -2 C 35 -30, 55 5, 8 4 Z" fill="url(#ribbonGradMain)" stroke="#6d28d9" strokeWidth="1.5" />
              <path d="M 0 -2 C 28 -20, 42 2, 6 3 Z" fill="#a855f7" opacity="0.5" />

              {/* Center Bow Knot */}
              <rect x="-14" y="-8" width="28" height="20" rx="10" fill="url(#ribbonGradDark)" stroke="#4c1d95" strokeWidth="1.5" />

              {/* Small Heart in Knot Center (Exact match to reference photo!) */}
              <path d="M 0 -2 C -3 -6, -7 -3, -7 0 C -7 4, 0 8, 0 8 C 0 8, 7 4, 7 0 C 7 -3, 3 -6, 0 -2 Z" fill="#c084fc" />
            </g>

            {/* Bottom Caption Text */}
            <text
              x="200"
              y="436"
              textAnchor="middle"
              fill="#6b21a8"
              fontSize="14"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fontWeight="700"
            >
              Purple Handcrafted Bouquet 💜
            </text>

            {/* ── 5. The 6 Scalloped Flower Cards Layer ── */}
            {BOUQUET_FLOWERS.map((flower) => {
              const isOpen = openedFlowers.has(flower.id)
              const isHovered = hoveredFlower === flower.id

              // Generate 12 scallop bumps for perfect fluted border
              const scallopPoints = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

              return (
                <g
                  key={flower.id}
                  className={styles.svgFlowerGroup}
                  onMouseEnter={() => setHoveredFlower(flower.id)}
                  onMouseLeave={() => setHoveredFlower(null)}
                  onClick={() => handleFlowerClick(flower)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer Scalloped Border Ring */}
                  <g filter="url(#softShadow)">
                    {/* 12 Outer Scallop Bumps */}
                    {scallopPoints.map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180
                      const bx = flower.cx + 25 * Math.cos(rad)
                      const by = flower.cy + 25 * Math.sin(rad)
                      return (
                        <circle
                          key={idx}
                          cx={bx}
                          cy={by}
                          r={isHovered ? 8.5 : 7.5}
                          fill={flower.scallopColor}
                          style={{ transition: 'all 0.25s ease' }}
                        />
                      )
                    })}

                    {/* Scallop Base Disc */}
                    <circle
                      cx={flower.cx}
                      cy={flower.cy}
                      r={isHovered ? 29 : 26}
                      fill={flower.scallopColor}
                      style={{ transition: 'all 0.25s ease' }}
                    />

                    {/* White Inner Card Sheet */}
                    <circle
                      cx={flower.cx}
                      cy={flower.cy}
                      r={isHovered ? 23 : 20}
                      fill="#ffffff"
                      stroke={flower.scallopColor}
                      strokeWidth="1.2"
                      style={{ transition: 'all 0.25s ease' }}
                    />
                  </g>

                  {/* ── FLOWER ICON ARTWORK INSIDE CARD (Exact matches to reference image) ── */}

                  {/* 1. Top Center: Purple Rose/Tulip Dome Bud */}
                  {flower.type === 'top_purple' && (
                    <g transform={`translate(${flower.cx}, ${flower.cy}) scale(${isHovered ? 1.12 : 1})`}>
                      {/* Outer purple dome */}
                      <path d="M -12 4 C -14 -8, -6 -15, 0 -15 C 6 -15, 14 -8, 12 4 C 6 12, -6 12, -12 4 Z" fill="#7e22ce" />
                      {/* Inner purple petal curve */}
                      <path d="M -8 1 C -10 -7, -4 -11, 0 -11 C 4 -11, 10 -7, 8 1 C 4 7, -4 7, -8 1 Z" fill="#9333ea" />
                      <circle cx="0" cy="-3" r="4.5" fill="#c084fc" />
                      {/* Stem bulb bottom */}
                      <circle cx="0" cy="8" r="3" fill="#581c87" />
                    </g>
                  )}

                  {/* 2. Mid Left: Purple Peony/Rose Blossom */}
                  {flower.type === 'mid_left' && (
                    <g transform={`translate(${flower.cx}, ${flower.cy}) scale(${isHovered ? 1.12 : 1})`}>
                      <path d="M -13 2 C -15 -8, -6 -14, 0 -14 C 6 -14, 15 -8, 13 2 C 7 10, -7 10, -13 2 Z" fill="#9333ea" />
                      <path d="M -10 -1 C -12 -7, -4 -11, 0 -11 C 4 -11, 12 -7, 10 -1 C 5 6, -5 6, -10 -1 Z" fill="#a855f7" />
                      <path d="M -6 1 C -7 -3, -2 -7, 0 -7 C 2 -7, 7 -3, 6 1 C 3 4, -3 4, -6 1 Z" fill="#e9d5ff" />
                    </g>
                  )}

                  {/* 3. Mid Right: Crisp 5-Petal Purple Flower */}
                  {flower.type === 'mid_right' && (
                    <g transform={`translate(${flower.cx}, ${flower.cy}) scale(${isHovered ? 1.12 : 1})`}>
                      {[0, 72, 144, 216, 288].map((angle, i) => (
                        <g key={i} transform={`rotate(${angle})`}>
                          <path d="M 0 0 C -5 -8, -4 -14, 0 -14 C 4 -14, 5 -8, 0 0 Z" fill="#8b5cf6" />
                        </g>
                      ))}
                      <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="2.5" fill="#7c3aed" />
                    </g>
                  )}

                  {/* 4. Lower Left: Golden Sunburst Sunflower */}
                  {flower.type === 'sunflower' && (
                    <g transform={`translate(${flower.cx}, ${flower.cy}) scale(${isHovered ? 1.12 : 1})`}>
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                        <path
                          key={i}
                          d="M 0 0 C -2.5 -7, 0 -13, 0 -13 C 0 -13, 2.5 -7, 0 0 Z"
                          fill="#f59e0b"
                          transform={`rotate(${angle})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="7.5" fill="#7e22ce" stroke="#6b21a8" strokeWidth="1" />
                      <circle cx="0" cy="0" r="5" fill="#a855f7" />
                      <circle cx="0" cy="0" r="2.5" fill="#facc15" />
                    </g>
                  )}

                  {/* 5. Lower Right: Pink-Purple Cosmos Flower */}
                  {flower.type === 'pink_cosmos' && (
                    <g transform={`translate(${flower.cx}, ${flower.cy}) scale(${isHovered ? 1.12 : 1})`}>
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <g key={i} transform={`rotate(${angle})`}>
                          <path d="M 0 0 C -4.5 -8, -3.5 -14, 0 -14 C 3.5 -14, 4.5 -8, 0 0 Z" fill="#ec4899" />
                          <circle cx="0" cy="-8" r="1.5" fill="#fae8ff" />
                        </g>
                      ))}
                      <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#d946ef" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="2" fill="#d946ef" />
                    </g>
                  )}

                  {/* 6. Bottom Center: Vertical Lavender Stalk */}
                  {flower.type === 'lavender_stalk' && (
                    <g transform={`translate(${flower.cx}, ${flower.cy}) scale(${isHovered ? 1.12 : 1})`}>
                      <path d="M 0 11 L 0 -13" stroke="#581c87" strokeWidth="1.8" />
                      <circle cx="-3" cy="6" r="3" fill="#7c3aed" />
                      <circle cx="3" cy="6" r="3" fill="#8b5cf6" />
                      <circle cx="-3.5" cy="0" r="3" fill="#8b5cf6" />
                      <circle cx="3.5" cy="0" r="3" fill="#a855f7" />
                      <circle cx="-3" cy="-6" r="2.8" fill="#a855f7" />
                      <circle cx="3" cy="-6" r="2.8" fill="#c084fc" />
                      <circle cx="0" cy="-12" r="2.2" fill="#e9d5ff" />
                    </g>
                  )}

                  {/* Opened Heart Badge Indicator */}
                  {isOpen && (
                    <g transform={`translate(${flower.cx + 14}, ${flower.cy - 16})`}>
                      <circle cx="0" cy="0" r="9" fill="#7e22ce" stroke="#ffffff" strokeWidth="1.5" />
                      <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="9">
                        ♥
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </motion.div>

      {/* Flower Love Note Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              className={styles.modalCard}
              initial={{ scale: 0.8, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedFlower(null)}
                aria-label="Tutup pesan"
              >
                ✕
              </button>

              <div
                className={styles.modalHeaderIcon}
                style={{ background: `${selectedFlower.color}18`, color: selectedFlower.color }}
              >
                {selectedFlower.type === 'rose' && (
                  <svg width="48" height="48" viewBox="-25 -25 50 50">
                    <path d="M 0 14 C -22 4, -22 -16, 0 -20 C 22 -16, 22 4, 0 14 Z" fill="#6b21a8" />
                    <path d="M -14 2 C -20 -10, -7 -20, 0 -16 C 16 -16, 20 -4, 10 7 Z" fill="#7e22ce" />
                    <path d="M 14 2 C 20 -10, 7 -20, 0 -16 C -16 -16, -20 -4, -10 7 Z" fill="#9333ea" />
                    <circle cx="0" cy="-5" r="8" fill="#c084fc" />
                  </svg>
                )}
                {selectedFlower.type === 'tulip' && (
                  <svg width="48" height="48" viewBox="-25 -25 50 50">
                    <path d="M -16 8 C -20 -8, -9 -18, 0 -15 C 9 -18, 20 -8, 16 8 C 9 15, -9 15, -16 8 Z" fill="#7e22ce" />
                    <path d="M -14 5 C -18 -8, -4 -16, 0 -8 C -4 4, -10 10, -14 5 Z" fill="#9333ea" />
                    <path d="M 14 5 C 18 -8, 4 -16, 0 -8 C 4 4, 10 10, 14 5 Z" fill="#c084fc" />
                  </svg>
                )}
                {selectedFlower.type === 'sakura' && (
                  <svg width="48" height="48" viewBox="-25 -25 50 50">
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <g key={i} transform={`rotate(${angle})`}>
                        <path d="M 0 0 C -9 -13, -7 -22, 0 -21 C 7 -22, 9 -13, 0 0 Z" fill="#a855f7" />
                        <path d="M 0 0 C -5 -10, -3 -17, 0 -16 C 3 -17, 5 -10, 0 0 Z" fill="#f3e8ff" />
                      </g>
                    ))}
                    <circle cx="0" cy="0" r="5" fill="#6b21a8" />
                    <circle cx="0" cy="0" r="3" fill="#facc15" />
                  </svg>
                )}
                {selectedFlower.type === 'sunflower' && (
                  <svg width="48" height="48" viewBox="-25 -25 50 50">
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                      <path key={i} d="M 0 0 C -4 -10, 0 -20, 0 -20 C 0 -20, 4 -10, 0 0 Z" fill="#facc15" transform={`rotate(${angle})`} />
                    ))}
                    <circle cx="0" cy="0" r="10" fill="#581c87" />
                  </svg>
                )}
                {selectedFlower.type === 'lily' && (
                  <svg width="48" height="48" viewBox="-25 -25 50 50">
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <g key={i} transform={`rotate(${angle})`}>
                        <path d="M 0 0 C -8 -13, -5 -22, 0 -21 C 5 -22, 8 -13, 0 0 Z" fill="#d946ef" />
                        <path d="M 0 0 C -4 -9, -2 -16, 0 -15 C 2 -16, 4 -9, 0 0 Z" fill="#fae8ff" />
                      </g>
                    ))}
                  </svg>
                )}
                {selectedFlower.type === 'lavender' && (
                  <svg width="48" height="48" viewBox="-25 -25 50 50">
                    <path d="M 0 14 L 0 -18" stroke="#4c1d95" strokeWidth="2" />
                    <circle cx="-4" cy="8" r="4" fill="#a855f7" />
                    <circle cx="4" cy="8" r="4" fill="#8b5cf6" />
                    <circle cx="-5" cy="1" r="4" fill="#7c3aed" />
                    <circle cx="5" cy="1" r="4" fill="#a855f7" />
                  </svg>
                )}
              </div>

              <span className={styles.modalCategory}>{selectedFlower.name}</span>
              <h3 className={styles.modalTitle} style={{ color: selectedFlower.color }}>
                {selectedFlower.title}
              </h3>

              <div className={styles.modalBodyText}>
                <p>"{selectedFlower.message}"</p>
              </div>

              <div className={styles.modalFooter}>
                <span className={styles.heartPulse}>💜</span>
                <button
                  type="button"
                  className={styles.modalPrimaryBtn}
                  style={{ background: selectedFlower.color }}
                  onClick={() => setSelectedFlower(null)}
                >
                  Simpan Di Hati ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
