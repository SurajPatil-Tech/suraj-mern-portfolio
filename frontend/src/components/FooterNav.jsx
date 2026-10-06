import { Home, UserRound, Code2, FolderKanban, Award, Mail, Sun, Moon } from 'lucide-react'
const items = [
  ['Home', Home], ['About', UserRound], ['Skills', Code2],
  ['Projects', FolderKanban], ['Certificates', Award], ['Contact', Mail]
]
export default function FooterNav({ theme, toggleTheme }) {
  return <div className="bottom-wrap">
    <nav className="bottom-nav" aria-label="Section navigation">
      {items.map(([label, Icon]) => <a key={label} href={`#${label.toLowerCase()}`}><Icon size={17}/><span>{label}</span></a>)}
    </nav>
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}</button>
  </div>
}