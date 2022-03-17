<template>
  <div class="task">
    <div class="task__title">{{ itemTask.name }}</div>
    <div class="task__body">
      <div class="task__body-description">{{ itemTask.description }}</div>
      <div class="task__status">
        <p class="task__status-process" v-if="itemTask.list === 1">
          BackLog...
        </p>
        <p class="task__status-process" v-if="itemTask.list === 2">
          Process...
        </p>
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
    itemTask: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.task {
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
