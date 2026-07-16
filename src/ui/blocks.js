// ─────────────────────────────────────────────────────────────
//  Reusable content blocks. Pages compose these as needed.
// ─────────────────────────────────────────────────────────────
import {
  brand, hero, services, stats, about, process, work,
  techStack, reviews, cta, guarantees, faqs, budgets,
} from '../data/content.js'
import { icons } from './icons.js'
import { arrow } from './partials.js'
import { deviceStage } from './device.js'

/* ── HOME hero (with the interactive 3D device stage) ── */
export function heroBlock() {
  const [l1, l2, l3] = hero.lines
  return `
  <section class="hero wrap" id="home">
    <div class="hero__grid">
      <div class="hero__copy">
        <span class="tag hero__badge" data-reveal>${hero.badge}</span>
        <h1 class="hero__title" data-reveal>
          <span class="l"><span>${l1}</span></span>
          <span class="l"><span>${l2}</span></span>
          <span class="l"><span>${l3}</span></span>
        </h1>
        <div class="hero__blurb" data-reveal>
          <span class="star">✳</span>
          <p>${hero.blurb}</p>
        </div>
        <div class="hero__cta" data-reveal>
          <a href="contact.html" class="btn" data-cursor>Start a Project ${arrow}</a>
          <span class="hero__scribble">Let's create something epic!</span>
        </div>
        <div class="scroll-cue" data-reveal><i></i> Scroll to explore</div>
      </div>
      <div class="hero__stage" data-reveal>
        ${deviceStage()}
      </div>
    </div>
  </section>`
}

/* ── section heading helper ── */
function head(num, title, extra = '') {
  return `
  <div class="section__head">
    <div>
      <span class="section__num" data-reveal>${num}</span>
      <h2 class="section__title" data-reveal style="margin-top:16px">${title}</h2>
    </div>
    ${extra}
  </div>`
}

/* ── SERVICES grid ── */
export function servicesBlock({ heading = 'We build <em>bold</em> digital things.', num = '02 — What we do' } = {}) {
  const cards = services
    .map(
      (svc) => `
    <article class="card" data-tilt data-reveal>
      <div class="card__no">${svc.no}</div>
      <div class="card__brush">${icons[svc.icon]}</div>
      <h3 class="card__title">${svc.title}</h3>
      <p class="card__desc">${svc.desc}</p>
      <a href="contact.html" class="card__link" data-cursor>Learn more →</a>
    </article>`
    )
    .join('')
  return `
  <section class="section">
    <div class="wrap">
      ${head(num, heading, '<p style="max-width:34ch;font-size:.9rem" data-reveal>From first sketch to final ship — design, code, brand and growth under one roof.</p>')}
      <div class="services__grid">${cards}</div>
    </div>
  </section>`
}

/* ── STATS ── */
export function statsBlock({ paper = true } = {}) {
  const cells = stats
    .map(
      (st) => `
    <div class="stat">
      <div class="stat__num" data-count="${st.value}" data-suffix="${st.suffix}">0${st.suffix}</div>
      <div class="stat__label">${st.label}</div>
    </div>`
    )
    .join('')
  return `<section class="section ${paper ? 'section--paper' : ''}"><div class="wrap"><div class="stats" data-reveal>${cells}</div></div></section>`
}

/* ── ABOUT ── */
export function aboutBlock() {
  const body = about.body.map((p) => `<p>${p}</p>`).join('')
  const pillars = about.pillars.map((p) => `<li>${p}</li>`).join('')
  return `
  <section class="section">
    <div class="wrap about">
      <div class="about__body">
        <span class="section__num" data-reveal>Who we are</span>
        <h2 class="section__title" data-reveal style="margin:16px 0 26px">${about.heading}</h2>
        <div data-reveal>${body}</div>
        <ul class="about__pillars" data-reveal>${pillars}</ul>
      </div>
      <div class="about__visual" data-reveal data-tilt>
        <div class="big">Ideas<br>Design<br>Impact</div>
        <div class="rot">est. — creative digital agency</div>
      </div>
    </div>
  </section>`
}

/* ── PROCESS ── */
export function processBlock({ paper = true } = {}) {
  const rows = process
    .map(
      (p) => `
    <div class="proc" data-reveal>
      <div class="proc__no">${p.no}</div>
      <div class="proc__title">${p.title}</div>
      <div class="proc__desc">${p.desc}</div>
      <div class="proc__dot"></div>
    </div>`
    )
    .join('')
  return `
  <section class="section ${paper ? 'section--paper' : ''}">
    <div class="wrap">
      ${head('How we work', 'Our <em>process</em>.')}
      <div class="process__list">${rows}</div>
    </div>
  </section>`
}

