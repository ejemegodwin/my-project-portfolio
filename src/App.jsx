import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Copy, Mail, Menu, Moon, Phone, Sun, X } from 'lucide-react'
import { projects, site } from './data/projects'
import portrait from './assets/godwin-portrait.webp'
import StatusDashboard from './components/StatusDashboard'
import ProjectBrowser from './components/ProjectBrowser'
import Journey from './components/Journey'
import DeveloperTerminal from './components/DeveloperTerminal'
import GithubActivity from './components/GithubActivity'
import LearningWall from './components/LearningWall'
import ProjectSection from './components/ProjectSection'
import './App.css'

const ease = [0.25, 0.1, 0.25, 1]
const whatsappUrl = 'https://wa.me/2349155742334?text=Hello%20Focus%2C%20I%20visited%20your%20portfolio%20and%20I%20have%20a%20project%20I%27d%20like%20to%20discuss.%20Are%20you%20available%3F'
const phoneUrl = 'tel:09161833996'
const projectStatusLabels = {
  completed: 'Completed',
  'in-progress': 'In progress',
  paused: 'Paused',
  prototype: 'Prototype',
}

function repositoryKey(repo = '') {
  return repo.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\.git$/, '')
}

function FadeIn({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px', amount: 0 }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  )
}

function ContactButton() {
  return <a className="contact-button" href={site.links.email}><Mail size={16} aria-hidden="true" /> Contact me</a>
}

function WhatsAppButton() {
  return <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
}

function CallButton() {
  return <a className="call-button" href={phoneUrl}><Phone size={16} aria-hidden="true" /> Call me</a>
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.links.email.replace('mailto:', ''))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button className="copy-button" type="button" onClick={copyEmail}>
      <Copy size={16} aria-hidden="true" /> {copied ? 'Email copied' : 'Copy email'}
    </button>
  )
}

function ThemeToggle() {
  const [isLight, setIsLight] = useState(() =>
    typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'light'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', isLight)
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }, [isLight])

  useEffect(() => {
    const syncTheme = (event) => setIsLight(Boolean(event.detail))
    window.addEventListener('themechange', syncTheme)
    return () => window.removeEventListener('themechange', syncTheme)
  }, [])

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      onClick={() => setIsLight((current) => !current)}
    >
      {isLight ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header className="creator-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
      <a className="creator-logo" href="#top" aria-label="Back to top">EG<span>.</span></a>
      <nav className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#services" onClick={() => setMenuOpen(false)}>Focus</a><a href="#selected-work" onClick={() => setMenuOpen(false)}>Projects</a><a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="nav-actions"><a className="resume-link" href="/resume.html" target="_blank" rel="noreferrer">Résumé</a><ThemeToggle /><button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}</button><a className="nav-github" href={site.links.github} target="_blank" rel="noreferrer"><ArrowUpRight size={17} aria-hidden="true" /><span>GitHub</span></a></div>
    </motion.header>
  )
}

function HeroSection() {
  return (
    <section id="top" className="creator-hero">
      <Header />
      <div className="hero-centerpiece">
        <motion.div className="hero-portrait-wrap" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease }}><img src={portrait} alt="Ejeme Godwin" fetchPriority="high" decoding="async" /></motion.div>
        <span className="hero-orbit hero-orbit--one" aria-hidden="true" /><span className="hero-orbit hero-orbit--two" aria-hidden="true" />
      </div>
      <div className="hero-copy">
        <span className="hero-availability"><i /> Available for conversations</span>
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>Backend / Full-Stack Developer</motion.p>
        <div className="hero-heading-clip"><motion.h1 className="hero-heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}>Hi, I&apos;m Godwin</motion.h1></div>
        <div className="hero-bottomline">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>I build reliable APIs, data-backed systems, and useful digital products.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}><ContactButton /><CallButton /><WhatsAppButton /></motion.div>
        </div>
        <a className="hero-scroll-cue" href="#about">Scroll to explore <span>↓</span></a>
      </div>
    </section>
  )
}

const visualTiles = [
  { label: 'ledger / consistency', tone: 'ledger' },
  { label: 'cashflow / overview', tone: 'cashflow' },
  { label: 'retrieval / context', tone: 'retrieval' },
  { label: 'systems / in motion', tone: 'systems' },
  { label: 'api / response', tone: 'api' },
  { label: 'data / structure', tone: 'data' },
  { label: 'build / learn / grow', tone: 'grow' },
  { label: 'ship / iterate', tone: 'ship' },
]

