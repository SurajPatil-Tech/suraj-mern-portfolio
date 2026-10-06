import { Github, Linkedin, Mail, Code2 } from 'lucide-react'
import { profile } from '../../data/portfolio'

export default function SocialLinks() {
  return <div className="socials">
    <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>
    <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
    <a href="mailto:surajpatil@gmail.com" aria-label="Email"><Mail/></a>
    <a href="https://github.com/SurajPatil-Tech" target="_blank" rel="noreferrer" aria-label="Portfolio"><Code2/></a>
  </div>
}
