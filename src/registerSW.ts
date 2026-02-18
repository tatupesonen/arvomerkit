export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      const scope = import.meta.env.BASE_URL;

      console.log('[App] Registering service worker:', swUrl, 'with scope:', scope);

      navigator.serviceWorker
        .register(swUrl, { scope })
        .then((registration) => {
          console.log('[App] SW registered successfully:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, reload to update
                  if (confirm('Uusi versio saatavilla! Päivitetäänkö?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW registration failed: ', error);
        });
    });
  }
}
