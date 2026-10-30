/* Drawn icons instead of Unicode arrows. iOS draws characters such as ↗ as
   colour emoji, so the same mark looked engraved on a laptop and like a
   sticker on a phone. An SVG is the same line everywhere. */
const paths = {
  'arrow-up-right': '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  'arrow-left': '<path d="M19 12H5m6-6-6 6 6 6"/>',
  'arrow-right': '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  'arrow-down': '<path d="M12 5v14m-6-6 6 6 6-6"/>',
  'arrow-up': '<path d="M12 19V5m-6 6 6-6 6 6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  turn: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5"/>',
  shrink: '<path d="M19 10h-5V5M5 14h5v5M14 10l6-6M10 14l-6 6"/>',
  theme: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/>',
};

export const icon = name => `<svg class="icon icon-${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]}</svg>`;

/* Static markup in index.html marks its icons with data-icon. */
export function hydrateIcons(root = document) {
  for (const element of root.querySelectorAll('[data-icon]')) element.outerHTML = icon(element.dataset.icon);
}
