import { bootPage } from '../ui/boot.js'
import { navBar, footer, pageHeader } from '../ui/partials.js'
import { ctaBlock, guaranteesBand, faqBlock } from '../ui/blocks.js'

bootPage(
  [
    navBar('contact'),
    pageHeader('06 — Contact', "Let's <em>talk</em>.", 'Tell us about your project and get a free consultation. We usually reply within one business day.', 'Contact'),
    ctaBlock(),
    guaranteesBand(),
    faqBlock(),
    footer(),
  ].join('\n')
)
