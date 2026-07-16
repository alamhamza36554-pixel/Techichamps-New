import { bootPage } from '../ui/boot.js'
import { navBar, footer, marqueeBar } from '../ui/partials.js'
import { workBlock, statsBlock, ctaBlock } from '../ui/blocks.js'
import { pageHeader } from '../ui/partials.js'

bootPage(
  [
    navBar('work'),
    pageHeader('03 — Work', 'Selected <em>projects</em>.', 'A look at some of the brands, products and identities we\'ve shipped.', 'Work'),
    workBlock(),
    marqueeBar(['We Design', 'We Code', 'We Brand', 'We Grow']),
    statsBlock({ paper: true }),
    ctaBlock(),
    footer(),
  ].join('\n')
)
