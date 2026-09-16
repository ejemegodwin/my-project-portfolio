import { site } from '../data/projects'
import { useInView } from '../hooks/useInView'

export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section id="top" className="hero" ref={ref}>
      <div className={`hero__inner reveal ${inView ? 'in-view' : ''}`}>
        <p className="hero__eyebrow">Progress log · not a highlight reel</p>
        <h1 className="hero__title">{site.name}</h1>
        <p className="hero__role">{site.role}</p>
        <p className="hero__tagline">{site.tagline}</p>
        <div className="hero__actions">
          <a href="#about" className="btn btn--primary">
            Start reading
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            GitHub
          </a>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span>scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </div>
    </section>
  )
}
