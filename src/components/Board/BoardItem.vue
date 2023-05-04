<template>
  <div class="board">
    <div class="board__header">
      <div class="board__title">
        <div class="status" :style="{ background: element.color }"></div>
        <h2 class="title">{{ element.name }}</h2>
      </div>
      <DotsList
        :key="element.id"
        :id-element="element.id"
        :click-element="clickElement"
        :menu-items="[
          {
            label: 'Создать карточку',
            icon: 'plus',
            onClickHandler: () => createTask(element),
          },
          {
            label: 'Редактировать',
            icon: 'pen-to-square',
            onClickHandler: () => updateBoard(element),
          },
          {
            label: 'Удалить',
            icon: 'trash',
            onClickHandler: () => deleteBoard(element),
          },
        ]"
        :is-dot-menu-open="isDotMenuOpen"
        @close="isDotMenuOpen = false"
        :id="isDotMenuOpen"
        @open="openDotMenu(element)"
      ></DotsList>
    </div>
    <div
      :key="element.id"
      class="board__body board__loading"
      :class="isLoading && element.id === clickElement ? 'board__loading' : ''"
    >
      <LottieAnimation
        v-if="isLoading && element.id === clickElement"
        class="delete-anim"
        :animationData="deleteAnimation"
        :height="200"
        :width="200"
      />

      <CardItems
        :tasks="tasks"
        @getTask="emitTask"
        @task-delete="deleteTasks"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import IBoard from "@/typescript/interfaces/IBoard";
import DotsList from "@/components/UI/dots/DotsList.vue";
import CardItems from "@/components/Card/CardItems.vue";
import ITask from "@/typescript/interfaces/ITask";
import { deleteBoard } from "@/vuetils/useBoard";
import { useBoardStore } from "@/store/board";
import { useTaskStore } from "@/store/task";
import deleteAnimation from "@/assets/animation/deleteBacket.json";
export default defineComponent({
  name: "BoardList",
  components: { DotsList, CardItems },
  props: {
    element: {
      type: Object as PropType<IBoard>,
    },
  },
  emits: ["create-task", "task-about-modal"],
  data() {
    return {
      deleteAnimation,
      clickElement: 0,
      isCancelRequestDialog: false,
      isEditMode: false,
      isDotMenuOpen: false,
      tasks: [] as ITask[],
    };
  },
  computed: {
    isLoading() {
      return useBoardStore().isLoading;
    },
  },
  async mounted() {
    await this.taskForBoard(this.element as IBoard);
  },
  methods: {
    /**
     * Открывает компонент Dots и присваивает id
     * @param element - {} board
     */
    openDotMenu(element: IBoard): void {
      this.isDotMenuOpen = !this.isDotMenuOpen;
      this.clickElement = element.id;
    },
    /**
     * Открывает модалку для создания задачи
     * @param element - {} board
     */
    createTask(element: IBoard): void {
      this.$emit("create-task", element);
      this.isDotMenuOpen = false;
    },
    /**
     * Обновлние доски
     * @param element - {} board
     */
    updateBoard(element: IBoard): void {
      console.log("update board", element);
      this.isCancelRequestDialog = true;
      this.isDotMenuOpen = false;
    },
    /**
     * Удаление доски
     * @param element - {} board
     */
    deleteBoard(element: IBoard): void {
      this.isDotMenuOpen = !this.isDotMenuOpen;
      this.clickElement = element.id;
      deleteBoard(element);
    },
    /**
     * Раскидываем задачи по доскам
     * @param element - {} Объект доски
     */
    taskForBoard(element: IBoard): void {
      const tasks = useTaskStore();
      this.tasks = [] as ITask[];
      tasks.tasks.forEach((item: ITask) => {
        if (item.board_id == String(element.id)) {
          this.tasks.push(item);
        }
      });
    },
    /**
     * Удаяем таск из массива tasks
     * @param payload - {} Объект task
     */
    deleteTasks(payload: ITask): void {
      this.tasks.forEach((item: ITask, i: number) => {
        if (item.id === payload.id) {
          this.tasks.splice(i, 1);
        }
      });
    },
    emitTask(element: ITask): void {
      this.$emit("task-about-modal", element);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/scss/mixins.scss";
.status {
  width: 10px;
  height: 10px;
  border-radius: 10px;

  margin-right: 10px;
}
.board {
  width: 300px;
  display: block;
  margin: 60px 60px 20px 10px;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__body {
    width: 280px;
    background: #e5e5e5;
    border-radius: 10px;
    height: auto;
    padding: 10px;
    position: relative;
  }
  &__title {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
}
.delete-anim {
  @include loaderPlaceholder;
}
</style>
