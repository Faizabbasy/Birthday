import { createContext, useContext, useState, useRef } from 'react'
import birthdayData from '../data/birthdayData'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  
  const [song, setSong] = useState(birthdayData.song)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Handle Play / Pause Toggle
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsSidebarOpen(true) // Automatically pop out sidebar on play
        })
        .catch((err) => {
          console.warn('Audio playback delayed or blocked:', err)
          setIsPlaying(false)
        })
    }
  }

  const play = () => {
    if (!audioRef.current) return
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
        setIsSidebarOpen(true)
      })
      .catch((err) => {
        console.warn('Audio play error:', err)
      })
  }

  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const seek = (time) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  return (
    <MusicContext.Provider
      value={{
        song,
        setSong,
        isPlaying,
        currentTime,
        duration,
        isMuted,
        isSidebarOpen,
        setIsSidebarOpen,
        togglePlay,
        play,
        pause,
        seek,
        toggleMute,
        toggleSidebar,
      }}
    >
      {/* Global HTML Audio Element */}
      <audio
        ref={audioRef}
        src={song?.src || '/assets/song.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
