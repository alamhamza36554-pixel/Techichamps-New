import { bootPage } from '../ui/boot.js'
import { navBar, footer, pageHeader } from '../ui/partials.js'
import { reviewsBlock, faqBlock, ctaBlock } from '../ui/blocks.js'

bootPage(
  [
    navBar('reviews'),
    pageHeader('05 — Reviews', 'Clients <em>love</em> us.', '4.9/5 from 200+ clients with a 98% recommendation rate. Here\'s why.', 'Reviews'),
    reviewsBlock({ paper: false }),
    faqBlock(),
    ctaBlock(),
    footer(),
  ].join('\n')
)
