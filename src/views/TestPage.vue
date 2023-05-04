<template>
  <h2>Тестовая страница для всяких штук</h2>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isDotMenuOpen: false,
    };
  },
  methods: {
    test(el: any) {
      console.log("test", el);
    },
  },
});
</script>
<style lang="scss" scoped></style>
