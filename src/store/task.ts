import { defineStore } from "pinia";
import ITask from "@/typescript/interfaces/ITask";
import ITag from "@/typescript/interfaces/ITag";
export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as ITask[],
    filteredTasks: [] as ITask[],
  }),
  actions: {
    /**
     * Создает новую задачу и добавляет их в массив tasks  в объекте boards, обновляет localstorage
     * @param payload - taskForm
     * */
    createTasks(payload: ITask): void {
      console.log("123", payload);
    },
    /**
     * Создает новый тэг у задачи
     * @param tagForm - форма с данными
     */
    createTaskTag(tagForm: ITag): void {
      console.log("123", tagForm);
    },
    /**
     * Удаление задачу из массива tasks и обновляет localstorage
     * @param payload - task
     * */
    deleteTask(payload: ITask): void {
      console.log("123", payload);
    },
    /**
     * Измененяет задачу в массиве tasks
     * @param payload -task
     * */
    editTask(payload: ITask): void {
      console.log("123", payload);
    },
    /**
     * Вытаскивает задачи из всех досок
     */
    initTask() {
      console.log("123");
    },
    /**
     * Фильтрует задачи по дате
     *
     * @param date - дата в формате 02-02-2022
     */
    filterTasks(date: string) {
      this.filteredTasks = [];
      const data = this.tasks.filter((item) => item.end_task === date);
      if (data !== undefined) {
        this.filteredTasks = data;
      }
    },
  },
});
