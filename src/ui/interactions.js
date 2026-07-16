// ─────────────────────────────────────────────────────────────
//  Front-end interactions: smooth scroll, reveals, marquees,
//  counters, 3D tilt, custom cursor, nav.
// ─────────────────────────────────────────────────────────────
import Lenis from 'lenis'
import { gsap } from 'gsap'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// screenshots / crawlers: show everything instantly, skip entrance anims
const forceShow = reduced || new URLSearchParams(location.search).has('shot')

/* ── smooth scroll (Lenis) ── */
export function initSmoothScroll() {
  if (forceShow) return null // native scroll for reduced-motion / screenshots
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 })
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)

  // anchor links → smooth scroll
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    if (id.length < 2) return
    const el = document.querySelector(id)
    if (!el) return
    e.preventDefault()
    document.body.classList.remove('menu-open')
    lenis.scrollTo(el, { offset: -60, duration: 1.2 })
  })
  return lenis
}

/* ── hero title reveal + generic scroll reveals (IntersectionObserver) ── */
export function initReveals() {
  const items = document.querySelectorAll('[data-reveal]')

  if (forceShow) {
    items.forEach((el) => el.classList.add('in'))
    return
  }

  // hero headline: each line slides up from its clip mask
  const lines = document.querySelectorAll('.hero__title .l > span')
  if (lines.length) {
    gsap.from(lines, { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.09, delay: 0.15 })
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  )
  items.forEach((el) => io.observe(el))
}

/* ── infinite marquees; nudge speed with scroll velocity ── */
export function initMarquees() {
  document.querySelectorAll('[data-marquee]').forEach((wrap, idx) => {
    const track = wrap.querySelector('.marquee__track')
    if (!track) return
    const dir = idx % 2 === 0 ? -1 : 1
    const loopW = track.scrollWidth / 2
    if (reduced || !loopW) return

    gsap.to(track, {
      x: dir * -loopW,
      duration: 22,
      ease: 'none',
      repeat: -1,
      modifiers: { x: (x) => `${parseFloat(x) % loopW}px` },
    })
    if (dir > 0) gsap.set(track, { x: -loopW })
  })
}

/* ── animated stat counters (IntersectionObserver) ── */
export function initCounters() {
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target
        obs.unobserve(el)
        const target = +el.dataset.count
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = Math.round(obj.v) + suffix),
        })
      })
    },
    { threshold: 0.4 }
  )
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count
    const suffix = el.dataset.suffix || ''
    if (forceShow) {
      el.textContent = target + suffix
      return
    }
    io.observe(el)
  })
}

