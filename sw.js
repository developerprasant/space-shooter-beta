const cacheName = 'v0';
// self.addEventListener('install',e=>{})
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
  e.respondWith(
    fetch(e.request.url)
    .then(res=>{
      //Make copy clone of response
      const resClone = res.clone();
      //open cache
      caches
        .open(cacheName)
        .then(cache=>{
          //add the response to cache
          cache.put(e.request,resClone);
        })
      return res;
    }).catch(err=>caches.match(e.request).then(res=>res))
  );
})