import { ranks } from './arvomerkit';

// Preload all images using link prefetch
// Note: Service worker handles the actual caching for offline support
export function preloadImages() {
  const imagesToPreload = new Set<string>();

  ranks.forEach(rank => {
    if (rank.collarInsignia) imagesToPreload.add(rank.collarInsignia);
    if (rank.chestInsignia) imagesToPreload.add(rank.chestInsignia);
    if (rank.shoulderInsignia) imagesToPreload.add(rank.shoulderInsignia);
    if (rank.sleeveInsignia) imagesToPreload.add(rank.sleeveInsignia);
  });

  const head = document.head;

  // Use prefetch hints for browser optimization
  imagesToPreload.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = src;
    head.appendChild(link);
  });

  console.log(`[Preload] Added ${imagesToPreload.size} images to prefetch`);
}
