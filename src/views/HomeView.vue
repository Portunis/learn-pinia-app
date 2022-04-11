<template>
  <BadgeInfo class="badge-button" @click="boardCreateModal">+</BadgeInfo>
  <div class="boards">
    <draggableComponent
      :list="boards"
      group="board"
      tag="transition-group"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      item-key="id"
      class="boards"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <div class="board">
          <div class="board__header">
            <div class="board__title">
              <div class="status" :style="{ background: element.color }"></div>
              <h2 class="title">{{ element.name }}</h2>
            </div>
            <div class="board__option" @click="taskModalAdd(element)">...</div>
          </div>
          <div class="board__body">
            <CardItems :tasks="element.tasks" @getTask="taskAboutModal" />
          </div>
        </div>
      </template>
    </draggableComponent>
  </div>
  <div>
    <div @click="taskModal(this.taskTimeActive)" class="timer">
      <div class="time">
        <TimerComponent
          :seconds="watch.seconds"
          :minutes="watch.minutes"
          :hours="watch.hours"
        />
      </div>
      <div @click.stop class="time__button">
        <fa
          v-if="watch.isRunning"
          icon="pause"
          @click="watch.pause(), saveTimeLocalStorage()"
        />
        <fa v-if="!watch.isRunning" icon="play" @click="watch.start()" />
      </div>
    </div>
  </div>
  <transition name="notification">
    <UiModal v-model:show="showModal">
      <TaskModal
        v-if="showTaskModal"
        :task="task"
        @startTask="startTask"
        @endTask="endTask"
      />
      <CreateBoard v-if="showCreateBoard" @createBoard="createBoard" />
      <CreateTask
        v-if="showCreateTask"
        @createTask="createTask"
        :idBoard="idBoard"
      />
    </UiModal>
  </transition>
  <transition name="notification">
    <UiNotification v-if="notificationTask"
      >Вы добавили новую задачу</UiNotification
    >
  </transition>
</template>

<script lang="ts">
import CardItems from "@/components/Card/CardItems.vue";
import UiModal from "@/components/UI/modal/UiModal.vue";
import TimerComponent from "@/components/Timer/TimerComponent.vue";
import UiNotification from "@/components/UI/notification/UiNotification.vue";

import draggableComponent from "vuedraggable";

import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useBoardStore } from "@/store/board";
import { useTaskStore } from "@/store/task";
import { useStopwatch } from "vue-timer-hook";

import BoardModel from "@/models/board.model";
import TaskModel from "@/models/task.model";

