import { createGateway, generateImage } from 'ai'

const MAX_README_LENGTH = 6000
const MAX_FILES = 40

function parseRepository(value) {
  try {
    const url = new URL(value)
    if (url.hostname !== 'github.com') return null
    const parts = url.pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null
    return `${parts[0]}/${parts[1].replace(/\.git$/, '')}`
  } catch {
    return null
  }
}

async function github(path) {
  const headers = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`)
  return response.json()
}

function cleanReadme(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_README_LENGTH)
}

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Use POST.' }, { status: 405 })
  }

  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return Response.json(
      { error: 'Image generation is not configured yet. Add AI_GATEWAY_API_KEY to Netlify.' },
      { status: 503 },
    )
  }

  try {
    const body = await request.json()
    const fullName = parseRepository(body.repo)
    if (!fullName) {
      return Response.json({ error: 'Enter a valid public GitHub repository URL.' }, { status: 400 })
    }

    const [repository, languages, contents, readmeResponse] = await Promise.all([
      github(`/repos/${fullName}`),
      github(`/repos/${fullName}/languages`),
      github(`/repos/${fullName}/contents`),
      fetch(`https://api.github.com/repos/${fullName}/readme`, {
        headers: { Accept: 'application/vnd.github.raw+json' },
      }),
    ])

    const readme = readmeResponse.ok ? cleanReadme(await readmeResponse.text()) : ''
    const files = Array.isArray(contents)
      ? contents.filter((item) => item.type === 'file').map((item) => item.name).slice(0, MAX_FILES)
      : []

    const prompt = `Create a polished editorial project visual for a developer portfolio.

Repository: ${repository.name}
Description: ${repository.description || 'No description provided'}
Primary languages: ${Object.keys(languages).slice(0, 6).join(', ') || 'Not specified'}
Top-level files: ${files.join(', ') || 'Not available'}
README context: ${readme || 'Not available'}

The image should communicate the project's actual technical character, not depict a generic laptop or stock office scene. Use an abstract systems/product-design composition: layered data structures, clean interface fragments, service diagrams, flows, or carefully chosen domain symbols that fit the repository. Use a dark editorial palette with graphite, cool blue, muted violet, and one restrained mint accent. No people, no logos, no brand names, no readable text, no watermarks. Square composition, strong contrast, premium portfolio art direction.`

    const gateway = createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY,
    })
    const { image } = await generateImage({
      model: gateway('openai/gpt-image-1-mini'),
      prompt,
      size: '1024x1024',
    })

    return Response.json({
      repo: fullName,
      image: `data:${image.mediaType};base64,${image.base64}`,
      description: repository.description,
    })
  } catch (error) {
    console.error('Project image generation failed:', error)
    return Response.json({ error: 'Could not inspect the repository or generate its image.' }, { status: 502 })
  }
}

export const config = {
  path: '/api/generate-project-image',
}
