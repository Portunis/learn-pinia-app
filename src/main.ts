import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faFontAwesome } from "@fortawesome/free-solid-svg-icons";

import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

library.add(fas, faFontAwesome);

import "@/assets/variables.scss"; // css var

createApp(App)
  .use(createPinia())
  .use(VCalendar, {})
  .component("fa", FontAwesomeIcon)
  .use(router)
  .mount("#app");
