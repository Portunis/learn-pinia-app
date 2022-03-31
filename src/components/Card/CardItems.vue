<template>
  <draggableComponent
    :list="tasks"
    group="tasks"
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    item-key="id"
    class="list-group"
    ghost-class="ghost"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <div class="list-group-item">
        <div class="task">
          <div class="task__container">
            <div class="task__header">
              <div class="task__title">{{ element.title }}</div>
              <div class="task__option" @click="getTask(element)">...</div>
            </div>
            <div class="task__body">
              <div class="task__description">
                {{ element.description }}
              </div>
            </div>
            <div class="task__footer">
              <div class="tags">
                <TagComponent v-for="tag in element.tags" :key="tag.id">{{
                  tag.name
                }}</TagComponent>
                <TagComponent v-if="tagForm.idTask === element.id"
                  ><input
                    class="tags__input"
                    v-model="tagForm.name"
                    @keydown.enter="createTag"
                /></TagComponent>
                <p class="tags__button" @click="getIdTask(element)">Add tags</p>
              </div>
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

import TaskModel from "@/models/task.model";

import draggableComponent from "vuedraggable";
import TagComponent from "@/components/UI/tag/TagComponent.vue";
import { mapActions } from "pinia";
import { useTaskStore } from "@/store/task";

export default defineComponent({
  name: "CardItems",
  components: { TagComponent, draggableComponent },
  data() {
    return {
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
  props: {
    tasks: {
      type: Array as PropType<TaskModel[]>,
      required: true,
    },
  },

  methods: {
    ...mapActions(useTaskStore, {
      tagCreate: "createTaskTag",
    }),
    /**
     * Передача element в компонент  HomeView
     * @param element - task
     * */
    getTask(element: TaskModel): void {
      this.$emit("getTask", element);
    },
    /**
     * Определяем id задачи и id доски
     * @param element - объект содержащий задачу
     *
     */
    getIdTask(element: TaskModel): void {
      this.tagForm.idTask = element.id;
      this.inputTag = true;
      this.idBoard = element.idBoard;
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
  },
});
</script>

<style lang="scss" scoped>
.task {
  width: 280px;
  background: #fff;
  border-radius: 5px;
  height: auto;
  margin-bottom: 20px;
  &__container {
    width: 250px;
    margin: 0 auto;
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
