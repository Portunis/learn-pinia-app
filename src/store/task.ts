import { defineStore } from "pinia";
import { useStore } from "@/store/index";
import TaskModel from "@/models/task.model";
import Tag from "@/models/tag.model";
export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as TaskModel[],
    filteredTasks: [] as TaskModel[],
  }),
  actions: {
    /**
     * Создает новый task и добавляет их в массив tasks  в объекте boards, обновляет localstorage
     * @param payload - taskForm
     * */
    createTasks(payload: TaskModel): void {
      const board = useStore();
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
      const board = useStore();
      const tasks = this.tasks.filter((item) => item.id === tagForm.idTask);
      console.log(tasks);
      const saveTag = tasks[0].tags || [];
      saveTag.push(tagForm);
      localStorage.setItem("saveBoard", JSON.stringify(board.boards));
    },
    /**
     * Удаление task из массива tasks и обновление localstorage
     * @param payload - task
     * */
    deleteTask(payload: TaskModel): void {
      const board = useStore();
      const data = board.boards.filter((item) => item.id === payload.idBoard);
      const dataTask = data[0].tasks;
      const indexTask = dataTask.indexOf(payload);
      dataTask.splice(indexTask, 1);
      board.updateLocalStorage();
    },
    /**
     * Изменение task в массиве tasks
     * @param payload -task
     * */
    editTask(payload: TaskModel): void {
      const board = useStore();
      console.log("editTask", payload);
      board.updateLocalStorage();
    },
    /**
     * Вытаскивает задачи из всех досок
     */
    initTask() {
      const board = useStore();
      const boards = board.boards;

      if (boards) {
        const tasks = boards.map((item) => {
          return item.tasks.map((item) => {
            return item;
          });
        });
        const test = tasks.flat();
        this.tasks = test;
      }
    },
    /**
     * Фильтрует задачи по дате
     *
     * @param payload
     */
    filterTasks(payload: string) {
      this.filteredTasks = [];
      console.log("piniaFilter", payload);
      const data = this.tasks.filter((item) => item.endTask === payload);
      this.filteredTasks = data;
      if (data !== undefined) {
        this.filteredTasks = data;
      }
    },
  },
});
