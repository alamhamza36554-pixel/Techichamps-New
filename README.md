# Techi Champs — Website

Bold, neo-brutalist marketing site for **Techi Champs**, a creative digital agency.
Multi-page, fully responsive, with an interactive 3D device hero and a scroll-driven
"watch a website build itself" story on the Process page.

**Ideas. Design. Impact.**

## ✨ Highlights

- **Multi-page** — Home, About, Services, Work, Process, Reviews, Contact (real URLs)
- **Interactive 3D hero** — a tilted browser + phone; the browser shows the live Services page
- **"Website builds itself"** — the Process page reveals a site going from research → wireframe → design → code → live as you scroll
- **Neo-brutalist design** — cream / ink / coral / yellow, Anton + Space Mono, paper grain, custom cursor
- **Fast & responsive** — no heavy frameworks, lazy/deferred loading, tuned for mobile

## 🛠 Tech

- [Vite](https://vitejs.dev/) (multi-page build) — vanilla JS modules, no UI framework
- [GSAP](https://gsap.com/) — marquees, counters, entrance animation
- [Lenis](https://lenis.studiofreight.com/) — smooth scrolling
- Pure CSS 3D transforms + IntersectionObserver for the interactive bits

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## 📦 Deploy

Run `npm run build` and host the generated `dist/` folder on any static host
(Vercel, Netlify, Cloudflare Pages, or a plain web server).

## 📁 Structure

```
├─ *.html            # one entry per page
├─ public/           # logo, favicon (static assets)
└─ src/
   ├─ data/content.js   # all site copy (single source of truth)
   ├─ pages/            # per-page entry scripts
   ├─ ui/               # partials, blocks, device, build story, interactions
   └─ style.css         # design system + components
```

---

© Techi Champs. Built with bold ideas and clean code.
