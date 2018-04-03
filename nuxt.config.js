const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

const config = require('./config');

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: config.app.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: config.app.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: config.app.color },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vue-awesome',
    '@/plugins/application-methods'

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['storyblok-nuxt', {
      accessToken: 'r2f0HSecUbtclIZnj09eCwtt',
      cacheProvider: 'memory'
    }],
    "@nuxtjs/pwa"
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/, /^vue-awesome/]
          })
        ]
      }
    }
  },

  /*
  ** Router Base
  */
  router: {
    base: '/blog/',
    mode: 'hash'
  },

  /*
  ** Web App Manifest
  */
  manifest: {
    name: config.app.name,
    short_name: config.app.short_name,
    description: config.app.description,
    theme_color: config.app.color,
    background_color: "#fff",
    lang: 'id',
  }
}
