const CACHE_VERSION = '1.0.0';
const CACHE_NAME = `arvomerkit-v${CACHE_VERSION}`;

// Core assets to cache immediately
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
];

// Install event - cache core assets and precache images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        // Cache core assets
        await cache.addAll(CORE_ASSETS);

        // Precache all images
        const imagePatterns = [
          'images/kauluslaatta/',
          'images/rintalaatta/',
          'images/hihalaatta/',
          'images/olkalaatta/',
        ];

        // This will be populated by the build process
        return cache;
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - cache-first strategy for offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request).then((response) => {
          // Don't cache non-GET requests or non-successful responses
          if (event.request.method !== 'GET' || !response || response.status !== 200) {
            return response;
          }

          // Check if it's a same-origin request or if we should cache it
          const shouldCache =
            response.type === 'basic' ||
            event.request.url.includes('/arvomerkit/') ||
            event.request.url.includes('images/');

          if (shouldCache) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        }).catch(() => {
          // If network fails and we're requesting an HTML page, return cached index
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
          // Otherwise throw error
          throw new Error('Network request failed and no cache available');
        });
      })
  );
});
