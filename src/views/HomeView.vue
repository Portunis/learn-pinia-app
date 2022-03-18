<template>
  <div>
    <h2>TODO</h2>
    <div class="todo">
      <div>
        <UiButton @click="boardModalAdd">Добавить</UiButton>
      </div>
      <div class="container">
        <div class="task" v-for="board in boards" :key="board.name">
          <div>
            <h2>{{ board.name }}</h2>
            <UiButton class="task__button" @click="taskModalAdd(board)"
              >+</UiButton
            >
          </div>

          <CardItems :tasks="board.tasks" />
        </div>
      </div>
    </div>
    <transition name="notification">
      <UiModal v-model:show="boardModalVisible">
        <div class="modal">
          <form class="modal-form">
            <UiInput placeholder="Name board" v-model="boardForm.name" />
          </form>
          <UiButton @click.prevent="createBoard(boardForm)">Create</UiButton>
        </div>
      </UiModal>
    </transition>
    <transition name="notification">
      <UiModal v-model:show="taskModalVisible">
        <div class="modal">
          <form class="modal-form">
            <UiInput placeholder="Name ash" v-model="taskForm.title" />
            <UiInput placeholder="description" v-model="taskForm.description" />
            <UiSelect v-model="taskForm.level" />
          </form>
          <UiButton @click.prevent="createTask(taskForm)">Create</UiButton>
        </div>
      </UiModal>
    </transition>
    <transition name="notification">
      <UiNotification v-if="notificationTask">task added</UiNotification>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardItems from "@/components/Card/CardItems.vue";
import UiButton from "@/components/UI/button/uiButton.vue";

import draggableComponent from "vuedraggable";
import UiModal from "@/components/UI/modal/uiModal.vue";
import UiInput from "@/components/UI/input/uiInput.vue";
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store";
import BoardModels from "@/models/board.models";
import TaskModels from "@/models/task.models";
import UiNotification from "@/components/UI/notification/uiNotification.vue";
import UiSelect from "@/components/UI/select/uiSelect.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    UiSelect,
    UiNotification,
    UiInput,
    UiModal,
    CardItems,
    UiButton,
  },
  data() {
    return {
      boardModalVisible: false,
      taskModalVisible: false,
      notificationTask: false,
      idBoard: Number,
      boardForm: {
        id: Date.now(),
        name: "",
        tasks: [],
      },
      taskForm: {
        id: Date.now(),
        title: "",
        description: "",
        level: "",
        idBoard: 2,
      },
    };
  },
  computed: {
    ...mapState(useStore, {
      boards: "boards",
    }),
  },
  methods: {
    boardModalAdd() {
      this.boardModalVisible = true;
      console.log("модал");
    },
    taskModalAdd(board: BoardModels) {
      this.taskForm.idBoard = board.id;
      this.taskModalVisible = true;
    },
    ...mapActions(useStore, {
      createBoards: "createBoards",
      createTasks: "createTasks",
    }),
    createBoard(boardForm: BoardModels) {
      this.createBoards(boardForm);
      this.boardModalVisible = false;
      this.boardForm = {
        id: Date.now(),
        name: "",
        tasks: [],
      };
    },
    createTask(taskForm: TaskModels) {
      this.createTasks(taskForm);
      this.taskModalVisible = false;
      this.taskForm = {
        id: Date.now(),
        title: "",
        description: "",
        level: "",
        idBoard: 1,
      };
      this.notificationTask = true;
      setTimeout(() => {
        this.notificationTask = false;
      }, 5000);
    },
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
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px;
  min-width: 250px;
  height: auto;
  background-size: cover;
  background: rgb(125, 134, 144);
  background: linear-gradient(
    90deg,
    rgba(125, 134, 144, 1) 25%,
    rgba(115, 93, 103, 1) 86%
  );
  &__button {
    padding: 10px 15px;
    margin: 10px;
  }
}
</style>
