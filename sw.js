/* Offline support: site files come from the network first and fall back to the cache, so a new deploy is never mixed with old files; fonts are served from the cache. */
const CACHE = 'pep-v2';
const CORE = ['/', '/index.html', '/styles.css', '/js/data.js', '/js/core.js', '/js/app.js', '/js/exam.js', '/psssb-typing-test.html', '/punjab-gk-mock-test.html', '/js/qbank-punjab-gk.js', '/js/cbt.js', '/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const own = url.origin === location.origin, fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!own && !fonts) return; // ads and anything else go straight to the network
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, {ignoreSearch: req.mode === 'navigate'});
    const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit || Response.error());
    return own ? net : (hit || net);
  }));
});
