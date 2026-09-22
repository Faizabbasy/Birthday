import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../../context/MusicContext'
import styles from './MusicSidebar.module.css'

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function MusicSidebar() {
  const {
    song,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    isSidebarOpen,
    togglePlay,
    seek,
    toggleMute,
    toggleSidebar,
  } = useMusic()

  const { title = 'Rearrange My World', artist = 'Daniel Caesar, Rex Orange County', cover } = song || {}

  const handleSeek = (e) => {
    seek(parseFloat(e.target.value))
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={styles.sidebarWrapper} aria-label="Music Sidebar Controls">
      <AnimatePresence mode="wait">
        {!isSidebarOpen ? (
          /* Floating Collapsed Edge Tab Handle */
          <motion.button
            key="tab"
            type="button"
            className={styles.toggleTab}
            onClick={toggleSidebar}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open music controls"
          >
            <span className={`${styles.tabIcon} ${isPlaying ? styles.vinylSpin : ''}`}>
              {isPlaying ? '🎶' : '🎵'}
            </span>
            <span className={styles.tabLabel}>
              {isPlaying ? 'Now Playing' : 'Music Player'}
            </span>
            <span className={styles.tabChevron}>›</span>
          </motion.button>
        ) : (
          /* Main Expanded Sidebar Card */
          <motion.div
            key="card"
            className={styles.sidebarCard}
            initial={{ opacity: 0, x: -100, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            drag="x"
            dragConstraints={{ left: -100, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              // Swipe left to dismiss/collapse
              if (info.offset.x < -40 || info.velocity.x < -200) {
                toggleSidebar()
              }
            }}
          >
            {/* Background ambient glow */}
            <div className={styles.cardGlow} aria-hidden="true" />

            {/* Header: Badge & Close Button */}
            <div className={styles.cardHeader}>
              <span className={styles.headerBadge}>
                {isPlaying ? '🎶 Now Playing' : '🎵 Music'}
              </span>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={toggleSidebar}
                aria-label="Collapse music player"
                title="Sembunyikan"
              >
                ‹
              </button>
            </div>

            {/* Body: Artwork & Details */}
            <div className={styles.cardBody}>
              <div className={`${styles.vinylArt} ${isPlaying ? styles.vinylSpin : ''}`}>
                {cover ? (
                  <img src={cover} alt={title} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  <div className={styles.vinylCenter}>
                    🌸
                  </div>
                )}
              </div>
              <div className={styles.trackInfo}>
                <h4 className={styles.trackTitle} title={title}>{title}</h4>
                <p className={styles.trackArtist} title={artist}>{artist}</p>
              </div>
            </div>

            {/* Scrubber section */}
            <div className={styles.scrubberSection}>
              <div className={styles.rangeWrapper}>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className={styles.rangeInput}
                  aria-label="Music progress"
                />
                <div
                  className={styles.rangeFill}
                  style={{ width: `${progressPercent}%` }}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.timeRow}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className={styles.controlsRow}>
              {/* Mute button */}
              <button
                type="button"
                className={styles.iconBtn}
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              {/* Main Play / Pause Button */}
              <motion.button
                type="button"
                className={styles.playBtn}
                onClick={togglePlay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ marginLeft: '2px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>

              {/* Toggle Sidebar Collapse Button */}
              <button
                type="button"
                className={styles.iconBtn}
                onClick={toggleSidebar}
                aria-label="Collapse sidebar"
                title="Tutup Sidebar"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
