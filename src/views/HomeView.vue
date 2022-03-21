<template>
  <div>
    <h2>TODO</h2>
    {{ task }}
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

          <CardItems :tasks="board.tasks" @getTask="taskModal" />
        </div>
      </div>
    </div>
    <transition name="notification">
      <UiModal v-model:show="taskViewModal">
        <div class="modal">
          <div class="taskBody">
            <p>#{{ task.id }}</p>

            <p>Task: {{ task.title }}</p>
            <p>Description: {{ task.description }}</p>
            <p>Level: {{ task.level }}</p>
            <p v-if="task.timeStart && task.timeStart > 0">
              Start: {{ dateTime(task.timeStart) }}
            </p>
            <UiButton
              v-if="task.startTask && !task.timeEnd"
              @click="startTask(task)"
              >Начать</UiButton
            >
            <UiButton v-if="task.endTask" @click="endTask(task)"
              >Закончить</UiButton
            >
            <UiButton v-if="task.timeEnd"
              >Tasks выполнен в {{ dateTime(task.timeEnd) }}</UiButton
            >
            <div>
              <UiButton @click="deleteTasks(task)">Удалить</UiButton>
              <UiButton @click="editTasks(task)">Изменить</UiButton>
            </div>
          </div>
        </div>
      </UiModal>
    </transition>
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
            <UiInput placeholder="Name task" v-model="taskForm.title" />
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
import CardItems from "@/components/Card/CardItems.vue";
import UiButton from "@/components/UI/button/uiButton.vue";
import UiModal from "@/components/UI/modal/uiModal.vue";
import UiInput from "@/components/UI/input/uiInput.vue";
import UiNotification from "@/components/UI/notification/uiNotification.vue";
import UiSelect from "@/components/UI/select/uiSelect.vue";

import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store";

import moment from "moment";

import BoardModels from "@/models/board.models";
import TaskModels from "@/models/task.models";

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
      taskViewModal: false,
      boardModalVisible: false,
      taskModalVisible: false,
      notificationTask: false,
      currentTime: 0,
      task: [],
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
        startTask: true,
      },
    };
  },
  created() {
    this.updateTask();
  },

  computed: {
    ...mapState(useStore, {
      boards: "boards",
    }),
  },
  methods: {
    dateTime(payload: string) {
      return moment(payload).format("h:mm:ss DD-MM-YYYY");
    },
    boardModalAdd() {
      this.boardModalVisible = true;
      console.log("модал");
    },
    taskModalAdd(payload: BoardModels) {
      this.taskForm.idBoard = payload.id;
      this.taskModalVisible = true;
      console.log("taskModalAdd", payload);
    },
    ...mapActions(useStore, {
      createBoards: "createBoards",
      createTasks: "createTasks",
      deleteTask: "deleteTask",
      editTask: "editTask",
      updateTask: "getLocalStorage",
    }),
    createBoard(payload: BoardModels) {
      this.createBoards(payload);
      this.boardModalVisible = false;
      this.boardForm = {
        id: Date.now(),
        name: "",
        tasks: [],
      };
    },
    createTask(payload: TaskModels) {
      this.createTasks(payload);
      this.taskModalVisible = false;
      this.taskForm = {
        id: Date.now(),
        title: "",
        description: "",
        level: "",
        idBoard: 1,
        startTask: true,
      };
      this.notificationTask = true;
      setTimeout(() => {
        this.notificationTask = false;
      }, 5000);
    },
    taskModal(payload: []) {
      console.log("taskModal", payload);
      this.task = payload;
      this.taskViewModal = true;
    },
    startTask(payload: TaskModels) {
      payload.timeStart = Date.now();
      payload.endTask = true;
      payload.startTask = false;
      this.editTask(payload);
      console.log("startTask", payload);
    },
    endTask(payload: TaskModels) {
      payload.timeEnd = Date.now();
      payload.startTask = true;
      payload.endTask = false;
      payload.complete = true;

      this.editTask(payload);
    },
    deleteTasks(payload: TaskModels) {
      this.deleteTask(payload);
      this.taskViewModal = false;
      this.task = [];
    },
    editTasks(payload: TaskModels) {
      this.editTask(payload);
      console.log(payload);
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
.taskBody {
  display: flex;
  flex-direction: column;
}
</style>
