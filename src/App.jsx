import Nav from './components/Nav'
import Hero from './components/Hero'
import StatusDashboard from './components/StatusDashboard'
import About from './components/About'
import ProjectBrowser from './components/ProjectBrowser'
import Journey from './components/Journey'
import DeveloperTerminal from './components/DeveloperTerminal'
import GithubActivity from './components/GithubActivity'
import LearningWall from './components/LearningWall'
import Contact from './components/Contact'
import ProjectSection from './components/ProjectSection'
import Footer from './components/Footer'
import { projects } from './data/projects'
import './App.css'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatusDashboard />
        <About />
        <ProjectBrowser />
        <Journey />
        <DeveloperTerminal />
        <GithubActivity />
        <LearningWall />
        <Contact />
        
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </main>
      <Footer />
    </>
  )
}
