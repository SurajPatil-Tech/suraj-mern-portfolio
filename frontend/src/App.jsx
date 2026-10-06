import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import FooterNav from './components/FooterNav'
import Home from './components/sections/Home'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Certificates from './components/sections/Certificates'
import Contact from './components/sections/Contact'
import ThankYou from './components/sections/ThankYou'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    AOS.init({ duration: 650, once: true, offset: 35 })
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <main className="site-shell">
      <Navbar />
      <div className="sections">
        <Home />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
        <ThankYou />
      </div>
      <FooterNav theme={theme} toggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} />
    </main>
  )
}
