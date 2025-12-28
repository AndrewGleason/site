import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function Home() {
  const inputX = useMotionValue(0)
  const inputY = useMotionValue(0)

  const x = useSpring(inputX, { damping: 30, stiffness: 150 })
  const y = useSpring(inputY, { damping: 30, stiffness: 150 })

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      inputX.set((e.clientX / window.innerWidth) - 0.5)
      inputY.set((e.clientY / window.innerHeight) - 0.5)
    }

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        inputX.set((touch.clientX / window.innerWidth) - 0.5)
        inputY.set((touch.clientY / window.innerHeight) - 0.5)
      }
    }

    const handleTouchEnd = () => {
      inputX.set(0)
      inputY.set(0)
    }

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('touchmove', handleTouch)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [inputX, inputY])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12 text-right"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
          andrew gleason
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 tracking-wide">
          new york | sf
        </p>
      </motion.div>
    </motion.div>
  )
}