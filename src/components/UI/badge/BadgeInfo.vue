<template>
  <div class="badge" :class="`badge--${badge}`"><slot></slot></div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BadgeInfo",
  props: {
    badge: String,
  },
});
</script>

<style lang="scss" scoped>
.badge {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px;
  &--completed {
    border: 1px solid #42b983;
    color: #42b983;
  }
  &--active {
    border: 1px solid #1390e5;
    color: #1390e5;
  }
  &--created {
    border: 1px solid #8ac9ec;
    color: #8ac9ec;
  }
}
</style>
