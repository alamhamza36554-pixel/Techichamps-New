// ─────────────────────────────────────────────────────────────
//  Techi Champs — site content
//  Single source of truth for copy. Pulled/adapted from the
//  legacy site (techichamps.com) so the rebuild stays on-message.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Techi Champs',
  kicker: 'Creative Digital Agency',
  email: 'info@techichamps.com',
  altEmail: 'hello@techichamps.com',
  tagline: 'We build digital things that matter',
}

export const nav = ['Home', 'About', 'Services', 'Work', 'Process', 'Reviews', 'Contact']

export const hero = {
  lines: ['Ideas.', 'Design.', 'Impact.'],
  badge: 'We build digital things that matter',
  note: 'Crafting digital experiences that win',
  blurb:
    "We're Techi Champs — a creative digital agency helping brands build bold identities, powerful websites, and digital experiences that drive real results.",
  strip: 'Bold ideas. Clean code. Real impact.',
}

export const marquee = ['We Design', 'We Code', 'We Brand', 'We Grow']

export const services = [
  {
    no: '01',
    title: 'Web Development',
    desc: 'Fast, responsive & scalable websites built with modern technologies that convert visitors into customers.',
    icon: 'web',
  },
  {
    no: '02',
    title: 'App Development',
    desc: 'Powerful mobile and web apps for iOS and Android that users genuinely love to use.',
    icon: 'app',
  },
  {
    no: '03',
    title: 'AI Solutions',
    desc: 'Smart AI solutions that automate processes, unlock growth and put you ahead of the curve.',
    icon: 'ai',
  },
  {
    no: '04',
    title: 'Branding & Identity',
    desc: 'Bold branding that tells your story and makes you completely unforgettable.',
    icon: 'brand',
  },
  {
    no: '05',
    title: 'Digital Marketing',
    desc: 'Strategic campaigns that boost your online presence and drive measurable results.',
    icon: 'marketing',
  },
  {
    no: '06',
    title: 'Logo Design',
    desc: 'Memorable brand identities and logos that resonate deeply with your audience.',
    icon: 'logo',
  },
]

export const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 15, suffix: '+', label: 'Countries Served' },
]

export const about = {
  heading: 'Good design is good business.',
  body: [
    'From concept to completion, we deliver exceptional digital experiences that drive growth, engage audiences and exceed expectations.',
    'We\'re a tight crew of designers, engineers and strategists who care about the details — the kind that turn a good product into an unforgettable one.',
  ],
  pillars: ['We Design', 'We Code', 'We Brand', 'We Grow'],
}

export const process = [
  { no: '01', title: 'Discover', desc: 'We dig into your goals, audience and market to find the real opportunity.' },
  { no: '02', title: 'Plan', desc: 'A clear roadmap, scope and strategy so everyone knows exactly where we\'re headed.' },
  { no: '03', title: 'Design', desc: 'Bold, considered design that looks incredible and works even better.' },
  { no: '04', title: 'Build', desc: 'Clean, modern code — fast, accessible and built to scale.' },
  { no: '05', title: 'Launch', desc: 'We ship, measure and keep improving. 30 days free support included.' },
]

// real projects pulled from techichamps.com portfolio
export const work = [
  { title: 'Swift Cart', tag: 'Logo & Brand', year: '2025' },
  { title: 'BLAD Homes', tag: 'Logo Design', year: '2024' },
  { title: 'DESIGNSCO', tag: 'Branding', year: '2025' },
  { title: 'Ecommerce Store', tag: 'Web Design', year: '2025' },
  { title: 'Modern Homepage', tag: 'Web Design', year: '2024' },
  { title: 'Product Page UI', tag: 'Web Design', year: '2024' },
]

// trust badges — guarantees straight from the old site's policies
export const guarantees = [
  '30 days free support',
  'You own everything',
  '24/7 emergency support',
  "We work until you're happy",
]

// frequently asked questions (from the legacy site FAQ)
export const faqs = [
  {
    q: 'What are your typical project timelines?',
    a: 'Logo Design 3–5 business days · Website Design 1–2 weeks · Branding 2–3 weeks · App Development 6–12 weeks.',
  },
  {
    q: 'Do I own the final designs and code?',
    a: 'Absolutely. Once completed and paid, you own all rights to the source code, design files and intellectual property.',
  },
  {
    q: 'What technologies do you use?',
    a: 'Modern, proven stacks across frontend, backend, mobile, database, cloud and AI/ML — React, Vue, Node, Python, React Native, Flutter, AWS, TensorFlow and more.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Yes — 30 days free support on every project, optional monthly maintenance packages, and 24/7 emergency support for critical issues.',
  },
  {
    q: 'What is your refund policy?',
    a: "100% refund before work begins and 50% during the concept phase. Simply put: we work until you're happy.",
  },
  {
    q: 'How do you ensure project quality?',
    a: 'Rigorous code review, thorough testing, continuous client feedback and industry best practices on every build.',
  },
]

// budget ranges offered on the consultation form
export const budgets = [
  'Under $1k', '$1k–$5k', '$5k–$10k', '$10k–$25k', '$25k–$50k', '$50k+',
]

export const techStack = [
  'React', 'Vue.js', 'Node.js', 'Python', 'React Native', 'Flutter',
  'MongoDB', 'PostgreSQL', 'AWS', 'Google Cloud', 'TensorFlow', 'OpenAI',
]

export const reviews = [
  {
    quote: 'They didn\'t just build our site — they got our brand. Traffic and conversions are up massively.',
    name: 'Sarah Johnson',
    role: 'CEO, TechStartup Inc.',
  },
  {
    quote: 'The app they built for us is fast, beautiful and our users love it. A genuinely great team.',
    name: 'Mike Chen',
    role: 'Founder, FitLife Health',
  },
  {
    quote: 'Every detail was considered. The branding is bold and completely us. Couldn\'t be happier.',
    name: 'Isabella Rodriguez',
    role: 'Creative Director, Elegance Couture',
  },
  {
    quote: 'Professional, fast and creative. They delivered ahead of schedule and beyond expectations.',
    name: 'David Park',
    role: 'Marketing Director, RetailMax',
  },
  {
    quote: 'From strategy to launch it was seamless. The AI features they added save us hours daily.',
    name: 'Lisa Thompson',
    role: 'Operations Manager, ServicePro',
  },
]

export const cta = {
  heading: "Let's build something awesome together",
  sub: 'Available for new projects',
}

// real, verified profiles from techichamps.com
export const socials = [
  { label: 'Instagram', short: 'Ig', href: 'https://instagram.com/techichamps' },
  { label: 'Facebook', short: 'Fb', href: 'https://www.facebook.com/profile.php?id=100091271492822' },
  { label: 'Trustpilot', short: 'Tp', href: 'https://www.trustpilot.com/review/techichamps.com' },
]
