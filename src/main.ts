import { createApp } from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Import our custom styles
import "./css/app.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: {}, // Import Quasar plugins here
});

app.use(pinia);
app.use(router);

app.mount("#app");
