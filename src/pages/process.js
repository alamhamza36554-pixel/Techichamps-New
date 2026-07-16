import { bootPage } from '../ui/boot.js'
import { navBar, footer, pageHeader } from '../ui/partials.js'
import { guaranteesBand, statsBlock, ctaBlock } from '../ui/blocks.js'
import { buildSection } from '../ui/build.js'

bootPage(
  [
    navBar('process'),
    pageHeader('04 — Process', 'How we <em>work</em>.', 'A clear, proven path from first idea to a launched product you\'re proud of — watch it happen below.', 'Process'),
    buildSection(),
    guaranteesBand(),
    statsBlock({ paper: true }),
    ctaBlock(),
    footer(),
  ].join('\n')
)
