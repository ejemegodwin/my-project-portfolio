import { useEffect, useRef, useState } from 'react'
import { site, projects } from '../data/projects'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    let frame = 0
    // Update the progress bar directly instead of re-rendering on every scroll event
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const sections = [
      document.getElementById('about'),
      document.getElementById('projects'),
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
    { id: 'projects', label: 'Projects' },
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
        <div className="nav__progress-bar" ref={progressRef} />
      </div>
    </header>
  )
}