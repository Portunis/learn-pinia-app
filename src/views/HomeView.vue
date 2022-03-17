<template>
  <div>
    <h2>TODO</h2>
    <div class="todo">
      <div>
        <UiButton @click="showDialog">Добавить</UiButton>
      </div>
      <div class="container">
        <div
          class="task"
          @drop="onDrop($event, 1)"
          @dragover.prevent
          @dragenter.prevent
        >
          <h2>BackLog</h2>
          <Card :listOne="listOne" @startDrag="startDrag" />
        </div>
        <div
          class="task"
          @drop="onDrop($event, 2)"
          @dragover.prevent
          @dragenter.prevent
        >
          <h2>Process</h2>
          <Card :listTwo="listTwo" @startDrag="startDrag" />
        </div>
      </div>
    </div>
    <UiModal v-model:show="dialogVisible">
      <div class="modal">
        <UiInput placeholder="Name board" v-model="boardCreateForm.name" />
        <UiInput placeholder="Color: #fff" v-model="boardCreateForm.color" />
        <UiButton>Create</UiButton>
      </div>
    </UiModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import UiButton from "@/components/UI/button/uiButton.vue";

import Card from "@/components/Card/Card.vue"; // @ is an alias to /src

import ListModels from "@/models/list.models";
import UiModal from "@/components/UI/modal/uiModal.vue";
import UiInput from "@/components/UI/input/uiInput.vue";

export default defineComponent({
  name: "HomeView",
  components: { UiInput, UiModal, Card, UiButton },
  data() {
    return {
      dialogVisible: false,
      boardCreateForm: {
        name: "",
        color: "",
        id: Date.now(),
      },
      list: [
        {
          id: 1,
          name: "task 1",
          description: "Create and learn task 1",
          list: 1,
        },
        {
          id: 2,
          name: "task 2",
          description: "Create and learn task 2",
          list: 2,
        },
        {
          id: 3,
          name: "task 3",
          description: "Create and learn task 3",
          list: 2,
        },
        {
          id: 4,
          name: "task 4",
          description: "Create and learn task 3",
          list: 1,
        },
        {
          id: 5,
          name: "task 5",
          description: "Create and learn task 3",
          list: 1,
        },
      ] as ListModels[],
    };
  },
  computed: {
    listOne(): ListModels[] {
      return this.list.filter((item: any) => item.list === 1);
    },
    listTwo(): ListModels[] {
      return this.list.filter((item: any) => item.list === 2);
    }, //переделать
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
      console.log("модал");
    },
    startDrag(evt: any, item: any) {
      console.log("startDrag", typeof evt, item);
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt: any, list: any) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item: any = this.list.find((item) => item.id == itemID);
      item.list = list;
    },
  },
});
</script>

<style lang="scss" scoped>
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
