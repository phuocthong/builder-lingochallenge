import { configure } from "quasar/wrappers";

export default configure((ctx) => {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },

    boot: [],

    css: ["app.scss"],

    extras: [
      "material-icons",
      "material-icons-outlined",
      "material-icons-round",
      "material-icons-sharp",
      "fontawesome-v6",
    ],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node16",
      },

      vueRouterMode: "history",
    },

    devServer: {
      open: true,
      port: 8080,
    },

    framework: {
      config: {},

      plugins: [
        "Notify",
        "Dialog",
        "Loading",
        "LocalStorage",
        "SessionStorage",
      ],
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ["render"],
    },

    pwa: {
      workboxMode: "generateSW",
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      inspectPort: 5858,

      bundler: "packager",

      packager: {},

      builder: {
        appId: "lingochallenge",
      },
    },

    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
