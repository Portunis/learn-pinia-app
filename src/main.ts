import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faFontAwesome } from "@fortawesome/free-solid-svg-icons";

import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

library.add(fas, faFontAwesome);

import "@/assets/variables.scss"; // css var

import UserProfileLayout from "@/layouts/UserProfileLayout.vue";

createApp(App)
  .use(createPinia())
  .use(VCalendar, {})
  .use(Vue3Lottie, { name: "LottieAnimation" })
  .component("fa", FontAwesomeIcon)
  .component("default-layout", DefaultLayout)
  .component("auth-layout", AuthLayout)
  .component("user-profile-layout", UserProfileLayout)
  .use(router)

  .mount("#app");
