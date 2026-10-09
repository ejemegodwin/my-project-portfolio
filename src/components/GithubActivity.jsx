import { useEffect, useState } from 'react'
import { site } from '../data/projects'
import { useInView } from '../hooks/useInView'

const GITHUB_USERNAME = 'ejemegodwin'

const FEATURED_REPOSITORIES = [
  {
    name: 'godand-bank',
    title: 'Godand Bank',
    url: 'https://github.com/andrewokala/godand-bank',
    description:
      'Collaborative banking backend featuring account management, transfers, ledger records, idempotency, audit logging, and concurrency protection.',
    language: 'Python',
  },
  {
    name: 'fraudguard',
    title: 'FraudGuard',
    url: 'https://github.com/ejemegodwin/fraudguard',
    description:
      'Backend application exploring transaction processing, checkout flows, and fraud-related workflows.',
    language: 'Python',
  },
  {
    name: 'focus',
    title: 'Focus',
    url: 'https://github.com/ejemegodwin/focus',
    description:
      'An education-focused application designed to make programming study more interactive and structured.',
    language: 'Python',
  },
]

export default function GithubActivity() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  const [profile, setProfile] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadGithubData() {
      try {
        setLoading(true)
        setError(false)

        const [profileResponse, repositoriesResponse] =
          await Promise.all([
            fetch(
              `https://api.github.com/users/${GITHUB_USERNAME}`
            ),
            fetch(
              `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
            ),
          ])

        if (!profileResponse.ok || !repositoriesResponse.ok) {
          throw new Error('GitHub request failed')
        }

        const profileData = await profileResponse.json()
        const repositoriesData = await repositoriesResponse.json()

        setProfile(profileData)
        setRepositories(repositoriesData)
      } catch (err) {
        console.error('Failed to load GitHub data:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadGithubData()
  }, [])

  const latestRepository = repositories.reduce(
    (latest, repo) => {
      if (!latest) return repo

      return new Date(repo.updated_at) >
        new Date(latest.updated_at)
        ? repo
        : latest
    },
    null
  )

  const activity = [
    {
      label: 'Public repositories',
      value: loading
        ? 'Loading...'
        : profile?.public_repos ?? '—',
    },
    {
      label: 'Followers',
      value: loading
        ? 'Loading...'
        : profile?.followers ?? '—',
    },
    {
      label: 'Following',
      value: loading
        ? 'Loading...'
        : profile?.following ?? '—',
    },
    {
      label: 'Latest update',
      value: loading
        ? 'Loading...'
        : latestRepository?.name ?? '—',
    },
  ]

  return (
    <section className="github-activity section" ref={ref}>
      <div
        className={`section__inner reveal ${
          inView ? 'in-view' : ''
        }`}
      >
        <div className="github-activity__header">
          <div>
            <p className="section__label">
              Open source & activity
            </p>

            <h2 className="section__title">
              Find me on GitHub.
            </h2>
          </div>

          <div className="github-activity__live">
            <span
              className={`github-activity__live-dot ${
                loading ? 'is-loading' : ''
              } ${error ? 'is-error' : ''}`}
            />
            <span>
              {loading
                ? 'Connecting to GitHub'
                : error
                  ? 'GitHub unavailable'
                  : 'Live GitHub data'}
            </span>
          </div>

          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="github-activity__link"
          >
            Visit GitHub →
          </a>
        </div>

        <div className="github-activity__grid">
          {activity.map((item) => (
            <div
              className="github-activity__card"
              key={item.label}
            >
              <span className="github-activity__label">
                {item.label}
              </span>

              <strong className="github-activity__value">
                {item.value}
              </strong>
            </div>
          ))}
        </div>

        <div className="github-activity__repos">
          <div className="github-activity__repos-header">
            <div>
              <p className="section__label">Recent repositories</p>

              <h3 className="github-activity__repos-title">
                What I've been working on
              </h3>
            </div>
          </div>

          <div className="github-activity__repos-grid">
            {loading ? (
              <p>Loading repositories...</p>
            ) : repositories.length > 0 ? (
              FEATURED_REPOSITORIES.map((featuredRepo) => {
                const repo = repositories.find(
                  (item) => item.name.toLowerCase() === featuredRepo.name
                )

                return {
                  id: repo?.id ?? featuredRepo.name,
                  name: featuredRepo.title,
                  html_url: featuredRepo.url,
                  description: featuredRepo.description,
                  language: repo?.language || featuredRepo.language,
                  stargazers_count: repo?.stargazers_count ?? 0,
                  forks_count: repo?.forks_count ?? 0,
                  pushed_at: repo?.pushed_at || null,
                }
              }).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="github-activity__repo"
                >
                  <div className="github-activity__repo-top">
                    <strong>{repo.name}</strong>
                    <span>↗</span>
                  </div>

                  <p>
                    {repo.description ||
                      'No description provided for this repository.'}
                  </p>

                  <div className="github-activity__repo-meta">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                    <span>⑂ {repo.forks_count}</span>
                    <span>
                      {repo.pushed_at
                        ? `Updated ${new Date(repo.pushed_at).toLocaleDateString(
                            'en-GB',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              timeZone: 'Africa/Lagos',
                            }
                          )}`
                        : 'Collaborative project'}
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <p>
                {error
                  ? 'Repositories could not be loaded. Please visit my GitHub profile.'
                  : 'No public repositories found yet.'}
              </p>
            )}
          </div>
        </div>

        {error ? (
          <div className="github-activity__note">
            <span className="github-activity__dot" />

            <p>
              GitHub activity could not be loaded right now.
              You can still visit my profile directly.
            </p>
          </div>
        ) : (
          <div className="github-activity__note">
            <span className="github-activity__dot" />

            <p>
              This section pulls public information directly
              from GitHub, so the portfolio can reflect my
              actual repositories and activity instead of
              using static numbers.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}