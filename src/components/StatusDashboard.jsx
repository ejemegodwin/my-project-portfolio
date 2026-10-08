import { useInView } from '../hooks/useInView'

const stats = [
  {
    label: 'Current focus',
    value: 'Backend Engineering',
  },
  {
    label: 'Currently building',
    value: 'godand-bank',
  },
  {
    label: 'Learning',
    value: 'Python · PostgreSQL · Data Analysis',
  },
  {
    label: 'Projects',
    value: '4+',
  },
]

const technologies = [
  'Python',
  'FastAPI',
  'PostgreSQL',
  'SQLAlchemy',
  'Go',
  'React',
  'Git',
]

export default function StatusDashboard() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section className="status-dashboard section" ref={ref}>
      <div
        className={`section__inner reveal ${
          inView ? 'in-view' : ''
        }`}
      >
        <div className="status-dashboard__header">
          <div>
            <p className="section__label">Live developer status</p>
            <h2 className="section__title">
              What I'm working on
            </h2>
          </div>

          <div className="status-dashboard__indicator">
            <span className="status-dashboard__dot" />
            Active
          </div>
        </div>

        <div className="status-dashboard__grid">
          {stats.map((stat) => (
            <div className="status-dashboard__card" key={stat.label}>
              <span className="status-dashboard__label">
                {stat.label}
              </span>

              <strong className="status-dashboard__value">
                {stat.value}
              </strong>
            </div>
          ))}
        </div>

        <div className="status-dashboard__tech">
          <span className="status-dashboard__label">
            Working with
          </span>

          <div className="status-dashboard__tags">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
