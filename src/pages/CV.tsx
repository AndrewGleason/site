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

        {/* Mobile: download prompt */}
        <div className="flex md:hidden flex-col items-center gap-4 py-12 px-6 border border-neutral-200 dark:border-neutral-800 rounded-xl text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-10 h-10 text-neutral-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p className="text-neutral-600 dark:text-neutral-400">
            Download to view the full CV
          </p>
          <a
            href={pdfUrl}
            download
            className="text-base font-medium px-8 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors"
          >
            Download PDF
          </a>
        </div>

        {/* Desktop: PDF embed */}
        <div className="hidden md:block w-full aspect-[8.5/11] rounded-xl overflow-hidden shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
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