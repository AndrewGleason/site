import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

type HoverWordProps = {
  text: string
  onTrigger: () => void
  disabled: boolean
}

function HoverWord({ text, onTrigger, disabled }: HoverWordProps) {
  const isMobile = useIsMobile()

  return (
    <span
      className={`border-b border-dashed border-neutral-400 dark:border-neutral-600 ${
        disabled ? 'opacity-50' : 'cursor-pointer'
      }`}
      onMouseEnter={!isMobile && !disabled ? onTrigger : undefined}
      onClick={isMobile && !disabled ? onTrigger : undefined}
    >
      {text}
    </span>
  )
}

type Particle = {
  id: number
  x: number
  y: number
}

function SkierAnimation({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [skierPos, setSkierPos] = useState({ x: window.innerWidth, y: -50 })

  useEffect(() => {
    let particleId = 0
    let animationId: number
    const distance = window.innerWidth + 100
    const duration = Math.max(distance / 0.5, 2500)
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const baseX = window.innerWidth * 0.8 - progress * (window.innerWidth + 100)
      const waveX = Math.sin(progress * Math.PI * 3) * 120
      const x = baseX + waveX
      const y = progress * (window.innerHeight + 100) - 50

      setSkierPos({ x, y })

      if (progress < 1) {
        setParticles((prev) => [
          ...prev.slice(-40),
          { id: particleId++, x: x + 20, y: y + 20 },
          { id: particleId++, x: x + 30, y: y + 15 },
          { id: particleId++, x: x + 10, y: y + 25 },
        ])
        animationId = requestAnimationFrame(animate)
      } else {
        setTimeout(onComplete, 500)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.7, scale: 1, x: particle.x, y: particle.y }}
          animate={{
            opacity: 0,
            scale: 2.5,
            x: particle.x + Math.random() * 60 - 30,
            y: particle.y - Math.random() * 40,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-200"
        />
      ))}

      <div
        className="absolute text-4xl"
        style={{ left: skierPos.x, top: skierPos.y, transform: 'scaleX(1)' }}
      >
        ⛷️
      </div>
    </div>
  )
}

export default function About() {
  const [showSkier, setShowSkier] = useState(false)

  const triggerSkier = useCallback(() => setShowSkier(true), [])
  const handleComplete = useCallback(() => setShowSkier(false), [])

  return (
    <>
      <AnimatePresence>
        {showSkier && <SkierAnimation onComplete={handleComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-2xl font-medium tracking-tight mb-6">about.</h1>
        <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            I'm Andrew, a generalist software engineer based in New York. I work
            on distributed systems and APIs, with a focus on clarity,
            reliability, and keeping systems simple as they evolve.
          </p>
          <p>
            Outside of work, I'm into food,{' '}
            <HoverWord text="skiing" onTrigger={triggerSkier} disabled={showSkier} />,
            travel, hiking, running, live music, skincare, global trade and
            second order effects. I like things that are well-made and
            thoughtfully designed.
          </p>
        </div>
      </motion.div>
    </>
  )
}