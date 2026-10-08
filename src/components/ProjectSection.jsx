import { ExternalLink, Lightbulb, Wrench, RefreshCw } from 'lucide-react'
import { useInView } from '../hooks/useInView'

function formatDate(ym) {
  if (!ym) return ''
  const [y, m] = ym.split('-')
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  return `${months[Number(m) - 1] ?? m} ${y}`
}

export default function ProjectSection({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const isEven = index % 2 === 1

  return (
    <section
      id={project.id}
      ref={ref}
      className={`project section ${isEven ? 'project--alt' : ''}`}
    >

      <div
        className={`section__inner project__inner reveal reveal--${isEven ? 'right' : 'left'} ${
          inView ? 'in-view' : ''
        }`}
      >
        <header className="project__header">
          <div className="project__meta">
            <time dateTime={project.date}>{formatDate(project.date)}</time>
            <span className={`project__status project__status--${project.status}`}>
              {project.status === 'completed' ? 'Done' : 'In progress'}
            </span>
            <span className="project__index">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h2 className="project__title">{project.title}</h2>
          <p className="project__tagline">{project.tagline}</p>
          <ul className="project__tech" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </header>

        <p className="project__description">{project.description}</p>
                
        <div className="project__overview">
          <article className="project__overview-card">
            <span className="project__eyebrow">My role</span>
            <p>{project.role}</p>
          </article>

          <article className="project__overview-card">
            <span className="project__eyebrow">Key features</span>
            <ul>
              {(project.features ?? []).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="project__grid">

          <article className="project__card">
            <h3>
              <Wrench size={16} aria-hidden /> Why I built it
            </h3>
            <p>{project.whyBuilt}</p>
          </article>

          <article className="project__card">
            <h3>
              <Lightbulb size={16} aria-hidden /> What clicked
            </h3>
            <p>{project.whatClicked}</p>
          </article>

          <article className="project__card project__card--wide">
            <h3>What was hard</h3>
            <ul>
              {(project.hardParts ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="project__card project__card--wide">
            <h3>
              <RefreshCw size={16} aria-hidden /> What I'd do differently
            </h3>
            <p>{project.doDifferently}</p>
          </article>
        </div>

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost project__repo"
          >
            View repo <ExternalLink size={14} aria-hidden />
          </a>
        )}
      </div>
    </section>
  )
}
