<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput placeholder="Введите название task" v-model="taskForm.title" />
      <UiInput
        type="textarea"
        placeholder="Описание"
        v-model="taskForm.description"
      />
      <UiSelect v-model="taskForm.level" />
    </form>
    <UiButton @click.prevent="createTask(taskForm)">Создать</UiButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskModel from "@/models/task.model";
import UiSelect from "@/components/UI/select/uiSelect.vue";
import UiInput from "@/components/UI/input/uiInput.vue";
import UiButton from "@/components/UI/button/uiButton.vue";
export default defineComponent({
  name: "createTask",
  components: {
    UiInput,
    UiSelect,
    UiButton,
  },
  props: {
    idBoard: Number,
  },
  data() {
    return {
      taskForm: {
        id: Math.random(),
        title: "",
        description: "",
        level: "",
        idBoard: this.idBoard,
        isStatus: "Created",
      },
    };
  },
  methods: {
    /**
     * Передаем форму для создания task
     * @param taskForm
     * */
    createTask(taskForm: TaskModel) {
      this.$emit("createTask", taskForm);
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-form {
  display: flex;
  flex-direction: column;
}
</style>
