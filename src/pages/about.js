import { bootPage } from '../ui/boot.js'
import { navBar, footer, pageHeader, marqueeBar } from '../ui/partials.js'
import { aboutBlock, statsBlock, guaranteesBand, techBlock, ctaBlock } from '../ui/blocks.js'
import { marquee } from '../data/content.js'

bootPage(
  [
    navBar('about'),
    pageHeader('01 — About', "We're <em>Techi&nbsp;Champs</em>.", 'Bold ideas, clean code and real impact — from a crew that sweats the details.', 'About'),
    aboutBlock(),
    statsBlock({ paper: true }),
    marqueeBar(marquee),
    techBlock(),
    guaranteesBand(),
    ctaBlock(),
    footer(),
  ].join('\n')
)
