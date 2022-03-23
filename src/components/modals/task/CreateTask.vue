<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput placeholder="Введите название" v-model="taskForm.title" />
      <UiInput placeholder="Описание" v-model="taskForm.description" />
    </form>
    <UiButton @click.prevent="emitTask">Создать</UiButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiInput from "@/components/UI/input/UiInput.vue";
import UiButton from "@/components/UI/button/UiButton.vue";
export default defineComponent({
  name: "createTask",
  components: {
    UiInput,
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
        status: "created",
        tags: [],
      },
    };
  },
  methods: {
    /**
     * Передаем форму для создания task
     * */
    emitTask(): void {
      this.$emit("createTask", this.taskForm);
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
