import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faFontAwesome } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faFontAwesome);

createApp(App)
  .use(createPinia())
  .component("fa", FontAwesomeIcon)
  .use(router)
  .mount("#app");
