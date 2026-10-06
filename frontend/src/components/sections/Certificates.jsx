import { Award, ExternalLink } from 'lucide-react'
import SectionTitle from '../SectionTitle'

export default function Certificates() {
  const certificates = [
    {
      title: 'Full-Stack Web Development Training',
      issuer: 'Knowledge Gate',
      year: 'Jan 2026',
      url: null,
      type: 'Training',
    },

    {
      title: 'Node.js, Express.js & MongoDB',
      issuer: 'Knowledge Gate',
      year: '95%',
      url: 'https://www.knowledgegate.ai//certificate/7E95E3A5',
      type: 'Certificate',
    },

    {
      title: 'React.js & Redux',
      issuer: 'Knowledge Gate',
      year: '90%',
      url: 'https://www.knowledgegate.ai//certificate/6A1B7487',
      type: 'Certificate',
    },

    {
      title: 'Complete JavaScript, jQuery and React Bootcamp - Hands-On',
      issuer: 'Udemy — YouAccel Training',
      year: 'Aug 2024',
      url: 'https://ude.my/UC-5ab2db27-2589-42ca-99f3-ec35b85220c1',
      type: 'Certificate',
    },

    {
      title: 'Learn Bootstrap Development By Building 10 Projects',
      issuer: 'Eduonix Learning Solutions',
      year: 'Dec 2023',
      url: '/certificate-files/Eduonix Learning Solutions.jpeg',
      type: 'Certificate',
    },

    {
      title: 'Web Developer Internship',
      issuer: 'Softron Technology, Kolhapur',
      year: 'Mar 2023',
      url: '/certificate-files/softron-internship.png',
      type: 'Internship',
    },
  ]

  return (
    <section id="certificates" className="page-section certificates">

      {/* LEFT - CERTIFICATE ILLUSTRATION */}
      <div className="cert-visual">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <img
          className="graduation-illustration"
          src="/assets/graduation-illustration.png"
          alt="Graduation cap and diploma illustration"
        />
      </div>

      {/* RIGHT - CERTIFICATES */}
      <div className="cert-copy">
        <SectionTitle
          eyebrow="Certifications"
          first="My"
          accent="Certificates"
        />

        <div className="certificate-list">
          {certificates.map((certificate) => (
            <div
              className="certificate-row"
              key={certificate.title}
            >
              {/* Certificate Icon */}
              <span className="cert-icon">
                <Award size={18} />
              </span>

              {/* Certificate Information */}
              <div className="cert-info">
                <b>{certificate.title}</b>
                <small>{certificate.issuer}</small>
              </div>

              {/* Date / Score + Verification */}
              <div className="cert-meta">
                <small>{certificate.year}</small>

                {certificate.url ? (
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      certificate.type === 'Internship'
                        ? `View ${certificate.title}`
                        : `Verify ${certificate.title}`
                    }
                  >
                    {certificate.type === 'Internship'
                      ? 'Verify'
                      : 'Verify'}

                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <small className="cert-training">
                    {certificate.type}
                  </small>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}