import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Copy, Mail, Moon, Phone, Sun } from 'lucide-react'
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
  return (
    <motion.header className="creator-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
      <a className="creator-logo" href="#top" aria-label="Back to top">EG<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a><a href="#services">Focus</a><a href="#selected-work">Projects</a><a href="#contact">Contact</a>
      </nav>
      <div className="nav-actions"><a className="resume-link" href="/resume.html" target="_blank" rel="noreferrer">Résumé</a><ThemeToggle /><a className="nav-github" href={site.links.github} target="_blank" rel="noreferrer"><ArrowUpRight size={17} aria-hidden="true" /><span>GitHub</span></a></div>
    </motion.header>
  )
}

function HeroSection() {
  return (
    <section id="top" className="creator-hero">
      <Header />
      <div className="hero-centerpiece">
        <motion.div className="hero-portrait-wrap" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease }}><img src={portrait} alt="Ejeme Godwin" /></motion.div>
        <span className="hero-orbit hero-orbit--one" /><span className="hero-orbit hero-orbit--two" />
      </div>
      <div className="hero-copy">
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>Backend / Full-Stack Developer</motion.p>
        <div className="hero-heading-clip"><motion.h1 className="hero-heading" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}>Hi, I&apos;m Godwin</motion.h1></div>
        <div className="hero-bottomline">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>I build reliable APIs, data-backed systems, and useful digital products.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}><ContactButton /><CallButton /><WhatsAppButton /></motion.div>
        </div>
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

function MarqueeRow({ images, reverse = false }) {
  const row = [...images, ...images, ...images]
  return <div className="marquee-row"><motion.div className="marquee-track" animate={{ x: reverse ? ['-33.33%', '0%'] : ['0%', '-33.33%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}>{row.map((tile, index) => <div className={`marquee-tile marquee-tile--${tile.tone}`} key={`${tile.label}-${index}`}><span>{tile.label}</span><strong>{String(index % 8 + 1).padStart(2, '0')}</strong></div>)}</motion.div></div>
}

function MarqueeSection() {
  const rotatedTiles = monthlyTiles(visualTiles)
  return <section className="marquee-section" aria-label="Project previews"><MarqueeRow images={rotatedTiles.slice(0, 4)} /><MarqueeRow images={rotatedTiles.slice(4)} reverse /></section>
}

function AboutSection() {
  return (
    <section id="about" className="about-modern">
      <div className="about-decor about-decor--left">01</div><div className="about-decor about-decor--right">BUILD / LEARN / GROW</div>
      <FadeIn className="section-heading-block"><p className="eyebrow">A little about me</p><h2 className="hero-heading">About me</h2></FadeIn>
      <FadeIn delay={0.15} className="about-text"><p>I&apos;m Ejeme Godwin, a backend and full-stack developer focused on turning complex ideas into dependable, understandable systems. I work with Python, FastAPI, PostgreSQL, Go, React, and the details that make software hold up.</p></FadeIn>
      <FadeIn delay={0.3} className="contact-actions"><ContactButton /><CallButton /><WhatsAppButton /></FadeIn>
    </section>
  )
}

const services = [
  ['01', 'Backend systems', 'Designing APIs, services, and business logic that remain clear as a product grows.'],
  ['02', 'Data architecture', 'Working with PostgreSQL, migrations, schemas, and reliable paths from data to decisions.'],
  ['03', 'Transaction workflows', 'Building consistent flows around ledgers, idempotency, auditability, and concurrency.'],
  ['04', 'Full-stack products', 'Connecting practical interfaces to the systems and data underneath them.'],
  ['05', 'Continuous improvement', 'Testing the hard parts, understanding failures, and making the next version stronger.'],
]

function ServicesSection() {
  return <section id="services" className="services-modern"><FadeIn className="section-heading-block section-heading-block--dark"><p className="eyebrow">What I bring</p><h2>Focus</h2></FadeIn><div className="services-list">{services.map(([number, title, description], index) => <FadeIn key={number} delay={index * 0.08} className="service-item"><span className="service-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></FadeIn>)}</div></section>
}

function ProjectCard({ project, index, total, generatedImages }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - 1 - index) * 0.03])
  const generatedImage = generatedImages?.[repositoryKey(project.repo)]
  return <div className="project-card-shell" ref={ref} style={{ top: `${index * 28 + 96}px` }}><motion.article className={`modern-project-card modern-project-card--${project.id}`} style={{ scale }}><div className="project-card-top"><span className="project-large-number">{String(index + 1).padStart(2, '0')}</span><div className="project-card-info"><p className="eyebrow">{project.categories?.join(' / ')}</p><h3>{project.title}</h3><p>{project.tagline}</p></div>{project.repo && <a className="live-project-button" href={project.repo} target="_blank" rel="noreferrer">View project <ArrowUpRight size={17} aria-hidden="true" /></a>}</div><div className="project-card-content"><div className="project-visual project-visual--small">{generatedImage && <img src={generatedImage} alt={`AI-generated visual for ${project.title}`} />}<span>01 / input</span><strong>{project.categories?.[0]}</strong></div><div className="project-card-summary"><span>My role</span><p>{project.role}</p><div className="project-tech-list">{project.tech.slice(0, 6).map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="project-visual project-visual--tall">{generatedImage && <img src={generatedImage} alt="" aria-hidden="true" />}<span>02 / output</span><strong>{project.status === 'completed' ? 'shipped' : 'in progress'}</strong></div></div></motion.article></div>
}

function ProjectsSection({ generatedImages }) {
  const selected = projects.slice(0, 10)
  return <section id="selected-work" className="projects-modern"><FadeIn className="section-heading-block"><p className="eyebrow">Selected work</p><h2 className="hero-heading">Projects</h2></FadeIn><div className="project-stack">{selected.map((project, index) => <ProjectCard key={project.id} project={project} index={index} total={selected.length} generatedImages={generatedImages} />)}</div></section>
}

function ContactSection() {
  return <section id="contact" className="modern-contact"><p className="eyebrow">Open to opportunities</p><h2 className="hero-heading">Let&apos;s build something useful.</h2><div className="hiring-snapshot"><span className="hiring-snapshot__status"><i /> Available for conversations</span><div><strong>Backend · Full-stack · Data-focused roles</strong><p>Python, FastAPI, PostgreSQL, Go, React, APIs, and reliable transaction systems.</p></div><a href="/resume.html" target="_blank" rel="noreferrer">View résumé ↗</a></div><div className="contact-actions"><ContactButton /><CallButton /><WhatsAppButton /><CopyEmailButton /></div><footer><span>Ejeme Godwin © {new Date().getFullYear()}</span><a href={site.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></footer></section>
}

export default function App() {
  const [generatedImages, setGeneratedImages] = useState({})
  useEffect(() => { document.title = 'Ejeme Godwin — Backend / Full-Stack Developer' }, [])
  function handleGeneratedImage(result) {
    setGeneratedImages((current) => ({ ...current, [result.repo]: result.image }))
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
    {projects.map((project, index) => <ProjectSection key={project.id} project={project} index={index} />)}
  </main></div>
}
