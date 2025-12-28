import { motion } from 'framer-motion'

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-2xl"
    >
      <h1 className="text-2xl font-medium tracking-tight mb-6">About</h1>
      <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <p>
          I’m Andrew, a generalist software engineer based in New York. I work on distributed systems and APIs, with a focus on clarity, reliability, and sytems that hold up over time.
        </p>
        <p>
          Outside of work, I’m into food, skiing, travel, hiking, running, live music, and design. I like things that are well-made and thoughtfully designed.
        </p>
      </div>
    </motion.div>
  )
}

export default About