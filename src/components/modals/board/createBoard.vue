<template>
  <div class="modal">
    <form class="modal-form">
      <UiInput placeholder="Name board" v-model="boardForm.name" />
    </form>
    <UiButton @click.prevent="createBoard(boardForm)">Создать</UiButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UiButton from "@/components/UI/button/uiButton.vue";
import UiInput from "@/components/UI/input/uiInput.vue";
import BoardModel from "@/models/board.model";

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
        tasks: [],
      },
    };
  },
  methods: {
    /**
     * Передаем форму для создания board
     * @param boardForm
     * */
    createBoard(boardForm: BoardModel) {
      this.$emit("createBoard", boardForm);
    },
  },
});
</script>

<style scoped></style>
