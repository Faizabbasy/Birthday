import { motion } from 'framer-motion'
import styles from './Card.module.css'

/**
 * Card — reusable content card
 *
 * Props:
 *   variant    — 'default' | 'cream' | 'pink' | 'elevated'
 *   padding    — 'sm' | 'md' | 'lg'
 *   hover      — boolean (enable lift on hover)
 *   className  — extra class names
 *   as         — HTML element to render (default: 'div')
 */
export default function Card({
  children,
  variant   = 'default',
  padding   = 'md',
  hover     = true,
  className = '',
  as: Tag   = 'div',
  ...rest
}) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`pad_${padding}`],
    hover ? styles.hoverable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div
      className={classes}
      whileHover={hover ? { y: -6, boxShadow: '0 12px 40px rgba(61,43,49,0.14)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ── Subcomponents ── */
Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>
}

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>
}

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`}>{children}</div>
}
