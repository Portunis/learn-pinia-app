import { defineStore } from "pinia";
import { useBoardStore } from "@/store/board";
import TaskModel from "@/models/task.model";
import Tag from "@/models/tag.model";
export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as TaskModel[],
    filteredTasks: [] as TaskModel[],
  }),
  actions: {
    /**
     * Создает новую задачу и добавляет их в массив tasks  в объекте boards, обновляет localstorage
     * @param payload - taskForm
     * */
    createTasks(payload: TaskModel): void {
      const board = useBoardStore();
      const getBoard = board.boards.filter(
        (item) => item.id === payload.idBoard
      );
      const saveTask = getBoard[0].tasks;
      saveTask.push(payload);
      localStorage.setItem("saveBoard", JSON.stringify(board.boards));
      this.initTask();
    },
    /**
     * Создает новый тэг у задачи
     * @param tagForm - форма с данными
     */
    createTaskTag(tagForm: Tag): void {
      console.log(tagForm);
      const board = useBoardStore();
      const tasks = this.tasks.filter((item) => item.id === tagForm.idTask);
      console.log(tasks);
      const saveTag = tasks[0].tags || [];
      saveTag.push(tagForm);
      localStorage.setItem("saveBoard", JSON.stringify(board.boards));
    },
    /**
     * Удаление задачу из массива tasks и обновляет localstorage
     * @param payload - task
     * */
    deleteTask(payload: TaskModel): void {
      const board = useBoardStore();
      const data = board.boards.filter((item) => item.id === payload.idBoard);
      const dataTask = data[0].tasks;
      const indexTask = dataTask.indexOf(payload);
      dataTask.splice(indexTask, 1);
      board.updateLocalStorage();
    },
    /**
     * Измененяет задачу в массиве tasks
     * @param payload -task
     * */
    editTask(payload: TaskModel): void {
      const board = useBoardStore();
      console.log("editTask", payload);
      board.updateLocalStorage();
    },
    /**
     * Вытаскивает задачи из всех досок
     */
    initTask() {
      const board = useBoardStore();
      const boards = board.boards;

      if (boards) {
        boards.forEach((item) => {
          item.tasks.forEach((item) => {
            this.tasks.push(item);
          });
        });
      }
    },
    /**
     * Фильтрует задачи по дате
     *
     * @param date - дата в формате 02-02-2022
     */
    filterTasks(date: string) {
      this.filteredTasks = [];
      const data = this.tasks.filter((item) => item.endTask === date);
      if (data !== undefined) {
        this.filteredTasks = data;
      }
    },
  },
});
