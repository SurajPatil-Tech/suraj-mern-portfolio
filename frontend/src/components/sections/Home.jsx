import { motion } from 'framer-motion'
import { ArrowRight, ArrowDownToLine } from 'lucide-react'
import { profile } from '../../data/portfolio'
import SocialLinks from '../common/SocialLinks'

export default function Home() {
  return (
    <section id="home" className="page-section hero">
      <div className="hero-copy">
        <span className="eyebrow">
          <i />
          Hello, I'm
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          Suraj <span>Patil</span>
        </motion.h1>

        <h3>MERN Stack Developer</h3>

        <p>
          I build modern, responsive full-stack web applications using the
          MERN stack, with a focus on REST APIs, authentication, and clean
          user experiences.
        </p>

        <SocialLinks />

        <div className="button-row">
          <a
            className="btn primary"
            href={profile.resume}
            download
          >
            Download Resume
            <ArrowDownToLine size={14} />
          </a>

          <a
            className="btn secondary"
            href="#projects"
          >
            View Projects
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="stats">
          <div>
            <b>3+</b>
            <small>Deployed Projects</small>
          </div>

          <div>
            <b>MERN</b>
            <small>Full-Stack Development</small>
          </div>

          <div>
            <b>REST APIs</b>
            <small>Backend Development</small>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <img
          src="/assets/developer-boy.png"
          alt="3D boy developer holding a laptop"
        />

        <span className="scribble">
          Code
          <br />
          Build
          <br />
          Grow <b>↙</b>
        </span>
      </div>
    </section>
  )
}