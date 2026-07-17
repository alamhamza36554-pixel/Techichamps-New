// ─────────────────────────────────────────────────────────────
//  Build-time SSG. Runs after `vite build`. Renders each page's HTML
//  (from the pure string templates in src/pages/pages.js) and injects
//  it into the built HTML so the content is present in View Source /
//  for crawlers. The client then hydrates the same markup.
// ─────────────────────────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = path.resolve('dist')
const { pageHTML } = await import(pathToFileURL(path.resolve('src/pages/pages.js')).href)

const map = {
  'index.html': 'home',
  'about.html': 'about',
  'services.html': 'services',
  'work.html': 'work',
  'process.html': 'process',
  'reviews.html': 'reviews',
  'contact.html': 'contact',
  'privacy.html': 'privacy',
  'terms.html': 'terms',
}

let ok = 0
for (const [file, name] of Object.entries(map)) {
  const p = path.join(DIST, file)
  if (!fs.existsSync(p)) { console.warn('  prerender skip (missing):', file); continue }
  const content = pageHTML(name)
  const src = fs.readFileSync(p, 'utf8')
  const out = src.replace(/<div id="app">\s*<\/div>/, `<div id="app">${content}</div>`)
  if (out === src) { console.warn('  prerender WARN: #app placeholder not found in', file); continue }
  fs.writeFileSync(p, out)
  console.log(`  prerendered ${file} (${content.length} chars)`)
  ok++
}
console.log(`✓ prerendered ${ok}/${Object.keys(map).length} pages`)
