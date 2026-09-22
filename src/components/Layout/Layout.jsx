import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import MusicSidebar from '../music/MusicSidebar'
import styles from './Layout.module.css'

const pageVariants = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  exit:     { opacity: 0, y: -8,  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.pageWrapper}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating Collapsible Music Sidebar Popup */}
      <MusicSidebar />

      {/* Subtle ambient decorations */}
      <div className={styles.ambientBlob1} aria-hidden="true" />
      <div className={styles.ambientBlob2} aria-hidden="true" />
    </div>
  )
}

