// self.skipWaiting();

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('v3').then(function(cache) {
      //files to precache
     return cache.addAll([
      './',
      './index.html',
      './CSS/style.css',
      './JS/main.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
