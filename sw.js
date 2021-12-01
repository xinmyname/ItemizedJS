import IndexedStore from "./Infrastructure/IndexedStore.js";

const cacheName = "Itemized";
const version = 1;

// Installing Service Worker
self.addEventListener('install', (e) => {

    console.info('[Service Worker] Install');

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
        // await cache.addAll(contentToCache);
    })());
});

/*
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
*/