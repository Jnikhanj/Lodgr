const CACHE_NAME = "lodgr-v5.0.0-tax-workspace";
const CORE_ASSETS = [
  "./",
  "./index.html?v=5.0.0",
  "./styles.css?v=5.0.0",
  "./app.js?v=5.0.0",
  "./tax-v5.js?v=5.0.0",
  "./manifest.webmanifest?v=5.0.0",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/apple-touch-icon.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME && key.startsWith("lodgr-")).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html?v=5.0.0"))));
});
