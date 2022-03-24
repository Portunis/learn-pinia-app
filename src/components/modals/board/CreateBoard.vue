<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput placeholder="Введите название" v-model="boardForm.name" />

      <p>Выберите цвет</p>
      <input class="select-color" type="color" v-model="boardForm.color" />
    </form>
    <UiButton @click.prevent="emitBoard">Создать</UiButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UiButton from "@/components/UI/button/UiButton.vue";
import UiInput from "@/components/UI/input/UiInput.vue";

export default defineComponent({
  name: "createBoard",
  components: {
    UiInput,
    UiButton,
  },
  data() {
    return {
      boardForm: {
        id: Math.random(),
        name: "",
        color: "#000000",
        tasks: [],
      },
    };
  },
  methods: {
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
  border-radius: 20px;
  width: 100%;
  height: 32px;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 20px;
  }
}
</style>