function monthlyTiles(tiles) {
  const month = new Date().getUTCMonth()
  const offset = month % tiles.length
  return [...tiles.slice(offset), ...tiles.slice(0, offset)]
}

function MarqueeRow({ images, reverse = false, paused }) {
  const row = [...images, ...images, ...images]
  const controls = useAnimation()

  useEffect(() => {
    if (paused) {
      controls.stop()
      return
    }

    controls.start({
      x: reverse ? ['-33.33%', '0%'] : ['0%', '-33.33%'],
      transition: { duration: 32, repeat: Infinity, ease: 'linear' },
    })
  }, [controls, paused, reverse])

  return <div className="marquee-row"><motion.div className="marquee-track" animate={controls}>{row.map((tile, index) => <div className={`marquee-tile marquee-tile--${tile.tone}`} key={`${tile.label}-${index}`}><span>{tile.label}</span><strong>{String(index % 8 + 1).padStart(2, '0')}</strong></div>)}</motion.div></div>
}

function MarqueeSection() {
  const rotatedTiles = monthlyTiles(visualTiles)
  const [paused, setPaused] = useState(false)
  return <section className="marquee-section" aria-label="Project previews"><div className="marquee-controls"><span>Project previews</span><button type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button></div><MarqueeRow images={rotatedTiles.slice(0, 4)} paused={paused} /><MarqueeRow images={rotatedTiles.slice(4)} reverse paused={paused} /></section>
}

function AboutSection() {
  return (
    <section id="about" className="about-modern">
      <div className="about-decor about-decor--left">01</div><div className="about-decor about-decor--right">BUILD / LEARN / GROW</div>
      <FadeIn className="section-heading-block"><p className="eyebrow">A little about me</p><h2 className="hero-heading">About me</h2></FadeIn>
      <FadeIn delay={0.15} className="about-text"><p>I&apos;m Ejeme Godwin, a backend and full-stack developer focused on turning complex ideas into dependable, understandable systems. I work with Python, FastAPI, PostgreSQL, Go, React, and the details that make software hold up.</p></FadeIn>
      <FadeIn delay={0.25} className="about-facts"><div><span>Focus</span><strong>Backend systems</strong></div><div><span>Approach</span><strong>Understand the hard parts</strong></div><div><span>Next</span><strong>Production-ready data systems</strong></div></FadeIn>
      <FadeIn delay={0.3} className="contact-actions"><ContactButton /><CallButton /><WhatsAppButton /></FadeIn>
      <FadeIn delay={0.35} className="about-links"><a href="#journey">Follow the journey →</a><a href="/resume.html" target="_blank" rel="noreferrer">View résumé ↗</a></FadeIn>
    </section>
  )
}

const services = [
  ['01', 'Backend systems', 'Designing APIs, services, and business logic that remain clear as a product grows.', 'algostrat'],
  ['02', 'Data architecture', 'Working with PostgreSQL, migrations, schemas, and reliable paths from data to decisions.', 'tracker'],
  ['03', 'Transaction workflows', 'Building consistent flows around ledgers, idempotency, auditability, and concurrency.', 'godand-bank'],
  ['04', 'Full-stack products', 'Connecting practical interfaces to the systems and data underneath them.', 'tracker'],
  ['05', 'Continuous improvement', 'Testing the hard parts, understanding failures, and making the next version stronger.', 'focus'],
  ['06', 'AI-backed workflows', 'Building ingestion, chunking, embeddings, and retrieval foundations that keep useful context connected to the right business data.', 'askduka'],
  ['07', 'Engineering for trust', 'Designing idempotency, audit trails, immutable records, explainable decisions, and failure paths into the product from the start.', 'algostrat'],
]

function ServicesSection() {
  return <section id="services" className="services-modern"><FadeIn className="section-heading-block section-heading-block--dark"><p className="eyebrow">What I bring</p><h2>Focus</h2></FadeIn><div className="services-list">{services.map(([number, title, description, projectId], index) => <FadeIn key={number} delay={index * 0.08} className="service-item"><span className="service-number">{number}</span><div><h3>{title}</h3><p>{description}</p><a href={`/projects/${projectId}/`}>See it in a project →</a></div></FadeIn>)}</div></section>
}

