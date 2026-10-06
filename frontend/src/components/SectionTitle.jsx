export default function SectionTitle({ eyebrow, first, accent, description }) {
  return <div className="section-heading" data-aos="fade-up">
    <span className="eyebrow"><i />{eyebrow}</span>
    <h2>{first} <span>{accent}</span></h2>
    {description && <p>{description}</p>}
  </div>
}