/* ── 3D tilt on cards / tiles ── */
export function initTilt() {
  if (reduced || window.matchMedia('(pointer: coarse)').matches) return
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const strength = 10
    let raf = null
    function enter() {
      // instant follow while hovering (don't fight the entrance transition)
      el.style.transition = 'transform 0s'
    }
    function move(e) {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateZ(14px)`
      })
    }
    function leave() {
      if (raf) cancelAnimationFrame(raf)
      el.style.transition = 'transform .45s var(--ease)'
      el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)'
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
  })
}

/* ── 3D device stage: mouse-parallax tilt + float + in-screen nav ── */
export function initDevice() {
  const stage = document.querySelector('.devices')
  if (!stage) return

  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.matchMedia('(max-width: 620px)').matches
  const isMobile = coarse || small
  const hero = stage.closest('.hero') || document.body
  const browser = stage.querySelector('.browser')
  const phone = stage.querySelector('.phone')
  const frame = stage.querySelector('.browser__frame')
  const screen = frame?.closest('.browser__screen')

  // ── DESKTOP: live services page as a scaled, deferred iframe.
  //    MOBILE: skip it entirely — the static .browser__mock shows instead.
  if (frame && screen) {
    if (isMobile) {
      frame.remove() // never fetch the heavy second page on phones
    } else {
      const LOGICAL_W = 1280
      const sizeFrame = () => {
        const w = screen.clientWidth
        const h = screen.clientHeight
        if (!w || !h) return
        const scale = w / LOGICAL_W
        frame.style.width = LOGICAL_W + 'px'
        frame.style.height = Math.ceil(h / scale) + 'px'
        frame.style.transform = `scale(${scale})`
      }
      sizeFrame()
      window.addEventListener('resize', sizeFrame)
      window.addEventListener('load', sizeFrame)
      frame.addEventListener('load', sizeFrame)
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeFrame)
      // defer the heavy iframe until the browser is idle so it never
      // competes with first paint / interactivity
      const loadFrame = () => { if (!frame.src && frame.dataset.src) frame.src = frame.dataset.src }
      const defer = () => (window.requestIdleCallback ? requestIdleCallback(loadFrame, { timeout: 1500 }) : setTimeout(loadFrame, 900))
      if (document.readyState === 'complete') defer()
      else window.addEventListener('load', defer)
    }
  }

  // ── parallax tilt: desktop pointer only, and only while the hero is on screen
  if (reduced || coarse) return

  let tx = 0, ty = 0, cx = 0, cy = 0
  let heroH = hero.offsetHeight || window.innerHeight
  window.addEventListener('resize', () => { heroH = hero.offsetHeight || window.innerHeight })
  window.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect()
    tx = (e.clientX - r.left) / r.width - 0.5
    ty = (e.clientY - r.top) / r.height - 0.5
  }, { passive: true })

  const start = performance.now()
  const INTRO = 1200
  let raf = null
  const loop = (now) => {
    cx += (tx - cx) * 0.06
    cy += (ty - cy) * 0.06
    const float = Math.sin((now - start) / 1000 * 0.8) * 7
    const p = Math.max(0, Math.min(1, window.scrollY / (heroH * 0.9)))
    const it = Math.min(1, (now - start) / INTRO)
    const intro = 1 - Math.pow(1 - it, 3)
    stage.style.transform =
      `translateY(${float - p * 24 + (1 - intro) * 60}px) rotateY(${-15 + cx * 12 + (1 - intro) * -38}deg) rotateX(${6 - cy * 9 + p * 7}deg)`
    if (browser) browser.style.transform = `translateZ(40px) translateY(${p * 14}px)`
    if (phone) phone.style.transform = `translateZ(92px) rotateY(6deg) translate(${cx * -16}px, ${-p * 46}px)`
    raf = requestAnimationFrame(loop)
  }
  // start/stop with visibility so it costs nothing when scrolled away
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && raf === null) raf = requestAnimationFrame(loop)
      else if (!e.isIntersecting && raf !== null) { cancelAnimationFrame(raf); raf = null }
    },
    { threshold: 0 }
  )
  io.observe(hero)
}

/* ── "watch a website get built" sticky-scroll story ── */
export function initBuild() {
  const track = document.querySelector('.build__track')
  if (!track) return
  let stages = []
  try { stages = JSON.parse(track.dataset.build) } catch (e) { /* ignore */ }
  const N = 5
  const layers = [...track.querySelectorAll('[data-layer]')]
  const steps = [...track.querySelectorAll('[data-step]')]
  const dots = [...track.querySelectorAll('[data-dot]')]
  const urlEl = track.querySelector('[data-build-url]')
  const capEl = track.querySelector('[data-build-cap]')
  const liveEl = track.querySelector('[data-build-live]')
  const codeLines = [...track.querySelectorAll('.code .cl')]
  let active = -1

  function setStage(idx, intra) {
    idx = Math.max(0, Math.min(N - 1, idx))
    if (idx !== active) {
      active = idx
      layers.forEach((l, i) => l.classList.toggle('on', i === idx))
      steps.forEach((s, i) => s.classList.toggle('on', i === idx))
      dots.forEach((d, i) => d.classList.toggle('on', i <= idx))
      if (urlEl && stages[idx]) urlEl.textContent = stages[idx].url
      if (capEl && stages[idx]) capEl.textContent = stages[idx].cap
      if (liveEl) {
        const live = idx === N - 1
        liveEl.textContent = live ? '● live' : '● building'
        liveEl.classList.toggle('is-live', live)
      }
    }
    if (codeLines.length) {
      const show = idx < 3 ? 0 : idx > 3 ? codeLines.length : Math.round(intra * codeLines.length)
      codeLines.forEach((cl, i) => cl.classList.toggle('on', i < show))
    }
  }

  // static override for previews/screenshots: ?stage=N
  const forced = new URLSearchParams(location.search).get('stage')
  if (forced !== null) {
    setStage(+forced, 0.7)
    return
  }

  const apply = () => {
    const rect = track.getBoundingClientRect()
    const total = track.offsetHeight - window.innerHeight
    if (total <= 0) return
    const p = Math.max(0, Math.min(1, -rect.top / total))
    const f = p * N
    const idx = Math.floor(f)
    setStage(idx, f - idx)
  }
  // only run the scroll loop while the section is on screen
  let raf = null
  const loop = () => { apply(); raf = requestAnimationFrame(loop) }
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && raf === null) raf = requestAnimationFrame(loop)
      else if (!e.isIntersecting && raf !== null) { cancelAnimationFrame(raf); raf = null }
    },
    { threshold: 0 }
  )
  io.observe(document.querySelector('.build') || track)
  window.addEventListener('resize', apply)
}

/* ── custom cursor with lag ring ── */
export function initCursor() {
  const cur = document.querySelector('.cursor')
  if (!cur || window.matchMedia('(pointer: coarse)').matches) return
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y
  window.addEventListener('pointermove', (e) => {
    x = e.clientX
    y = e.clientY
    cur.style.setProperty('--cx', x + 'px')
    cur.style.setProperty('--cy', y + 'px')
  })
  function loop() {
    rx += (x - rx) * 0.18
    ry += (y - ry) * 0.18
    cur.style.setProperty('--rx', rx + 'px')
    cur.style.setProperty('--ry', ry + 'px')
    requestAnimationFrame(loop)
  }
  loop()
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest('a, button, [data-cursor], [data-tilt]')) cur.classList.add('is-hover')
  })
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest('a, button, [data-cursor], [data-tilt]')) cur.classList.remove('is-hover')
  })
  document.addEventListener('pointerdown', () => cur.classList.add('is-down'))
  document.addEventListener('pointerup', () => cur.classList.remove('is-down'))
}

/* ── nav: burger toggle + shrink-on-scroll ── */
export function initNav() {
  const burger = document.getElementById('burger')
  burger?.addEventListener('click', () => document.body.classList.toggle('menu-open'))
  // close mobile menu after choosing a destination
  document.querySelectorAll('[data-menu-link]').forEach((a) =>
    a.addEventListener('click', () => document.body.classList.remove('menu-open'))
  )
  // subtle nav shadow once the page is scrolled
  const navEl = document.querySelector('.nav')
  const onScroll = () => navEl?.classList.toggle('is-scrolled', window.scrollY > 20)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