function ProjectCard({ project, index, total, generatedImages }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - 1 - index) * 0.03])
  const generatedImage = generatedImages?.[repositoryKey(project.repo)]
  return <div className="project-card-shell" ref={ref} style={{ top: `${index * 28 + 96}px` }}><motion.article className={`modern-project-card modern-project-card--${project.id}`} style={{ scale }}><div className="project-card-top"><span className="project-large-number">{String(index + 1).padStart(2, '0')}</span><div className="project-card-info"><p className="eyebrow">{project.categories?.join(' / ')}</p><h3>{project.title}</h3><p>{project.tagline}</p><span className={`modern-project-status modern-project-status--${project.status}`}>{projectStatusLabels[project.status] ?? 'In progress'}</span></div><div className="modern-project-links"><a className="live-project-button" href={`/projects/${project.id}/`}>Case study <ArrowUpRight size={17} aria-hidden="true" /></a>{project.repo && <a className="modern-project-repo" href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></div><div className="project-card-content"><div className="project-visual project-visual--small">{generatedImage && <img src={generatedImage} alt={`AI-generated visual for ${project.title}`} />}<span>01 / input</span><strong>{project.categories?.[0]}</strong></div><div className="project-card-summary"><span>My role</span><p>{project.role}</p><div className="project-tech-list">{project.tech.slice(0, 6).map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="project-visual project-visual--tall">{generatedImage && <img src={generatedImage} alt="" aria-hidden="true" />}<span>02 / output</span><strong>{project.status === 'completed' ? 'shipped' : 'in progress'}</strong></div></div></motion.article></div>
}

function ProjectsSection({ generatedImages }) {
  const selected = projects.slice(0, 10)
  return <section id="selected-work" className="projects-modern"><FadeIn className="section-heading-block"><p className="eyebrow">Selected work</p><h2 className="hero-heading">Projects</h2></FadeIn><div className="project-stack">{selected.map((project, index) => <ProjectCard key={project.id} project={project} index={index} total={selected.length} generatedImages={generatedImages} />)}</div></section>
}

function ContactSection() {
  return <section id="contact" className="modern-contact"><p className="eyebrow">Open to opportunities</p><h2 className="hero-heading">Let&apos;s build something useful.</h2><div className="hiring-snapshot"><span className="hiring-snapshot__status"><i /> Available for conversations</span><div><strong>Backend · Full-stack · Data-focused roles</strong><p>Python, FastAPI, PostgreSQL, Go, React, APIs, and reliable transaction systems.</p></div><div className="hiring-snapshot__actions"><a className="hiring-snapshot__email" href={site.links.email}><Mail size={15} aria-hidden="true" /> Send me an email</a><CallButton /><WhatsAppButton /><CopyEmailButton /><a className="hiring-snapshot__resume" href="/resume.html" target="_blank" rel="noreferrer">View résumé ↗</a></div></div><footer><span>Ejeme Godwin © {new Date().getFullYear()}</span><a href={site.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></footer></section>
}

function ProjectDetailPage({ project }) {
  const index = projects.findIndex((item) => item.id === project.id)
  useEffect(() => {
    document.title = `${project.title} — Ejeme Godwin`
  }, [project.title])

  return (
    <div className="modern-site project-detail-page">
      <header className="project-detail-nav">
        <a className="creator-logo" href="/" aria-label="Back to portfolio">EG<span>.</span></a>
        <a href="/projects/">All projects</a>
      </header>
      <main>
        <ProjectSection project={project} index={index} />
        <nav className="project-detail-pagination" aria-label="Other project case studies">
          {projects[index - 1] && <a href={`/projects/${projects[index - 1].id}/`}>← {projects[index - 1].title}</a>}
          {projects[index + 1] && <a href={`/projects/${projects[index + 1].id}/`}>{projects[index + 1].title} →</a>}
        </nav>
      </main>
    </div>
  )
}

export default function App({ projectSlug }) {
  const [generatedImages, setGeneratedImages] = useState({})
  useEffect(() => { document.title = 'Ejeme Godwin — Backend / Full-Stack Developer' }, [])
  function handleGeneratedImage(result) {
    setGeneratedImages((current) => ({ ...current, [result.repo]: result.image }))
  }
  if (projectSlug) {
    const project = projects.find((item) => item.id === projectSlug)
    return project ? <ProjectDetailPage project={project} /> : <div className="project-detail-page"><a href="/">← Back to portfolio</a><h1>Project not found</h1></div>
  }
  return <div className="modern-site"><main>
    <HeroSection />
    <MarqueeSection />
    <StatusDashboard />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection generatedImages={generatedImages} />
    <ProjectBrowser onGenerated={handleGeneratedImage} />
    <Journey />
    <DeveloperTerminal />
    <GithubActivity />
    <LearningWall />
    <ContactSection />
  </main></div>
}
