import { defineStore } from "pinia";
import { useStore } from "@/store/index";
import TaskModel from "@/models/task.model";
import Tag from "@/models/tag.model";
export const useTaskStore = defineStore("task", {
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
    },
    /**
     * Создает новый тэг у задачи
     * @param tagForm - форма с данными
     * @param idBoard - id доски
     */
    createTaskTag(tagForm: Tag, idBoard: number): void {
      const board = useStore();
      const getBoard = board.boards.filter((item) => item.id === idBoard);
      const getTask = getBoard[0].tasks;
      const tasks = getTask.filter((item) => item.id === tagForm.idTask);
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
  },
});
