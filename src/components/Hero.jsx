import { site } from '../data/projects'
import { useInView } from '../hooks/useInView'

export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section id="top" className="hero" ref={ref}>
      <div className={`hero__inner reveal ${inView ? 'in-view' : ''}`}>
        <div className="hero__status">
          <span className="hero__status-dot" />
          <span>Currently building</span>
        </div>

        <p className="hero__eyebrow">
          Backend · Full-Stack · Continuous learning
        </p>

        <h1 className="hero__title">{site.name}</h1>

        <p className="hero__role">
          Backend / Full-Stack Developer
        </p>

        <p className="hero__tagline">
          I build systems, break them, understand why they broke,
          and build them better.
        </p>

        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">
            Explore my work
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

        <div className="hero__activity">
          <div className="hero__activity-item">
            <span className="hero__activity-label">Building</span>
            <span className="hero__activity-value">godand-bank</span>
          </div>

          <div className="hero__activity-item">
            <span className="hero__activity-label">Learning</span>
            <span className="hero__activity-value">
              Backend Engineering + Data Analysis
            </span>
          </div>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <span>scroll to explore</span>
          <div className="hero__scroll-line" />
        </div>
      </div>
    </section>
  )
}