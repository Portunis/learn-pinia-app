<template>
  <div class="container">
    <div class="header">
      <div class="header__widget">
        <h2 class="header__title">Active Tasks</h2>
        <div class="header__info">
          <div class="header__filter">
            <BadgeInfo @click="filterOn = !filterOn"
              ><fa icon="filter" /> Filter</BadgeInfo
            >
          </div>

          <BadgeInfo><fa icon="calendar" /> {{ dateNow }}</BadgeInfo>
          <transition name="filter">
            <div class="filter" v-if="filterOn">
              <BadgeInfo>filter select</BadgeInfo>
            </div>
          </transition>
        </div>
      </div>

      <NavBar />
    </div>

    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";

import BadgeInfo from "@/components/UI/badge/BadgeInfo.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
export default defineComponent({
  components: { NavBar, BadgeInfo },
  name: "DefaultLayout",
  data() {
    return {
      filterOn: false,
    };
  },
  computed: {
    dateNow() {
      let date = new Date(Date.now());
      return moment(date).format("DD.MM.YYYY");
    },
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
.container {
  width: 1400px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  &__title {
    text-align: left;
  }
  &__info {
    display: flex;
    align-items: flex-start;
  }
  &__nav {
    display: flex;
    align-items: flex-start;
  }
  &__filter {
    display: block;
  }
}

//transition

.filter-enter-active,
.filter-leave-active {
  transition: all 0.25s ease-out;
}

.filter-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.filter-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
