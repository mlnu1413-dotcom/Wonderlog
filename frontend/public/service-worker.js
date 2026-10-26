// Minimal service worker: caches a few static files and an offline page
const CACHE = 'wanderlog-v1';
const FILES = ['/offline.html', '/images/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
});

self.addEventListener('activate', (e) => {
  // Remove old caches
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/api')) return; // never cache API/private data

  if (e.request.mode === 'navigate') {
    // Pages are always fetched from the network (never cached); offline page only on failure
    e.respondWith(fetch(e.request).catch(() => caches.match('/offline.html')));
  } else if (FILES.includes(url.pathname)) {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
  }
});
