<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput
        class="input__modal"
        placeholder="Введите название"
        v-model="taskForm.title"
      />
      <textarea
        class="input__modal"
        placeholder="Описание"
        v-model="taskForm.description"
      />
      <v-date-picker v-model="taskForm.endTask" :model-config="modelConfig">
        <template v-slot="{ inputValue, inputEvents }">
          <UiInput
            class="input__modal"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </v-date-picker>
    </form>
    <UiButton @click.prevent="emitTask" class="button__modal">Создать</UiButton>
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
      modelConfig: {
        type: "string",
        mask: "DD-MM-YYYY",
      },
      taskForm: {
        id: Math.random(),
        title: "",
        description: "",
        level: "",
        idBoard: this.idBoard,
        status: "created",
        tags: [],
        created_at: Date.now(),
        endTask: new Date(),
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
@import "../../../assets/variables";
.modal-form {
  display: flex;
  flex-direction: column;
}
.button__modal {
  padding: 15px 20px;
  border-radius: 10px;
  margin: 20px 0;
}
.input__modal {
  margin: 10px 0;
  max-width: 369px;
  border-radius: 10px;
  padding: 20px 26px 20px 26px;
  background: #f0efff;
  border: none;
  outline: none;
  font-family: $poppins-font;
  font-weight: $regular-font-weight;
  font-size: $p4-fontInter-size;
  color: #a7a3ff;
  resize: none;
}
</style>
