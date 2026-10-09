export const projects = [
  {
    id: 'godand-bank',
    date: '2026-09',
    title: 'Godand Bank',
    tagline:
      'A backend banking system built around correctness, consistency, and reliable transaction processing',

    description:
      'Godand Bank is a backend banking system built with FastAPI and PostgreSQL. I used the project to move beyond basic CRUD and work through problems that appear in real financial systems: account management, server-side account numbers, transfers, double-entry-style ledger records, idempotency, audit logging, pagination, and concurrent balance updates.',

    role:
      'Backend developer responsible for implementing and testing core account and transaction workflows, database-backed business logic, ledger records, audit trails, pagination, idempotency, and protection against race conditions.',

    features: [
      'User and account management',
      'Server-side account number generation',
      'Account balance management',
      'Transfer processing between accounts',
      'Ledger entries for financial state changes',
      'Idempotent transfer requests',
      'Transfer history with pagination',
      'Audit logging for important actions',
      'JWT-based authentication and protected operations',
      'Database migrations with Alembic',
      'Concurrency protection for simultaneous balance updates',
    ],

    whyBuilt:
      'I wanted to move beyond simple CRUD applications and understand what happens when a backend has to protect financial data and maintain consistent state. Banking was a useful problem domain because a small mistake in a balance update can create much bigger problems later.',

    hardParts: [
      'Designing account and ledger relationships without losing financial history',
      'Making transfers idempotent so repeated requests do not duplicate transactions',
      'Protecting balance updates against race conditions and concurrent transfers',
      'Making sure failed operations do not leave accounts in an inconsistent state',
      'Designing audit logs that preserve useful information about important actions',
      'Building transfer history that remains usable as the amount of data grows',
    ],

    whatClicked:
      'The biggest shift was understanding that a banking backend is not just about changing a balance. Every important state change needs a reliable history, clear transaction boundaries, and protection against requests arriving at the same time.',

    outcome:
      'The project gave me practical experience with transactional backend design, PostgreSQL, SQLAlchemy, database migrations, automated testing, idempotency, auditability, and concurrency. More importantly, it changed how I think about backend correctness: a successful API response is not enough if the underlying state can become inconsistent.',

    doDifferently:
      'I would design the concurrency and ledger requirements earlier and write those tests alongside the first transfer implementation instead of adding them later. I would also establish more explicit transaction and failure-case requirements before implementing the first version of the transfer workflow.',

    tech: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'JWT',
      'Pytest',
    ],

    repo: 'https://github.com/andrewokala/godand-bank',
    status: 'in-progress',
    visibility: 'team',
    relationship: 'Collaborative contribution',
    featured: true,
    categories: ['Backend', 'Python', 'Database'],
  },

  {
    id: 'askduka',
    date: '2026-09',
    title: 'AskDuka',
    tagline: 'AI-powered WhatsApp business assistant',

    description:
      'A team project focused on building an AI-powered WhatsApp Business Assistant using retrieval-augmented generation. My work has focused on backend database ingestion and the document/chunk data pipeline.',

    role:
      'Backend database developer responsible for the database ingestion track, migrations, document storage, and document chunking workflow within the team project.',

    features: [
      'Business data storage',
      'Document management',
      'Document chunking',
      'PostgreSQL database integration',
      'Alembic database migrations',
      'RAG-oriented ingestion pipeline',
    ],

    whyBuilt:
      'To work on a real team project where AI, databases, backend services, and business use cases come together instead of learning each concept in isolation.',

    hardParts: [
      'Designing database migrations for businesses, documents, and document chunks',
      'Working with PostgreSQL and vector-oriented data requirements',
      'Keeping database changes reproducible through Alembic migrations',
      'Working within a shared team codebase and branch workflow',
    ],

    whatClicked:
      'I started seeing ingestion as a pipeline rather than simply inserting rows: source data has to be represented consistently, broken into useful chunks, and stored in a way that later retrieval can actually use.',

    doDifferently:
      'I would define the ingestion contracts and test fixtures even earlier so new document types can be added without changing the core pipeline.',

    tech: [
      'Python',
      'SQLAlchemy',
      'PostgreSQL',
      'Alembic',
      'RAG',
      'VoyageAI',
      'WhatsApp',
    ],

    repo: 'https://github.com/nnamanimerit94/askduka',
    status: 'in-progress',
    visibility: 'team',
    featured: false,
    categories: ['AI', 'Backend', 'Database'],
  },

  {
    id: 'fraudguard',
    date: '2026-09',
    title: 'FraudGuard',
    tagline: 'Backend services for transaction and fraud-related workflows',

    description:
      'A backend application exploring transaction storage, checkout flows, and fraud-related application logic using FastAPI.',

    whyBuilt:
      'To gain more practical experience designing APIs around financial-style transactions and understanding how backend services behave when requests succeed, fail, or need to be investigated.',

    hardParts: [
      'Designing transaction endpoints around realistic application flows',
      'Handling failures without hiding useful debugging information',
      'Keeping stored transaction data consistent across API operations',
    ],

    whatClicked:
      'Backend reliability became easier to reason about once I started treating every endpoint as part of a larger transaction flow instead of as an isolated function.',

    doDifferently:
      'I would add broader automated tests around failure scenarios and external-service boundaries earlier in development.',

    tech: [
      'Python',
      'FastAPI',
      'API',
      'Transactions',
    ],

    repo: 'https://github.com/ejemegodwin/fraudguard',
    status: 'in-progress',
    visibility: 'public',
    featured: true,
    categories: ['Backend', 'Python'],
  },

  {
    id: 'focus',
    date: '2026-09',
    title: 'Focus',
    tagline: 'A learning platform built around focused study',

    description:
      'An education-focused application designed around helping learners study programming concepts and stay focused while learning.',

    whyBuilt:
      'The project grew from the idea of making learning more interactive and structured rather than simply presenting users with static lessons.',

    hardParts: [
      'Turning a broad learning idea into features that can actually be built',
      'Designing an experience that keeps learning central instead of adding unnecessary features',
      'Connecting the product idea with a realistic technical architecture',
    ],

    whatClicked:
      'Building a product taught me that technical decisions make more sense when they are connected to a real user problem rather than chosen simply because a technology is interesting.',

    doDifferently:
      'I would define the smallest useful learning experience first and expand the product only after that core workflow is solid.',

    tech: [
      'Python',
      'Web Development',
      'Education',
    ],

    repo: 'https://github.com/ejemegodwin/focus',
    status: 'in-progress',
    visibility: 'public',
    featured: true,
    categories: ['Backend', 'Python', 'Product'],
  },

  {
    id: 'ascii-art-cli',
    date: '2025-03',
    title: 'ASCII Art CLI',
    tagline: 'Banner-style text rendering in the terminal',

    description:
      'A command-line tool that renders text as large ASCII art using banner-style fonts. One of my early projects for understanding Go fundamentals, file I/O, string manipulation, and structured problem solving.',

    whyBuilt:
      'The goal was to understand file I/O, string manipulation, and how to structure a small CLI tool from scratch.',

    hardParts: [
      'Aligning characters correctly across multi-line font templates',
      'Handling missing characters and unexpected input',
      'Keeping the rendering logic clean when fonts have different widths',
    ],

    whatClicked:
      'Thinking of each character as a fixed-height slice of the font file made the rendering algorithm much easier to understand.',

    doDifferently:
      'I would separate font parsing from rendering earlier and create more tests around edge cases.',

    tech: ['Go', 'CLI', 'File I/O'],

    repo: 'https://github.com/ejemegodwin/ascii-art',
    status: 'completed',
    visibility: 'public',
    featured: false,
    categories: ['Go', 'CLI'],
  },
]

export const site = {
  name: 'Ejeme Godwin',
  role: 'Backend / Full-Stack Developer',
  tagline:
    'I build systems, break them, understand why they broke, and build them better.',

  about: [
    'This portfolio is a living record of my development journey. I care about understanding how systems work, documenting the difficult parts, and learning from what breaks.',
    'My current focus is backend engineering with Python, databases, APIs, and increasingly data analysis.',
  ],

  links: {
    github: 'https://github.com/ejemegodwin',
    email: 'mailto:godwinejeme@gmail.com',
  },
}