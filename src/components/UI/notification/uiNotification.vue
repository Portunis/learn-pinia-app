<template>
  <div class="notification">
    <p class="notification__body"><slot></slot></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "uiNotification",
});
</script>

<style lang="scss" scoped>
.notification {
  position: absolute;
  top: 100px;
  right: 30px;
  max-width: 400px;
  width: auto;
  height: auto;
  padding: 5px 15px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  &__body {
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
    text-align: center;
  }
}
@media screen and (max-width: 320px) {
  .notification {
    right: 5px;
    left: 5px;
  }
}
</style>
