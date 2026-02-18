import { ranks } from './arvomerkit';

// Preload all images and cache them for offline use
export function preloadImages() {
  const imagesToPreload = new Set<string>();

  ranks.forEach(rank => {
    if (rank.collarInsignia) imagesToPreload.add(rank.collarInsignia);
    if (rank.chestInsignia) imagesToPreload.add(rank.chestInsignia);
    if (rank.shoulderInsignia) imagesToPreload.add(rank.shoulderInsignia);
    if (rank.sleeveInsignia) imagesToPreload.add(rank.sleeveInsignia);
  });

  const head = document.head;

  // Use prefetch for modern browsers
  imagesToPreload.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = src;
    head.appendChild(link);
  });

  // Also fetch images to ensure they're cached by service worker
  if ('caches' in window) {
    caches.open('arvomerkit-v1').then(cache => {
      const imageUrls = Array.from(imagesToPreload);
      cache.addAll(imageUrls).catch(err => {
        console.log('Failed to cache some images:', err);
        // Fallback: cache individually
        imageUrls.forEach(url => {
          fetch(url).then(response => {
            if (response.ok) {
              cache.put(url, response);
            }
          }).catch(() => {});
        });
      });
    });
  }
}