/* ── WORK ── */
export function workBlock() {
  const tiles = work
    .map(
      (w, i) => `
    <a href="contact.html" class="tile" data-tilt data-reveal data-cursor>
      <span class="tile__num">0${i + 1}</span>
      <span class="tile__year">${w.year}</span>
      <span class="tile__bg">${w.title.split(' ')[0]}</span>
      <div class="tile__meta">
        <span class="tile__tag">${w.tag}</span>
        <div class="tile__title">${w.title}</div>
      </div>
    </a>`
    )
    .join('')
  return `
  <section class="section">
    <div class="wrap">
      ${head('Selected work', 'Recent <em>projects</em>.', '<a href="contact.html" class="btn btn--ink" data-cursor>Start yours ' + arrow + '</a>')}
      <div class="work__grid">${tiles}</div>
    </div>
  </section>`
}

/* ── TECH STACK (dark) ── */
export function techBlock() {
  const pills = techStack.map((t) => `<li>${t}</li>`).join('')
  return `
  <section class="section section--ink">
    <div class="wrap">
      <div class="section__head">
        <div>
          <span class="section__num" data-reveal>Our toolkit</span>
          <h2 class="section__title" data-reveal style="margin-top:16px;color:var(--cream)">Latest tech, <em>done right</em>.</h2>
        </div>
        <p style="max-width:34ch;font-size:.9rem;color:rgba(243,238,225,.7)" data-reveal>
          Modern, battle-tested stacks — fast, secure and built to scale with your business.
        </p>
      </div>
      <ul class="tech" data-reveal>${pills}</ul>
    </div>
  </section>`
}

/* ── REVIEWS ── */
export function reviewsBlock({ paper = true } = {}) {
  const cards = reviews
    .map(
      (r) => `
    <figure class="quote" data-reveal>
      <div class="quote__stars">★★★★★</div>
      <blockquote class="quote__text">"${r.quote}"</blockquote>
      <figcaption class="quote__who">
        <div class="quote__name">${r.name}</div>
        <div class="quote__role">${r.role}</div>
      </figcaption>
    </figure>`
    )
    .join('')
  return `
  <section class="section ${paper ? 'section--paper' : ''}">
    <div class="wrap">
      ${head('Kind words', 'Clients <em>love</em> us.', '<p style="font-family:var(--display);font-size:2.4rem" data-reveal>4.9<span style="font-size:1rem;font-family:var(--mono)">/5 · 200+ reviews</span></p>')}
      <div class="reviews__track">${cards}</div>
    </div>
  </section>`
}

/* ── FAQ ── */
export function faqBlock() {
  const rows = faqs
    .map(
      (f, i) => `
    <details class="faq" data-reveal ${i === 0 ? 'open' : ''}>
      <summary data-cursor><span>${f.q}</span><i>+</i></summary>
      <p>${f.a}</p>
    </details>`
    )
    .join('')
  return `
  <section class="section">
    <div class="wrap">
      ${head('Good to know', 'Frequently <em>asked</em>.')}
      <div class="faqs">${rows}</div>
    </div>
  </section>`
}

/* ── GUARANTEES band ── */
export function guaranteesBand() {
  const items = guarantees.map((g) => `<span class="guarantee"><i>✓</i>${g}</span>`).join('')
  return `<div class="guarantees-band"><div class="wrap guarantees">${items}</div></div>`
}

/* ── CTA ── */
export function ctaBlock() {
  const chips = budgets.map((b) => `<span class="chip">${b}</span>`).join('')
  return `
  <section class="section cta" id="contact">
    <div class="wrap">
      <span class="cta__avail" data-reveal>${cta.sub}</span>
      <h2 class="cta__title" data-reveal>Let's build<br>something <em>awesome</em>.</h2>
      <a href="mailto:${brand.email}?subject=New%20project%20enquiry" class="cta__mail" data-cursor data-reveal>${brand.email}</a>
      <div class="cta__chips" data-reveal>
        <span class="cta__chips-label">Project budget?</span>
        ${chips}
      </div>
      <div class="cta__actions" data-reveal>
        <a href="mailto:${brand.email}?subject=Free%20consultation" class="btn" data-cursor>Get a free consultation ${arrow}</a>
        <a href="work.html" class="btn btn--yellow" data-cursor>View our work ${arrow}</a>
      </div>
    </div>
  </section>`
}

/* ── compact preview strip for the home page (links to full pages) ── */
export function homeIntro() {
  return `
  <section class="section section--paper">
    <div class="wrap about">
      <div class="about__body">
        <span class="section__num" data-reveal>Who we are</span>
        <h2 class="section__title" data-reveal style="margin:16px 0 26px">${about.heading}</h2>
        <div data-reveal><p>${about.body[0]}</p></div>
        <div style="margin-top:26px" data-reveal>
          <a href="about.html" class="btn btn--ink" data-cursor>More about us ${arrow}</a>
        </div>
      </div>
      <div class="about__visual" data-reveal data-tilt>
        <div class="big">Ideas<br>Design<br>Impact</div>
        <div class="rot">est. — creative digital agency</div>
      </div>
    </div>
  </section>`
}
