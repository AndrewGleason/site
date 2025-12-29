import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

type Particle = {
  id: number
  x: number
  y: number
}

export function SkierAnimation({ onComplete }: { onComplete: () => void }) {
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

