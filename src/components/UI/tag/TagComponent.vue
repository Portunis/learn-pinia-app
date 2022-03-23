<template>
  <div class="tag"><slot></slot></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TagComponent",
});
</script>

<style lang="scss" scoped>
.tag {
  font-size: 12px;
  height: 12px;
  cursor: pointer;
  background-color: rgba(79, 250, 171, 0.99);
  border-radius: 18px;
  margin: 2px;
  padding: 9px;
  color: #fff;
}
</style>
