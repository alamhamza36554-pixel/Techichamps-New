import { bootPage } from '../ui/boot.js'
import { navBar, footer, marqueeBar } from '../ui/partials.js'
import { heroBlock, homeIntro, servicesBlock, statsBlock, guaranteesBand, ctaBlock } from '../ui/blocks.js'
import { marquee } from '../data/content.js'

bootPage(
  [
    navBar('home'),
    heroBlock(),
    marqueeBar(marquee),
    homeIntro(),
    servicesBlock(),
    statsBlock(),
    marqueeBar(['Bold Ideas', 'Clean Code', 'Real Impact'], 'marquee--ink'),
    guaranteesBand(),
    ctaBlock(),
    footer(),
  ].join('\n')
)
