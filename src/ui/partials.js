// ─────────────────────────────────────────────────────────────
//  Shared layout partials used by every page: nav, footer,
//  page header, sticker, marquee.
// ─────────────────────────────────────────────────────────────
import { brand, nav, socials, services } from '../data/content.js'

export const arrow = '<span class="arrow">↗</span>'

// map nav label → real page url
export const pageUrl = (label) =>
  label.toLowerCase() === 'home' ? 'index.html' : `${label.toLowerCase()}.html`

export const logo = (mod, label = brand.name) =>
  `<span class="brand brand--${mod}" role="img" aria-label="${label}"></span>`

export function navBar(active = 'home') {
  const links = nav
    .map((n) => {
      const key = n.toLowerCase()
      return `<a href="${pageUrl(n)}" class="${key === active ? 'is-active' : ''}" data-cursor>${n}</a>`
    })
    .join('')
  const panelLinks = nav.map((n) => `<a href="${pageUrl(n)}" data-menu-link>${n}</a>`).join('')
  return `
  <header class="nav">
    <div class="wrap nav__row">
      <a href="index.html" class="nav__logo" data-cursor aria-label="Techi Champs home">${logo('nav')}</a>
      <nav class="nav__links">${links}</nav>
      <a href="contact.html" class="btn btn--talk" data-cursor>Let's Talk ${arrow}</a>
      <button class="nav__burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="nav__panel">${panelLinks}
    <a href="mailto:${brand.email}" class="btn btn--yellow" style="margin-top:18px;align-self:flex-start" data-menu-link>${brand.email} ${arrow}</a>
  </div>`
}

// rotating DESIGN · CODE · GROW · REPEAT sticker
export function sticker() {
  return `
  <div class="sticker" data-cursor>
    <svg viewBox="0 0 200 200">
      <defs>
        <path id="circlePath" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/>
      </defs>
      <circle cx="100" cy="100" r="92" fill="#ff5a4f" stroke="#151311" stroke-width="3"/>
      <text fill="#151311" font-family="'Space Mono',monospace" font-weight="700" font-size="19" letter-spacing="5">
        <textPath href="#circlePath">DESIGN · CODE · GROW · REPEAT · </textPath>
      </text>
    </svg>
    <span class="sticker__badge">☺</span>
  </div>`
}

export function marqueeBar(items, mod = '') {
  const row = items.map((i) => `<span>${i}</span>`).join('')
  return `
  <div class="marquee ${mod}" data-marquee>
    <div class="marquee__track">${row.repeat(2)}</div>
  </div>`
}

// bold header for inner pages
export function pageHeader(num, title, sub, crumb) {
  return `
  <header class="pagehead">
    <div class="wrap">
      <nav class="crumbs" data-reveal><a href="index.html" data-cursor>Home</a> <span>/</span> ${crumb}</nav>
      <span class="pagehead__num" data-reveal>${num}</span>
      <h1 class="pagehead__title" data-reveal>${title}</h1>
      <p class="pagehead__sub" data-reveal>${sub}</p>
    </div>
    ${sticker()}
  </header>`
}

export function footer() {
  const linkCol = (title, arr) =>
    `<div class="footer__col"><h4>${title}</h4>${arr.map((a) => `<a href="${a.href}" data-cursor>${a.label}</a>`).join('')}</div>`
  const menu = nav.map((n) => ({ label: n, href: pageUrl(n) }))
  const serviceLinks = services.map((s) => ({ label: s.title, href: 'services.html' }))
  const soc = socials
    .map((s) => `<a href="${s.href}" target="_blank" rel="noopener" data-cursor title="${s.label}">${s.short}</a>`)
    .join('')
  return `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div>
          ${logo('footer')}
          <p style="max-width:30ch;margin-top:20px;font-size:.86rem;color:rgba(243,238,225,.7)">
            ${brand.tagline}. Your digital champions — bold ideas, clean code, real impact.
          </p>
          <div class="footer__socials">${soc}</div>
        </div>
        <div class="footer__cols">
          ${linkCol('Menu', menu)}
          ${linkCol('Services', serviceLinks)}
          <div class="footer__col">
            <h4>Get in touch</h4>
            <a href="mailto:${brand.email}" data-cursor>${brand.email}</a>
            <a href="contact.html" data-cursor>Book a consultation</a>
            <a href="contact.html" data-cursor>Start a project</a>
          </div>
        </div>
      </div>
      <div class="footer__bar">
        <span>© 2026 Techi Champs. All rights reserved.</span>
        <span class="footer__legal">
          <a href="privacy.html" data-cursor>Privacy</a> ·
          <a href="terms.html" data-cursor>Terms</a> ·
          Ideas · Design · Impact
        </span>
      </div>
    </div>
  </footer>`
}
