<template>
  <div class="task">
    <div class="task__title">{{ task.name }}</div>
    <div class="task__body">
      <div class="task__body-description">{{ task.description }}</div>
      <div class="task__status">
        Process...
        <!-- В отдельный компонент + переделать -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardItem",
  props: {
    task: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.task {
  width: 250px;
  margin: 2px;
  border: 1px solid black;
  &__body {
    margin: 2px;
    background-color: #42b983;
  }
  &__status {
    padding: 4px;
    background-color: #1390e5;
  }
}
</style>
