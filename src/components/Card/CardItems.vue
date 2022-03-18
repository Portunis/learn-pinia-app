<template>
  <draggableComponent
    :list="tasks"
    group="tasks"
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-bind="dragOptions"
    item-key="id"
    class="list-group"
    ghost-class="ghost"
    :move="checkMove"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <div class="list-group-item">
        <div class="task">
          <div class="task__title">{{ element.title }}</div>
          <div class="task__body">
            <p class="task__body-description">
              {{ element.description.substring(0, 150) + ".." }}
            </p>
          </div>
          <div class="task__status">
            {{ element.level }}
            <!-- В отдельный компонент  -->
          </div>
        </div>
      </div>
    </template>
  </draggableComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TaskModels from "@/models/task.models";

import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "CardItems",
  components: { draggableComponent },
  props: {
    tasks: {
      type: Array as PropType<TaskModels[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.task {
  width: 250px;
  margin: 10px auto;

  &__title {
    border-radius: 4px 4px 0 0;
    background-color: #fff;
    padding: 5px;
  }
  &__body {
    background-color: #fff;
    padding: 5px;
  }
  &__body-description {
    max-width: 250px;
    word-wrap: break-word;
  }
  &__status {
    padding: 4px;
    background-color: #1390e5;
    border-radius: 0 0 4px 4px;
    color: #fff;
  }
}
.list-group {
  min-height: 100px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
