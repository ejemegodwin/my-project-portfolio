import { useEffect, useMemo, useState } from 'react'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useInView'
import ProjectImageGenerator from './ProjectImageGenerator'

const filters = [
  'All',
  ...new Set(projects.flatMap((project) => project.categories)),
]

const statusLabels = {
  completed: 'Completed',
  'in-progress': 'In progress',
  paused: 'Paused',
  prototype: 'Prototype',
}

export default function ProjectBrowser({ onGenerated }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [githubData, setGithubData] = useState(null)
  const [ref, inView] = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (!inView) return

    fetch('/api/github')
      .then((response) => {
        if (!response.ok) throw new Error('GitHub request failed')
        return response.json()
      })
      .then(setGithubData)
      .catch(() => setGithubData({ error: true }))
  }, [inView])

  const featuredProjects = useMemo(() => {
    return projects.filter((project) => project.featured)
  }, [])

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === 'All' || project.categories.includes(activeFilter)
      const searchableText = [
        project.title,
        project.tagline,
        project.description,
        ...project.categories,
        ...project.tech,
      ]
        .join(' ')
        .toLowerCase()

      return matchesFilter && (!query || searchableText.includes(query))
    })
  }, [activeFilter, searchQuery])

  const hasActiveFilters = activeFilter !== 'All' || searchQuery.trim()

  return (
    <section
      id="projects"
      className="project-browser section"
      ref={ref}
    >
      <div className={`section__inner reveal ${inView ? 'in-view' : ''}`}>
        <div className="project-browser__header">
          <div>
            <p className="section__label">Selected work</p>

            <h2 className="section__title">
              Projects I'm building
            </h2>

            <p className="project-browser__intro">
              A mix of backend systems, experiments, team projects,
              and products I've worked on while learning.
            </p>
          </div>

          <span className="project-browser__count">
            {filteredProjects.length} projects
          </span>
        </div>

        <ProjectImageGenerator projects={projects} onGenerated={onGenerated} />

        <div className="project-browser__featured">
          <p className="section__label">Featured</p>

            <p className="project-browser__featured-intro">
              A closer look at the projects that best represent how I think about systems, products, and reliability.
            </p>

          <div className="project-browser__featured-grid">
            {featuredProjects.map((project) => (
              <article
                className="project-card project-card--featured"
                key={project.id}
              >
                {(() => {
                  const repoKey = project.repo?.replace('https://github.com/', '')
                  const repoStats = githubData?.repositories?.[repoKey]

                  return (
                    <>
                <div className="project-card__top">
                  <span className="project-card__date">
                    {project.date}
                  </span>

                  <span
                    className={`project-card__status project-card__status--${project.status}`}
                  >
                    {statusLabels[project.status] ?? 'In progress'}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-card__tagline">
                  {project.tagline}
                </p>

                <p className="project-card__reason">
                  {project.featuredReason}
                </p>

                <div className="project-card__categories">
                  {project.categories.slice(0, 3).map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>

                <div className="project-card__tech">
                  {project.tech.slice(0, 5).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-card__footer">
                  <span>
                    {project.relationship ||
                    (project.visibility === 'private'
                      ? 'Private project'
                      : project.visibility === 'team'
                        ? 'Team project'
                        : 'Public project')}
                  </span>

                  <div className="project-card__links">
                    <a href={`/projects/${project.id}/`}>Read case study ↓</a>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View repository ↗
                      </a>
                    )}
                  </div>
                </div>
                {repoStats && (
                  <div className="project-card__stats" aria-label="GitHub repository statistics">
                    <span>★ {repoStats.stargazers_count}</span>
                    <span>⑂ {repoStats.forks_count}</span>
                    {repoStats.pushed_at && (
                      <span>Updated {new Date(repoStats.pushed_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                    )}
                  </div>
                )}
                    </>
                  )
                })()}
              </article>
            ))}
          </div>
        </div>

        <div className="project-browser__filters">
          <div className="project-browser__filter-header">
            <p className="section__label">Browse by area</p>
            <label className="project-browser__search">
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                placeholder="Search projects"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
          </div>

          <div className="project-browser__filter-list">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`project-browser__filter ${
                  activeFilter === filter
                    ? 'project-browser__filter--active'
                    : ''
                }`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="project-browser__results">
              Showing {filteredProjects.length} result{filteredProjects.length === 1 ? '' : 's'} for “{searchQuery}”.
            </p>
          )}

          {hasActiveFilters && (
            <button
              className="project-browser__clear"
              type="button"
              onClick={() => {
                setActiveFilter('All')
                setSearchQuery('')
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="project-browser__list">
          {filteredProjects.length ? filteredProjects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-card__top">
                <span className="project-card__date">
                  {project.date}
                </span>

                <span
                  className={`project-card__status project-card__status--${project.status}`}
                >
                  {statusLabels[project.status] ?? 'In progress'}
                </span>
              </div>

              <h3>{project.title}</h3>

              <p className="project-card__tagline">
                {project.tagline}
              </p>

              <p>{project.description}</p>

              <div className="project-card__categories">
                {project.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>

              <div className="project-card__footer">
                <span>
                  {project.visibility === 'private'
                    ? 'Private project'
                    : project.visibility === 'team'
                      ? 'Team project'
                      : 'Public project'}
                </span>

                <div className="project-card__links">
                  <a href={`/projects/${project.id}/`}>Read case study ↓</a>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          )) : (
            <div className="project-browser__empty">
              <strong>No matching projects</strong>
              <p>Try another technology, category, or clear the filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
