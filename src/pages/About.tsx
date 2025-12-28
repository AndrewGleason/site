import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

type HoverWordProps = {
  text: string
  onHover?: () => void
}

function HoverWord({ text, onHover }: HoverWordProps) {
  return (
    <span
      className="border-b border-dashed border-neutral-400 dark:border-neutral-600 cursor-default"
      onMouseEnter={onHover}
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
    const speed = 0.5 // pixels per millisecond
    const distance = window.innerWidth + 100
    const calculatedDuration = distance / speed
    const duration = Math.max(calculatedDuration, 3000)
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
        requestAnimationFrame(animate)
      } else {
        setTimeout(onComplete, 500)
      }
    }
  
    requestAnimationFrame(animate)
  }, [onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Powder particles */}
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

      {/* Skier */}
      <div
        className="absolute text-4xl"
        style={{
          left: skierPos.x,
          top: skierPos.y,
          transform: 'scaleX(1)',
        }}
      >
        ⛷️
      </div>
    </div>
  )
}

export default function About() {
  const [showSkier, setShowSkier] = useState(false)

  return (
    <>
      <AnimatePresence>
        {showSkier && <SkierAnimation onComplete={() => setShowSkier(false)} />}
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
            reliability, and systems that hold up over time.
          </p>
          <p>
            Outside of work, I'm into food,{' '}
            <HoverWord text="skiing" onHover={() => setShowSkier(true)} />,
            travel, hiking, running, live music, skincare, global trade and
            second order effects. I like things that are well-made and
            thoughtfully designed.
          </p>
        </div>
      </motion.div>
    </>
  )
}