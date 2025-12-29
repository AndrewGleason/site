import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void
  }
}

const pageTitles: Record<string, string> = {
  '/': 'apg.',
  '/about': 'apg. | about.',
  '/contact': 'apg. | contact.',
}

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'apg.'
    document.title = title

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.hash,
        page_title: title,
      })
    }
  }, [location])
}
