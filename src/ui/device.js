// ─────────────────────────────────────────────────────────────
//  3D device mockups (browser window + phone) with a LIVE,
//  interactive mini-website inside — the user can scroll, hover
//  and click within the screen. Pure DOM + CSS 3D (no WebGL).
// ─────────────────────────────────────────────────────────────

// mini website shown inside the browser screen
function miniSite() {
  return `
  <div class="mw">
    <header class="mw__nav">
      <span class="mw__logo"><i></i> Techi</span>
      <nav>
        <a href="#mw-home" data-mini>Home</a>
        <a href="#mw-work" data-mini>Work</a>
        <a href="#mw-contact" data-mini>Say hi</a>
      </nav>
    </header>

    <section class="mw__hero" id="mw-home">
      <span class="mw__tag">Digital agency</span>
      <h3>We build <span>bold</span> brands.</h3>
      <p>Websites, apps & identities that convert.</p>
      <div class="mw__btns">
        <button class="mw__btn" data-mini="#mw-contact">Start a project →</button>
        <button class="mw__btn mw__btn--ghost" data-mini="#mw-work">See work</button>
      </div>
    </section>

    <section class="mw__feats">
      <div class="mw__feat"><b>01</b><span>Design</span></div>
      <div class="mw__feat"><b>02</b><span>Code</span></div>
      <div class="mw__feat"><b>03</b><span>Grow</span></div>
    </section>

    <section class="mw__work" id="mw-work">
      <h4>Recent work</h4>
      <div class="mw__grid">
        <a class="mw__tile t1">Swift Cart</a>
        <a class="mw__tile t2">BLAD Homes</a>
        <a class="mw__tile t3">DESIGNSCO</a>
        <a class="mw__tile t4">Ecom UI</a>
      </div>
    </section>

    <section class="mw__cta" id="mw-contact">
      <h4>Let's talk.</h4>
      <button class="mw__btn">hello@techichamps.com</button>
    </section>

    <footer class="mw__foot">© Techi Champs — live preview</footer>
  </div>`
}

// mini app shown inside the phone screen
function miniApp() {
  return `
  <div class="ma">
    <div class="ma__status"><span>9:41</span><span>▚ ▪ ▮</span></div>
    <div class="ma__head">
      <span class="ma__hi">Hi, Champ 👋</span>
      <span class="ma__title">Your projects</span>
    </div>
    <div class="ma__card">
      <span>Active project</span>
      <b>Brand + Website</b>
      <div class="ma__bar"><i></i></div>
      <small>72% complete</small>
    </div>
    <div class="ma__list">
      <div class="ma__row"><span>🎨 Design</span><b>Done</b></div>
      <div class="ma__row"><span>💻 Build</span><b>In progress</b></div>
      <div class="ma__row"><span>🚀 Launch</span><b>Soon</b></div>
    </div>
    <button class="ma__cta">Book a call</button>
  </div>`
}

// which real page loads inside the browser preview
const PREVIEW_PAGE = 'services.html?embed'

export function deviceStage() {
  return `
  <div class="devices" data-device>
    <div class="browser" data-device-el>
      <div class="browser__bar">
        <span class="browser__dots"><i></i><i></i><i></i></span>
        <span class="browser__url">🔒 techichamps.com/services</span>
        <span class="browser__live">● live</span>
      </div>
      <div class="browser__screen">
        <div class="browser__mock">${miniSite()}</div>
        <iframe class="browser__frame" data-src="${PREVIEW_PAGE}" title="Techi Champs — Services (live preview)" scrolling="yes" loading="lazy"></iframe>
      </div>
    </div>

    <div class="phone" data-device-el>
      <span class="phone__notch"></span>
      <div class="phone__screen" data-lenis-prevent>${miniApp()}</div>
    </div>

    <span class="devices__hint">↑ real services page — scroll inside, it's live</span>
  </div>`
}
