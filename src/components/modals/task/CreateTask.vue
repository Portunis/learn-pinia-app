<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput
        :data="{ type: 'text', placeholder: 'Введите название' }"
        class="input__modal"
        v-model="taskForm.title"
      />
      <textarea
        class="input__modal"
        placeholder="Описание"
        v-model="taskForm.description"
      />
      <v-date-picker v-model="taskForm.end_task" :model-config="modelConfig">
        <template v-slot="{ inputValue, inputEvents }">
          <UiInput
            :data="{ type: 'text' }"
            class="input__modal"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </v-date-picker>
    </form>
    <UiButton
      @click.prevent="emitTask"
      class="button__modal"
      :class="isValidate ? 'disabled' : ''"
      :isDisabled="isValidate"
      >Создать</UiButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiInput from "@/components/UI/input/UiInput.vue";
import UiButton from "@/components/UI/button/UiButton.vue";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { validateMessage } from "@/typescript/enum/validateMessage";
import { createTask } from "@/vuetils/useTask";
import ITask from "@/typescript/interfaces/ITask";
import { useUserStore } from "@/store/user";
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
      v$: useVuelidate(),
      modelConfig: {
        type: "string",
        mask: "DD-MM-YYYY",
      },
      taskForm: {
        title: "",
        description: "",
        level: "",
        board_id: this.idBoard,
        status: "created",
        end_task: moment(Date.now()).format("DD-MM-YYYY"),
        user_id: useUserStore().user,
      } as unknown as ITask,
    };
  },
  computed: {
    isValidate() {
      return (
        this.v$.taskForm.title.$invalid && this.v$.taskForm.description.$invalid
      );
    },
  },
  validations() {
    return {
      taskForm: {
        title: {
          required: helpers.withMessage(
            validateMessage.requiredInput,
            required
          ),
        },
        description: {
          required: helpers.withMessage(
            validateMessage.requiredInput,
            required
          ),
        },
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
.disabled {
  background: gray;
  cursor: default;
}
</style>
