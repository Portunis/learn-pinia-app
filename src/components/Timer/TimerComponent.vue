<template>
  <div class="time">
    <DigitTimer :digit="hours" />
    :
    <DigitTimer :digit="minutes" />
    :
    <DigitTimer :digit="seconds" />
  </div>
</template>

<script lang="ts">
import DigitTimer from "@/components/Timer/DigitTimer.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "TimerComponent",
  components: { DigitTimer },
  props: {
    days: {
      type: Number,
      required: false,
    },
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
});
</script>
<style scoped>
.time {
  display: flex;
  align-items: center;
}
</style>
