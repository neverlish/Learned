workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('/.*\.json'),
  workbox.strategies.networkFirst()
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

