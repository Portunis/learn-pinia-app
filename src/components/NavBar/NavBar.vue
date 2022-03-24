<template>
  <div class="nav">
    <div class="nav__icon">
      <router-link to="dashboard" v-slot="{ isActive }">
        <fa
          :class="{ isActive: isActive }"
          class="icon"
          icon="square-poll-horizontal"
        />
      </router-link>
      <router-link to="calendar" v-slot="{ isActive }"
        ><fa class="icon" :class="{ isActive: isActive }" icon="calendar-days"
      /></router-link>
      <router-link to="chart" v-slot="{ isActive }">
        <fa class="icon" :class="{ isActive: isActive }" icon="chart-line"
      /></router-link>
      <!--      <router-link to="settings"> <fa class="icon" icon="gear" /></router-link>-->
      <router-link to="test-page" v-slot="{ isActive }">
        <fa class="icon" :class="{ isActive: isActive }" icon="tent"
      /></router-link>
    </div>
    <div class="user">
      <fa class="icon" icon="bell" />
      <img class="user__avatar" src="https://i.pravatar.cc/300" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  &__icon {
    margin-right: 50px;
  }
}
.user {
  display: flex;
  align-items: center;
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
}
.icon {
  cursor: pointer;
  color: #e5e5e5;
  width: 30px;
  height: 30px;
  padding: 10px;
  margin: 5px;

  &:hover {
    color: #1390e5;
    background-color: #c8ebfb;
    padding: 10px;
    border-radius: 10px;
  }
}
.isActive {
  color: #1390e5;
  background: #c8ebfb;
  border-radius: 10px;
}
</style>
