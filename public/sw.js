let cacheData = 'appV1';

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/',
                // '/static/js/main.chunk.js',
                // '/static/js/0.chunk.js',
                // '/static/js/bundle.js',
                // '/index.html',
                // '/static/js/vendors~main.chunk.js',
                '/static/css/2.28bb0c3d.chunk.css',
                '/static/css/main.88300200.chunk.css',
                '/static/js/2.185c13cb.chunk.js',
                '/static/js/main.69a93024.chunk.js',
                'favicon.ico',
                'manifest.json'
                
            ]);
        })
    );
});

this.addEventListener('fetch', (e) => {
    if(!navigator.onLine){
        if(e.request.url === "https://boring-panini-af4195.netlify.app/logo192.png"){
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