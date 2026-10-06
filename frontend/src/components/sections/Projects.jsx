import { ExternalLink, Github } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import { projects } from '../../data/portfolio'

export default function Projects() {
  // Show only the 3 real projects in the portfolio
  const featuredProjects = [
    projects.find((project) =>
      project.title.toLowerCase().includes('course selling')
    ),

    projects.find((project) =>
      project.title.toLowerCase().includes('task saver')
    ),

    projects.find((project) =>
      project.title.toLowerCase().includes('chatbot')
    ),
  ]
    .filter(Boolean)
    .map((project) => {
      const title = project.title.toLowerCase()

      // Course Selling Platform
      if (title.includes('course selling')) {
        return {
          ...project,
          title: 'Course Selling Platform',
          description:
            'A full-stack MERN course platform with JWT authentication, admin course management, and Razorpay payment integration.',
          tags: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
            'JWT',
            'Razorpay',
          ],
        }
      }

      // Task Saver
      if (title.includes('task saver')) {
        return {
          ...project,
          title: 'Task Saver',
          description:
            'A MERN-based task management application for creating, managing, and organizing daily tasks with a responsive user interface.',
          tags: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
          ],
        }
      }

      // Chatbot Application
      if (title.includes('chatbot')) {
        return {
          ...project,
          title: 'Chatbot Application',
          description:
            'A MERN-based chatbot application using MongoDB for conversation data, predefined topic matching, and fallback responses for unknown queries.',
          tags: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
          ],
        }
      }

      return project
    })

  return (
    <section id="projects" className="page-section projects">
      <div className="projects-head">
        <SectionTitle
          eyebrow="My Projects"
          first="Featured"
          accent="Projects"
          description="Here are some of my best projects. Each project helped me strengthen my full-stack development skills through practical implementation."
        />
      </div>

      <div className="project-grid">
        {featuredProjects.map((project, index) => (
          <article
            className="project-card"
            data-aos="fade-up"
            data-aos-delay={index * 80}
            key={project.title}
          >
            {/* PROJECT IMAGE */}
            <div className="project-image">
              <img
                src={project.image}
                alt={`${project.title} preview`}
              />
            </div>

            {/* PROJECT TITLE */}
            <h3>{project.title}</h3>

            {/* PROJECT DESCRIPTION */}
            <p>{project.description}</p>

            {/* TECHNOLOGIES */}
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {/* PROJECT LINKS */}
            <div className="project-links">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}