<template>
  <h2>Авторизация</h2>
  <form class="form-user">
    <div class="group-input">
      <UiInput
        class="form-user__input"
        v-model="authForm.email"
        placeholder="Введите email"
      />
      <span v-if="errorMsg" class="input-error">{{ errorMsg }}</span>
      <UiInput
        class="form-user__input"
        v-model="authForm.password"
        placeholder="Введите пароль"
      />
    </div>
    <span>Забыли пароль ?</span>

    <UiButton @click.prevent="authUser" class="form-user__button"
      >Авторизация</UiButton
    >
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase";
import UiInput from "@/components/UI/input/UiInput.vue";
import UiButton from "@/components/UI/button/UiButton.vue";
import { mapActions } from "pinia";
import { useStore } from "@/store";
import router from "@/router";

export default defineComponent({
  name: "LoginUser",
  components: { UiButton, UiInput },
  template: "AuthLayout",
  data() {
    return {
      authForm: {
        email: "",
        password: "",
      },
      errorMsg: "",
    };
  },

  methods: {
    /**
     * Авторизируем пользователя в системе
     */
    async authUser() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.authForm.email, this.authForm.password)
        .then(() => router.push("/"))
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMsg = "Неверный email";
              break;
            case "auth/user-not-found":
              this.errorMsg =
                "Учетная запись с таким адресом электронной почты не найдена";
              break;
            case "auth/wrong-password":
              this.errorMsg = "Неверный пароль";
              break;
            default:
              this.errorMsg = "Email  или пароль неверны";
              break;
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.form-user {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__input {
    margin: 38px 0 17px 0;
    width: 317px;
  }
  &__button {
    width: 369px;
    padding: 18px 0;
    margin-top: 45px;
  }
}
.input-error {
  color: #f16063;
  text-align: left;
}
.group-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
