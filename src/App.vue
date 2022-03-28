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
          <BadgeInfo><fa icon="calendar" /> 23.03.2022</BadgeInfo>
        </div>
        <transition name="filter">
          <div class="header__filter-body" v-if="filterOn">
            <BadgeInfo
              ><div>
                <select>
                  <option>data</option>
                </select>
                <select>
                  <option>Created</option>
                  <option>Active</option>
                  <option>Completed</option>
                </select>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div></BadgeInfo
            >
          </div>
        </transition>
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
import { useTaskStore } from "@/store/task";
export default defineComponent({
  components: { NavBar, BadgeInfo },
  data() {
    return {
      filterOn: false,
    };
  },
  created() {
    this.boards();
    this.initTask();
  },
  methods: {
    ...mapActions(useStore, {
      boards: "getLocalStorage",
    }),
    ...mapActions(useTaskStore, {
      initTask: "initTask",
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
