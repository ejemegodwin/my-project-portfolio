import { useEffect, useState } from 'react'
import { site, projects } from '../data/projects'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const sections = [
      document.getElementById('about'),
      ...projects.map((p) => document.getElementById(p.id)),
    ].filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const links = [
    { id: 'about', label: 'About' },
    ...projects.map((p) => ({ id: p.id, label: p.title })),
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__bar">
        <a href="#top" className="nav__brand" onClick={() => setMenuOpen(false)}>
          {site.name}
        </a>

        <button
          type="button"
          className={`nav__toggle ${menuOpen ? 'nav__toggle--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeId === link.id ? 'is-active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="nav__external"
            onClick={() => setMenuOpen(false)}
          >
            GitHub ↗
          </a>
        </nav>
      </div>

      <div className="nav__progress" aria-hidden="true">
        <div className="nav__progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </header>
  )
}
