// ─────────────────────────────────────────────────────────────
//  Cookie consent banner. Stores the choice in localStorage and
//  exposes window.tcConsent ('accepted' | 'declined') so analytics
//  (GA4/GTM) can gate loading on it once a tracking ID is added.
// ─────────────────────────────────────────────────────────────
const KEY = 'tc-consent'

export function initConsent() {
  let saved = null
  try { saved = localStorage.getItem(KEY) } catch (e) { /* private mode */ }
  window.tcConsent = saved || 'pending'
  if (saved) return // already chosen — nothing to show

  const el = document.createElement('div')
  el.className = 'consent'
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-label', 'Cookie consent')
  el.innerHTML = `
    <p class="consent__txt">
      We use minimal cookies to make the site work and (with your OK) to understand what's useful.
      See our <a href="/privacy" data-cursor>Privacy Policy</a>.
    </p>
    <div class="consent__btns">
      <button class="consent__btn consent__btn--no" data-cursor>Decline</button>
      <button class="consent__btn consent__btn--yes" data-cursor>Accept</button>
    </div>`

  document.body.appendChild(el)
  requestAnimationFrame(() => el.classList.add('in'))

  const choose = (val) => {
    try { localStorage.setItem(KEY, val) } catch (e) { /* ignore */ }
    window.tcConsent = val
    window.dispatchEvent(new CustomEvent('tc-consent', { detail: val }))
    el.classList.remove('in')
    setTimeout(() => el.remove(), 400)
  }

  el.querySelector('.consent__btn--yes').addEventListener('click', () => choose('accepted'))
  el.querySelector('.consent__btn--no').addEventListener('click', () => choose('declined'))
}
