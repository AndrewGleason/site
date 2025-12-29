import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { SkierAnimation } from '../components/SkierAnimation'
import { 
    GlobalTradeAnimation, 
    MeltingText, 
    InteractiveTradeText 
  } from '../components/GlobalTrade';

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

export default function About() {
  const headingRef = useRef<HTMLSpanElement>(null)
  const [showSkier, setShowSkier] = useState(false)
  const [isTradeAnimating, setIsTradeAnimating] = useState(false);
  const [isMelting, setIsMelting] = useState(false);

  const triggerSkier = useCallback(() => {
    if (!isTradeAnimating) setShowSkier(true)
  }, [isTradeAnimating])
  const handleComplete = useCallback(() => setShowSkier(false), [])
  
  const startTradeAnimation = useCallback(() => {
    if (!showSkier) setIsTradeAnimating(true);
  }, [showSkier]);
  
  const handleMeltStart = useCallback(() => {
    setIsMelting(true);
  }, []);
  
  const handleTradeComplete = useCallback(() => {
    setIsTradeAnimating(false);
    // Reset melt after 10 seconds
    setTimeout(() => setIsMelting(false), 10000);
  }, []);


  return (
    <>
      <AnimatePresence>
        {showSkier && <SkierAnimation onComplete={handleComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {isTradeAnimating && (
          <GlobalTradeAnimation 
            onComplete={handleTradeComplete}
            onMeltStart={handleMeltStart}
            dockY={headingRef.current?.getBoundingClientRect().top ?? 60}
            dockX={headingRef.current?.getBoundingClientRect().right ?? 0}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-2xl font-medium tracking-tight mb-6"><span ref={headingRef}>about.</span></h1>
        <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            I'm Andrew, a generalist software engineer based in New York. I work
            on distributed systems and APIs, with a focus on clarity,
            reliability, and keeping systems simple as they evolve.
          </p>
          <p>
            Outside of work, I'm into <MeltingText shouldMelt={isMelting} delay={0}>
              food
            </MeltingText>,{' '}
            <HoverWord text="skiing" onTrigger={triggerSkier} disabled={showSkier} />,
            travel, hiking, running, live music, skincare, <InteractiveTradeText text="global trade and
            second order effects" onTrigger={startTradeAnimation} disabled={isTradeAnimating} />.
             I like things that are well-made and
            thoughtfully designed.
          </p>
        </div>
      </motion.div>
    </>
  )
}