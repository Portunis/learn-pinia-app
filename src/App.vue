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

export default defineComponent({
  components: { NavBar, BadgeInfo },
  computed: {
    layout: function () {
      return this.$route.meta.layout || "default-layout";
    },
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
