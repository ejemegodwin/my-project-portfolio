/**
 * Portfolio project data — progress tracker style.
 * Edit this file to add/update projects. Dates make the site a timeline.
 */
export const projects = [
  {
    id: 'ascii-art-cli',
    date: '2025-03',
    title: 'ASCII Art CLI',
    tagline: 'Banner-style text rendering in the terminal',
    description:
      'A command-line tool that takes a string and renders it as large ASCII art using banner-style fonts. Built as a Learn2Earn exercise — the kind of project that looks simple until you hit edge cases.',
    whyBuilt:
      'Learn2Earn exercise. The goal was to understand file I/O, string manipulation, and how to structure a small CLI tool from scratch — then reproduce it from memory for the audit.',
    hardParts: [
      'Aligning characters correctly across multi-line font templates',
      'Handling missing characters and unexpected input without crashing',
      'Keeping the rendering logic clean when fonts have different widths',
    ],
    whatClicked:
      'Once I stopped treating the font file as a blob of text and started thinking of each character as a fixed-height slice, the whole thing clicked. Reproducing it from memory for the audit forced me to actually understand the algorithm instead of copy-pasting my way through.',
    doDifferently:
      'I would separate font parsing from rendering earlier, and write small test cases for edge inputs (empty string, unknown chars, very long lines) instead of only checking the happy path by eye.',
    tech: ['Go', 'CLI', 'File I/O'],
    repo: 'https://github.com/ejemegodwin/ascii-art.git',
    status: 'completed',
  },
  {
    id: 'groupie-tracker',
    date: '2025-05',
    title: 'Groupie Tracker',
    tagline: 'Artist data explorer with filters and maps',
    description:
      'A web app that consumes a public artists API and lets you browse bands, locations, and concert dates. Filtering and relation mapping were the real meat of the project.',
    whyBuilt:
      'Zone01 full-stack exercise. Practice fetching external APIs, shaping data on the server, and building a usable UI around messy real-world JSON.',
    hardParts: [
      'Normalizing nested API relations without drowning in nested loops',
      'Building filters that stay fast as the dataset grows',
      'Deciding what belongs on the server vs. the client',
    ],
    whatClicked:
      'Treating the API response as a graph (artists ↔ locations ↔ dates) instead of flat lists made the filters and detail pages much easier to reason about.',
    doDifferently:
      'Cache and index the data once at startup instead of re-deriving relations on every request. Also ship a clearer empty-state when filters match nothing.',
    tech: ['Go', 'HTML', 'CSS', 'JavaScript', 'REST API'],
    repo: 'https://github.com/yourusername/groupie-tracker',
    status: 'completed',
  },
  {
    id: 'forum',
    date: '2025-08',
    title: 'Forum',
    tagline: 'Auth, posts, comments, and categories from scratch',
    description:
      'A full forum application with registration, sessions, posts, comments, and likes. No framework magic — just HTTP handlers, templates, and a database.',
    whyBuilt:
      'To understand authentication and session management properly, and to feel the weight of building CRUD + auth without a batteries-included framework.',
    hardParts: [
      'Session cookies, CSRF thinking, and not leaking user data',
      'Schema design that still felt simple for posts/comments/categories',
      'Error handling that is honest to the user without being noisy',
    ],
    whatClicked:
      'Drawing the request lifecycle on paper (request → middleware → handler → DB → template) before coding saved me from spaghetti. Auth stopped being scary once sessions were just rows with expiry.',
    doDifferently:
      'Extract middleware earlier. Add integration tests for auth flows. And design the category/tag model once up front instead of retrofitting it.',
    tech: ['Go', 'SQLite', 'Sessions', 'HTML Templates'],
    repo: 'https://github.com/yourusername/forum',
    status: 'in-progress',
  },
]

export const site = {
  name: 'Ejeme Godwin',
  role: 'Software developer · Full-stack engineer',
  tagline:
    'A living log of projects I build, break, and actually understand — not a highlight reel.',
  about: [
    'This site is a progress tracker first. Each section is a project I worked through, with the parts that were genuinely hard and what finally clicked.',
    'I care more about honest writeups than perfect polish. If you are here to see how I think, you are in the right place.',
  ],
  links: {
    github: 'https://github.com/ejemegodwin',
    email: 'mailto:godwinejeme@gmail.com',
  },
}
