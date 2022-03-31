<template>
  <div class="time">{{ leftDigit }}{{ rightDigit }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "DigitTimer",
  props: {
    digit: {
      type: Number as PropType<number>,
      require: true,
    } as unknown as PropType<any>, //хуй знает
  },
  computed: {
    leftDigit() {
      return this.digit >= 10 ? this.digit.toString()[0] : "0";
    },
    rightDigit() {
      return this.digit >= 10
        ? this.digit.toString()[1]
        : this.digit.toString();
    },
  },
});
</script>
<style scoped>
.time {
  display: flex;
}
</style>
