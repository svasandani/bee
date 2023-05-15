self.addEventListener("install", () => {});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const url = new URL(event.request.url);
      if (url.host.includes("freebee.fun")) return fetch(event.request);

      try {
        const res = await fetch(event.request);
        const cache = await caches.open("cache");
        cache.put(event.request.url, res.clone());
        return res;
      } catch {
        return caches.match(event.request);
      }
    })()
  );
});
