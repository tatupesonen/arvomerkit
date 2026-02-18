import { ranks } from './arvomerkit';

// Preload all images using link rel="prefetch"
export function preloadImages() {
  const imagesToPreload = new Set<string>();

  ranks.forEach(rank => {
    if (rank.collarInsignia) imagesToPreload.add(rank.collarInsignia);
    if (rank.chestInsignia) imagesToPreload.add(rank.chestInsignia);
    if (rank.shoulderInsignia) imagesToPreload.add(rank.shoulderInsignia);
    if (rank.sleeveInsignia) imagesToPreload.add(rank.sleeveInsignia);
  });

  const head = document.head;
  imagesToPreload.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = src;
    head.appendChild(link);
  });
}
