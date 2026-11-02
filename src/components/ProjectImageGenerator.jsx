import { useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function ProjectImageGenerator({ projects }) {
  const [selectedRepo, setSelectedRepo] = useState(projects[0]?.repo ?? '')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate(event) {
    event.preventDefault()
    setIsGenerating(true)
    setError('')
    setImage(null)

    try {
      const response = await fetch('/api/generate-project-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: selectedRepo }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Generation failed.')
      setImage(result)
    } catch (generationError) {
      setError(generationError.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="project-image-generator">
      <div>
        <p className="section__label">Experimental tool</p>
        <h3>Turn a repository into a visual</h3>
        <p>GitHub metadata and the README guide a generated image that reflects the project&apos;s real technical character.</p>
      </div>
      <form onSubmit={handleGenerate} className="project-image-generator__form">
        <label htmlFor="project-repository">Repository</label>
        <div className="project-image-generator__controls">
          <select id="project-repository" value={selectedRepo} onChange={(event) => setSelectedRepo(event.target.value)}>
            {projects.filter((project) => project.repo).map((project) => <option value={project.repo} key={project.id}>{project.title}</option>)}
          </select>
          <button type="submit" disabled={isGenerating || !selectedRepo}><Sparkles size={16} aria-hidden="true" /> {isGenerating ? 'Generating…' : 'Generate visual'}</button>
        </div>
      </form>
      {error && <p className="project-image-generator__error" role="alert">{error}</p>}
      {image && <div className="project-image-generator__result"><img src={image.image} alt={`Generated visual for ${image.repo}`} /><div><span>{image.repo}</span><a href={image.image} download={`${image.repo.replace('/', '-')}-visual.png`}>Download image <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>}
    </div>
  )
}
