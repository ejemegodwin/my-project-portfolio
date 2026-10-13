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
      'Neon',
    ],

    repo: 'https://github.com/andrewokala/godand-bank',
    status: 'in-progress',
    visibility: 'team',
    relationship: 'Collaborative contribution',
    featured: true,
    categories: ['Backend', 'Python', 'Database'],
  },

  {
    id: 'tracker',
    date: '2026-10',
    title: 'CashFlow Tracker',
    tagline:
      'A cash flow dashboard for tracking sales, expenses, and customer debts',

    description:
      'CashFlow Tracker is a React web application for recording business sales and expenses, tracking customer debts, and reviewing key financial totals in one dashboard. It uses Supabase PostgreSQL to store records and provides separate views for sales, expenses, and debt management. Users can record transactions, categorize expenses, mark debts as paid, and review total sales, expenses, estimated profit, and outstanding debt.',

    role:
      'Full-stack developer responsible for building the React interface, connecting the application to Supabase, and implementing sales, expense, debt-tracking, and dashboard functionality.',

    features: [
      'Dashboard summarizing total sales, expenses, estimated profit, and outstanding debts',
      'Sales records with item or service, amount, optional customer name, and date',
      'Expense tracking with amount, category, description, and date',
      'Customer debt records with amount, reason, and payment status',
      'Ability to mark customer debts as paid',
      'Separate views for dashboard, sales, expenses, and debts',
      'Supabase PostgreSQL integration for storing financial records',
      'Light and dark theme support',
      'Responsive interface for different screen sizes',
    ],

    whyBuilt:
      'I built CashFlow Tracker to explore how a simple web application can help small business owners keep track of their daily financial activities. The project gave me practical experience connecting a React interface to a PostgreSQL database through Supabase while organizing sales, expenses, and customer debts into one place.',

    hardParts: [
      'Connecting the React application to Supabase and organizing database operations',
      'Designing separate workflows for sales, expenses, and customer debt records',
      'Calculating total sales, expenses, profit, and outstanding debts from stored records',
      'Keeping the displayed lists and financial summaries consistent after changes',
      'Handling debt payment-status updates and refreshing the relevant interface',
      'Building a responsive interface with light and dark theme support',
    ],

    whatClicked:
      'I learned that a financial dashboard is only useful when its numbers reflect the underlying records accurately. Connecting the interface to a database also taught me to think beyond displaying forms: I need to consider how data is stored, retrieved, updated, and reflected in the user interface. Separating sales, expenses, and debts into distinct workflows helped me understand how individual features contribute to one complete application.',

    outcome:
      'CashFlow Tracker demonstrates my ability to build a React application that connects to a PostgreSQL database through Supabase. It brings together financial record management, dashboard summaries, debt-status updates, and responsive interface design in one project. It also strengthened my understanding of how frontend components, database operations, and business calculations work together in a practical application.',

    doDifferently:
      'I would add automated tests for financial calculations, database operations, and debt-status changes earlier in development. I would also implement authentication and stricter database access policies before using the application with real customer financial records. Finally, I would improve error handling and ensure dashboard summaries refresh reliably whenever records change.',

    tech: [
      'React',
      'JavaScript',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'CSS',
      'React Hooks',
    ],

    repo: 'https://github.com/ejemegodwin/tracker',
    status: 'in-progress',
    visibility: 'public',
    featured: false,
    categories: ['Full-Stack', 'React', 'Finance'],
  },

  {
    id: 'askduka',
    date: '2026-09',
    title: 'AskDuka',
    tagline: 'AI-powered WhatsApp business assistant',

    description:
      'Backend developer on a team building an AI-powered WhatsApp Business Assistant. Responsible for the database and document-ingestion foundation, including PostgreSQL schema design, document parsing and chunking, Voyage AI embeddings, persistent storage, semantic retrieval, and automated testing.',

    role:
      'Backend database developer responsible for the database ingestion track, migrations, document storage, and document chunking workflow within the team project.',

    features: [
      'PostgreSQL database schema for businesses, documents, and document chunks',
      'Document parsing and overlapping text chunking',
      'Voyage AI embeddings for semantic search',
      'Persistent storage of document chunks and vector embeddings',
      'Semantic retrieval with business-level data isolation',
      'Error handling, transaction rollback, and cleanup',
      'Automated tests for ingestion, retrieval, and database operations',
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
      'PostgreSQL',
      'pgvector',
      'SQLAlchemy',
      'Alembic',
      'Voyage AI',
      'pytest',
      'RAG',
      'WhatsApp',
      'FastAPI',
      'ollama',
      'Neon',
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
    tagline: 'Explainable fraud detection and risk analysis for e-commerce transactions',
    description:
      'An e-commerce fraud detection system that evaluates transaction risk using explainable scoring rules and machine-learning-based anomaly detection. Built with Python, FastAPI, and Go, it combines transaction history, risk analysis, checkout workflows, and payment verification to explore how fraud prevention can work across interconnected backend services.',

    role:
      'Backend developer working on fraud-risk analysis, transaction handling, API development, and e-commerce workflows. Focused on understanding how risk-scoring rules, historical transaction data, and anomaly detection can support fraud investigation.',
    
    features: [
      'Rule-based fraud scoring with explainable risk decisions',
      'SQLite transaction persistence and duplicate-request protection',
      'Transaction history, filtering, pagination, and statistics',
      'Historical analytics with pandas',
      'Isolation Forest anomaly detection',
      'Go-based checkout and order-management workflows',
      'Flutterwave payment verification and webhook handling',
      'Fraud-review dashboard and automated test workflows',
    ],

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
      'Go',
      'SQLite',
      'pandas',
      'scikit-learn',
      'Flutterwave',
      'Docker',
      'Pytest',
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
    tagline: 'An interactive programming learning platform with step-by-step code visualization',

    description:
      'Focus is an interactive programming education platform that helps learners understand how code executes step by step. It combines a code visualizer for Python and Go, structured learning paths, interactive exercises, account authentication, learner progress tracking, and an administrative dashboard. The project explores how visual feedback and guided practice can make programming concepts easier to understand.',

    whyBuilt:
      'I built Focus to explore a more visual and interactive way of learning programming. Instead of only reading explanations or looking at finished code, learners can step through execution, inspect variables and the call stack, follow changes in program state, and practise through guided lessons and exercises. The goal is to make programming concepts easier to understand by showing learners what their code is doing.',

    hardParts: [
      'Capturing Python execution events with sys.settrace and turning them into navigable snapshots of program state',
      'Tracking variable values, data types, function calls, program output, and runtime errors across execution steps',
      'Running submitted code through a subprocess with execution timeouts and resource limits while recognizing that stronger isolation is still needed for production',
      'Building authentication with password hashing, session management, and role-based access for learners and administrators',
      'Testing execution tracing, error handling, execution limits, and authentication behaviour with automated tests',
    ],

    whatClicked:
      'Building Focus helped me understand how backend execution logic can power an interactive learning experience. I learned to think about program tracing as a sequence of state changes, how to capture execution details and runtime errors, and why timeouts, resource limits, and automated tests matter when running code. I also learned that building a useful learning product requires more than making features work: it requires clear feedback, structured practice, and honest attention to security limitations.',

    doDifferently:
      'I would establish a stronger execution-isolation architecture earlier, separating code execution from the main application and treating security boundaries as a core design requirement. I would also plan for persistent, server-side learning progress so users can continue across devices, then expand the platform based on feedback from actual learners.',

    tech: [
      'Python',
      'Go',
      'React',
      'JavaScript',
      'Vite',
      'SQLite',
      'REST API',
      'pytest',
      'HTML',
      'CSS',
      'Web Development',
      'Education',
    ],

    repo: 'https://github.com/ejemegodwin/focus',
    status: 'in-progress',
    visibility: 'public',
    featured: true,
    categories: ['Full-Stack', 'Backend', 'Python', 'Education'],
  },

  {
    id: 'ascii-art-cli',
    date: '2025-03',
    title: 'ASCII Art CLI',
    tagline: 'A Go CLI for rendering text with selectable ASCII banner fonts',

    description:
      'A Go command-line application that converts input text into large ASCII-art banners using selectable font files, including standard, shadow, and thinkertoy styles. It separates input validation, banner parsing, and rendering into focused functions, with automated tests covering normal input, unsupported characters, banner-file errors, and multi-line output.',

    whyBuilt:
      'I built this project to strengthen my understanding of Go by creating a practical command-line application from scratch. It gave me hands-on experience with file I/O, string manipulation, input validation, and breaking a larger problem into smaller, testable functions.',

    hardParts: [
      'Parsing banner font files into a consistent map of characters and their eight-line representations',
      'Rendering multiple characters across aligned output lines while preserving the correct spacing',
      'Validating printable ASCII input and handling unsupported characters or invalid banner files',
      'Supporting multi-line input without breaking the expected banner layout',
      'Writing automated tests for rendering, input validation, font loading, and edge cases',
    ],

    whatClicked:
      'I learned that rendering ASCII art becomes much easier when each character is represented by a fixed-height collection of lines. By mapping characters to their banner representations and building each output line systematically, I could separate the rendering logic from input handling and font loading. This helped me understand how data structures and small, focused functions make text-processing problems easier to solve.',

    doDifferently:
      'I would define clearer interfaces between input validation, banner parsing, and rendering from the beginning. I would also expand edge-case tests for malformed font files, missing glyphs, and unusual multi-line input, and document the command-line usage more clearly so other developers can understand and run the project easily.',

    tech: [
      'Go',
      'CLI',
      'File I/O',
      'Data Structures',
      'Unit Testing',
    ],
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