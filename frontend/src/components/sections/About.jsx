import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Mail,
} from 'lucide-react'
import { profile } from '../../data/portfolio'
import SectionTitle from '../SectionTitle'

export default function About() {
  const rows = [
    [UserRound, 'Name', profile.name],
    [
      GraduationCap,
      'Education',
      'B.Tech Computer Science & Engineering (2024)',
    ],
    [
      BriefcaseBusiness,
      'Experience',
      'Web Developer Intern — 1 Month',
    ],
    [MapPin, 'Location', profile.location],
    [Mail, 'Email', profile.email],
  ]

  return (
    <section id="about" className="page-section about">
      <div className="about-copy">
        <SectionTitle
          eyebrow="About Me"
          first="Who"
          accent="I Am"
        />

        <p className="body-copy">
          I'm Suraj Patil, an entry-level MERN Stack Developer focused on
          building responsive and user-friendly full-stack web applications.
          I work with React.js, Node.js, Express.js, and MongoDB, and have
          hands-on experience developing REST APIs, authentication, and
          database-driven applications.
        </p>

        <div className="detail-list">
          {rows.map(([Icon, label, value]) => (
            <div className="detail-row" key={label}>
              <span className="detail-icon">
                <Icon size={15} />
              </span>

              <b>{label}</b>

              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="signature">Suraj Patil</div>
      </div>

      <div className="about-visual">
        <div className="red-disc" />
        <div className="orbit orbit-one" />

        <img
          src="/assets/developer-about.png"
          alt="3D boy developer standing with backpack"
        />
      </div>
    </section>
  )
}