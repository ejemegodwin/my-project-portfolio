const GITHUB_USERNAME = 'ejemegodwin'

const FEATURED_REPOSITORIES = [
  'andrewokala/godand-bank',
  'ejemegodwin/fraudguard',
  'ejemegodwin/focus',
]

async function github(path) {
  const headers = { Accept: 'application/vnd.github+json' }
  // Optional: a token raises GitHub's rate limit from 60 to 5,000 requests/hour
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) throw new Error(`GitHub ${path} returned ${response.status}`)
  return response.json()
}

export default async () => {
  try {
    const [profile, [latest], ...featured] = await Promise.all([
      github(`/users/${GITHUB_USERNAME}`),
      github(`/users/${GITHUB_USERNAME}/repos?per_page=1&sort=updated`),
      ...FEATURED_REPOSITORIES.map((fullName) =>
        github(`/repos/${fullName}`).catch((err) => {
          console.error(err)
          return null
        }),
      ),
    ])

    const repositories = {}
    FEATURED_REPOSITORIES.forEach((fullName, index) => {
      const repo = featured[index]
      if (!repo) return
      repositories[fullName] = {
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        pushed_at: repo.pushed_at,
      }
    })

    return Response.json(
      {
        public_repos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
        latest_repository: latest?.name ?? null,
        repositories,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=0, must-revalidate',
          // Cache at Netlify's edge for an hour, serve stale while refreshing
          'Netlify-CDN-Cache-Control':
            'public, durable, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (err) {
    console.error('Failed to load GitHub data:', err)
    return Response.json(
      { error: 'GitHub unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}

export const config = {
  path: '/api/github',
}
