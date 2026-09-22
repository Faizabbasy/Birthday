import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Button.module.css'

/**
 * Button — reusable button / link component
 *
 * Props:
 *   variant   — 'primary' | 'secondary' | 'ghost'   (default: 'primary')
 *   size      — 'sm' | 'md' | 'lg'                  (default: 'md')
 *   to        — internal React Router path (renders as <Link>)
 *   href      — external URL (renders as <a>)
 *   icon      — optional leading icon node
 *   iconEnd   — optional trailing icon node
 *   disabled  — boolean
 *   className — extra class names
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size    = 'md',
    to,
    href,
    icon,
    iconEnd,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
    ...rest
  },
  ref
) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon    && <span className={styles.icon}    aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {iconEnd && <span className={styles.iconEnd} aria-hidden="true">{iconEnd}</span>}
    </>
  )

  const motionProps = {
    whileHover: disabled ? {} : { y: -2, scale: 1.02 },
    whileTap:   disabled ? {} : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  }

  if (to) {
    return (
      <motion.div {...motionProps} style={{ display: 'inline-flex' }}>
        <Link to={to} ref={ref} className={classes} {...rest}>
          {content}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div {...motionProps} style={{ display: 'inline-flex' }}>
        {/* External links open in new tab with rel for security */}
        <a
          href={href}
          ref={ref}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {content}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
      {...rest}
    >
      {content}
    </motion.button>
  )
})

export default Button
