import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12 text-right"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
        Andrew Gleason
      </h1>
      <p className="mt-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 tracking-wide">
        New York | SF
      </p>
    </motion.div>
  )
}

export default Home