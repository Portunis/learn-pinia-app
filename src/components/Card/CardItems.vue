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
    item-key="id"
    class="list-group"
    ghost-class="ghost"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <div class="list-group-item">
        <div class="task">
          <div class="task__header">
            <UiStatus :status="element.isStatus" />
            <button class="task__button-modal" @click="getTask(element)">
              +
            </button>
            <div class="task__title">{{ element.title }}</div>
          </div>
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

import TaskModel from "@/models/task.model";

import draggableComponent from "vuedraggable";
import UiStatus from "@/components/UI/status/uiStatus.vue";

export default defineComponent({
  name: "CardItems",
  components: { UiStatus, draggableComponent },
  data() {
    return {
      dragging: false,
      drag: false,
    };
  },
  props: {
    tasks: {
      type: Array as PropType<TaskModel[]>,
      required: true,
    },
  },

  methods: {
    /**
     * Передача element в компонент  HomeView
     * @param element - task
     * */
    getTask(element: TaskModel) {
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

  &__header {
    display: flex;
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
  &__button-modal {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 3px 7px;
    background: #42b983;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    border: none;
  }
}
.list-group {
  min-height: 100px;
  max-height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
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
