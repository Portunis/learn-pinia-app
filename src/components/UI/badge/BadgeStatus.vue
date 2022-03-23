<template>
  <div class="status" :class="status">{{ status }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BadgeStatus",
  props: {
    status: String,
  },
});
</script>

<style lang="scss" scoped>
.status {
  position: absolute;
  border-radius: 4px;
  top: 4px;
  left: 5px;
  padding: 5px 7px;
  color: #fff;
}
.completed {
  background: #88c269;
}
.active {
  background: #5967ff;
}
.created {
  background: rgba(85, 80, 80, 0.5);
}
</style>
