import { motion } from 'framer-motion'

function Contact() {
  const handleEmailClick = () => {
    const user = 'agleasontu'
    const domain = 'gmail.com'
    window.open(`mailto:${user}@${domain}`, '_blank')
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-8"
    >
      <h1 className="text-2xl font-medium tracking-tight">Contact</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleEmailClick}
          className="flex items-center gap-3 text-base font-medium px-8 py-4 border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Email
        </button>

        <a
          href="https://www.linkedin.com/in/andrew-gleason/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-base font-medium px-8 py-4 border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </motion.div>
  )
}

export default Contact