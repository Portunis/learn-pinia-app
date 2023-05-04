<template>
  <draggableComponent
    :list="tasks"
    :animation="200"
    itemKey="id"
    group="tasks"
    class="list-group"
    ghost-class="moving-card"
    @change="updatePositionTask"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <div class="list-group-item">
        <div class="task">
          <div class="task__container">
            <div class="task__header">
              <div class="task__title">{{ element.title }}</div>
              <DotsList
                :key="element.id"
                :id-element="element.id"
                :click-element="clickElement"
                :menu-items="[
                  {
                    label: 'Редактировать',
                    icon: 'pen-to-square',
                    onClickHandler: () => updateTask(element),
                  },
                  {
                    label: 'Удалить',
                    icon: 'trash',
                    onClickHandler: () => deleteTask(element),
                  },
                ]"
                :is-dot-menu-open="isDotMenuOpen"
                @close="isDotMenuOpen = false"
                :id="isDotMenuOpen"
                @open="openDotMenu(element)"
              ></DotsList>
            </div>
            <div class="task__body">
              <div class="task__description">
                {{ element.description }}
              </div>
            </div>
            <div class="task__footer">
              <div class="tags">tags</div>
              <div class="tools">
                <div class="tools__people"></div>
                <div class="tools__utils">
                  <div class="tools__comment"></div>
                  <div class="tools__files"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </draggableComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import ITask from "@/typescript/interfaces/ITask";

import draggableComponent from "vuedraggable";
import { mapActions } from "pinia";
import { useTaskStore } from "@/store/task";
import DotsList from "@/components/UI/dots/DotsList.vue";
import { deleteTask } from "@/vuetils/useTask";

export default defineComponent({
  name: "CardItems",
  components: { draggableComponent, DotsList },
  data() {
    return {
      clickElement: 0,
      isCancelRequestDialog: false,
      isEditMode: false,
      isDotMenuOpen: false,
      dragging: false,
      drag: false,
      tags: false,
      inputTag: false,
      idBoard: 1,
      tagForm: {
        id: null as unknown as number,
        name: "",
        idTask: null as unknown as number,
      },
    };
  },
  emits: ["getTask", "create-task", "task-delete"],
  props: {
    tasks: {
      type: Array as PropType<ITask[]>,
      required: true,
    },
  },

  methods: {
    ...mapActions(useTaskStore, {
      tagCreate: "createTaskTag",
      taskDelete: "deleteTask",
    }),
    /**
     * Передача element в компонент  HomeView
     * @param task - task
     * */
    getTask(task: ITask): void {
      this.$emit("getTask", task);
    },
    /**
     * Обновление позиции задачи в доске
     * @param element - {} added, newIndex or removed, oldIndex
     */
    updatePositionTask(element: []) {
      console.log("123", element);
    },
    /**
     * Отправляет форму с данными и передет id доски
     */
    createTag(): void {
      this.inputTag = false;
      this.tagCreate(this.tagForm);
      this.idBoard = 1;
      this.tagForm = {
        id: 1,
        name: "",
        idTask: 1,
      };
    },
    openDotMenu(element: ITask) {
      this.isDotMenuOpen = !this.isDotMenuOpen;
      this.clickElement = element.id;
    },
    updateTask(element: ITask): void {
      console.log("create-task", element);
      this.isDotMenuOpen = false;
    },
    deleteTask(element: ITask): void {
      deleteTask(element);
      this.isCancelRequestDialog = true;
      this.isDotMenuOpen = false;
      this.$emit("task-delete", element);
    },
  },
});
</script>

<style lang="scss" scoped>
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
.task {
  width: 280px;
  background: #fff;
  border-radius: 5px;
  height: auto;
  margin-bottom: 20px;
  &__container {
    width: 250px;
    padding: 15px;
  }
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__title {
    overflow: hidden;
    font-weight: bold;
    max-width: 200px;
    text-align: initial;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
  &__body {
  }
  &__description {
    margin: 25px 0;
    max-height: 145px;
    overflow: hidden;
    text-align: left;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  align-items: center;

  &__input {
    color: #ffffff;
    border: none;
    border-radius: 20px;
    width: auto;
    max-width: 50px;
    outline: none;
    background: transparent;
    padding: 0;
    margin: 0;
  }
  &__button {
    cursor: pointer;
    color: #1390e5;
    border-radius: 20px;
    padding: 9px 10px;
    border: dashed 1px #1390e5;
    font-size: 12px;
  }
}
.list-group {
  min-height: 100px;
  max-height: 900px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
