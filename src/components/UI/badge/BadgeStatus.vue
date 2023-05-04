<template>
  <div class="status" :class="status">
    <fa v-if="status === 'created'" class="icon" icon="hourglass-start" />
    <fa v-if="status === 'active'" class="icon" icon="clock" />
    <fa v-if="status === 'completed'" class="icon" icon="circle-check" />
  </div>
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
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px;
}
.icon {
  width: 30px;
  height: 30px;
}
.completed {
  color: #fff;
  background: #88c269;
}
.active {
  color: #fff;
  background: #5967ff;
}
.created {
  color: #fff;
  background: #8ac9ec;
}
</style>
