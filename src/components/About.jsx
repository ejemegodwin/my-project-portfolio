import { site } from '../data/projects'
import { useInView } from '../hooks/useInView'

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="about section" ref={ref}>
      <div className={`section__inner reveal ${inView ? 'in-view' : ''}`}>
        <p className="section__label">About</p>
        <h2 className="section__title">Why this site exists</h2>
        <div className="about__body">
          {site.about.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <p className="about__note">
          Each project below is a checkpoint — what it does, why I built it,
          what was hard, and what I would change now.
        </p>
      </div>
    </section>
  )
}
