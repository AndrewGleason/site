import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Menu() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) return saved === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const navItems = [
    { path: '/about', label: 'about.' },
    { path: '/contact', label: 'contact.' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-xl z-50 border-b border-neutral-200/50 dark:border-neutral-800/50">
      <Link 
        to="/" 
        className="hover:opacity-60 transition-opacity"
        >
        <img 
            src={import.meta.env.BASE_URL + (darkMode ? 'ghost-light.png' : 'ghost-dark.png')} 
            alt="Home" 
            className="w-8 h-8"
        />
      </Link>

      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="relative text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
          >
            {item.label}
            {location.pathname === item.path && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-100"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Menu