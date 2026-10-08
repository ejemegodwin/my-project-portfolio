import { useInView } from '../hooks/useInView'

const journey = [
  {
    period: '2025',
    title: 'Started Building',
    description:
      'Started learning programming through practical projects, focusing on problem solving, command-line tools, and understanding how code works.',
    technologies: ['Go', 'Git', 'CLI'],
  },
  {
    period: '2026',
    title: 'Moved Into Backend Engineering',
    description:
      'Started building APIs and database-backed applications with Python, FastAPI, PostgreSQL, SQLAlchemy, and automated testing.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Pytest'],
  },
  {
    period: '2026',
    title: 'Started Building Real Systems',
    description:
      'Worked on projects involving banking workflows, transactions, ledgers, audit logs, concurrency, AI-assisted applications, and team development.',
    technologies: ['SQLAlchemy', 'Alembic', 'RAG', 'APIs'],
  },
  {
    period: 'Now',
    title: 'Expanding Into Data',
    description:
      'Currently strengthening backend engineering while developing skills in data analysis, databases, and turning data into useful information.',
    technologies: ['Python', 'SQL', 'Data Analysis'],
  },
]

export default function Journey() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section className="journey section" ref={ref}>
      <div className={`section__inner reveal ${inView ? 'in-view' : ''}`}>
        <p className="section__label">Developer journey</p>

        <div className="journey__header">
          <h2 className="section__title">
            Still becoming.
          </h2>

          <p className="journey__intro">
            I don't see development as a finished destination.
            Each project has changed what I understand and what
            I want to build next.
          </p>
        </div>

        <div className="journey__timeline">
          {journey.map((item, index) => (
            <article className="journey__item" key={item.title}>
              <div className="journey__marker">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="journey__content">
                <span className="journey__period">
                  {item.period}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="journey__technologies">
                  {item.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
