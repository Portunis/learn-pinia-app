<template>
  <div v-if="user.uid" class="userUID">UID: {{ user.uid }}</div>
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
      <img
        @click="showUserMenu = !showUserMenu"
        class="user__avatar"
        src="https://i.pravatar.cc/300"
      />
      <div v-if="showUserMenu" class="user__info">
        <h4 v-if="user.displayName">{{ user.displayName }}</h4>
        <h4 v-if="!user.displayName">{{ user.email }}</h4>
        <p class="user__button">Настройки</p>
        <p class="user__button" @click="logOutUser">Выйти</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { mapActions, mapState } from "pinia";
import { useStore } from "@/store";

export default defineComponent({
  name: "NavBar",
  data() {
    return {
      showUserMenu: false,
    };
  },
  computed: {
    ...mapState(useStore, {
      user: "user",
    }),
  },
  methods: {
    ...mapActions(useStore, {
      logOut: "logoutUser",
    }),
    /**
     * Вызывает функицю вывода пользователя из системы
     */
    logOutUser() {
      this.logOut();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/variables";
.nav {
  display: flex;
  &__icon {
    margin-right: 50px;
  }
}
.userUID {
  position: absolute;
  top: 2px;
  right: 2px;
  opacity: 0.3;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.user {
  display: flex;
  align-items: center;
  &__button {
    margin: 0;
    font-family: $poppins-font;
    cursor: pointer;
    padding: 10px 15px;
    &:hover {
      background-color: #4d47c3;

      border-radius: 10px;
      color: white;
    }
  }
  &__info {
    position: absolute;
    background-color: #c8ebfb;
    width: 150px;
    border-radius: 10px;
    top: 100px;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
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
