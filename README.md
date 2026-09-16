# Animated Scroll Portfolio

A single-page personal portfolio where scrolling reveals each project with subtle fade/slide animations (Intersection Observer). Built as a **progress tracker** — honest writeups over polish.

## Stack

- React + Vite
- Plain CSS (no UI kit)
- `IntersectionObserver` for scroll-in reveals
- lucide-react for small icons

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Customize

Edit **`src/data/projects.js`**:

- `site` — your name, role, about blurb, GitHub/email
- `projects` — each entry is one scroll section

Per project fields:

| Field | Purpose |
| --- | --- |
| `date` | Timeline label (`YYYY-MM`) |
| `title` / `tagline` / `description` | What it is |
| `whyBuilt` | Context (e.g. zone01) |
| `hardParts` | What was genuinely difficult |
| `whatClicked` | The insight that unlocked it |
| `doDifferently` | Hindsight |
| `tech` | Tags |
| `repo` | Link |
| `status` | `completed` or `in-progress` |

## Animation (Option A)

Sections start hidden (`.reveal`) and get `.in-view` when ~20% visible. Timing lives in `src/index.css` (`--duration`, `--ease-out`). Respects `prefers-reduced-motion`.

## Project layout

```
src/
├── data/projects.js          # content
├── hooks/useInView.js        # Intersection Observer
├── components/
│   ├── Nav.jsx               # sticky nav + scroll progress
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── ProjectSection.jsx
│   └── Footer.jsx
├── App.jsx
├── App.css
└── index.css
```

## Later ideas

- Optional full-screen `scroll-snap` (Option C)
- Light parallax on decorative layers (Option B)
- Real screenshots under `public/` or `src/assets/`
