import { useEffect, useRef, useState } from 'react'
import { site, projects } from '../data/projects'

const commands = {
  help: () => [
    'Available commands:',
    '',
    'about      Learn about me',
    'projects   Show my projects',
    'skills     Show technologies I work with',
    'contact    Show contact information',
    'clear      Clear the terminal',
  ],

  about: () => [
    site.name,
    site.role,
    '',
    ...site.about,
  ],

  projects: () =>
    projects.map(
      (project) =>
        `${project.title} — ${project.tagline}`
    ),

  skills: () => [
    'Python',
    'FastAPI',
    'PostgreSQL',
    'SQLAlchemy',
    'Alembic',
    'Go',
    'React',
    'Git',
    'Data Analysis',
  ],

  contact: () => [
    `GitHub: ${site.links.github}`,
    `Email: ${site.links.email.replace('mailto:', '')}`,
  ],
}

export default function DeveloperTerminal() {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to Godwin\'s developer terminal.',
    },
    {
      type: 'system',
      text: 'Type "help" to see available commands.',
    },
  ])

  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [history])

  const runCommand = (command) => {
    const normalizedCommand = command.trim().toLowerCase()

    if (!normalizedCommand) {
      return
    }

    if (normalizedCommand === 'clear') {
      setHistory([])
      return
    }

    const commandFunction = commands[normalizedCommand]

    if (!commandFunction) {
      setHistory((current) => [
        ...current,
        {
          type: 'input',
          text: command,
        },
        {
          type: 'error',
          text: `Command not found: ${normalizedCommand}`,
        },
      ])

      return
    }

    setHistory((current) => [
      ...current,
      {
        type: 'input',
        text: command,
      },
      ...commandFunction().map((line) => ({
        type: 'output',
        text: line,
      })),
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    runCommand(input)
    setInput('')
  }

  const focusTerminal = () => {
    inputRef.current?.focus()
  }

  return (
    <section className="terminal section">
      <div className="section__inner">
        <div className="terminal__header">
          <div>
            <p className="section__label">
              Interactive workspace
            </p>

            <h2 className="section__title">
              Talk to my portfolio.
            </h2>
          </div>

          <p className="terminal__hint">
            Try <code>help</code>
          </p>
        </div>

        <div
          className="terminal__window"
          onClick={focusTerminal}
        >
          <div className="terminal__bar">
            <span />
            <span />
            <span />

            <strong>godwin@portfolio:~</strong>
          </div>

          <div
            className="terminal__body"
            ref={terminalRef}
          >
            {history.map((entry, index) => (
              <div
                className={`terminal__line terminal__line--${entry.type}`}
                key={`${entry.text}-${index}`}
              >
                {entry.type === 'input' && (
                  <span className="terminal__prompt">
                    $
                  </span>
                )}

                <span>{entry.text}</span>
              </div>
            ))}

            <form
              className="terminal__form"
              onSubmit={handleSubmit}
            >
              <span className="terminal__prompt">$</span>

              <input
                ref={inputRef}
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                id="terminal-command"
                name="terminal-command"
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
