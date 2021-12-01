import IndexedStore from "./Infrastructure/IndexedStore.js";

const cacheName = "Itemized";
const version = 2;

const cachedFiles = [
    "index.html",
    "app.js",
    "app.css",
    "data/loot.json",
    "images/AppIcon.svg",
    "images/icon-32.png",
    "images/icon-64.png",
    "images/icon-96.png",
    "images/icon-128.png",
    "images/icon-168.png",
    "images/icon-192.png",
    "images/icon-256.png",
    "images/icon-512.png",
    "Infrastructure/IndexedStore.js",
    "Infrastructure/Loot.js",
    "Infrastructure/Pluralize.js",
    "Infrastructure/Table.js",
    "Models/Inventory.js",
    "Models/Item.js",
    "Models/ItemProperty.js"
  ];

// Installing Service Worker
self.addEventListener('install', (e) => {

    const scopeUrl = new URL(e.currentTarget.registration.scope);
    
    console.info('[Service Worker] install request.');

    e.waitUntil((async () => {

        let store = new IndexedStore("cache_version");
        await store.open();

        const cachedVersion = await store.get("version");

        if (cachedVersion != version) {
            console.info('[Service Worker] Version changed - clearing application cache');
            caches.delete(cacheName);
            await store.put("version", version);
        }

        const cache = await caches.open(cacheName);
        console.info('[Service Worker] Caching all: app shell and content');

        const toCache = cachedFiles.map((_) => scopeUrl.pathname + _);
        await cache.addAll(toCache);
    })());
});


// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.info(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.info(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});
