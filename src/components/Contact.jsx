import { site } from '../data/projects'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div
        className={`section__inner reveal ${
          inView ? 'in-view' : ''
        }`}
      >
        <p className="section__label">
          Open to opportunities
        </p>

        <div className="contact__content">
          <div>
            <h2 className="contact__title">
              Let's build something useful.
            </h2>

            <p className="contact__text">
              I'm interested in backend engineering,
              full-stack development, data-focused work,
              and opportunities where I can keep learning
              while solving real problems.
            </p>
          </div>

          <div className="contact__actions">
            <a
              href={site.links.email}
              className="btn btn--primary"
            >
              Send me an email
            </a>

            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
