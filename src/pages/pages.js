// ─────────────────────────────────────────────────────────────
//  Single source of truth for each page's HTML.
//  Pure string templates — used by the browser page entries AND by
//  the build-time prerender (scripts/prerender.mjs) for SSG.
// ─────────────────────────────────────────────────────────────
import { navBar, footer, pageHeader, marqueeBar } from '../ui/partials.js'
import {
  heroBlock, homeIntro, servicesBlock, statsBlock, aboutBlock, techBlock,
  processBlock, workBlock, reviewsBlock, faqBlock, guaranteesBand, ctaBlock,
  contactForm, legalBlock,
} from '../ui/blocks.js'
import { buildSection } from '../ui/build.js'
import { marquee, privacyPolicy, termsOfService, legalUpdated } from '../data/content.js'

const compose = (...parts) => parts.join('\n')

export const PAGES = {
  home: () =>
    compose(
      navBar('home'),
      heroBlock(),
      marqueeBar(marquee),
      homeIntro(),
      servicesBlock(),
      statsBlock(),
      marqueeBar(['Bold Ideas', 'Clean Code', 'Real Impact'], 'marquee--ink'),
      guaranteesBand(),
      ctaBlock(),
      footer()
    ),

  about: () =>
    compose(
      navBar('about'),
      pageHeader('01 — About', "We're <em>Techi&nbsp;Champs</em>.", 'Bold ideas, clean code and real impact — from a crew that sweats the details.', 'About'),
      aboutBlock(),
      statsBlock({ paper: true }),
      marqueeBar(marquee),
      techBlock(),
      guaranteesBand(),
      ctaBlock(),
      footer()
    ),

  services: () =>
    compose(
      navBar('services'),
      pageHeader('02 — Services', 'What we <em>do</em>.', 'Design, code, brand and growth — everything your business needs under one roof.', 'Services'),
      servicesBlock({ num: 'Our services', heading: 'Six ways we <em>help you win</em>.' }),
      techBlock(),
      processBlock({ paper: true }),
      ctaBlock(),
      footer()
    ),

  work: () =>
    compose(
      navBar('work'),
      pageHeader('03 — Work', 'Selected <em>projects</em>.', "A look at some of the brands, products and identities we've shipped.", 'Work'),
      workBlock(),
      marqueeBar(['We Design', 'We Code', 'We Brand', 'We Grow']),
      statsBlock({ paper: true }),
      ctaBlock(),
      footer()
    ),

  process: () =>
    compose(
      navBar('process'),
      pageHeader('04 — Process', 'How we <em>work</em>.', "A clear, proven path from first idea to a launched product you're proud of — watch it happen below.", 'Process'),
      buildSection(),
      guaranteesBand(),
      statsBlock({ paper: true }),
      ctaBlock(),
      footer()
    ),

  reviews: () =>
    compose(
      navBar('reviews'),
      pageHeader('05 — Reviews', 'Clients <em>love</em> us.', "4.9/5 from 200+ clients with a 98% recommendation rate. Here's why.", 'Reviews'),
      reviewsBlock({ paper: false }),
      faqBlock(),
      ctaBlock(),
      footer()
    ),

  contact: () =>
    compose(
      navBar('contact'),
      pageHeader('06 — Contact', "Let's <em>talk</em>.", 'Tell us about your project and get a free consultation — usually within one business day.', 'Contact'),
      contactForm(),
      guaranteesBand(),
      faqBlock(),
      footer()
    ),

  privacy: () =>
    compose(
      navBar(''),
      pageHeader('Legal', 'Privacy <em>Policy</em>.', 'What we collect, how we use it, and your choices.', 'Privacy'),
      legalBlock(privacyPolicy, legalUpdated),
      footer()
    ),

  terms: () =>
    compose(
      navBar(''),
      pageHeader('Legal', 'Terms of <em>Service</em>.', 'The rules for using this website and our services.', 'Terms'),
      legalBlock(termsOfService, legalUpdated),
      footer()
    ),
}

export function pageHTML(name) {
  return (PAGES[name] || PAGES.home)()
}
