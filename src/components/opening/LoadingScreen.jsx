import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

const dotVariants = {
  animate: (i) => ({
    opacity: [0.2, 1, 0.2],
    y: [0, -6, 0],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.18,
    },
  }),
}

export default function LoadingScreen() {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      aria-label="Loading"
      role="status"
    >
      {/* Subtle ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Center content */}
      <div className={styles.content}>
        {/* Delicate flower icon */}
        <motion.span
          className={styles.icon}
          aria-hidden="true"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          🌸
        </motion.span>

        {/* Loading text */}
        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Preparing something special
          <span className={styles.ellipsis} aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={styles.dot}
                custom={i}
                variants={dotVariants}
                animate="animate"
              >
                .
              </motion.span>
            ))}
          </span>
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className={styles.progressBar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{ originX: 0 }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  )
}
