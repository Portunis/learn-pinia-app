import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    counter: 25,
  }),
  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },
  actions: {},
});
