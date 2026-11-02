import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const projectSlug = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App projectSlug={projectSlug} />
  </StrictMode>,
)
