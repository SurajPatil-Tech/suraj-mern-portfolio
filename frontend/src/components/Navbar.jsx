import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact']
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="navbar">
    <a className="brand" href="#home" aria-label="Suraj Patil home">S<span>P</span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
    </nav>
    <a className="nav-cta" href="#contact">Let’s Talk <ArrowUpRight size={13}/></a>
  </header>
}