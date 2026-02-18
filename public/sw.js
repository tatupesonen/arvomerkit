const CACHE_VERSION = '1.0.3';
const CACHE_NAME = `arvomerkit-v${CACHE_VERSION}`;

const BASE = '/arvomerkit/';

const RANK_IMAGES = [
  // kauluslaatta
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
  // rintalaatta
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
  // hihalaatta (navy sleeve)
  'images/hihalaatta/Matruusi.svg',
  'images/hihalaatta/Ylimatruusi.svg',
  'images/hihalaatta/Pursimies.svg',
  'images/hihalaatta/Ylipursimies.svg',
  'images/hihalaatta/Sotilasmestari_l.svg',
  // olkalaatta (navy shoulder)
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
].map((path) => BASE + path);

// Install event - precache all rank images
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Precaching rank images');
      return cache.addAll(RANK_IMAGES);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches and take control
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

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[ServiceWorker] Serving from cache:', event.request.url);
              return cachedResponse;
            }

            // If it's a navigation request and nothing in cache, return index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/arvomerkit/index.html')
                .then((indexResponse) => {
                  if (indexResponse) return indexResponse;
                  return caches.match('/arvomerkit/');
                });
            }

            throw new Error('No cache available');
          });
      })
  );
});
