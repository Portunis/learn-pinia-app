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
.input {
  width: 334px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
  margin: 5px auto;
  padding: 12px 15px 12px 15px;
  position: relative;
}
.input[type="text"]:focus {
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390e5;
}
.input[type="password"]:focus {
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390e5;
}
@media screen and (max-width: 320px) {
  .input {
    font-size: 16px;
    padding: 12px 10px 12px 15px;
  }
}
</style>
