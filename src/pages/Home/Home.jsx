import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from '../../components/opening/LoadingScreen'
import GiftBox from '../../components/opening/GiftBox'
import BirthdayMessage from '../../components/opening/BirthdayMessage'
import { birthdayData } from '../../data/birthdayData'
import styles from './Home.module.css'

/**
 * Home page — Opening Experience
 * Flow: Loading → GiftBox → GiftOpening → BirthdayMessage
 */
export default function Home() {
  // 'loading' | 'gift' | 'message'
  const [phase, setPhase] = useState('loading')

  // After loading animation completes, move to gift phase
  useEffect(() => {
    const timer = setTimeout(() => setPhase('gift'), 2200)
    return () => clearTimeout(timer)
  }, [])

  const handleGiftOpen = () => {
    // Triggered when GiftBox finishes showing the flower burst animation
    setPhase('message')
  }

  return (
    <div className={styles.openingRoot} aria-label="Birthday opening experience">
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}>
            <LoadingScreen />
          </motion.div>
        )}

        {phase === 'gift' && (
          <motion.div
            key="gift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45 } }}
          >
            <GiftBox onOpen={handleGiftOpen} />
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
          >
            <BirthdayMessage data={birthdayData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
