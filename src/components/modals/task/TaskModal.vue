<template>
  <div class="task-container">
    <div class="task">
      <div class="task__header">
        <BadgeInfo :badge="task.status">{{ task.status }}</BadgeInfo>
        <div class="task__title">
          {{ task.title }}
        </div>
        <div class="task__option">...</div>
      </div>
      <div class="task__body">
        {{ task.description }}
      </div>
      <div class="task__info">
        <div class="task__time">
          <p v-if="task.timeStart && task.timeStart > 0">
            Начало выполнения задачи: {{ dateTime(task.timeStart) }}
          </p>
        </div>
        <div class="task__time">
          <p v-if="isCompleted">
            Конец выполнения задачи: {{ dateTime(task.timeEnd) }}
          </p>
        </div>
      </div>
      <div class="task__footer">
        <UiButton v-if="isCreated" @click="startTask(task)">Начать</UiButton>
        <UiButton v-if="isActive" @click="endTask(task)">Закончить</UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Badge } from "@/typescript/enum/badge";

import UiButton from "@/components/UI/button/UiButton.vue";

import TaskModel from "@/models/task.model";
import moment from "moment";
import BadgeInfo from "@/components/UI/badge/BadgeInfo.vue";

export default defineComponent({
  name: "taskModal",
  components: { BadgeInfo, UiButton },
  props: {
    task: {
      type: Object as PropType<TaskModel>,
      required: true,
    },
  },
  computed: {
    isActive(): boolean {
      return this.task.status === Badge.Active;
    },
    isCreated(): boolean {
      return this.task.status === Badge.Created;
    },
    isCompleted(): boolean {
      return this.task.status === Badge.Completed;
    },
  },
  methods: {
    /**
     * Преобразует время из timestamp в нормальный вид
     * @param payload - task.timeEnd
     * @return { string } - dateTime - Отформатированное время завершения выполнения task
     * */
    dateTime(payload: number): string {
      return moment(payload).format("h:mm:ss DD-MM-YYYY");
    },
    /**
     * Передает task и запускает функицию startTask в компоненте HomeView
     * @param task
     * */
    startTask(task: TaskModel) {
      this.$emit("startTask", task);
    },
    /**
     * Передает task и запускает функицию endTask в компоненте HomeView
     * @param task
     * */
    endTask(task: TaskModel) {
      this.$emit("endTask", task);
    },
  },
});
</script>

<style lang="scss" scoped>
.task-container {
  width: 700px;
}
.task {
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__title {
    overflow: hidden;
    font-weight: bold;
    max-width: 200px;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
  &__body {
    margin-top: 20px;
  }
  &__time {
    display: flex;
    margin: 10px;
  }
}
</style>
