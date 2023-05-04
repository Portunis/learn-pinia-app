<template>
  <h2>Регистрация</h2>
  <form class="form-user">
    <div class="group-input">
      <UiInput
        class="form-user__input"
        v-model="registerForm.email"
        :data="{ type: 'email', placeholder: 'Введите email' }"
        :class="{
          error: v$.registerForm.email.$error,
        }"
      />
      <span class="input-error" v-if="v$.registerForm.email.$error">
        {{ v$.registerForm.email.$errors[0].$message }}
      </span>

      <UiInput
        class="form-user__input"
        v-model="registerForm.password"
        :data="{ type: 'password', placeholder: 'Введите пароль' }"
        :class="{
          error: v$.registerForm.password.$error,
        }"
      />
      <span class="input-error" v-if="v$.registerForm.password.$error">
        {{ v$.registerForm.password.$errors[0].$message }}
      </span>
    </div>
    <span v-if="errorMsg" class="input-error">{{ errorMsg }}</span>
    <UiButton @click.prevent="registerUser" class="form-user__button"
      >Регистрация</UiButton
    >
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiInput from "@/components/UI/input/UiInput.vue";
import UiButton from "@/components/UI/button/UiButton.vue";
import { handleSignup } from "@/vuetils/useAuth";
import { email, helpers, required } from "@vuelidate/validators";
import { validateMessage } from "@/typescript/enum/validateMessage";
import useVuelidate from "@vuelidate/core";
import router from "@/router";

export default defineComponent({
  name: "RegisterUser",
  components: { UiButton, UiInput },
  template: "AuthLayout",
  data() {
    return {
      v$: useVuelidate(),
      registerForm: {
        email: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  validations() {
    return {
      registerForm: {
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
    };
  },
  methods: {
    registerUser() {
      handleSignup(this.registerForm)
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
  text-align: left;
  width: 350px;
  margin-left: 10px;
}
.group-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
