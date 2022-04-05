import { defineStore } from "pinia";
import firebase from "firebase";
import router from "@/router";

export const useStore = defineStore("main", {
  state: () => ({
    isLoggedIn: false,
    user: {},
    errorMessage: "",
  }),
  actions: {
    /**
     * Получаем вошедшего пользователя
     */
    getUserAuth(): void {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.push("/auth");
        } else {
          this.user = user;
          localStorage.setItem("USER_LOGGED", user.uid);
          this.isLoggedIn = true;
        }
      });
    },
    /**
     * Выводим пользователя с системы
     */
    logoutUser(): void {
      firebase.auth().signOut();
      this.isLoggedIn = false;
      localStorage.removeItem("USER_LOGGED");
      router.push("/auth");
    },
    /**
     * Авторизация с помощью google
     */
    googleAuth(): void {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => router.push("/"))
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000); //убрать дублирвоанние кода
        });
    },
    /**
     * Авторизация с помощью apple
     */
    appleAuth(): void {
      const provider = new firebase.auth.OAuthProvider("apple.com");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => router.push("/"))
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.message;
          setTimeout(() => {
            this.errorMessage = "";
          }, 2000);
        });
    },
  },
});
