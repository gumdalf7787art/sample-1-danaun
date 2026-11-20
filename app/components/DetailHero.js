import '../regen-overview.css';

export default function DetailHero({label, category, title, description, image, links}) {
  return <section className="ro-hero">
    <picture className="ro-hero-image"><img src={image} alt="" fetchPriority="high"/></picture>
    <div className="ro-hero-content">
      <p className="ro-label" lang="en">{label}</p>
      <p className="ro-hero-sub">{category}</p>
      <h1><em>{title}</em></h1>
      <p>{description}</p>
      <div className="ro-hero-links">
        {links.map(([text, href, external]) => <a key={href} className="ro-link" href={href}
          target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
          {text} <span aria-hidden="true">{external ? '↗' : '↓'}</span>
        </a>)}
      </div>
    </div>
  </section>;
}
