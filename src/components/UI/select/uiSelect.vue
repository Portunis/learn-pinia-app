<template>
  <select class="select" v-model="modelValue" @change="changeOption">
    <option disabled>Без сортировки</option>
    <option value="High">High</option>
    <option value="Normal">Normal</option>
    <option value="Casual">Casual</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "uiSelect",
  methods: {
    changeOption(event: any) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.select {
  width: 334px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
  margin: 0 auto;
  position: relative;
}
select {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  padding: 12px 15px 12px 15px;
}
</style>
