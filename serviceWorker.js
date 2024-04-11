const cacheName = 'offiline-v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/style.css',
    '/index.js'
];

self.addEventListener('install', i => {
    console.log('service worker: installed');
    i.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('service worker: caching files');
                cache.addAll(cacheFiles);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', i => {
    console.log('service worker: activated');
    i.waitUntil(
        caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            console.log('service worker: clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

self.addEventListener('fetch', i => {
    console.log('service worker: fetching');
    i.respondWith(
        fetch(i.request)
            .then(response => {
                const clone = response.clone();
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(i.request, clone);
                    });
                return response;
            })
            .catch(() => caches.match(i.request).then(response => response))
    );
});