import { createApp } from "vue";
import { Quasar, Notify, Dialog, Loading } from "quasar";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
    Loading,
  },
  config: {
    notify: {
      position: "top",
      timeout: 3000,
    },
  },
});

const pinia = createPinia();
myApp.use(pinia);
myApp.use(router);

// Restore auth state after Pinia is initialized
const authStore = useAuthStore();
authStore.restoreAuth();

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
