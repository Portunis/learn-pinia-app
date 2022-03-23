<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "uiButton",
};
</script>

<style lang="scss" scoped>
.button {
  background: #0095ff;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  padding: 15px 60px;
  margin: 40px 10px;
}
@media screen and (max-width: 320px) {
  .button {
    font-size: 16px;
    width: 91px;
    padding: 15px 25px;
  }
}
</style>
