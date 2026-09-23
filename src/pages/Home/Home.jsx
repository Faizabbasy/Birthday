import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from '../../components/opening/LoadingScreen'
import PinModal from '../../components/opening/PinModal'
import GiftBox from '../../components/opening/GiftBox'
import BirthdayMessage from '../../components/opening/BirthdayMessage'
import { birthdayData } from '../../data/birthdayData'
import styles from './Home.module.css'

/**
 * Home page — Opening Experience
 * Flow: Loading → PIN Verification → GiftBox → BirthdayMessage
 */
export default function Home() {
  // 'loading' | 'pin' | 'gift' | 'message'
  const [phase, setPhase] = useState('loading')

  // After loading animation completes, move to pin verification phase
  useEffect(() => {
    const timer = setTimeout(() => setPhase('pin'), 2200)
    return () => clearTimeout(timer)
  }, [])

  const handlePinSuccess = () => {
    setPhase('gift')
  }

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

        {phase === 'pin' && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
          >
            <PinModal onSuccess={handlePinSuccess} />
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

