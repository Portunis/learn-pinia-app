import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: "",
    user: {} as string | undefined,
    errorMessage: "",
  }),
  actions: {},
});
