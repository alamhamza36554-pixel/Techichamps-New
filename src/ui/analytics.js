// ─────────────────────────────────────────────────────────────
//  GA4 / Google Analytics loader.
//  Privacy-first: nothing loads until the visitor clicks "Accept" on
//  the cookie banner. To ACTIVATE, put your Measurement ID in GA_ID
//  below (e.g. 'G-XXXXXXXXXX') or add <meta name="ga-id" content="G-…">.
//  While GA_ID is empty this is a no-op (no tracking, no network).
// ─────────────────────────────────────────────────────────────
const GA_ID = '' // ← paste your GA4 Measurement ID here to enable

function measurementId() {
  if (GA_ID) return GA_ID
  const meta = document.querySelector('meta[name="ga-id"]')
  return (meta && meta.content) || ''
}

let loaded = false
function load() {
  const gid = measurementId()
  if (loaded || !gid) return
  loaded = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gid}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', gid, { anonymize_ip: true })
}

export function initAnalytics() {
  if (!measurementId()) return // not configured — do nothing
  if (window.tcConsent === 'accepted') load()
  window.addEventListener('tc-consent', (e) => {
    if (e.detail === 'accepted') load()
  })
}
