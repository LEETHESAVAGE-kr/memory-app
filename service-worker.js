const CACHE_NAME = "memory-quiz-v9-ios-safe";
const APP_SHELL = ["./index.html?v=9", "./manifest.webmanifest?v=9", "./icon-192.png?v=9", "./icon-512.png?v=9"];
self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  event.respondWith(
    fetch(req, { cache: "no-store" }).catch(() => caches.match(req))
  );
});
