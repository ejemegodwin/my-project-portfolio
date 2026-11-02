import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'

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
  const [githubStatus, setGithubStatus] = useState(null)

  useEffect(() => {
    if (!inView) return

    fetch('/api/github')
      .then((response) => {
        if (!response.ok) throw new Error('GitHub request failed')
        return response.json()
      })
      .then(setGithubStatus)
      .catch(() => setGithubStatus({ error: true }))
  }, [inView])

  const stats = [
    { label: 'Current focus', value: 'Backend Engineering' },
    { label: 'Currently building', value: 'AlgoStrat' },
    { label: 'Learning', value: 'Python · PostgreSQL · Data Analysis' },
    { label: 'Projects', value: String(projects.length) },
    {
      label: 'Latest GitHub repo',
      value: githubStatus?.latest_repository ?? (githubStatus?.error ? 'Unavailable' : 'Connecting…'),
    },
  ]

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
            <span className={`status-dashboard__dot ${githubStatus?.error ? 'is-error' : ''}`} />
            {githubStatus?.error ? 'Local status' : githubStatus ? 'Live GitHub data' : 'Syncing GitHub'}
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
