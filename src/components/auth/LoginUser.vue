<template>
  <h2 v-if="!activeResetPassword">Авторизация</h2>
  <h2 v-if="activeResetPassword">Восстановление пароля</h2>
  <form class="form-user">
    <div v-if="!activeResetPassword" class="group-input">
      <UiInput
        :data="{ type: 'email', placeholder: 'Введите email' }"
        class="form-user__input"
        v-model="authForm.email"
        :class="{
          error: v$.authForm.email.$error,
        }"
      />
      <span class="input-error" v-if="v$.authForm.email.$error">
        {{ v$.authForm.email.$errors[0].$message }}
      </span>

      <UiInput
        :data="{ type: 'password', placeholder: 'Введите пароль' }"
        class="form-user__input"
        v-model="authForm.password"
        :class="{
          error: v$.authForm.password.$error,
        }"
      />
      <span class="input-error" v-if="v$.authForm.password.$error">
        {{ v$.authForm.password.$errors[0].$message }}
      </span>
    </div>
    <span
      class="resetPassword"
      v-if="!activeResetPassword"
      @click="activeResetPassword = true"
      >Забыли пароль ?</span
    >

    <UiInput
      v-if="activeResetPassword"
      class="form-user__input"
      placeholder="Введите почту"
      v-model="emailResetPassword"
    />
    <div v-if="!loadingAuth">
      <UiButton
        v-if="!activeResetPassword"
        @click.prevent="authUser"
        class="form-user__button"
        >Авторизация</UiButton
      >
      <UiButton
        v-if="activeResetPassword"
        @click.prevent="resetUserPassword"
        class="form-user__button"
        >Сбросить пароль</UiButton
      >
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useVuelidate from "@vuelidate/core";
import { validateMessage } from "@/typescript/enum/validateMessage";
import { handleLogin } from "@/vuetils/useAuth";

import UiInput from "@/components/UI/input/UiInput.vue";
import UiButton from "@/components/UI/button/UiButton.vue";

import { email, helpers, required } from "@vuelidate/validators";
import router from "@/router";

export default defineComponent({
  name: "LoginUser",
  components: { UiButton, UiInput },
  template: "AuthLayout",
  data() {
    return {
      v$: useVuelidate(),
      loadingAuth: false,
      activeResetPassword: false,
      emailResetPassword: "",
      authForm: {
        email: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  validations() {
    return {
      authForm: {
        email: {
          email: helpers.withMessage(validateMessage.errorMail, email),
          required: helpers.withMessage(
            validateMessage.requiredInput,
            required
          ),
        },
        password: {
          required: helpers.withMessage(
            validateMessage.requiredInput,
            required
          ),
        },
      },
      emailResetPassword: {
        email: helpers.withMessage(validateMessage.errorMail, email),
        required: helpers.withMessage(validateMessage.requiredInput, required),
      },
    };
  },
  methods: {
    authUser() {
      handleLogin(this.authForm)
        .then((data: any) => {
          if (data.error) {
            console.log("Ошибка", data.error);
            this.v$.$validate();
          } else {
            router.push("/");
          }
        })
        .catch(() => {
          this.v$.$validate();
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
  width: 350px;
  margin-left: 10px;
}
.group-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.loaderAuth {
  width: 100px;
  margin: 15px auto;
}
.resetPassword {
  &:hover {
    color: #4d47c3;
    cursor: pointer;
  }
}
</style>
