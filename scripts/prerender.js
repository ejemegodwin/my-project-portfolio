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
  const renderedApp = renderToString(React.createElement(App))

  const htmlPath = new URL('../dist/index.html', import.meta.url)
  const indexHtml = await readFile(htmlPath, 'utf8')
  const root = '<div id="root"></div>'

  if (!indexHtml.includes(root)) {
    throw new Error('Could not find the React root in dist/index.html')
  }

  const prerenderedHtml = indexHtml.replace(
    root,
    `<div id="root">${renderedApp}</div>`,
  )

  await writeFile(htmlPath, prerenderedHtml)
  console.log('Portfolio HTML prerendered successfully.')
} finally {
  await server.close()
}
