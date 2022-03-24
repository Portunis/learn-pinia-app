<template>
  <BadgeInfo class="badge-button" @click="boardModalAdd">+</BadgeInfo>
  <div class="boards">
    <div class="board" v-for="board in boards" :key="board.id">
      <div class="board__header">
        <div class="board__title">
          <div class="status" :style="{ background: board.color }"></div>
          <h2 class="title">{{ board.name }}</h2>
        </div>
        <div class="board__option" @click="taskModalAdd(board)">...</div>
      </div>
      <div class="board__body">
        <CardItems :tasks="board.tasks" @getTask="taskModal" />
      </div>
    </div>
  </div>
  <transition name="notification">
    <UiModal v-model:show="taskBodyModal">
      <TaskModal :task="task" @startTask="startTask" @endTask="endTask" />
    </UiModal>
  </transition>
  <transition name="notification">
    <UiModal v-model:show="boardCreateModal">
      <CreateBoard @createBoard="createBoard" />
    </UiModal>
  </transition>
  <transition name="notification">
    <UiModal v-model:show="taskCreateModal">
      <CreateTask @createTask="createTask" :idBoard="idBoard" />
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

import UiNotification from "@/components/UI/notification/UiNotification.vue";

import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store";
import { useTaskStore } from "@/store/task";

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
  },
  data() {
    return {
      taskBodyModal: false,
      boardCreateModal: false,
      taskCreateModal: false,
      notificationTask: false,

      task: {} as TaskModel,
      idBoard: 0,
    };
  },
  computed: {
    ...mapState(useStore, {
      boards: "boards",
    }),
  },
  methods: {
    /**
     * Открывает модальное окно для создания board
     * */
    boardModalAdd(): void {
      this.boardCreateModal = true;
    },
    /**
     * Добавляет id доски в переменную idBoard
     * @param payload - board.id
     *  */
    taskModalAdd(payload: BoardModel): void {
      this.idBoard = payload.id;
      this.taskCreateModal = true;
    },
    ...mapActions(useStore, {
      createBoards: "createBoards",
    }),
    ...mapActions(useTaskStore, {
      createTasks: "createTasks",
      deleteTask: "deleteTask",
      editTask: "editTask",
    }),
    /**
     * Создание новой доски для task
     * @param payload - boarForm
     * */
    createBoard(payload: BoardModel): void {
      this.createBoards(payload);
      this.boardCreateModal = false;
    },
    /**
     * Создание нового task
     * @param payload - taskForm
     * */
    createTask(payload: TaskModel): void {
      this.createTasks(payload);
      this.taskCreateModal = false;
      this.notificationTask = true;
      setTimeout(() => {
        this.notificationTask = false;
      }, 5000);
    },
    /**
     * Передаем данные в массив task  и открываем модальное окно с подробной информацией о выбранном task
     * @param payload - task
     * */
    taskModal(payload: TaskModel): void {
      this.task = payload;
      this.taskBodyModal = true;
    },
    /**
     * Меняет статус task.isStatus = Active
     * @param payload - task
     * */
    startTask(payload: TaskModel): void {
      payload.timeStart = Date.now();
      payload.status = "active";
      this.editTask(payload);
    },
    /**
     * Меняет статус task.isStatus = Completed
     * @param payload - task
     * */
    endTask(payload: TaskModel): void {
      payload.timeEnd = Date.now();
      payload.status = "completed";
      this.editTask(payload);
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
});
</script>

<style lang="scss" scoped>
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
</style>
