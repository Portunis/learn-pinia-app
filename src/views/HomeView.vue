<template>
  <BadgeInfo
    v-if="boards?.length"
    class="badge-button"
    @click="boardCreateModal"
    ><fa icon="plus"
  /></BadgeInfo>
  <div class="boards" v-if="boards?.length && !isLoading">
    <draggableComponent
      :list="boards"
      :animation="200"
      group="board"
      tag="transition-group"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      itemKey="id"
      class="boards"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <BoardItem :element="element" @create-task="taskModalAdd" />
      </template>
    </draggableComponent>
  </div>
  <div class="no-content" v-if="!boards?.length && !isLoading">
    Начните работу прямо сейчас
    <fa class="no-content__icon" icon="square-plus" @click="boardCreateModal" />
  </div>
  <Vue3Lottie
    v-if="isLoading"
    :animationData="loader"
    :height="200"
    :width="200"
    class="no-content"
  />
  <transition name="notification">
    <UiModal v-model:show="showModal" v-model:is-loader="isLoader">
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
import UiModal from "@/components/UI/modal/UiModal.vue";
import UiNotification from "@/components/UI/notification/UiNotification.vue";
import draggableComponent from "vuedraggable";

import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useBoardStore } from "@/store/board";
import { useTaskStore } from "@/store/task";

import IBoard from "@/typescript/interfaces/IBoard";
import ITask from "@/typescript/interfaces/ITask";

import CreateBoard from "@/components/modals/board/CreateBoard.vue";
import CreateTask from "@/components/modals/task/CreateTask.vue";
import BadgeInfo from "@/components/UI/badge/BadgeInfo.vue";
import BoardItem from "@/components/Board/BoardItem.vue";
import {
  createBoard,
  getBoard,
  unsubscribeBoard,
  updateRealtimeBoard,
} from "@/vuetils/useBoard";
import {
  createTask,
  getTask,
  unsubscribeTasks,
  updateRealtimeTask,
} from "@/vuetils/useTask";
import { Vue3Lottie } from "vue3-lottie";
import loader from "@/assets/animation/loader.json";
export default defineComponent({
  name: "HomeView",
  components: {
    Vue3Lottie,
    BoardItem,
    BadgeInfo,
    CreateTask,
    CreateBoard,
    UiNotification,
    UiModal,
    draggableComponent,
  },
  data() {
    return {
      loader,
      isLoader: false,
      clickElement: 0,
      isCancelRequestDialog: false,
      isEditMode: false,
      isDotMenuOpen: false,
      isOptionBoard: false,
      dragging: false,
      drag: false,
      showModal: false,
      showCreateBoard: false,
      showCreateTask: false,
      showTaskModal: false,
      notificationTask: false,
      isLoading: useBoardStore().isLoading,
      task: {} as ITask,
      idBoard: 0,
    };
  },
  created() {
    this.isLoading = true;
  },
  async mounted() {
    await getTask().then();
    await getBoard()
      .then(() => {
        this.isLoading = false;
      })
      .catch()
      .finally(() => {
        this.isLoading = false;
      });
    updateRealtimeTask();
    updateRealtimeBoard();
  },
  computed: {
    ...mapState(useBoardStore, {
      boards: "boards",
    }),
  },
  methods: {
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
    taskModalAdd(idBoard: IBoard): void {
      this.showModal = true;
      this.idBoard = idBoard.id;
      this.showCreateTask = true;
      this.showTaskModal = false;
      this.showCreateBoard = false;
    },
    ...mapActions(useTaskStore, {
      createTasks: "createTasks",
      deleteTask: "deleteTask",
      editTask: "editTask",
    }),
    /**
     * Создание новой доски для задачи
     * @param boarForm - форма с данными
     * */
    createBoard(boarForm: IBoard): void {
      this.isLoader = true;
      createBoard(boarForm).then(() => {
        this.showModal = false;
        this.showCreateBoard = false;
        this.isLoader = false;
      });
    },
    /**
     * Создание новой задачи
     */
    createTask(taskForm: ITask): void {
      this.isLoader = true;
      createTask(taskForm).then(() => {
        this.isLoader = false;
        this.showModal = false;
        this.showCreateTask = false;
        this.notificationTask = true;
        setTimeout(() => {
          this.notificationTask = false;
        }, 5000);
      });
    },
  },
  unmounted() {
    unsubscribeTasks();
    unsubscribeBoard();
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/variables";
@import "@/assets/scss/mixins.scss";
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

.no-content {
  font-size: 32px;
  font-family: $raleway-font;
  font-weight: $bold-font-weight;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  &__icon {
    margin-left: 20px;
    width: 30px;
    height: 30px;
    &:hover {
      cursor: pointer;
      color: #1390e5;
    }
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
