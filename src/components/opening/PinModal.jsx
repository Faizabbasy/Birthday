import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import catJudgeImg from '../../assets/cat-judge.png'
import styles from './PinModal.module.css'

const CORRECT_PIN = '261026'

/**
 * PinModal — 6-Digit PIN Security Card Popup
 * Flow: After initial loading screen, user enters 6-digit PIN.
 * Correct PIN: "261026"
 * Hint: "hari tanggal ulang tahun kamu"
 * Wrong PIN: Displays judgmental cat image with humorous text and autofill option.
 */
export default function PinModal({ onSuccess }) {
  const [pin, setPin] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [shake, setShake] = useState(false)
  const [showHintTooltip, setShowHintTooltip] = useState(false)

  const inputRef = useRef(null)

  // Auto focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Auto validate when 6 digits are typed
  useEffect(() => {
    if (pin.length === 6 && !isSuccess && !showErrorModal) {
      verifyPin(pin)
    }
  }, [pin])

  const verifyPin = (enteredPin) => {
    if (enteredPin === CORRECT_PIN) {
      setIsSuccess(true)
      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 700)
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setShowErrorModal(true)
      }, 500)
    }
  }

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    setPin(val)
  }

  const handleKeyPadClick = (digit) => {
    if (isSuccess || showErrorModal) return
    if (pin.length < 6) {
      setPin((prev) => prev + digit)
    }
  }

  const handleBackspace = () => {
    if (isSuccess || showErrorModal) return
    setPin((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    if (isSuccess || showErrorModal) return
    setPin('')
    if (inputRef.current) inputRef.current.focus()
  }

  const handleUseCorrectPin = () => {
    setShowErrorModal(false)
    setPin(CORRECT_PIN)
    setIsSuccess(true)
    setTimeout(() => {
      if (onSuccess) onSuccess()
    }, 600)
  }

  const handleTryAgain = () => {
    setShowErrorModal(false)
    setPin('')
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 100)
  }

  return (
    <div className={styles.container}>
      {/* Background glow and subtle floating particles */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Main Glassmorphic PIN Card */}
      <motion.div
        className={`${styles.card} ${shake ? styles.shakeAnimation : ''} ${
          isSuccess ? styles.successCard : ''
        }`}
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {/* Hidden native input for soft/hard keyboard */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={pin}
          onChange={handleInputChange}
          className={styles.hiddenInput}
          autoComplete="off"
          aria-label="Enter 6 digit PIN"
        />

        {/* Card Header Icon & Badge */}
        <div className={styles.header}>
          <motion.div
            className={styles.lockBadge}
            animate={isSuccess ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {isSuccess ? '✨' : '🔒'}
          </motion.div>
          <h2 className={styles.title}>
            {isSuccess ? 'Akses Diterima!' : 'Masukan PIN Rahasia'}
          </h2>
          <p className={styles.subtitle}>
            {isSuccess
              ? 'Membuka kejutan spesial untukmu...'
              : 'Verifikasi keamanan khusus 6-digit'}
          </p>
        </div>

        {/* Hint Box */}
        <div className={styles.hintContainer}>
          <button
            type="button"
            className={styles.hintButton}
            onClick={(e) => {
              e.stopPropagation()
              setShowHintTooltip((prev) => !prev)
            }}
          >
            <span className={styles.hintIcon}>💡</span>
            <span className={styles.hintLabel}>Hint PIN:</span>
            <span className={styles.hintText}>hari tanggal ulang tahun kamu</span>
          </button>
        </div>

        {/* 6 Digit Display Boxes */}
        <div className={styles.digitSlots}>
          {Array.from({ length: 6 }).map((_, idx) => {
            const digit = pin[idx]
            const isFilled = digit !== undefined
            const isActive = idx === pin.length && !isSuccess

            return (
              <motion.div
                key={idx}
                className={`${styles.digitSlot} ${isFilled ? styles.slotFilled : ''} ${
                  isActive ? styles.slotActive : ''
                } ${isSuccess ? styles.slotSuccess : ''}`}
                animate={isFilled ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {isFilled ? (
                  <span className={styles.digitChar}>{digit}</span>
                ) : (
                  isActive && <span className={styles.cursorPulse} />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Custom On-Screen Keypad for Mobile & Touch */}
        <div className={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              className={styles.keyBtn}
              onClick={(e) => {
                e.stopPropagation()
                handleKeyPadClick(num)
              }}
              disabled={isSuccess || showErrorModal}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className={`${styles.keyBtn} ${styles.actionKey}`}
            onClick={(e) => {
              e.stopPropagation()
              handleClear()
            }}
            disabled={isSuccess || showErrorModal}
            title="Hapus Semua"
          >
            C
          </button>
          <button
            type="button"
            className={styles.keyBtn}
            onClick={(e) => {
              e.stopPropagation()
              handleKeyPadClick('0')
            }}
            disabled={isSuccess || showErrorModal}
          >
            0
          </button>
          <button
            type="button"
            className={`${styles.keyBtn} ${styles.actionKey}`}
            onClick={(e) => {
              e.stopPropagation()
              handleBackspace()
            }}
            disabled={isSuccess || showErrorModal}
            title="Hapus Digit"
          >
            ⌫
          </button>
        </div>
      </motion.div>

      {/* ── Judgmental Cat Wrong PIN Modal ── */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.catModalCard}
              initial={{ scale: 0.75, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            >
              <div className={styles.catImageWrapper}>
                <img
                  src={catJudgeImg}
                  alt="Kucing Sinis"
                  className={styles.catImage}
                />
                <div className={styles.catBadge}>😾 Hmmm...</div>
              </div>

              <div className={styles.catContent}>
                <p className={styles.catText}>
                  kok gatau tanggal lahir kamu sendiri! yauda ini pinnya &quot;261026&quot;
                </p>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.autoFillBtn}
                    onClick={handleUseCorrectPin}
                  >
                    ✨ Gunakan PIN &quot;261026&quot; &amp; Masuk
                  </button>
                  <button
                    type="button"
                    className={styles.retryBtn}
                    onClick={handleTryAgain}
                  >
                    Coba Ketik Lagi
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
