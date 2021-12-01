const cacheName = "Itemized-v2";

const cachedFiles = [
    "/ItemizedJS/index.html",
    "/ItemizedJS/app.js",
    "/ItemizedJS/app.css",
    "/ItemizedJS/favicon.ico",
    "/ItemizedJS/data/loot.json",
    "/ItemizedJS/images/AppIcon.svg",
    "/ItemizedJS/images/icon-32.png",
    "/ItemizedJS/images/icon-64.png",
    "/ItemizedJS/images/icon-96.png",
    "/ItemizedJS/images/icon-128.png",
    "/ItemizedJS/images/icon-168.png",
    "/ItemizedJS/images/icon-192.png",
    "/ItemizedJS/images/icon-256.png",
    "/ItemizedJS/images/icon-512.png",
    "/ItemizedJS/Infrastructure/IndexedStore.js",
    "/ItemizedJS/Infrastructure/Loot.js",
    "/ItemizedJS/Infrastructure/Pluralize.js",
    "/ItemizedJS/Infrastructure/Table.js",
    "/ItemizedJS/Models/Inventory.js",
    "/ItemizedJS/Models/Item.js",
    "/ItemizedJS/Models/ItemProperty.js"
  ];

self.addEventListener('install', (event) => {
    console.info('[Service Worker] install request.');
    event.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.info('[Service Worker] Caching all: app shell and content');
        await cache.addAll(cachedFiles);
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key === cacheName) { return; }
            return caches.delete(key);
        }))
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {

        const url = new URL(event.request.url);

        if (!url.pathname.startsWith("/ItemizedJS") || event.request.method != "GET")
            return await fetch(event.request);

        const r = await caches.match(event.request);
        console.info(`[Service Worker] Fetching resource: ${event.request.url}`);
        if (r) return r;
        const response = await fetch(event.request);
        const cache = await caches.open(cacheName);
        console.info(`[Service Worker] Caching new resource: ${event.request.url}`);
        cache.put(event.request, response.clone());
        return response;
    })());
});
