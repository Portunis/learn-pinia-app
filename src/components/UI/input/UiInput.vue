<template>
  <input class="input" @input="updateInput" :value="modelValue" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "uiInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event: InputEvent) {
      const eventTarget = event.target as HTMLInputElement;
      this.$emit("update:modelValue", eventTarget.value);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../assets/variables";
.input {
  max-width: 369px;
  border-radius: 10px;
  padding: 20px 26px 20px 26px;
  background: #f0efff;
  border: none;
  outline: none;
  font-family: $poppins-font;
  font-weight: $regular-font-weight;
  font-size: $p4-fontInter-size;
  color: #a7a3ff;
}
@media screen and (max-width: 320px) {
  .input {
    font-size: 16px;
    padding: 12px 10px 12px 15px;
  }
}
</style>
