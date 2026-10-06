export default function SkillRing({ name, value, color }) {
  return <div className="skill-item" data-aos="zoom-in">
    <div className="skill-ring" style={{'--progress': `${value * 3.6}deg`, '--ring-color': color}}>
      <span>{value}%</span>
    </div>
    <strong>{name}</strong>
  </div>
}