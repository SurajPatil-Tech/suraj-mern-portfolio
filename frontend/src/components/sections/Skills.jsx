import {
  Monitor,
  Server,
  Database,
  CreditCard,
  Wrench,
  Code2,
  Palette,
  Braces,
  Atom,
  Layers,
  Wind,
  Route,
  Send,
  Zap,
  Terminal,
  ShieldCheck,
  KeyRound,
  FileCode2,
  LockKeyhole,
  HardDrive,
  Cloud,
  GitBranch,
  Github,
  SendHorizontal,
  CodeXml,
  Globe,
} from 'lucide-react'

import { useState } from 'react'
import SectionTitle from '../SectionTitle'

export default function Skills() {
  const categories = [
    {
      id: 'frontend',
      title: 'Frontend',
      subtitle: 'UI & Web',
      icon: Monitor,
      skills: [
        { name: 'HTML5', icon: Code2 },
        { name: 'CSS3', icon: Palette },
        { name: 'JavaScript', icon: Braces },
        { name: 'React.js', icon: Atom },
        { name: 'Redux', icon: Layers },
        { name: 'Tailwind CSS', icon: Wind },
        { name: 'React Router', icon: Route },
        { name: 'Axios', icon: Send },
        { name: 'Vite', icon: Zap },
      ],
    },

    {
      id: 'backend',
      title: 'Backend',
      subtitle: 'Server & APIs',
      icon: Server,
      skills: [
        { name: 'Node.js', icon: Terminal },
        { name: 'Express.js', icon: Server },
        { name: 'REST APIs', icon: Globe },
        { name: 'JWT', icon: KeyRound },
        { name: 'Zod', icon: ShieldCheck },
        { name: 'bcrypt', icon: LockKeyhole },
      ],
    },

    {
      id: 'database',
      title: 'Database',
      subtitle: 'Data & Storage',
      icon: Database,
      skills: [
        { name: 'MongoDB', icon: Database },
        { name: 'Mongoose', icon: HardDrive },
      ],
    },

    {
      id: 'integrations',
      title: 'Integrations',
      subtitle: 'Services',
      icon: CreditCard,
      skills: [
        { name: 'Razorpay', icon: CreditCard },
        { name: 'Cloudinary', icon: Cloud },
      ],
    },

    {
      id: 'tools',
      title: 'Tools',
      subtitle: 'Development',
      icon: Wrench,
      skills: [
        { name: 'Git', icon: GitBranch },
        { name: 'GitHub', icon: Github },
        { name: 'Postman', icon: SendHorizontal },
        { name: 'VS Code', icon: CodeXml },
        { name: 'Vercel', icon: Globe },
        { name: 'Render', icon: Server },
      ],
    },
  ]

  const [activeCategory, setActiveCategory] = useState('frontend')

  const active = categories.find(
    (category) => category.id === activeCategory
  )

  return (
    <section id="skills" className="page-section skills">
      <SectionTitle
        eyebrow="My Skills"
        first="Technical"
        accent="Skills"
        description="Technologies and tools I use to build and deploy full-stack web applications."
      />

      {/* CATEGORY TABS */}
      <div className="skill-tabs">
        {categories.map((category) => {
          const Icon = category.icon

          return (
            <button
              type="button"
              key={category.id}
              className={`skill-tab ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="skill-tab-icon">
                <Icon size={25} />
              </span>

              <span className="skill-tab-content">
                <strong>{category.title}</strong>
                <small>{category.subtitle}</small>
              </span>
            </button>
          )
        })}
      </div>

      {/* ACTIVE CATEGORY */}
      <div className="skill-content" key={active.id}>
        <div className="skill-content-header">
          <span className="skill-content-icon">
            <active.icon size={22} />
          </span>

          <div>
            <h3>{active.title} Development</h3>
            <p>{active.subtitle}</p>
          </div>
        </div>

        {/* SKILL CARDS */}
        <div className="skill-card-grid">
          {active.skills.map((skill) => {
            const SkillIcon = skill.icon

            return (
              <div
                className="skill-card"
                key={skill.name}
                data-aos="fade-up"
              >
                <span className="skill-card-icon">
                  <SkillIcon size={23} strokeWidth={1.8} />
                </span>

                <span className="skill-card-name">
                  {skill.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}