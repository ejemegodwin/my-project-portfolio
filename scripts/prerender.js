import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, writeFile } from 'node:fs/promises'

const server = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const htmlPath = new URL('../dist/index.html', import.meta.url)
  const indexHtml = await readFile(htmlPath, 'utf8')
  const root = '<div id="root"></div>'

  if (!indexHtml.includes(root)) {
    throw new Error('Could not find the React root in dist/index.html')
  }

  const { projects } = await server.ssrLoadModule('/src/data/projects.js')
  const renderPage = (projectSlug) => indexHtml.replace(
    root,
    `<div id="root">${renderToString(React.createElement(App, { projectSlug }))}</div>`,
  )

  await writeFile(htmlPath, renderPage())
  for (const project of projects) {
    const projectDir = new URL(`../dist/projects/${project.id}/`, import.meta.url)
    await (await import('node:fs/promises')).mkdir(projectDir, { recursive: true })
    await writeFile(new URL('index.html', projectDir), renderPage(project.id))
  }
  console.log(`Portfolio and ${projects.length} project case studies prerendered successfully.`)
} finally {
  await server.close()
}
