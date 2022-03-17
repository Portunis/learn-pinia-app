<template>
  <div>
    <h2>TODO</h2>
    <div class="todo">
      <div>
        <UiButton @click="boardModalAdd">Добавить</UiButton>
      </div>
      <div class="container">
        <div class="task" v-for="board in boards" :key="board.name">
          <h2>{{ board.name }}</h2>
          <UiButton @click="taskModalAdd">add task</UiButton>
          <CardItems :tasks="board.tasks" />
        </div>
      </div>
    </div>
    <transition name="notification">
      <UiModal v-model:show="boardModalVisible">
        <div class="modal">
          <form>
            <UiInput placeholder="Name board" v-model="boardForm.name" />
          </form>
          <UiButton @click.prevent="createBoard(boardForm)">Create</UiButton>
        </div>
      </UiModal>
    </transition>
    <transition name="notification">
      <UiModal v-model:show="taskModalVisible">
        <div class="modal">
          <form>
            <UiInput placeholder="Name ash" v-model="taskForm.title" />
            <UiInput placeholder="description" v-model="taskForm.description" />
          </form>
          <UiButton @click.prevent="createTask(taskForm)">Create</UiButton>
        </div>
      </UiModal>
    </transition>
    <transition name="notification">
      <UiNotification v-if="notificationTask">Чекай console</UiNotification>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardItems from "@/components/Card/CardItems.vue";
import UiButton from "@/components/UI/button/uiButton.vue";

import UiModal from "@/components/UI/modal/uiModal.vue";
import UiInput from "@/components/UI/input/uiInput.vue";
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store";
import BoardModels from "@/models/board.models";
import TaskModels from "@/models/task.models";
import UiNotification from "@/components/UI/notification/uiNotification.vue";

export default defineComponent({
  name: "HomeView",
  components: { UiNotification, UiInput, UiModal, CardItems, UiButton },
  data() {
    return {
      boardModalVisible: false,
      taskModalVisible: false,
      notificationTask: false,
      boardForm: {
        name: "",
        tasks: [],
      },
      taskForm: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapState(useStore, {
      boards: "boards",
    }),

    // listOne(): ListModels[] {
    //   return this.list.filter((item: any) => item.list === 1);
    // },
    // listTwo(): ListModels[] {
    //   return this.list.filter((item: any) => item.list === 2);
    // }, //переделать
  },
  methods: {
    boardModalAdd() {
      this.boardModalVisible = true;
      console.log("модал");
    },
    taskModalAdd() {
      this.taskModalVisible = true;
      console.log("модал");
    },
    ...mapActions(useStore, {
      createBoards: "createBoards",
      createTasks: "createTasks",
    }),
    createBoard(boardForm: BoardModels) {
      this.createBoards(boardForm);
      this.boardModalVisible = false;
      this.boardForm = {
        name: "",
        tasks: [],
      };
    },
    createTask(taskForm: TaskModels) {
      this.createTasks(taskForm);
      this.taskModalVisible = false;
      this.taskForm = {
        title: "",
        description: "",
      };
      this.notificationTask = true;
      setTimeout(() => {
        this.notificationTask = false;
      }, 5000);
      console.log(taskForm);
    },
    // startDrag(evt: any, item: any) {
    //   console.log("startDrag", typeof evt, item);
    //   evt.dataTransfer.dropEffect = "move";
    //   evt.dataTransfer.effectAllowed = "move";
    //   evt.dataTransfer.setData("itemID", item.id);
    // },
    // onDrop(evt: any, list: any) {
    //   const itemID = evt.dataTransfer.getData("itemID");
    //   const item: any = this.list.find((item) => item.id == itemID);
    //   item.list = list;
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
.container {
  display: flex;
  justify-content: space-evenly;
  width: 1400px;
  margin: 0 auto;
}
</style>
