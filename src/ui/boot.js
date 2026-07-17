// ─────────────────────────────────────────────────────────────
//  Shared per-page bootstrap. Every page calls bootPage(html).
// ─────────────────────────────────────────────────────────────
import '../style.css'
import {
  initSmoothScroll, initReveals, initMarquees, initCounters,
  initTilt, initCursor, initNav, initDevice, initBuild, initContactForm,
} from './interactions.js'
import { initChamp } from './champ.js'
import { initConsent } from './consent.js'
import { initAnalytics } from './analytics.js'

// when the page is embedded (e.g. inside the hero browser preview) we drop
// the custom cursor + smooth-scroll so it behaves like a normal iframe
const embedded = new URLSearchParams(location.search).has('embed')
if (embedded) document.documentElement.classList.add('is-embed')

export function bootPage(html) {
  // Hydrate: if the page was prerendered (SSG), the markup is already there —
  // keep it and just wire up behaviour. On the dev server #app is empty, so
  // we render it client-side.
  const app = document.getElementById('app')
  if (app && !app.children.length) app.innerHTML = html

  initNav()
  initReveals()
  initContactForm()

  if (!embedded) {
    initCursor()
    initSmoothScroll()
    initDevice()
    initChamp()
    initConsent()
    initAnalytics()
  }

  // measure-dependent bits after first paint
  requestAnimationFrame(() => {
    initMarquees()
    initCounters()
    initTilt()
    initBuild()
  })
}
