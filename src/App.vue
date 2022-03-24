<template>
  <div class="container">
    <div class="header">
      <div class="header__widget">
        <h2 class="header__title">Active Tasks</h2>
        <div class="header__info">
          <BadgeInfo>Filter</BadgeInfo>
          <BadgeInfo>23.03.2022</BadgeInfo>
        </div>
      </div>
      <NavBar />
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { mapActions } from "pinia";
import { useStore } from "@/store";
import BadgeInfo from "@/components/UI/badge/BadgeInfo.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
export default defineComponent({
  components: { NavBar, BadgeInfo },
  created() {
    this.boards();
  },
  methods: {
    ...mapActions(useStore, {
      boards: "getLocalStorage",
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

.container {
  width: 1400px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    text-align: left;
  }
  &__info {
    display: flex;
  }
  &__nav {
    display: flex;
  }
}
</style>
