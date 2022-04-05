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

library.add(fas, faFontAwesome);

import "@/assets/variables.scss"; // css var

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);
// /

createApp(App)
  .use(createPinia())
  .use(VCalendar, {})
  .component("fa", FontAwesomeIcon)
  .component("default-layout", DefaultLayout)
  .component("auth-layout", AuthLayout)
  .use(router)

  .mount("#app");
