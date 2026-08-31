const InvestorProjectCard = ({
  title,
  role,
  dateRange,
  description,
  stats = [],
  partners = [],
  press = [],
  media = [],
}) => (
  <article className="studio-project-card">
    <header className="studio-project-header">
      <div>
        <h3>{title}</h3>
        <p>{role}</p>
      </div>
      <time>{dateRange}</time>
    </header>

    <p className="studio-project-description">{description}</p>

    {stats.length > 0 ? (
      <ul className="studio-project-stats" aria-label={`${title} highlights`}>
        {stats.map((stat) => (
          <li key={`${title}-${stat.value}-${stat.label}`}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>
    ) : null}

    {partners.length > 0 ? (
      <div className="studio-project-meta">
        <span>partnered with</span>
        <div className="studio-project-badges">
          {partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </div>
    ) : null}

    {press.length > 0 ? (
      <div className="studio-project-meta">
        <span>featured</span>
        <div className="studio-project-links">
          {press.map((item) => (
            <a href={item.href} target="_blank" rel="noopener noreferrer" key={item.label}>
              {item.label} →
            </a>
          ))}
        </div>
      </div>
    ) : null}

    {media.length > 0 ? (
      <div className="studio-project-media" aria-label={`${title} media`}>
        {media.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    ) : null}
  </article>
);

export default InvestorProjectCard;
