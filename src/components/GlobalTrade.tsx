import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalTradeAnimationProps {
  onComplete: () => void;
  onMeltStart?: () => void; // Callback when melt effect should begin
  dockY?: number; // Y position to dock at (defaults to 60)
  dockX?: number; // X position to dock at (defaults to 0)
}

/**
 * Global Trade Animation
 * 
 * A cargo ship sails in from the right, "docks" at the about section,
 * then triggers a melt effect on related interests (food, travel, skincare).
 * 
 * The ship uses a wave motion while traveling, then settles when docked.
 */
export function GlobalTradeAnimation({ onComplete, onMeltStart, dockY = 60, dockX = 0 }: GlobalTradeAnimationProps) {
  const [shipPosition, setShipPosition] = useState({ x: window.innerWidth + 100, y: dockY });
  const [isDocked, setIsDocked] = useState(false);
  const [containers, setContainers] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [wakeParticles, setWakeParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let animationFrame: number;
    let particleId = 0;
    
    const startTime = Date.now();
    const journeyDuration = 3000; // 3 seconds to cross
    const startX = window.innerWidth + 100;
    const endX = dockX; // Dock position
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / journeyDuration, 1);
      
      // Easing function for smooth deceleration as it docks
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      // Ship position with bobbing motion
      const x = startX - (startX - endX) * easeOutCubic;
      const bobAmount = progress < 0.9 ? Math.sin(elapsed * 0.005) * 8 : Math.sin(elapsed * 0.002) * 2;
      const y = dockY + bobAmount;
      
      setShipPosition({ x, y });
      
      // Generate wake particles while moving
      if (progress < 0.95 && elapsed % 80 < 16) {
        setWakeParticles(prev => [
          ...prev.slice(-20),
          { id: particleId++, x: x + 60, y: y + 25 },
          { id: particleId++, x: x + 70, y: y + 30 },
        ]);
      }
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Ship has docked
        setIsDocked(true);
        
        // Generate falling containers
        const newContainers = [
          { id: 1, x: x + 10, y: y + 10, delay: 0.2 },
          { id: 2, x: x + 25, y: y + 5, delay: 0.4 },
          { id: 3, x: x + 40, y: y + 8, delay: 0.6 },
        ];
        setContainers(newContainers);
        
        // Trigger melt effect after containers fall
        setTimeout(() => {
          onMeltStart?.();
        }, 800);
        
        // Complete animation after melt
        setTimeout(() => {
          onComplete();
        }, 3500);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [dockX, dockY, onComplete, onMeltStart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Ocean horizon line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 dark:via-blue-600 to-transparent"
        style={{ top: shipPosition.y + 35 }}
      />
      
      {/* Wake particles */}
      {wakeParticles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.6, scale: 0.5, x: particle.x, y: particle.y }}
          animate={{ 
            opacity: 0, 
            scale: 2, 
            x: particle.x + 40,
            y: particle.y + Math.random() * 10 - 5 
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-2 h-1 rounded-full bg-blue-300/50 dark:bg-blue-400/30"
        />
      ))}
      
      {/* Cargo Ship */}
      <motion.div
        className="absolute text-4xl"
        style={{ 
          left: shipPosition.x, 
          top: shipPosition.y,
          filter: isDocked ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
        }}
        animate={{
          rotate: isDocked ? 0 : [0, -2, 0, 2, 0],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        🚢
      </motion.div>
      
      {/* Falling containers when docked */}
      <AnimatePresence>
        {isDocked && containers.map(container => (
          <motion.div
            key={container.id}
            initial={{ 
              x: container.x, 
              y: container.y, 
              opacity: 1, 
              scale: 0.8,
              rotate: 0 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: Math.random() * 360 - 180,
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 2,
              delay: container.delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute text-xl"
          >
            📦
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Dock indicator */}
      {isDocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute text-xs font-medium tracking-wider text-neutral-400 dark:text-neutral-500"
          style={{ left: shipPosition.x - 10, top: shipPosition.y + 50 }}
        >
        </motion.div>
      )}
    </div>
  );
}

/**
 * MeltingText Component
 * 
 * Text that "melts away" with a liquid dissolve effect.
 * Used for food, travel, skincare when global trade animation triggers.
 */
interface MeltingTextProps {
  children: React.ReactNode;
  shouldMelt: boolean;
  delay?: number;
}

export function MeltingText({ children, shouldMelt, delay = 0 }: MeltingTextProps) {
  return (
    <motion.span
      className="inline-block relative"
      animate={shouldMelt ? {
        opacity: [1, 1, 0],
        y: [0, 0, 20],
        filter: ['blur(0px)', 'blur(0px)', 'blur(6px)'],
        scale: [1, 1.5, 0.3],
      } : {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
      }}
      transition={{
        duration: shouldMelt ? 2.1 : 0.6,
        delay: shouldMelt ? delay : 0,
        times: shouldMelt ? [0, 0.3, 1] : undefined,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ transformOrigin: 'center center' }}
    >
      {children}
      
      {/* Drip effect */}
      {shouldMelt && (
        <>
          <motion.span
            className="absolute left-1/4 top-full w-0.5 bg-current rounded-full"
            initial={{ height: 0, opacity: 0.6 }}
            animate={{ height: 15, opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
          />
          <motion.span
            className="absolute left-2/3 top-full w-0.5 bg-current rounded-full"
            initial={{ height: 0, opacity: 0.6 }}
            animate={{ height: 20, opacity: 0, y: 15 }}
            transition={{ duration: 1, delay: delay + 0.5 }}
          />
        </>
      )}
    </motion.span>
  );
}

/**
 * InteractiveTradeText Component
 * 
 * The clickable/hoverable "global trade and second order effects" text
 * that triggers the animation.
 */
interface InteractiveTradeTextProps {
  text: string;
  onTrigger: () => void;
  disabled: boolean;
}

export function InteractiveTradeText({ text, onTrigger, disabled }: InteractiveTradeTextProps) {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const checkTouch = () => setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);
  
  return (
    <span
      className={`
        border-b border-dashed border-neutral-400 dark:border-neutral-600
        ${disabled ? 'opacity-50' : 'cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors'}
      `}
      onMouseEnter={!isTouch && !disabled ? onTrigger : undefined}
      onClick={isTouch && !disabled ? onTrigger : undefined}
    >
      {text}
    </span>
  );
}

export default GlobalTradeAnimation;