<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput
        :data="{ type: 'text', placeholder: 'Введите название' }"
        v-model="boardForm.name"
      />

      <p>Выберите цвет</p>
      <input class="select-color" type="color" v-model="boardForm.color" />
    </form>
    <UiButton
      @click.prevent="emitBoard"
      class="button__modal"
      :class="v$.boardForm.name.$invalid ? 'disabled' : ''"
      :isDisabled="v$.boardForm.name.$invalid"
      >Создать</UiButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

import UiButton from "@/components/UI/button/UiButton.vue";
import UiInput from "@/components/UI/input/UiInput.vue";
import IBoard from "@/typescript/interfaces/IBoard";
import { validateMessage } from "@/typescript/enum/validateMessage";
import { useUserStore } from "@/store/user";
import { useBoardStore } from "@/store/board";

export default defineComponent({
  name: "createBoard",
  components: {
    UiInput,
    UiButton,
  },
  data() {
    return {
      v$: useVuelidate(),
      boardForm: {
        user_id: useUserStore().user,
        name: "",
        color: "#000000",
      } as IBoard,
    };
  },
  validations() {
    return {
      boardForm: {
        name: {
          required: helpers.withMessage(
            validateMessage.requiredInput,
            required
          ),
        },
      },
    };
  },
  methods: {
    useBoardStore,
    /**
     * Передаем форму для создания board
     * */
    emitBoard(): void {
      this.$emit("createBoard", this.boardForm);
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-form {
  display: flex;
  flex-direction: column;
}
.select-color {
  -webkit-appearance: none;
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 32px;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 10px;
  }
}
.button__modal {
  padding: 15px 20px;
  border-radius: 10px;
  margin: 20px 0;
}
.disabled {
  background: gray;
  cursor: default;
}
</style>
