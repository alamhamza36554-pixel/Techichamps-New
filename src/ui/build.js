// ─────────────────────────────────────────────────────────────
//  "Watch a website get built" — a sticky, scroll-driven story.
//  As the user scrolls: Discover → Plan (wireframe) → Design
//  (colours fill in) → Build (code types out) → Launch (live site).
// ─────────────────────────────────────────────────────────────
import { process } from '../data/content.js'

// shared layout mock — wireframe & design share geometry so the
// crossfade reads as the site literally "colouring in"
function siteMock(mode) {
  return `
  <div class="mock mock--${mode}">
    <div class="mock__nav">
      <span class="mock__logo"></span>
      <span class="mock__menu"><i></i><i></i><i></i><i></i></span>
    </div>
    <div class="mock__hero">
      <div class="mock__copy">
        <span class="mock__tag"></span>
        <div class="mock__h mock__h1"></div>
        <div class="mock__h mock__h2"></div>
        <div class="mock__h mock__h3"></div>
        <div class="mock__btn"></div>
      </div>
      <div class="mock__art"></div>
    </div>
    <div class="mock__cards"><span></span><span></span><span></span></div>
  </div>`
}

function discoverBoard() {
  const notes = [
    { t: 'Goals', c: 'y' },
    { t: 'Audience', c: 'r' },
    { t: 'Market', c: 'y' },
    { t: 'Brand', c: 'd' },
    { t: 'Content', c: 'r' },
    { t: 'Scope', c: 'y' },
  ]
  return `
  <div class="discover">
    <div class="discover__head"><span class="discover__mag">◎</span> Research & discovery</div>
    <div class="discover__notes">
      ${notes.map((n) => `<span class="note note--${n.c}">${n.t}</span>`).join('')}
    </div>
    <div class="discover__lines"><i></i><i></i><i></i></div>
  </div>`
}

function codeEditor() {
  // each .cl line reveals as the user scrolls through the Build stage
  const L = (html) => `<span class="cl">${html}</span>`
  const t = (s) => `<span class="tok-t">${s}</span>`
  const a = (s) => `<span class="tok-a">${s}</span>`
  const s = (s) => `<span class="tok-s">${s}</span>`
  const c = (s) => `<span class="tok-c">${s}</span>`
  const lines = [
    `${c('// build the hero')}`,
    `${t('&lt;section')} ${a('class')}=${s('"hero"')}${t('&gt;')}`,
    `  ${t('&lt;span')} ${a('class')}=${s('"tag"')}${t('&gt;')}Digital agency${t('&lt;/span&gt;')}`,
    `  ${t('&lt;h1&gt;')}We build ${t('&lt;em&gt;')}bold${t('&lt;/em&gt;')} brands.${t('&lt;/h1&gt;')}`,
    `  ${t('&lt;a')} ${a('class')}=${s('"btn"')} ${a('href')}=${s('"#"')}${t('&gt;')}Start ↗${t('&lt;/a&gt;')}`,
    `${t('&lt;/section&gt;')}`,
    ``,
    `${a('.hero')} {`,
    `  ${a('display')}: grid;`,
    `  ${a('background')}: ${s('#f3eee1')};`,
    `  ${a('color')}: ${s('#151311')};`,
    `}`,
    `${c('// ✓ shipped')}`,
  ]
  return `
  <div class="code">
    <div class="code__chrome"><span class="code__file">index.html</span><span class="code__file code__file--dim">style.css</span></div>
    <pre class="code__pre"><code>${lines.map(L).join('\n')}</code></pre>
    <div class="code__cursor"></div>
  </div>`
}

function liveSite() {
  return `
  <div class="live">
    <div class="live__nav"><span class="live__logo">TC</span><span class="live__menu"><i></i><i></i><i></i></span><span class="live__cta">Let's talk</span></div>
    <div class="live__hero">
      <span class="live__tag">Digital agency</span>
      <h4>We build <span>bold</span> brands.</h4>
      <p>Websites, apps & identities that convert.</p>
      <span class="live__btn">Start a project ↗</span>
    </div>
    <div class="live__cards"><span class="c1"></span><span class="c2"></span><span class="c3"></span></div>
    <span class="live__ribbon">● LIVE</span>
    <span class="live__pointer"></span>
  </div>`
}

export function buildSection() {
  const stages = [
    { url: '◎ discovery-notes', cap: 'Digging into goals, audience & brand.' },
    { url: 'wireframe.fig', cap: 'Mapping the layout — structure first.' },
    { url: 'design.fig', cap: 'Bold design — colour, type & personality.' },
    { url: '~/techichamps — build', cap: 'Clean, modern code. Fast & scalable.' },
    { url: 'https://techichamps.com', cap: "It's live. Bold ideas, real impact." },
  ]

  const dots = process
    .map((p, i) => `<span class="build__dot" data-dot="${i}"><b>${p.no}</b>${p.title}</span>`)
    .join('')

  const steps = process
    .map(
      (p, i) => `
    <div class="build__step" data-step="${i}">
      <span class="build__step-no">${p.no}</span>
      <h3 class="build__step-title">${p.title}</h3>
      <p class="build__step-desc">${p.desc}</p>
    </div>`
    )
    .join('')

  return `
  <section class="build">
    <div class="build__intro wrap">
      <span class="section__num" data-reveal>The magic, live</span>
      <h2 class="section__title" data-reveal style="margin-top:16px">Watch a website <em>build itself</em>.</h2>
      <p data-reveal style="max-width:46ch;margin-top:14px;color:var(--ink-soft)">Keep scrolling ↓ — from a blank idea to a living, breathing site, one step at a time.</p>
    </div>

    <div class="build__track" data-build="${JSON.stringify(stages).replace(/"/g, '&quot;')}">
      <div class="build__sticky">
        <div class="wrap build__cols">
          <div class="build__side">
            <div class="build__rail">${dots}</div>
            <div class="build__stepwrap">${steps}</div>
          </div>

          <div class="build__stage">
            <div class="browser build__browser">
              <div class="browser__bar">
                <span class="browser__dots"><i></i><i></i><i></i></span>
                <span class="browser__url" data-build-url>◎ discovery-notes</span>
                <span class="browser__live" data-build-live>● building</span>
              </div>
              <div class="build__screen">
                <div class="build__layer on" data-layer="0">${discoverBoard()}</div>
                <div class="build__layer" data-layer="1">${siteMock('wire')}</div>
                <div class="build__layer" data-layer="2">${siteMock('design')}</div>
                <div class="build__layer" data-layer="3">${codeEditor()}</div>
                <div class="build__layer" data-layer="4">${liveSite()}</div>
              </div>
            </div>
            <div class="build__caption" data-build-cap>${stages[0].cap}</div>
          </div>
        </div>
      </div>
    </div>
  </section>`
}
