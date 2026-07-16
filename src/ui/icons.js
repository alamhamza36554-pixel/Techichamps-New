// Bold outline icons for service cards (stroke = currentColor)
const s = (paths) =>
  `<svg class="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

export const icons = {
  web: s('<rect x="2" y="4" width="20" height="16" rx="1"/><path d="M2 9h20"/><path d="M6 6.5h.01M9 6.5h.01"/><path d="M8 13l-2 2 2 2M16 13l2 2-2 2M13 12l-2 6"/>'),
  app: s('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'),
  ai: s('<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><path d="M10.5 10.5h3v3h-3z"/>'),
  brand: s('<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>'),
  marketing: s('<path d="M3 11l14-6v14L3 13z"/><path d="M3 11v2a2 2 0 0 0 2 2h1"/><path d="M17 8a3 3 0 0 1 0 8"/>'),
  logo: s('<path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z"/>'),
}
