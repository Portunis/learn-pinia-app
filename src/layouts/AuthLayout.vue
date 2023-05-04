<template>
  <UiNotification v-if="errorMessage">{{ errorMessage }}</UiNotification>
  <div class="container">
    <div class="auth">
      <div v-if="notAuth" class="auth__text">
        <p style="font-size: 50px; margin: 10px 0">Войдите</p>
        <p style="font-size: 35px; margin: 10px 0">чтобы начать пользоваться</p>
        <p style="font-size: 16px; width: 308px">
          Если у вас нет аккаунта -
          <a
            class="auth__link"
            @click="
              notRegister = true;
              notAuth = false;
            "
          >
            cоздайте его</a
          >
        </p>
      </div>
      <div v-if="notRegister" class="auth__text">
        <p style="font-size: 50px; margin: 10px 0">Зарегистрируйтесь</p>
        <p style="font-size: 35px; margin: 10px 0">чтобы начать пользоваться</p>
        <p style="font-size: 16px">
          Если у вас есть аккаунт -
          <a
            class="auth__link"
            @click="
              notRegister = false;
              notAuth = true;
            "
          >
            авторизируйтесь</a
          >
        </p>
      </div>

      <img class="auth__people" src="../assets/img/Saly-14.png" />

      <div>
        <RegisterUser
          v-if="notRegister"
          @authUser="
            notAuth = true;
            notRegister = false;
          "
        />
        <LoginUser v-if="notAuth" />
        <div class="social-auth">
          <p>или продолжить с помощью</p>
          <div class="social-auth__icon">
            <div class="icon">
              <svg
                width="42"
                height="43"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="20.7287"
                  cy="19.7286"
                  rx="18.1376"
                  ry="18.1376"
                  fill="url(#paint0_linear_2_49)"
                />
                <path
                  d="M27.4832 26.9339L28.2889 21.8146H23.2488V18.494C23.2488 17.0931 23.9515 15.7268 26.209 15.7268H28.5019V11.3685C28.5019 11.3685 26.4219 11.0226 24.4342 11.0226C20.2815 11.0226 17.5697 13.475 17.5697 17.9129V21.8146H12.9554V26.9339H17.5697V39.3101C18.4961 39.4519 19.4438 39.5245 20.4092 39.5245C21.3747 39.5245 22.3224 39.4519 23.2488 39.3101V26.9339H27.4832Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2_49"
                    x1="20.7287"
                    y1="1.59108"
                    x2="20.7287"
                    y2="37.7586"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#18ACFE" />
                    <stop offset="1" stop-color="#0163E0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div @click="authSocialApple" class="icon">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.8662 20.7286C38.8662 30.7406 30.7497 38.8662 20.7287 38.8662C10.7077 38.8662 2.59109 30.7406 2.59109 20.7286C2.59109 10.7076 10.7077 2.59108 20.7287 2.59108C30.7497 2.59108 38.8662 10.7076 38.8662 20.7286Z"
                  fill="#283544"
                />
                <path
                  d="M29.2301 16.1391C29.1311 16.1968 26.775 17.4153 26.775 20.117C26.8861 23.1981 29.7483 24.2786 29.7974 24.2786C29.7483 24.3363 29.3653 25.7505 28.2307 27.233C27.3302 28.5099 26.3308 29.7974 24.8132 29.7974C23.3696 29.7974 22.8514 28.9464 21.1857 28.9464C19.3969 28.9464 18.8907 29.7974 17.5211 29.7974C16.0035 29.7974 14.93 28.441 13.9805 27.176C12.7469 25.5203 11.6984 22.9221 11.6614 20.4274C11.6365 19.1054 11.9085 17.806 12.5989 16.7022C13.5733 15.1613 15.3131 14.1152 17.2129 14.0807C18.6686 14.035 19.9642 15.012 20.8525 15.012C21.7039 15.012 23.2956 14.0807 25.0964 14.0807C25.8738 14.0815 27.9466 14.2997 29.2301 16.1391ZM20.7294 13.8168C20.4703 12.6095 21.1857 11.4023 21.8519 10.6322C22.7033 9.7009 24.0479 9.06879 25.2075 9.06879C25.2815 10.276 24.8124 11.46 23.9739 12.3224C23.2215 13.2537 21.926 13.9548 20.7294 13.8168Z"
                  fill="white"
                />
              </svg>
            </div>
            <div @click="authSocialGoogle" class="icon">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.4108 21.1315C39.4108 19.6402 39.2873 18.5519 39.02 17.4234H21.6434V24.1543H31.8431C31.6375 25.8271 30.5271 28.3462 28.0593 30.0389L28.0247 30.2643L33.5189 34.4354L33.8996 34.4727C37.3954 31.3086 39.4108 26.6533 39.4108 21.1315"
                  fill="#4285F4"
                />
                <path
                  d="M21.6422 38.8662C26.6392 38.8662 30.8342 37.2539 33.8984 34.4728L28.0581 30.0391C26.4953 31.1072 24.3977 31.8528 21.6422 31.8528C16.748 31.8528 12.5941 28.6889 11.1133 24.3157L10.8963 24.3338L5.18338 28.6667L5.10867 28.8702C8.15212 34.7952 14.4036 38.8662 21.6422 38.8662Z"
                  fill="#34A853"
                />
                <path
                  d="M11.1144 24.3158C10.7237 23.1873 10.4976 21.978 10.4976 20.7286C10.4976 19.479 10.7237 18.2699 11.0939 17.1414L11.0835 16.901L5.29899 12.4986L5.10973 12.5868C3.85537 15.0455 3.13562 17.8064 3.13562 20.7286C3.13562 23.6508 3.85537 26.4116 5.10973 28.8703L11.1144 24.3158"
                  fill="#FBBC05"
                />
                <path
                  d="M21.6423 9.60422C25.1176 9.60422 27.4619 11.0754 28.7986 12.3048L34.0219 7.30685C30.814 4.38469 26.6393 2.59108 21.6423 2.59108C14.4037 2.59108 8.15214 6.66192 5.10867 12.5868L11.0928 17.1414C12.5941 12.7683 16.7481 9.60422 21.6423 9.60422"
                  fill="#EB4335"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoginUser from "@/components/auth/LoginUser.vue";
import RegisterUser from "@/components/auth/RegisterUser.vue";
import { mapState } from "pinia";
import { useUserStore } from "@/store/user";
import UiNotification from "@/components/UI/notification/UiNotification.vue";

export default defineComponent({
  name: "AuthLayout",
  components: { UiNotification, RegisterUser, LoginUser },
  data() {
    return {
      notAuth: true,
      notRegister: false,
    };
  },
  computed: {
    ...mapState(useUserStore, {
      errorMessage: "errorMessage",
    }),
  },

  methods: {},
});
</script>
<style lang="scss">
@import "../assets/variables";
.container {
  width: 1400px;
}
.auth {
  display: flex;
  justify-content: space-between;
  margin-top: 174px;
  &__people {
    margin-top: 260px;
    height: 460px;
  }
  &__text {
    margin: 80px 0 0 0;
    font-family: $poppins-font;
    font-weight: $bold-font-weight;
    text-align: left;
    color: #000;
  }
  &__link {
    color: #4d47c3;
    cursor: pointer;
  }
}
.social-auth {
  margin-top: 54px;
  &__icon {
    display: flex;
    justify-content: center;
    margin: 47px 0 0 0;
  }
}
.icon {
  margin: 0 10px;
  cursor: pointer;
}
</style>
