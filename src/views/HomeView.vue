<template>
  <div>
    <h2>TODO</h2>
    <div class="todo">
      <div>
        <UiButton @click="boardModalAdd">Добавить</UiButton>
      </div>
      <div class="container">
        <div class="task" v-for="board in boards" :key="board.id">
          <div>
            <div class="task__header">
              <h2 class="task__header-title">{{ board.name }}</h2>
              <h2 class="task__header-count">{{ board.tasks.length }}</h2>
              <UiButton class="task__button" @click="taskModalAdd(board)"
                >+</UiButton
              >
            </div>
          </div>

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
  </div>
</template>

<script lang="ts">
import CardItems from "@/components/Card/CardItems.vue";
import UiButton from "@/components/UI/button/uiButton.vue";
import UiModal from "@/components/UI/modal/uiModal.vue";

import UiNotification from "@/components/UI/notification/uiNotification.vue";

import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store";
import { useTaskStore } from "@/store/task";

import BoardModel from "@/models/board.model";
import TaskModel from "@/models/task.model";

import TaskModal from "@/components/modals/task/taskModal.vue";
import CreateBoard from "@/components/modals/board/createBoard.vue";
import CreateTask from "@/components/modals/task/createTask.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    CreateTask,
    CreateBoard,
    TaskModal,
    UiNotification,
    UiModal,
    CardItems,
    UiButton,
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
  created() {
    this.updateBoards();
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
      updateBoards: "getLocalStorage",
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
      payload.isStatus = "Active";
      this.editTask(payload);
    },
    /**
     * Меняет статус task.isStatus = Completed
     * @param payload - task
     * */
    endTask(payload: TaskModel): void {
      payload.timeEnd = Date.now();
      payload.isStatus = "Completed";
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
.container {
  display: grid;
  justify-items: center;
  align-items: start;
  grid-template-columns: repeat(4, 1fr);
  width: 1400px;
  margin: 0 auto;
}

.task {
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px;
  min-width: 250px;
  max-height: 500px;
  background: linear-gradient(
    90deg,
    rgba(125, 134, 144, 1) 25%,
    rgba(115, 93, 103, 1) 86%
  );

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &__header-title {
    margin: 5px;
  }
  &__header-count {
    padding: 5px 10px;
    background: #fff;
    border-radius: 5px;
  }
  &__button {
    padding: 10px 15px;
    margin: 10px 0 10px 73px;
  }
}
</style>
