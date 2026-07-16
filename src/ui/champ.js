// ─────────────────────────────────────────────────────────────
//  "Champ" chat widget — floating brand-voice AI assistant.
//  Talks to /api/champ (serverless). Keeps its own conversation
//  history and streams it up on every turn (API is stateless).
// ─────────────────────────────────────────────────────────────

const GREETING =
  "Hey! I'm Champ 👋 — Techi Champs' AI. Tell me about your project (website, app, branding…) and I'll point you the right way."

function esc(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

export function initChamp() {
  if (document.querySelector('.champ')) return

  const root = document.createElement('div')
  root.className = 'champ'
  root.innerHTML = `
    <button class="champ__fab" data-cursor aria-label="Chat with Champ">
      <span class="champ__fab-ic">💬</span>
      <span class="champ__fab-txt">Ask Champ</span>
    </button>

    <div class="champ__panel" role="dialog" aria-label="Champ AI assistant">
      <header class="champ__head">
        <div class="champ__id">
          <span class="champ__avatar">TC</span>
          <span>
            <b>Champ</b>
            <i><span class="champ__dot"></span> Techi Champs AI</i>
          </span>
        </div>
        <button class="champ__close" data-cursor aria-label="Close chat">✕</button>
      </header>

      <div class="champ__log" data-lenis-prevent></div>

      <form class="champ__form">
        <input class="champ__input" type="text" autocomplete="off"
               placeholder="Type your message…" maxlength="2000" aria-label="Message" />
        <button class="champ__send" data-cursor aria-label="Send">↑</button>
      </form>
      <div class="champ__foot">Powered by Claude · replies may be imperfect</div>
    </div>`

  document.body.appendChild(root)

  const fab = root.querySelector('.champ__fab')
  const panel = root.querySelector('.champ__panel')
  const closeBtn = root.querySelector('.champ__close')
  const log = root.querySelector('.champ__log')
  const form = root.querySelector('.champ__form')
  const input = root.querySelector('.champ__input')

  const history = [] // {role, content} sent to the API
  let busy = false

  const scroll = () => (log.scrollTop = log.scrollHeight)

  function bubble(role, text) {
    const el = document.createElement('div')
    el.className = `champ__msg champ__msg--${role}`
    el.innerHTML = esc(text).replace(/\n/g, '<br>')
    log.appendChild(el)
    scroll()
    return el
  }

  function typing() {
    const el = document.createElement('div')
    el.className = 'champ__msg champ__msg--champ champ__typing'
    el.innerHTML = '<span></span><span></span><span></span>'
    log.appendChild(el)
    scroll()
    return el
  }

  // greeting (UI only — the API history starts empty so it opens on a user turn)
  bubble('champ', GREETING)

  function open() {
    document.body.classList.add('champ-open')
    setTimeout(() => input.focus(), 250)
  }
  function close() {
    document.body.classList.remove('champ-open')
  }

  fab.addEventListener('click', () => (document.body.classList.contains('champ-open') ? close() : open()))
  closeBtn.addEventListener('click', close)

  async function send(text) {
    if (busy || !text.trim()) return
    busy = true
    input.value = ''
    bubble('user', text)
    history.push({ role: 'user', content: text })

    const dots = typing()
    try {
      const r = await fetch('/api/champ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      let data = {}
      try { data = await r.json() } catch (e) { /* non-JSON */ }
      dots.remove()

      const reply =
        data.reply ||
        (r.status === 404
          ? "I'm live once the site is deployed — run this on the deployed URL (the local dev server doesn't run the AI endpoint). Meanwhile: info@techichamps.com."
          : 'Hmm, I could not reach my brain just now. Please try again, or email info@techichamps.com.')

      bubble('champ', reply)
      // only remember successful assistant turns
      if (data.reply && !data.error) history.push({ role: 'assistant', content: data.reply })
    } catch (err) {
      dots.remove()
      bubble('champ', 'Network hiccup — please try again in a moment, or email info@techichamps.com.')
    } finally {
      busy = false
      input.focus()
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    send(input.value)
  })
}
