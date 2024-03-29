<template>
  <div class="task-container">
    <div class="task">
      <div class="task__header">
        <BadgeStatus :status="task.status" />
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
          <transition name="no-mode-fade">
            <div>
              <fa
                icon="play"
                v-if="isCreated"
                class="icon"
                @click="startTask(task)"
              />

              <fa
                icon="stop"
                v-if="isActive"
                class="icon"
                @click="endTask(task)"
              />
            </div>
          </transition>
        </div>
      </div>
      <div class="task__body">
        {{ task.description }}
      </div>
      <transition name="footer-info">
        <div v-show="isActiveInfo" class="task__info">
          <h2>Информация</h2>
          <div>
            <div>
              <p>Задача создана: {{ dateTime(task.created_at) }}</p>
              <p>Выполнить до: {{ task.end_task }}</p>
              <p>
                Задача выполнена за: {{ timeHours }}h {{ timeMinute }}m
                {{ timeSeconds }}s
              </p>
            </div>
          </div>
        </div>
      </transition>

      <div class="task__footer">
        <fa
          icon="arrow-down"
          class="icon"
          :class="{ icon_active: isActiveInfo }"
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

import ITask from "@/typescript/interfaces/ITask";
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
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  computed: {
    // timeHours(): number {
    //   return Math.floor(this.task.timer / 60 / 60) || 0;
    // },
    // timeMinute(): number {
    //   return Math.floor(this.task.timer / 60) - this.timeHours * 60 || 0;
    // },
    // timeSeconds(): number {
    //   return this.task.timer % 60 || 0;
    // },
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
      return moment(payload).format("H:mmч  DD-MM-YYYYг");
    },
    /**
     * Передает task и запускает функицию startTask в компоненте HomeView
     * @param task
     * */
    startTask(task: ITask) {
      this.$emit("startTask", task);
    },
    /**
     * Передает task и запускает функицию endTask в компоненте HomeView
     * @param task
     * */
    endTask(task: ITask) {
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
  &_active {
    color: #42b983;
    transform: rotate(0.5turn);
  }
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
