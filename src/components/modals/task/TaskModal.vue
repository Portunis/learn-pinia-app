<template>
  <div class="task-container">
    <div class="task">
      <div class="task__header">
        <BadgeStatus :status="task.status"></BadgeStatus>
        <div class="task__title">
          {{ task.title }}
        </div>

        <div class="task__option">
          <fa icon="ellipsis" @click="isOptionButton = !isOptionButton" />
        </div>
        <div
          class="task__option-button"
          v-if="(isOptionButton && isCreated) || isActive"
        >
          <transition name="fade" mode="out-in">
            <fa
              icon="play"
              v-if="isCreated"
              class="icon"
              @click="startTask(task)"
            />
          </transition>
          <transition name="fade" mode="out-in">
            <fa
              icon="stop"
              v-if="isActive"
              class="icon"
              @click="endTask(task)"
            />
          </transition>
        </div>
      </div>
      <div class="task__body">
        {{ task.description }}
      </div>
      <transition name="footer-info">
        <div v-if="isActiveInfo" class="task__info">
          <h2>Информация</h2>
          <div class="task__info-body">
            <div>
              <p>Задача создана: {{ dateTime(task.created_at) }}</p>
              <p>Выполнить до: {{ dateTime(task.endTask) }}</p>
            </div>
          </div>
        </div>
      </transition>

      <div class="task__footer">
        <fa
          icon="arrow-down"
          class="icon"
          :class="{ active: isActiveInfo }"
          @click="isActiveInfo = !isActiveInfo"
        />
        <!--        <UiButton v-if="isCreated" @click="startTask(task)">Начать</UiButton>-->
        <!--        <UiButton v-if="isActive" @click="endTask(task)">Закончить</UiButton>-->
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

import BadgeStatus from "@/components/UI/badge/BadgeStatus.vue";

export default defineComponent({
  name: "taskModal",
  components: { BadgeStatus },
  data() {
    return {
      isOptionButton: false,
      isActiveInfo: false,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
    };
  },
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
      return moment(payload).format("H:mч  DD-MM-YYYYг");
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
.icon {
  cursor: pointer;
}
.icon.active {
  color: #42b983;
}
.task {
  position: relative;
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
  &__option-button {
    position: absolute;
    right: 0;
    top: 62px;
    width: 80px;
    height: 40px;
    background: #c8ebfb;
    border-radius: 5px;

    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__body {
    margin-top: 20px;
  }
  &__time {
    display: flex;
    margin: 10px;
  }
  &__footer {
    margin: 20px auto;
  }
}
//transition

.footer-info-enter-active,
.footer-info-leave-active {
  transition: all 0.25s ease-out;
}

.footer-info-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.footer-info-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
