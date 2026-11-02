import { useEffect, useRef, useState } from 'react'
import { site, projects } from '../data/projects'
import { useInView } from '../hooks/useInView'

const commandNames = ['help', 'about', 'projects', 'search', 'open', 'skills', 'status', 'contact', 'resume', 'github', 'theme', 'copy email', 'export', 'whoami', 'clear']

const commands = {
  help: () => [
    'Available commands:',
    '',
    'about      Learn about me',
    'projects   Show my projects (--featured)',
    'search     Search projects by name or technology',
    'open       Open a project by name or id',
    'skills     Show technologies I work with',
    'status     Show what I am currently building',
    'contact    Show contact information',
    'resume     Open résumé details',
    'github     Open my GitHub profile',
    'theme      Toggle light/dark mode',
    'copy email Copy email address',
    'export     Download this terminal session',
    'clear      Clear the terminal',
  ],

  about: (args = []) => [
    site.name,
    site.role,
    '',
    ...(args.includes('--short') ? [site.about[0]] : site.about),
  ],

  projects: (args = []) =>
    projects
      .filter((project) => !args.includes('--featured') || project.featured)
      .map(
      (project) =>
        `${project.title} — ${project.tagline}`
      ),

  search: (args = []) => {
    const query = args.join(' ').trim().toLowerCase()

    if (!query) {
      return ['Usage: search <term>', 'Example: search postgres']
    }

    const matches = projects.filter((project) =>
      [project.title, project.tagline, ...project.categories, ...project.tech]
        .join(' ')
        .toLowerCase()
        .includes(query)
    )

    return matches.length
      ? matches.map((project) => `${project.title} — #${project.id}`)
      : [`No projects found for "${query}".`]
  },

  open: (args = []) => {
    const query = args.join(' ').trim().toLowerCase()
    const project = projects.find((item) =>
      [item.id, item.title].some((value) => value.toLowerCase() === query)
    )

    if (!project) {
      return ['Usage: open <project-id>', 'Example: open algostrat']
    }

    return [
      `${project.title}: #${project.id}`,
      `Repository: ${project.repo ?? 'No public repository'}`,
      `Scroll to the ${project.title} case study to read more.`,
    ]
  },

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

  status: () => [
    'Currently building: AlgoStrat',
    'Focus: backend engineering, reliable APIs, and data-backed systems',
    'Open to: backend, full-stack, and data-focused roles',
  ],

  contact: () => [
    `GitHub: ${site.links.github}`,
    `Email: ${site.links.email.replace('mailto:', '')}`,
    'Phone: 09161833996',
    'WhatsApp: +234 915 574 2334',
  ],

  resume: () => [
    'Résumé: /resume.html',
    'Use the Résumé link in the navigation to view or print it.',
  ],

  github: () => [
    `GitHub: ${site.links.github}`,
  ],

  theme: () => {
    const isLight = document.documentElement.classList.toggle('light-mode')
    window.localStorage.setItem('theme', isLight ? 'light' : 'dark')
    window.dispatchEvent(new CustomEvent('themechange', { detail: isLight }))
    return [`Theme: ${isLight ? 'light' : 'dark'} mode`]
  },

  copy: (args = []) => {
    if (args[0] !== 'email') {
      return ['Usage: copy email']
    }

    navigator.clipboard?.writeText(site.links.email.replace('mailto:', ''))
    return ['Email copied to clipboard.']
  },

  export: () => [
    'Preparing a text download of this session...',
  ],

  whoami: () => [
    'Godwin — backend / full-stack developer',
    'Building reliable systems and learning in public.',
  ],
}

function downloadSession(entries) {
  const text = entries.map((entry) => `${entry.type === 'input' ? '$ ' : ''}${entry.text}`).join('\n')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'godwin-portfolio-terminal.txt'
  link.click()
  URL.revokeObjectURL(url)
}

function renderLine(text, index) {
  const parts = text.split(/(https?:\/\/[^\s]+|\/resume\.html|#[a-z0-9-]+)/gi)

  return parts.map((part, partIndex) => {
    if (/^https?:\/\//i.test(part)) {
      return <a key={`${index}-${partIndex}`} href={part} target="_blank" rel="noreferrer">{part}</a>
    }

    if (part === '/resume.html' || /^#[a-z0-9-]+$/i.test(part)) {
      return <a key={`${index}-${partIndex}`} href={part}>{part}</a>
    }

    return <span key={`${index}-${partIndex}`}>{part}</span>
  })
}

export default function DeveloperTerminal() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 })
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
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const suggestions = input.trim()
    ? commandNames.filter((command) => command.startsWith(input.trim().toLowerCase()))
    : []
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [history])

  useEffect(() => {
    const syncTheme = (event) => setThemeFromCommand(Boolean(event.detail))
    const setThemeFromCommand = (isLight) => {
      document.documentElement.classList.toggle('light-mode', isLight)
    }

    window.addEventListener('themechange', syncTheme)
    return () => window.removeEventListener('themechange', syncTheme)
  }, [])

  const runCommand = (command) => {
    const normalizedCommand = command.trim().toLowerCase()
    const [commandName, ...args] = normalizedCommand.split(/\s+/)

    if (!normalizedCommand) {
      return
    }

    if (commandName === 'clear') {
      setHistory([])
      return
    }

    const commandFunction = commands[commandName]

    if (!commandFunction) {
      setHistory((current) => [
        ...current,
        {
          type: 'input',
          text: command,
        },
        {
          type: 'error',
          text: `Command not found: ${commandName}`,
        },
      ])

      return
    }

    const outputLines = commandFunction(args)
    const nextEntries = [
      {
        type: 'input',
        text: command,
      },
      ...outputLines.map((line) => ({
        type: 'output',
        text: line,
      })),
    ]

    if (commandName === 'export') {
      downloadSession([...history, ...nextEntries])
    }

    setHistory((current) => [
      ...current,
      ...nextEntries,
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (input.trim()) {
      setCommandHistory((current) => [...current, input.trim()])
    }
    runCommand(input)
    setInput('')
    setHistoryIndex(-1)
  }

  const handleInputKeyDown = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return

    event.preventDefault()
    if (!commandHistory.length) return

    const nextIndex = event.key === 'ArrowUp'
      ? Math.min(historyIndex + 1, commandHistory.length - 1)
      : Math.max(historyIndex - 1, -1)
    setHistoryIndex(nextIndex)
    setInput(nextIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - nextIndex])
  }

  const handleTabCompletion = (event) => {
    if (event.key !== 'Tab' || !suggestions.length) return

    event.preventDefault()
    setInput(suggestions[0])
  }

  const focusTerminal = () => {
    inputRef.current?.focus()
  }

  return (
    <section className="terminal section" ref={sectionRef}>
      <div className={`section__inner reveal ${inView ? 'in-view' : ''}`}>
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

                <span>{renderLine(entry.text, index)}</span>
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
                onKeyDown={(event) => {
                  handleInputKeyDown(event)
                  handleTabCompletion(event)
                }}
                id="terminal-command"
                name="terminal-command"
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            {suggestions.length > 0 && suggestions.length < commandNames.length && (
              <div className="terminal__suggestions" aria-live="polite">
                {suggestions.join(' · ')}
                <span>Tab to complete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
