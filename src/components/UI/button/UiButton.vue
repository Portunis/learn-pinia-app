<template>
  <button class="button" :disabled="isDisabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "uiButton",
  props: {
    isDisabled: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/variables";
.button {
  background: #4d47c3;
  box-shadow: 0 4px 61px rgba(77, 71, 195, 0.4);
  border-radius: 9px;
  border: none;
  cursor: pointer;
  font-family: $poppins-font;
  font-weight: $regular-font-weight;
  font-size: $p5-fontInter-size;
  color: #ffffff;
  &:hover {
    background-color: #4e4a98;
  }
}
</style>
