/* eslint-env node */

import { configure } from 'quasar/wrappers'

export default configure(function (/* ctx */) {
  return {
    eslint: {
      fix: true,
      warnings: true,
      errors: true
    },

    preFetch: true,

    app: {
      iconHash: false
    },

    css: [
      'app.scss'
    ],

    extras: [
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      vueRouterMode: 'history'
    },

    devServer: {
      open: true,
      port: 8080
    },

    framework: {
      config: {},
      plugins: [
        'Notify',
        'Dialog',
        'Loading'
      ]
    },

    animations: 'all',

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: [
        'render'
      ]
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,

      bundler: 'packager',

      packager: {},

      builder: {
        appId: 'english-bot-quasar'
      }
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ]
    }
  }
})
