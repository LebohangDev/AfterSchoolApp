var cacheName = 'Jazka Activities';
var cacheVersion = 1;
var cacheFiles = [
    'index.html',
    'style.css',
    'Jazka.webmanifest',
    'Activities.js',
    "Images\Activities-IMG\Archery.jpg",
    "Images\Activities-IMG\baseball.jpg",
    "Images\Activities-IMG\basketball.jpg",
    "Images\Activities-IMG\football.jpg",
    "Images\Activities-IMG\swimming.jpg",
    "Images\Activities-IMG\volleyball.jpg",
    "Images\torii-shrine-gate-scenery-sunset-horizon-uhdpaper.com-4K-132.jpg",
    "Images\logo.png",
    "Images\torii-shrine-gate-scenery-sunset-horizon-uhdpaper.com-4K-132.jpg",
    "Images\Jazka-Logo.png"


]


self.addEventListener('install', (e) => {
    console.log('[service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('[service Worker] Caching files');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('fetch', function (e) {
    e.respondWith(
        // check if the cache has the file
        caches.match(e.request).then(response => {
            console.log('[service Worker] fetchinf resources:' + e.request.url);
            // 'r is the matching file if it exists in the cache

            return r
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})