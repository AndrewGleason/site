import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Menu from './components/Menu'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <Menu />
        <main className="min-h-screen flex items-center justify-center pt-16 px-6 pb-6">
          <AnimatedRoutes />
        </main>
      </div>
    </HashRouter>
  )
}

export default App