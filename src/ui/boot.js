// ─────────────────────────────────────────────────────────────
//  Shared per-page bootstrap. Every page calls bootPage(html).
// ─────────────────────────────────────────────────────────────
import '../style.css'
import {
  initSmoothScroll, initReveals, initMarquees, initCounters,
  initTilt, initCursor, initNav, initDevice, initBuild,
} from './interactions.js'

// when the page is embedded (e.g. inside the hero browser preview) we drop
// the custom cursor + smooth-scroll so it behaves like a normal iframe
const embedded = new URLSearchParams(location.search).has('embed')
if (embedded) document.documentElement.classList.add('is-embed')

export function bootPage(html) {
  // paint content synchronously — no loading screen, instant first render
  document.getElementById('app').innerHTML = html

  initNav()
  initReveals()

  if (!embedded) {
    initCursor()
    initSmoothScroll()
    initDevice()
  }

  // measure-dependent bits after first paint
  requestAnimationFrame(() => {
    initMarquees()
    initCounters()
    initTilt()
    initBuild()
  })
}
