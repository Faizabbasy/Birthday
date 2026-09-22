import { motion } from 'framer-motion'
import { useMusic } from '../../context/MusicContext'
import styles from './MusicPlayer.module.css'

/**
 * MusicPlayer — Compact elegant audio player for the birthday song.
 * Uses global MusicContext with scrubbable progress bar, time formatting,
 * and spinning vinyl album artwork when playing.
 */

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function MusicPlayer() {
  const {
    song,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    togglePlay,
    seek,
    toggleMute,
  } = useMusic()

  const {
    title = 'Rearrange My World',
    artist = 'Daniel Caesar, Rex Orange County',
    cover = null,
  } = song || {}

  // Handle progress bar scrubbing
  const handleSeek = (e) => {
    seek(parseFloat(e.target.value))
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section className={styles.playerSection} aria-label="Music Player">
      {/* Header section */}
      <div className={styles.header}>
        <span className={styles.headerBadge}>🎵 For You</span>
        <h2 className={styles.heading}>Song For You</h2>
        <p className={styles.subtitle}>A little song for a little moment.</p>
      </div>

      {/* Main player card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Soft background glow */}
        <div className={styles.cardGlow} aria-hidden="true" />

        <div className={styles.playerContent}>
          {/* Vinyl / Cover Artwork */}
          <div className={styles.artWrapper}>
            <div
              className={`${styles.vinyl} ${isPlaying ? styles.vinylSpinning : ''}`}
              aria-hidden="true"
            >
              {cover ? (
                <img src={cover} alt={title} className={styles.coverImg} />
              ) : (
                <div className={styles.defaultVinyl}>
                  <span className={styles.vinylGrooves} />
                  <span className={styles.vinylLabel}>
                    <span className={styles.labelIcon}>🌸</span>
                  </span>
                </div>
              )}
            </div>
            {/* Tone arm accent */}
            <div className={`${styles.toneArm} ${isPlaying ? styles.toneArmActive : ''}`} aria-hidden="true" />
          </div>

          {/* Details & Controls */}
          <div className={styles.infoWrapper}>
            {/* Track Info */}
            <div className={styles.trackDetails}>
              <h3 className={styles.songTitle}>{title}</h3>
              <p className={styles.songArtist}>{artist}</p>
            </div>

            {/* Scrubber & Duration */}
            <div className={styles.scrubberContainer}>
              <div className={styles.rangeWrapper}>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className={styles.rangeInput}
                  aria-label="Song progress scrubber"
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

            {/* Play/Pause & Mute Bar */}
            <div className={styles.controlsRow}>
              {/* Mute button */}
              <button
                type="button"
                className={styles.iconBtn}
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
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
                aria-label={isPlaying ? 'Pause song' : 'Play song'}
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

              {/* Decorative music note */}
              <span className={styles.musicNote} aria-hidden="true">
                {isPlaying ? '🎶' : '🎵'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
