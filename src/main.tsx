import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { preloadImages } from './preloadImages'
import { registerServiceWorker } from './registerSW'

// Preload all images immediately
preloadImages()

// Register service worker for PWA
registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
