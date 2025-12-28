import { motion } from 'framer-motion'

function CV() {
  const pdfUrl = import.meta.env.BASE_URL + 'resume.pdf'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-4xl"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tight">CV</h1>
          <a
            href={pdfUrl}
            download
            className="text-sm font-medium px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors"
          >
            Download
          </a>
        </div>

        <div className="w-full aspect-[8.5/11] rounded-xl overflow-hidden shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
          <iframe
            src={pdfUrl}
            title="Resume"
            className="w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default CV