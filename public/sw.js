const CACHE_VERSION = '1.0.0';
const CACHE_NAME = `arvomerkit-v${CACHE_VERSION}`;

// Core app shell assets
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
];

// All rank insignia images to precache
const RANK_IMAGES = [
  // Maavoimat/Ilmavoimat - Kauluslaatat
  'images/kauluslaatta/Sotamies.svg',
  'images/kauluslaatta/Korpraali.svg',
  'images/kauluslaatta/Aliupseerioppilas.svg',
  'images/kauluslaatta/Alikersantti.svg',
  'images/kauluslaatta/Kersantti.svg',
  'images/kauluslaatta/Upseerioppilas.svg',
  'images/kauluslaatta/Ylikersantti.svg',
  'images/kauluslaatta/Upseerikokelas.svg',
  'images/kauluslaatta/Vääpeli.svg',
  'images/kauluslaatta/Ylivääpeli.svg',
  'images/kauluslaatta/Sotilasmestari.svg',
  'images/kauluslaatta/Vänrikki.svg',
  'images/kauluslaatta/Luutnantti.svg',
  'images/kauluslaatta/Yliluutnantti.svg',
  'images/kauluslaatta/Kapteeni.svg',
  'images/kauluslaatta/Majuri.svg',
  'images/kauluslaatta/Everstiluutnantti.svg',
  'images/kauluslaatta/Eversti.svg',
  'images/kauluslaatta/Prikaatikenraali.svg',
  'images/kauluslaatta/Kenraalimajuri.svg',
  'images/kauluslaatta/Kenraaliluutnantti.svg',
  'images/kauluslaatta/Kenraali.svg',

  // Maavoimat/Ilmavoimat - Rintalaatat
  'images/rintalaatta/Sotamies.svg',
  'images/rintalaatta/Korpraali.svg',
  'images/rintalaatta/Aliupseerioppilas.svg',
  'images/rintalaatta/Alikersantti.svg',
  'images/rintalaatta/Kersantti.svg',
  'images/rintalaatta/Upseerioppilas.svg',
  'images/rintalaatta/Ylikersantti.svg',
  'images/rintalaatta/Upseerikokelas.svg',
  'images/rintalaatta/Vääpeli.svg',
  'images/rintalaatta/Ylivääpeli.svg',
  'images/rintalaatta/Sotilasmestari.svg',
  'images/rintalaatta/Vänrikki.svg',
  'images/rintalaatta/Luutnantti.svg',
  'images/rintalaatta/Yliluutnantti.svg',
  'images/rintalaatta/Kapteeni.svg',
  'images/rintalaatta/Majuri.svg',
  'images/rintalaatta/Everstiluutnantti.svg',
  'images/rintalaatta/Eversti.svg',
  'images/rintalaatta/Prikaatikenraali.svg',
  'images/rintalaatta/Kenraalimajuri.svg',
  'images/rintalaatta/Kenraaliluutnantti.svg',
  'images/rintalaatta/Kenraali.svg',

  // Merivoimat - Hihalaatat (Miehistö & Aliupseerit)
  'images/hihalaatta/Matruusi.svg',
  'images/hihalaatta/Ylimatruusi.svg',
  'images/hihalaatta/Pursimies.svg',
  'images/hihalaatta/Ylipursimies.svg',
  'images/hihalaatta/Sotilasmestari_l.svg',

  // Merivoimat - Olkalaatat (Upseerit)
  'images/olkalaatta/Aliluutnantti.svg',
  'images/olkalaatta/Luutnantti_l.svg',
  'images/olkalaatta/Yliluutnantti_l.svg',
  'images/olkalaatta/Kapteeniluutnantti.svg',
  'images/olkalaatta/Komentajakapteeni.svg',
  'images/olkalaatta/Komentaja.svg',
  'images/olkalaatta/Kommodori.svg',
  'images/olkalaatta/Lippueamiraali.svg',
  'images/olkalaatta/Kontra-amiraali.svg',
  'images/olkalaatta/Vara-amiraali.svg',
  'images/olkalaatta/Amiraali.svg',
];

// Combine all resources to precache
const PRECACHE_RESOURCES = [...APP_SHELL, ...RANK_IMAGES];

// Install event - precache all resources
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell and images');
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .then(() => {
        console.log('[ServiceWorker] All resources cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Precaching failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        console.log('[ServiceWorker] Fetching resource:', event.request.url);

        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response (can only be consumed once)
            const responseToCache = response.clone();

            // Add to cache for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Network failed, try to return the app shell
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
