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
          <div class="task__created" v-if="element.startTask">Created</div>
          <div
            class="task__active"
            v-if="!element.complete && !element.startTask"
          >
            Active
          </div>
          <div class="task__complete" v-if="element.complete">Complete</div>
          <div class="task__modal" @click="getTask(element)">+</div>
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
  methods: {
    getTask(element: TaskModels) {
      this.$emit("getTask", element);
    },
  },
});
</script>

<style lang="scss" scoped>
.task {
  position: relative;
  width: 250px;
  margin: 10px auto;

  &__active {
    position: absolute;
    border-radius: 4px;
    background: #5967ff;
    top: 4px;
    left: 5px;
    padding: 5px 7px;
    color: #fff;
  }
  &__created {
    position: absolute;
    border-radius: 4px;
    background: #68686b;
    top: 4px;
    left: 5px;
    padding: 5px 7px;
    color: #fff;
  }
  &__complete {
    position: absolute;
    border-radius: 4px;
    background: #60ce47;
    top: 4px;
    left: 5px;
    padding: 5px 7px;
    color: #fff;
  }
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
  &__modal {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 3px 7px;
    background: #42b983;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
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
