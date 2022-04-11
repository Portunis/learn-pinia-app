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
import UserProfileLayout from "@/layouts/UserProfileLayout.vue";

const firebaseConfig = {
  apiKey: "AIzaSyCdOOPkuw2QYm1kqRQFFDOeH3YQ71GCwj4",
  authDomain: "vue-task-portunis.firebaseapp.com",
  projectId: "vue-task-portunis",
  storageBucket: "vue-task-portunis.appspot.com",
  messagingSenderId: "71168184352",
  appId: "1:71168184352:web:771f9077c396d9bcacac45",
};

firebase.initializeApp(firebaseConfig);
// /

createApp(App)
  .use(createPinia())
  .use(VCalendar, {})
  .component("fa", FontAwesomeIcon)
  .component("default-layout", DefaultLayout)
  .component("auth-layout", AuthLayout)
  .component("user-profile-layout", UserProfileLayout)
  .use(router)

  .mount("#app");
