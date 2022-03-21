import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(Toast).use(router).mount("#app");
