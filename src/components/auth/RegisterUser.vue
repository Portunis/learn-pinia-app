<template>
  <h2>Регистрация</h2>
  <form class="form-user">
    <div class="group-input">
      <UiInput
        class="form-user__input"
        v-model="registerForm.email"
        placeholder="Введите email"
      />
      <UiInput
        class="form-user__input"
        v-model="registerForm.password"
        placeholder="Введите пароль"
      />
    </div>
    <span v-if="errorMsg" class="input-error">{{ errorMsg }}</span>
    <UiButton @click.prevent="registerUser" class="form-user__button"
      >Регистрация</UiButton
    >
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase";
import UiInput from "@/components/UI/input/UiInput.vue";
import UiButton from "@/components/UI/button/UiButton.vue";

export default defineComponent({
  name: "RegisterUser",
  components: { UiButton, UiInput },
  template: "AuthLayout",
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    /**
     * Регистрируем пользователя в системе
     */
    async registerUser() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.registerForm.email,
          this.registerForm.password
        )
        .then(() => {
          this.$emit("authUser");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMsg = "Неверный формат email";
              break;
            case "auth/email-already-in-use":
              this.errorMsg =
                "Учетная запись с таким адресом электронной почты уже использутеся";
              break;
            case "auth/weak-password":
              this.errorMsg = "Введен слабый пароль";
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
  align-items: center;

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
  text-align: center;
  width: 300px;
}
.group-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
