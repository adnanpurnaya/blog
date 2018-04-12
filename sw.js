importScripts('/blog/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "blog",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/blog/_nuxt/app.a1447230fdc1c5a99160.js",
    "revision": "e827ee569e8192a556591423786e770f"
  },
  {
    "url": "/blog/_nuxt/layouts/default.c77eda9460f8a76d8703.js",
    "revision": "905ed0420e485094d609b72a590f6d7c"
  },
  {
    "url": "/blog/_nuxt/manifest.e6027ab3299a096b99b5.js",
    "revision": "6da6c85497eedb091e5adc7e4887ea74"
  },
  {
    "url": "/blog/_nuxt/pages/about.c3f3aab8c28aa824fee9.js",
    "revision": "8f74915477edeb453f48bd60c6999752"
  },
  {
    "url": "/blog/_nuxt/pages/index.90cc229fcce53e1c5804.js",
    "revision": "73123cff0b8ff237548a380265dec53c"
  },
  {
    "url": "/blog/_nuxt/pages/post/_slug/index.4852295fd2f455681229.js",
    "revision": "2443328bc55d9787081cdcb37fbf2321"
  },
  {
    "url": "/blog/_nuxt/vendor.45ad644b8bcb5292b512.js",
    "revision": "f2e20b49a65a3072dc4a15d2feaf7c0c"
  }
])


workboxSW.router.registerRoute(new RegExp('/blog/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/blog/.*'), workboxSW.strategies.networkFirst({}), 'GET')

