<template>
  <div class="modal">
    <div class="taskBody">
      <p>#{{ task.id }}</p>
      <p>Task: {{ task.title }}</p>
      <p>Описание: {{ task.description }}</p>
      <p>Важность: {{ task.level }}</p>
      <p v-if="task.timeStart && task.timeStart > 0">
        Начало выполнения: {{ dateTime(task.timeStart) }}
      </p>
      <p v-if="isCompleted">Tasks выполнен в {{ dateTime(task.timeEnd) }}</p>
      <UiButton v-if="isCreated" @click="startTask(task)">Начать</UiButton>
      <UiButton v-if="isActive" @click="endTask(task)">Закончить</UiButton>
      <UiStatus v-if="isCompleted" :status="task.isStatus" />
      <!--            <div>-->
      <!--              <UiButton class="" @click="deleteTasks(task)">Удалить</UiButton>-->
      <!--              <UiButton @click="editTasks(task)">Изменить</UiButton>-->
      <!--            </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Badge } from "@/typescript/enum/badge";

import UiStatus from "@/components/UI/status/uiStatus.vue";
import UiButton from "@/components/UI/button/uiButton.vue";
import TaskModel from "@/models/task.model";
import moment from "moment";

export default defineComponent({
  name: "taskModal",
  components: { UiStatus, UiButton },
  props: {
    task: {
      type: Object as PropType<TaskModel>,
      required: true,
    },
  },
  computed: {
    isActive(): boolean {
      return this.task.isStatus === Badge.Active;
    },
    isCreated(): boolean {
      return this.task.isStatus === Badge.Created;
    },
    isCompleted(): boolean {
      return this.task.isStatus === Badge.Completed;
    },
  },
  methods: {
    /**
     * Преобразует время из timestamp в нормальный вид
     * @return { string } - dateTime - Отформатированное время завершения выполнения task
     * @param payload - task.timeEnd
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
.taskBody {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
}
</style>
