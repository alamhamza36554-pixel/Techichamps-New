import { bootPage } from '../ui/boot.js'
import { navBar, footer, pageHeader } from '../ui/partials.js'
import { servicesBlock, processBlock, techBlock, ctaBlock } from '../ui/blocks.js'

bootPage(
  [
    navBar('services'),
    pageHeader('02 — Services', 'What we <em>do</em>.', 'Design, code, brand and growth — everything your business needs under one roof.', 'Services'),
    servicesBlock({ num: 'Our services', heading: 'Six ways we <em>help you win</em>.' }),
    techBlock(),
    processBlock({ paper: true }),
    ctaBlock(),
    footer(),
  ].join('\n')
)
