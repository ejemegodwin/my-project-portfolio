import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
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
        <About />
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </main>
      <Footer />
    </>
  )
}
