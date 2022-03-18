<template>
  <div class="task">
    <div class="task__title">{{ task.title }}</div>
    <div class="task__body">
      <div class="task__body-description">
        {{ task.description.substring(0, 150) + ".." }}
      </div>
    </div>
    <div class="task__status">
      Process...
      <!-- В отдельный компонент + переделать -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useStore } from "@/store";

export default defineComponent({
  name: "CardItem",
  props: {
    task: {
      type: String,
    },
  },
  computed: {
    ...mapState(useStore, {
      board: "boards",
    }),
  },
});
</script>

<style lang="scss" scoped>
.task {
  width: 250px;
  margin: 10px auto;

  &__title {
    border-radius: 4px 4px 0 0;
    background-color: antiquewhite;
    padding: 5px;
  }
  &__body {
    background-color: #42b983;
    padding: 5px;
  }
  &__status {
    padding: 4px;
    background-color: #1390e5;
    border-radius: 0 0 4px 4px;
  }
}
</style>
