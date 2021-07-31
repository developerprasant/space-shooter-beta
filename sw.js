const cacheName = 'v1';
const cacheAssats = [
  './index.html',
  './CSS/style.css',
  './JS/main.js'
]

self.skipWaiting();
self.addEventListener('install',e=>{
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache=>{
        cache.adAll(cacheAssets)
      })
      .then(()=>self.skipWaiting())
    
  )
})

self.addEventListener('activate',e=>{
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames=>{
      return Promice.all(
        cacheNames.map(cache=>{
          if(cache !== cacheName){
            //clearing old cache
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

self.addEventListener('fetch',e=>{
  console.log('fetching');
  e.respondWith(fetch(e.request)
    .catch(c=>caches.match(e.request)))
})