import TaskModal from "@/components/modals/task/TaskModal.vue";
import CreateBoard from "@/components/modals/board/CreateBoard.vue";
import CreateTask from "@/components/modals/task/CreateTask.vue";
import BadgeInfo from "@/components/UI/badge/BadgeInfo.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    BadgeInfo,
    CreateTask,
    CreateBoard,
    TaskModal,
    UiNotification,
    UiModal,
    CardItems,
    draggableComponent,
    TimerComponent,
  },
  data() {
    return {
      dragging: false,
      drag: false,
      watch: useStopwatch(this.initTimer(), false),
      localTimer: 0,
      stopwatchOffset: new Date(),
      showModal: false,
      showCreateBoard: false,
      showCreateTask: false,
      showTaskModal: false,
      notificationTask: false,
      isTimeActive: false,
      taskTimeActive: {} as TaskModel,

      task: {} as TaskModel,
      idBoard: 0,
    };
  },
  created() {
    this.initTimer();
    this.watch.pause();
  },
  computed: {
    ...mapState(useBoardStore, {
      boards: "boards",
    }),
  },
  methods: {
    /**
     * Достает данные о время выполнения задачи
     */
    initTimer(): number {
      const timeWorking = localStorage.getItem("setTimer");
      return Number(timeWorking);
    },
    /**
     * Открывает модальное окно для создания доски
     */
    boardCreateModal(): void {
      this.showModal = true;
      this.showCreateBoard = true;
      this.showTaskModal = false;
      this.showCreateTask = false;
    },
    /**
     * Добавляет id доски в переменную idBoard
     * @param idBoard ID Доски
     */
    taskModalAdd(idBoard: BoardModel): void {
      this.showModal = true;
      this.idBoard = idBoard.id;
      this.showCreateTask = true;
      this.showTaskModal = false;
      this.showCreateBoard = false;
    },
    ...mapActions(useBoardStore, {
      createBoards: "createBoards",
    }),
    ...mapActions(useTaskStore, {
      createTasks: "createTasks",
      deleteTask: "deleteTask",
      editTask: "editTask",
    }),
    /**
     * Создание новой доски для задачи
     * @param boarForm - форма с данными
     * */
    createBoard(boarForm: BoardModel): void {
      this.createBoards(boarForm);
      this.showModal = false;
      this.showCreateBoard = false;
    },
    /**
     * Создание новой задачи
     * @param taskForm - форма с данными
     */
    createTask(taskForm: TaskModel): void {
      this.createTasks(taskForm);
      this.showModal = false;
      this.showCreateTask = false;
      this.notificationTask = true;
      setTimeout(() => {
        this.notificationTask = false;
      }, 5000);
    },
    /**
     * Передаем данные в объект task  и открываем модальное окно с подробной информацией о выбранной задаче
     * @param task - данные о задаче
     */
    taskAboutModal(task: TaskModel): void {
      this.task = task;
      this.showModal = true;
      this.showTaskModal = true;
      this.showCreateTask = false;
      this.showCreateBoard = false;
    },
    /**
     * Меняет статус task.isStatus = Active
     * @param payload - task
     */
    startTask(payload: TaskModel): void {
      payload.timeStart = Date.now();
      payload.status = "active";
      this.editTask(payload);
      this.watch.reset(0, false);
      this.watch.start();
      this.taskTimeActive = payload;
      this.isTimeActive = true;
    },
    /**
     * Меняет статус task.isStatus = Completed
     * Отключает таймер для задач...
     * @param payload - task
     */
    endTask(payload: TaskModel): void {
      this.saveTimeLocalStorage();
      payload.timeEnd = Date.now();
      payload.status = "completed";
      this.taskTimeActive = {} as TaskModel;
      payload.timer = this.initTimer();
      this.editTask(payload);
      localStorage.removeItem("setTimer");
      this.watch.reset(0, false);
      this.isTimeActive = false;
    },
    // falseTask(payload: TaskModel): void {
    //   payload.status = "false";
    //   this.editTask(payload);
    // },
    /**
     * Сохраняет время выполнения задачи в localstorage
     *
     */
    saveTimeLocalStorage(): void {
      localStorage.setItem(
        "setTimer",
        JSON.stringify(
          this.watch.hours * 60 * 60 +
            this.watch.minutes * 60 +
            this.watch.seconds
        )
      );
    },
    // deleteTasks(payload: TaskModel): void {
    //   this.deleteTask(payload);
    //   this.boardCreateModal = false;
    //   this.task = {} as TaskModel;
    // },
    // editTasks(payload: TaskModel): void {
    //   this.editTask(payload);
    // },
  },
  unmounted() {
    this.saveTimeLocalStorage();
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
}
.modal {
  display: flex;
  flex-direction: column;
}
.modal-form {
  display: flex;
  flex-direction: column;
}
.badge-button {
  width: 40px;
}
.boards {
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 20px;
  }
}

.status {
  width: 10px;
  height: 10px;
  border-radius: 10px;

  margin-right: 10px;
}
.title {
  max-width: 230px;
}

.board {
  width: 300px;
  display: block;
  margin: 60px 60px 20px 0;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__body {
    width: 280px;
    background: #e5e5e5;
    border-radius: 10px;
    height: auto;
    padding: 10px;
  }
  &__title {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
}

//timer //

.timer {
  position: fixed;

  display: flex;
  align-items: center;

  color: $secondary;
  background-color: $dark;
  border-radius: 10px;
  padding: 10px 15px;

  right: 35px;
  bottom: 35px;

  cursor: pointer;

  &:hover {
  }
}
.time {
  &__button {
    margin-left: 10px;
  }
}
</style>
