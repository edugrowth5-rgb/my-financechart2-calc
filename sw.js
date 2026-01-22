const CACHE_NAME = 'citizen-force-v10'; // वर्जन बढ़ाकर v9 कर दिया है
const assets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // पुराने सर्विस वर्कर को तुरंत हटा देगा
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(assets)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(k => {
        if(k !== CACHE_NAME) return caches.delete(k);
      }));
    }).then(() => self.clients.claim()) // नए वर्कर को तुरंत कंट्रोल देगा
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
