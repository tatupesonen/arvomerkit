const CACHE_VERSION = '1.0.1';
const CACHE_NAME = `arvomerkit-v${CACHE_VERSION}`;

// Base path for GitHub Pages
const BASE_PATH = self.location.pathname.replace(/sw\.js$/, '');

// Core app shell assets
const APP_SHELL = [
  `${BASE_PATH}`,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}logo.svg`,
  `${BASE_PATH}icon-192.png`,
  `${BASE_PATH}icon-512.png`,
  `${BASE_PATH}vite.svg`,
];

// All rank insignia images to precache
const RANK_IMAGES = [
  // Maavoimat/Ilmavoimat - Kauluslaatat
  `${BASE_PATH}images/kauluslaatta/Sotamies.svg`,
  `${BASE_PATH}images/kauluslaatta/Korpraali.svg`,
  `${BASE_PATH}images/kauluslaatta/Aliupseerioppilas.svg`,
  `${BASE_PATH}images/kauluslaatta/Alikersantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Kersantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Upseerioppilas.svg`,
  `${BASE_PATH}images/kauluslaatta/Ylikersantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Upseerikokelas.svg`,
  `${BASE_PATH}images/kauluslaatta/Vääpeli.svg`,
  `${BASE_PATH}images/kauluslaatta/Ylivääpeli.svg`,
  `${BASE_PATH}images/kauluslaatta/Sotilasmestari.svg`,
  `${BASE_PATH}images/kauluslaatta/Vänrikki.svg`,
  `${BASE_PATH}images/kauluslaatta/Luutnantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Yliluutnantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Kapteeni.svg`,
  `${BASE_PATH}images/kauluslaatta/Majuri.svg`,
  `${BASE_PATH}images/kauluslaatta/Everstiluutnantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Eversti.svg`,
  `${BASE_PATH}images/kauluslaatta/Prikaatikenraali.svg`,
  `${BASE_PATH}images/kauluslaatta/Kenraalimajuri.svg`,
  `${BASE_PATH}images/kauluslaatta/Kenraaliluutnantti.svg`,
  `${BASE_PATH}images/kauluslaatta/Kenraali.svg`,

  // Maavoimat/Ilmavoimat - Rintalaatat
  `${BASE_PATH}images/rintalaatta/Sotamies.svg`,
  `${BASE_PATH}images/rintalaatta/Korpraali.svg`,
  `${BASE_PATH}images/rintalaatta/Aliupseerioppilas.svg`,
  `${BASE_PATH}images/rintalaatta/Alikersantti.svg`,
  `${BASE_PATH}images/rintalaatta/Kersantti.svg`,
  `${BASE_PATH}images/rintalaatta/Upseerioppilas.svg`,
  `${BASE_PATH}images/rintalaatta/Ylikersantti.svg`,
  `${BASE_PATH}images/rintalaatta/Upseerikokelas.svg`,
  `${BASE_PATH}images/rintalaatta/Vääpeli.svg`,
  `${BASE_PATH}images/rintalaatta/Ylivääpeli.svg`,
  `${BASE_PATH}images/rintalaatta/Sotilasmestari.svg`,
  `${BASE_PATH}images/rintalaatta/Vänrikki.svg`,
  `${BASE_PATH}images/rintalaatta/Luutnantti.svg`,
  `${BASE_PATH}images/rintalaatta/Yliluutnantti.svg`,
  `${BASE_PATH}images/rintalaatta/Kapteeni.svg`,
  `${BASE_PATH}images/rintalaatta/Majuri.svg`,
  `${BASE_PATH}images/rintalaatta/Everstiluutnantti.svg`,
  `${BASE_PATH}images/rintalaatta/Eversti.svg`,
  `${BASE_PATH}images/rintalaatta/Prikaatikenraali.svg`,
  `${BASE_PATH}images/rintalaatta/Kenraalimajuri.svg`,
  `${BASE_PATH}images/rintalaatta/Kenraaliluutnantti.svg`,
  `${BASE_PATH}images/rintalaatta/Kenraali.svg`,

  // Merivoimat - Hihalaatat (Miehistö & Aliupseerit)
  `${BASE_PATH}images/hihalaatta/Matruusi.svg`,
  `${BASE_PATH}images/hihalaatta/Ylimatruusi.svg`,
  `${BASE_PATH}images/hihalaatta/Pursimies.svg`,
  `${BASE_PATH}images/hihalaatta/Ylipursimies.svg`,
  `${BASE_PATH}images/hihalaatta/Sotilasmestari_l.svg`,

  // Merivoimat - Olkalaatat (Upseerit)
  `${BASE_PATH}images/olkalaatta/Aliluutnantti.svg`,
  `${BASE_PATH}images/olkalaatta/Luutnantti_l.svg`,
  `${BASE_PATH}images/olkalaatta/Yliluutnantti_l.svg`,
  `${BASE_PATH}images/olkalaatta/Kapteeniluutnantti.svg`,
  `${BASE_PATH}images/olkalaatta/Komentajakapteeni.svg`,
  `${BASE_PATH}images/olkalaatta/Komentaja.svg`,
  `${BASE_PATH}images/olkalaatta/Kommodori.svg`,
  `${BASE_PATH}images/olkalaatta/Lippueamiraali.svg`,
  `${BASE_PATH}images/olkalaatta/Kontra-amiraali.svg`,
  `${BASE_PATH}images/olkalaatta/Vara-amiraali.svg`,
  `${BASE_PATH}images/olkalaatta/Amiraali.svg`,
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
          console.log('[ServiceWorker] Cache hit:', event.request.url);
          return cachedResponse;
        }

        // Otherwise, fetch from network
        console.log('[ServiceWorker] Fetching resource:', event.request.url);

        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200) {
              return response;
            }

            // Only cache same-origin requests or basic responses
            if (response.type === 'basic' || response.type === 'cors') {
              // Clone the response (can only be consumed once)
              const responseToCache = response.clone();

              // Add to cache for future use
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                  console.log('[ServiceWorker] Cached:', event.request.url);
                });
            }

            return response;
          })
          .catch((error) => {
            console.log('[ServiceWorker] Fetch failed:', error);

            // Network failed, try to return the app shell
            if (event.request.mode === 'navigate') {
              return caches.match(`${BASE_PATH}index.html`)
                .then((response) => {
                  if (response) {
                    return response;
                  }
                  return caches.match(`${BASE_PATH}`);
                });
            }

            throw error;
          });
      })
  );
});
