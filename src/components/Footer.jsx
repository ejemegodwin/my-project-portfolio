import { site } from '../data/projects'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__text">
          Built as a personal progress log · {year}
        </p>
        <div className="footer__links">
          <a href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.links.email}>Email</a>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  )
}
