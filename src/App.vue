<template>
  <component :is="layout">
    <template v-slot:content>
      <router-view />
    </template>
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import BadgeInfo from "@/components/UI/badge/BadgeInfo.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import TaskTASK from "@/typescript/Task";
import { mapActions } from "pinia";
import { useBoardStore } from "@/store/board";
const testClasses = new TaskTASK(
  1,
  "name",
  "qwe",
  213,
  "cea",
  "23",
  12312,
  345,
  234
);
export default defineComponent({
  components: { NavBar, BadgeInfo },
  created() {
    testClasses.testFn();
    this.initBoard();
  },
  computed: {
    layout: function () {
      return this.$route.meta.layout || "default-layout";
    },
  },
  methods: {
    ...mapActions(useBoardStore, {
      initBoard: "getLocalStorage",
    }),
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
