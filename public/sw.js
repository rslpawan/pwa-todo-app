let cacheData = 'appV1';

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/',
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/static/js/vendors~main.chunk.js',
                
            ]);
        })
    );
});

this.addEventListener('fetch', (e) => {
    if(!navigator.onLine){
        if(e.request.url === "http://localhost:3000/static/js/main.chunk.js"){
            e.waitUntil(
                this.registration.showNotification("No internet!", {
                    body: "You are offline!"
                })
            )
        }
        e.respondWith(
            caches.match(e.request).then((res) => {
                if(res){
                    return res;
                }
            })
        )
    }
})